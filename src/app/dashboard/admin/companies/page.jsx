import CompaniesTable from "@/components/dashboard/CompaniesTable";
import { getCompanies } from "@/lib/api/companies";


const AdminCompaniesPage = async () => {
  const companies = await getCompanies();
  return (
    <div className="p-6">
      <CompaniesTable companies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;
