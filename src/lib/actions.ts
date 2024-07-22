"use server";
import { signIn, signOut } from "./auth";
import { addUserWithImageFile, getUserByEmail } from "./data";
import { ROLE, User, InternshipType } from "./User";
import bcrypt from "bcryptjs";

export const handleGithubLogIn = async (formData: FormData) => {
  await signIn("github", { redirectTo: "/" });
};

export const handleLogOut = async (FormData: FormData) => {
  await signOut({ redirectTo: "/" });
};

export const handleSignUp = async (previousState: any, formData: FormData) => {
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
    if (existingUser) return { error: "Email deja utilisé!" };

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);

    const newUser: User = {
      name: name as string,
      email: email as string,
      password: hashedPassword as string,
      address: address as string,
      role: ROLE.INTERN,
      image: image as string,
      CV: CV as string,
      internshipStartDate: parsedInternshipStartDate,
      internshipDuration: parsedInternshipDuration,
      internshipType: internshipTypeEnum,
      supervisor: null,
    };

    await addUserWithImageFile(newUser, imageFile as File, CVFile as File);

    return { success: true };
  } catch (error: any) {
    return { error: "Erreur d'inscription!" };
  }
};

export const handleLogIn = async (previousState: any, formData: FormData) => {
  try {
    const { email, password } = Object.fromEntries(formData.entries());
    await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error: any) {
    if (
      error.message ===
      "Read more at https://errors.authjs.dev#callbackrouteerror"
    )
      return { error: "Email ou mot de passe incorrect" };
    throw error;
  }
};
