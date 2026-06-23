
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Edit2, Building2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
    const navigate = useNavigate();

    const { allAdminJob } = useSelector(
        (store) => store.job
    );

    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>JobType</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                        <TableHead className="text-right">
                            Applicants
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {allAdminJob?.length > 0 ? (
                        allAdminJob.map((job) => (
                            <TableRow
                                key={job._id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-4">
                                        {job?.company?.logo ? (
                                            <img
                                                src={job?.company?.logo}
                                                alt={job?.company?.name}
                                                className="h-10 w-10 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="rounded-lg bg-blue-100 p-2">
                                                <Building2
                                                    size={18}
                                                    className="text-blue-600"
                                                />
                                            </div>
                                        )}

                                        <span>{job?.company?.name}</span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {job?.title || "N/A"}
                                </TableCell>

                                <TableCell>
                                    {job?.jobType ? (
                                        job?.jobType
                                    ) : (
                                        "N/A"
                                    )}
                                </TableCell>

                                <TableCell>
                                    {job.createdAt?.split("T")[0]}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button
                                    className="cursor-pointer"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                            navigate(
                                                `/admin/jobs/${job._id}`
                                            )
                                        }
                                    >
                                        <Edit2  size={16} />
                                    </Button>
                                </TableCell>
                                 <TableCell className="text-right cursor-pointer">
                                    <Button
                                    className="cursor-pointer"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                            navigate(
                                                `/admin/jobs/${job._id}/applicants`
                                            )
                                        }
                                    >
                                        <Eye  size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                className="h-40 text-center"
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <Building2
                                        size={40}
                                        className="text-gray-300"
                                    />

                                    <h3 className="text-lg font-semibold text-gray-700">
                                        No Job Found
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Create your first Job
                                        
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

export default AdminJobTable;