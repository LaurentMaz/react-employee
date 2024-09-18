import axios from "axios";
import { useEffect, useState } from "react";
import { adminRecordType } from "../../types/types";
import AdminDashboardView from "./adminDashboard.view";
import useFetchCurrentAdmin from "../../hooks/useFetchCurrentAdmin";
import { toast } from "react-toastify";

const AdminDashboardController = () => {
  const [adminTotal, setAdminTotal] = useState<string>("0");
  const [employeeTotal, setEmployeeTotal] = useState<string>("0");
  const [salaryTotal, setSalaryTotal] = useState<string>("0");
  const [adminRecords, setAdminRecords] = useState<adminRecordType[]>([]);
  const { currentAdminEmail } = useFetchCurrentAdmin();

  const adminCount = () => {
    axios
      .get("http://localhost:3000/auth/admin_count")
      .then((result) => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      })
      .catch((err) => console.log(err));
  };

  const employeeCount = () => {
    axios
      .get("http://localhost:3000/auth/employee_count")
      .then((result) => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      })
      .catch((err) => console.log(err));
  };

  const salaryCount = () => {
    axios
      .get("http://localhost:3000/auth/salary_count")
      .then((result) => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salary);
        }
      })
      .catch((err) => console.log(err));
  };

  const loadAdmins = () => {
    axios
      .get("http://localhost:3000/auth/admin_records")
      .then((result) => {
        if (result.data.Status) setAdminRecords(result.data.Result);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (
    id: number | undefined,
    isSuperAdmin: boolean,
    email: string
  ) => {
    if (id !== undefined) {
      const confirmDelete = confirm(
        "Êtes-vous sûr de vouloir supprimer l'administrateur ?"
      );
      if (confirmDelete) {
        axios
          .request({
            url: `http://localhost:3000/auth/delete_admin/${id}`,
            method: "put",
            data: { isSuperAdmin: isSuperAdmin, email: email },
          })
          .then((result) => {
            if (result.data.Status) {
              toast.success("Admin supprimé");
              adminRecords &&
                setAdminRecords(
                  adminRecords.filter(
                    (adminRecord) => adminRecord.email !== email
                  )
                );
            } else {
              toast.error(result.data.Error);
            }
          })
          .catch((err) => alert(err));
      }
    }
  };

  useEffect(() => {
    loadAdmins();
    adminCount();
    employeeCount();
    salaryCount();
  }, []);

  return (
    <>
      <AdminDashboardView
        adminTotal={adminTotal}
        employeeTotal={employeeTotal}
        salaryTotal={salaryTotal}
        adminRecords={adminRecords}
        currentAdminEmail={currentAdminEmail}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AdminDashboardController;
