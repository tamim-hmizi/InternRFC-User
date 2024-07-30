export enum InternshipType {
  OUVRIER,
  PROJET,
  PFE,
}
export enum ROLE {
  INTERN = 1,
  ADMIN = 2,
  SUPERVISER = 3,
}

export interface User {
  //commun
  name: string | undefined | null;
  email: string | undefined | null;
  password: string | null;
  address: string | null;
  role: ROLE;
  image: string | undefined | null;
  //intern
  CV: string | null;
  internshipStartDate: Date | null;
  internshipDuration: number | null;
  internshipType: InternshipType | null;
  supervisor: string | null;
}
