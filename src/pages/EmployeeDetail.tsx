import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/detail/${id}`)
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
  }, []);

  return <div>EmployeeDetails id</div>;
};

export default EmployeeDetail;
