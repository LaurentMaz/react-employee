import { Dispatch, SetStateAction } from "react";

export type loginType = {
  email: string;
  password: string;
};

export interface ICategories {
  id: number;
  name: string;
}

export type employeeType = {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
  password?: string;
  salary: string;
  address: string;
  category: number | null;
  picture?: string;
  category_name?: string;
  isAdmin?: boolean;
  isSuperAdmin?: boolean;
};

export type adminRecordType = {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
  isSuperAdmin: boolean;
};

export type EmployeeContextType = {
  logedEmployee: employeeType | undefined;
  setLogedEmployee: (employee: employeeType) => void;
  FetchEmpError: string | null;
  setFetchEmpError: Dispatch<SetStateAction<string | null>>;
};

export type EquipementType = {
  id?: number;
  brand: string;
  name: string;
  ram: string;
  proc: string;
  serial: string;
  date_service: string;
  employee_id?: number | null;
  employee_name?: string | null;
};
