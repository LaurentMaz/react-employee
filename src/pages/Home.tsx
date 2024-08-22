import { useEffect, useState } from "react";
import RecapBox from "../components/recapBox";
import axios from "axios";
import AdminTable from "../components/admins/AdminTable";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState<string>("0");
  const [employeeTotal, setEmployeeTotal] = useState<string>("0");
  const [salaryTotal, setSalaryTotal] = useState<string>("0");

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

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-[90%] m-auto gap-10">
      <div className="flex w-full gap-5 items-center justify-center pt-10">
        <RecapBox title="Admin" total={adminTotal} />
        <RecapBox title="Employés" total={employeeTotal} />
        <RecapBox title="Salaires (€)" total={salaryTotal} />
      </div>
      <div className="w-full flex flex-col gap-5">
        <h2 className="text-2xl font-bold">Liste des admins</h2>
        <div>
          <AdminTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
