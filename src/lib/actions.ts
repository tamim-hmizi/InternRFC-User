"use server";
import { auth, signIn, signOut } from "./auth";
import {
  addUserWithImageFile,
  deleteUser,
  getUserByEmail,
  updateUser,
} from "./data";
import { ROLE, User, InternshipType } from "./User";
import bcrypt from "bcryptjs";

export const handleGithubLogIn = async (formData: FormData) => {
  await signIn("github", { redirectTo: "/home" });
};

export const handleLogOut = async (FormData: FormData) => {
  await signOut({ redirectTo: "/home" });
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
    const currentUser = await getUserByEmail(email as string);
    if (!currentUser) return { error: "Email ou mot de passe incorrect" };
    let redirectingTo = "/home";
    if (currentUser.role === ROLE.ADMIN) redirectingTo == "/admin";
    await signIn("credentials", {
      email: email as string,
      password: password as string,
      redirectTo: redirectingTo,
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

export const handleProfileUpdate = async (
  previousState: any,
  formData: FormData
) => {
  try {
    const {
      name,
      password,
      address,
      internshipStartDate,
      internshipDuration,
      internshipType,
    } = Object.fromEntries(formData.entries());

    const newImageFile = formData.get("image") as File | null;
    const newCvFile = formData.get("CV") as File | null;
    const updates: Partial<User> = {};
    if (name) updates.name = name as string;
    if (address) updates.address = address as string;
    if (internshipStartDate) {
      updates.internshipStartDate = new Date(internshipStartDate as string);
    }
    if (internshipDuration) {
      updates.internshipDuration = parseInt(internshipDuration as string, 10);
    }
    if (internshipType) {
      updates.internshipType =
        InternshipType[internshipType as keyof typeof InternshipType];
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password as string, salt);
    }
    const session = await auth();
    await updateUser(
      session?.user.email as string,
      updates,
      newImageFile as File,
      newCvFile as File
    );
    return { success: true };
  } catch (error: any) {
    return { error: "Modification du profile aboutie!" };
  }
};

export const handleDeleteAccount = async (formData: FormData) => {
  try {
    const { email } = Object.fromEntries(formData.entries());
    await deleteUser(email as string);
    return handleLogOut(formData);
  } catch (error: any) {
    console.error("Failed to delete account:", error);
    return { error: "Failed to delete account. Please try again later." };
  }
};
