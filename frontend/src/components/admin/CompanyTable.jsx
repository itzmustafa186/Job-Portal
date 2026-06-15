import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const companies = [
    {
        _id: "1",
        name: "Google",
        location: "California",
        website: "google.com",
        date: "12/6/26"
    },
    {
        _id: "2",
        name: "Microsoft",
        location: "Washington",
        website: "microsoft.com",
        date: "12/6/26"
    },
    {
        _id: "3",
        name: "Amazon",
        location: "Seattle",
        website: "amazon.com",
        date: "12/6/26"
    },
];

const CompanyTable = () => {
    return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead>Date</TableHead>

                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {companies.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell className="font-medium">
                                {company.name}
                            </TableCell>

                            <TableCell>
                                {company.location}
                            </TableCell>

                            <TableCell>
                                {company.website}
                            </TableCell>
                            <TableCell>
                                {company.date}
                            </TableCell>

                            <TableCell className="text-right">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                >
                                    <Edit2 size={16} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {companies.length === 0 && (
                <div className="p-10 text-center text-gray-500">
                    No companies found
                </div>
            )}
        </div>
    );
};

export default CompanyTable;