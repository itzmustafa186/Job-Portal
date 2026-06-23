import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utills/constant";
import { useDispatch } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice/applicationSlice";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const ApplicantTable = () => {
    const { applicants } = useSelector((store) => store.application);
    const dispatch = useDispatch();
    const statusHandler = async (status, applicationId) => {
        try {
            const response = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
                { status },
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);

                // update redux state without refresh
                const updatedApplicants = applicants.map((application) =>
                    application._id === applicationId
                        ? { ...application, status }
                        : application
                );

                dispatch(setApplicants(updatedApplicants));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Applicant</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {applicants?.length > 0 ? (
                        applicants.map((application) => (
                            <TableRow
                                key={application._id}
                                className="hover:bg-gray-50"
                            >
                                {/* Applicant */}

                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage
                                                src={application?.applicant?.profile?.profilePhoto}
                                            />

                                            <AvatarFallback>
                                                {application?.applicant?.fullname
                                                    ?.charAt(0)
                                                    ?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className="font-medium">
                                            {application?.applicant?.fullname}
                                        </span>
                                    </div>
                                </TableCell>

                                {/* Email */}

                                <TableCell>
                                    {application?.applicant?.email}
                                </TableCell>

                                {/* Phone */}

                                <TableCell>
                                    {application?.applicant?.phoneNumber}
                                </TableCell>

                                {/* Resume */}

                                <TableCell>
                                    {application?.applicant?.profile?.resume ? (
                                        <a
                                            href={application?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            View Resume
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">
                                            No Resume
                                        </span>
                                    )}
                                </TableCell>

                                {/* Status */}

                                <TableCell>
                                    <Select
                                        defaultValue={application.status}
                                        onValueChange={(value) =>
                                            statusHandler(value, application._id)
                                        }
                                    >
                                        <SelectTrigger className="w-36">
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>

                                            <SelectItem value="accepted">
                                                Accepted
                                            </SelectItem>

                                            <SelectItem value="rejected">
                                                Rejected
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="h-44 text-center"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <Users
                                        size={42}
                                        className="text-gray-300"
                                    />

                                    <h3 className="text-lg font-semibold">
                                        No Applicants Yet
                                    </h3>

                                    <p className="text-gray-500">
                                        Applicants will appear here once users apply for this job.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantTable;