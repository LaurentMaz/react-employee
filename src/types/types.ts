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
  password: string;
  salary: string;
  address: string;
  category: number | null;
  picture: string;
};
