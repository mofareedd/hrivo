import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from "kysely";

export interface Database {
  users: UsersTable;
  employees: EmployeesTable;
  companies: CompaniesTable;
  departments: DepartmentsTable;
}

export interface UsersTable {
  id: Generated<number>;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: "admin" | "super_admin";
  status: "active" | "inactive";
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface CompaniesTable {
  id: Generated<number>;
  name: string;
  logo: string;
  industry: string | null;
  address: string | null;
  phone_number: string;
  email: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface EmployeesTable {
  id: Generated<number>;
  company_id: number; // FK for CompaniesTable
  username: string;
  password: string;
  role: "super_admin" | "admin" | "user";
  status: "active" | "inactive";
  first_name: string;
  last_name: string;
  phone_number: string | null;
  job_title: string | null;
  hire_date: Date | null;
  email: string;
  manager_id: number | null; // FK for EmployeesTable
  department: string | null; // FK for DepartmentsTable
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface DepartmentsTable {
  id: Generated<number>;
  company_id: number; // FK for CompaniesTable
  name: string;
  description: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}
