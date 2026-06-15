import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, salary, location, experience, jobType, companyId, position, requirements }
            = req.body
        const userId = req.id

        if (!title || !description || !salary || !location || !experience || !jobType
            || !companyId || !position || !requirements) {
            return res.status(400).json({
                message: "Something Is Missing",
                success: false
            });
        };
        const job = await Job.create({
            title,
            description,
            salary,
            location,
            experience,
            position,
            jobType,
            requirements: requirements.split(","),
            company: companyId,
            created_by: userId
        });

        return res.status(200).json({
            message: "Job created Successfully",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getALlJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(400).json({
                messsage: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({
            message: "job found Successfully",
            jobs,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    };
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate("company")
            .populate({
                path: "applications",
                populate: {
                    path: "applicant"
                }
            });

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job found Successfully",
            job,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(400).json({
                messsage: "Job not found",
                success: false
            })
        };
        return res.status(200).json({
            message: "job found Successfully",
            jobs,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}