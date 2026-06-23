import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs?.length > 0 ? (
            allAppliedJobs.map((application) => (
              <TableRow key={application._id}>
                <TableCell className="font-medium">
                  {application.job?.company?.name}
                </TableCell>

                <TableCell>
                  {application.job?.title}
                </TableCell>

                <TableCell>
                  {application.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`capitalize ${
                      application.status === "accepted"
                        ? "bg-green-500 hover:bg-green-500"
                        : application.status === "rejected"
                        ? "bg-red-500 hover:bg-red-500"
                        : "bg-yellow-500 hover:bg-yellow-500"
                    }`}
                  >
                    {application.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-40 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Briefcase
                    size={40}
                    className="text-gray-300"
                  />

                  <h3 className="text-lg font-semibold">
                    No Applied Jobs
                  </h3>

                  <p className="text-sm text-gray-500">
                    You haven't applied for any jobs yet.
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

export default AppliedJobTable;