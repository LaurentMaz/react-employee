import { Dispatch, SetStateAction } from "react";

export type loginType = {
  email: string;
  password: string;
};

export interface ICategories {
  id: number;
  name: string;
}

export interface ICongeTypes {
  id: number;
  name: string;
  description: string;
  defaultDays: number;
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
  congesAvalaibleCurrentYear: number;
  setCongesAvalaibleCurrentYear: (conge: number) => void;
  congesAvalaibleNextYear: number;
  setCongesAvalaibleNextYear: (conge: number) => void;
};

export type EquipementType = {
  id?: number;
  brand: string;
  name: string;
  type: "desktop" | "laptop" | "";
  ram: string;
  proc: string;
  serial: string;
  date_service: string;
  employee_id?: number | null;
  employee_name?: string | null;
};

export type CongeType = {
  id?: number;
  employeeId?: number | null;
  employeeFullName?: string;
  congeTypesId: number | null;
  startDate: string;
  endDate: string;
  businessDays?: number;
  status: "En cours" | "Approuvé" | "Rejeté";
  reason: string;
};

export type TicketsType = {
  id?: number;
  titre: string;
  details: string;
  service: number;
  statut: "En cours" | "Terminé" | "Bloqué" | "Rejeté" | "En attente";
  id_machine: number | null;
  id_employee: number;
  urgence: "Faible" | "Modérée" | "Urgent" | "Aujourd'hui";
  emp_related: number | null;
};

export type filterMenuType = {
  visible: boolean;
  column: string | null;
  filterState: string;
  setFilterState: Dispatch<SetStateAction<string>> | null;
};

export type congesFiltersType = "employeeFullName" | "status";
