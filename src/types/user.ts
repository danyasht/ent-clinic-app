export interface User {
  profileId: string;
  fullName: string;
  role: string;
  email: string | undefined;
  phone: string | null;
  dateOfBirth: string | null;
  bloodType: string | null;
  allergies: string[] | null;
}
