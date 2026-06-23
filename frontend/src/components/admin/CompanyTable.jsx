import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Edit2, Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyTable = () => {
  const navigate = useNavigate();

  const { companies } = useSelector(
    (store) => store.company
  );

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companies?.length > 0 ? (
            companies.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-4">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
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

                    <span>{company.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  {company.location || "N/A"}
                </TableCell>

                <TableCell>
                  {company.website ? (
                company.website
                  ) : (
                    "N/A"
                  )}
                </TableCell>

                <TableCell>
                  {company.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      navigate(
                        `/admin/companies/${company._id}`
                      )
                    }
                  >
                    <Edit2 size={16} />
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
                    No Companies Found
                  </h3>

                  <p className="text-sm text-gray-500">
                    Create your first company to start
                    posting jobs.
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

export default CompanyTable;