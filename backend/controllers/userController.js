import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "Something Is Missing",
                success: false
            });

        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists wit this email",
                success: false
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({

            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,


        });

        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    };
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something Is Missing",
                success: false
            });

        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false
            });
        };
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false
            });
        };

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exists with current role",
                success: false
            });
        };

        const tokenData = {
            userId: user._id
        };


        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,

            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict", secure: true }).json({
            message: `WELCOME BACK ${user.fullname.toUpperCase()}`,
            userData,
            success: true
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const logout = async (req, res) => {

    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        let skillsArray;
        if (skills) {

            skillsArray = skills.split(",");
        }
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {

            return res.status(400).json({
                message: "User not found",
                success: false
            });
        };
        if (fullname) user.fullname = fullname
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (email) user.email = email
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray




        await user.save();

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,

            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }

        return res.status(200).json({
            message: "Updated successfully",
            userData,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}