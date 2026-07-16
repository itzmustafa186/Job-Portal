import express from "express";
import { Comapny } from "../models/companySchema.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        };
        let company = await Comapny.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "This company name is already registered",
                success: false
            });
        };

        company = await Comapny.create({
            name: companyName,
            userId: req.id
        });

        return res.status(200).json({
            message: "Compnay Registered Successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        });
    };
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        let companies = await Comapny.find({ userId });
        if (!companies) {
            return res.status(400).json({
                message: "Companies not found",
                success: false
            });
        };
        return res.status(200).json({
            message: "Companies found Successfully",
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        });
    };
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        let company = await Comapny.findById(companyId)
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        };
        return res.status(200).json({
            message: "Company found Successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,

        });
    };
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        let logo;
   const file = req.files?.logo?.[0];
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = {
            name,
            description,
            website,
            location,
        };

        if (logo) {
            updateData.logo = logo;
        }

        const company = await Comapny.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated Successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};