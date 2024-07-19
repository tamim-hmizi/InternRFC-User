"use server";

import { signIn, signOut } from "./auth";
import { addUserWithImageFile, getUserByEmail } from "./data";
import { ROLE, User, InternshipType } from "./User";

export const handleGithubLogIn = async (formData: FormData) => {
  await signIn("github");
};

export const handleLogOut = async (FormData: FormData) => {
  await signOut();
};

export const handleSignUp = async (formData: FormData) => {
  try {
    const {
      name,
      email,
      password,
      address,
      image,
      CV,
      internshipStartDate,
      internshipDuration,
      internshipType,
    } = Object.fromEntries(formData.entries());

    const imageFile = formData.get("image") as File | null;
    const CVFile = formData.get("CV") as File | null;

    const existingUser = await getUserByEmail(email as string);
    if (existingUser) return "User already exists";

    // Convert internshipType to enum
    const internshipTypeEnum =
      InternshipType[internshipType as keyof typeof InternshipType];

    // Parse dates and numbers
    const parsedInternshipStartDate = internshipStartDate
      ? new Date(internshipStartDate as string)
      : null;
    const parsedInternshipDuration = internshipDuration
      ? parseInt(internshipDuration as string, 10)
      : null;

    const newUser: User = {
      name: name as string,
      email: email as string,
      password: password as string,
      address: address as string,
      role: ROLE.INTERN,
      image: image as string,
      CV: CV as string,
      internshipStartDate: parsedInternshipStartDate,
      internshipDuration: parsedInternshipDuration,
      internshipType: internshipTypeEnum,
    };

    await addUserWithImageFile(newUser, imageFile as File, CVFile as File);
  } catch (error) {
    throw error;
  }
};
