export type UserRole =
  | "educator"
  | "teacher"
  | "student"
  | "parent"
  | "jury"
  | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  emailConfirmed?: boolean;
  adminApproved?: boolean;
  position?: string;
  institution?: string;
  ageOrGrade?: string;
}

export interface UserEditForm {
  fullName: string;
  email: string;
  institution: string;
  position: string;
  ageOrGrade: string;
}
