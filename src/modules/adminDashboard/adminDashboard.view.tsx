import AdminTable from "../../components/admins/AdminTable";
import Button from "../../components/UI/Button";
import RecapBox from "../../components/UI/RecapBox";
import { adminRecordType } from "../../types/types";

interface adminDashboardViewProps {
  adminTotal: string;
  employeeTotal: string;
  salaryTotal: string;
  adminRecords: adminRecordType[];
  setAdminRecords: React.Dispatch<React.SetStateAction<adminRecordType[]>>;
  handleDelete: (
    id: number | undefined,
    isSuperAdmin: boolean,
    email: string
  ) => void;
  currentAdminEmail: string;
}

const AdminDashboardView = ({
  adminTotal,
  employeeTotal,
  salaryTotal,
  adminRecords,
  setAdminRecords,
  handleDelete,
  currentAdminEmail,
}: adminDashboardViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-[90%] m-auto gap-10">
      <div className="flex w-full gap-5 items-center justify-center pt-10">
        <RecapBox title="Admin" total={adminTotal} />
        <RecapBox title="Employés" total={employeeTotal} />
        <RecapBox title="Salaires (€)" total={salaryTotal} />
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="flex gap-5 items-center justify-start">
          <h2 className="text-2xl font-bold">Liste des admins</h2>
          <Button type="main" link={true} to="/dashboard/addAdmin">
            Ajouter des administrateurs
          </Button>
        </div>

        <div>
          <AdminTable
            adminRecords={adminRecords}
            currentAdminEmail={currentAdminEmail}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardView;
