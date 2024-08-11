import bcrypt from "bcryptjs";
import {
  addUserWithImageFile,
  addUserWithoutImageFile,
  getAllUsers,
  updateIntern,
} from "@/lib/data";
import { InternshipType, ROLE, User } from "@/lib/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.formData();
    const imageFile = data.get("image") as File;
    let roleTotake: string = data.get("role") as string;
    let chosinRole: ROLE = ROLE.SUPERVISER;

    if (roleTotake === ROLE.SUPERVISER.toString()) chosinRole = ROLE.SUPERVISER;
    if (roleTotake === ROLE.ADMIN.toString()) chosinRole = ROLE.ADMIN;
    if (roleTotake === ROLE.INTERN.toString()) chosinRole = ROLE.INTERN;
    let typeTotake: any = data.get("internshipType") as string;
    if (typeTotake === "OUVRIER") typeTotake = InternshipType.OUVRIER;
    if (typeTotake === "PFE") typeTotake = InternshipType.PFE;
    if (typeTotake === "PROJET") typeTotake = InternshipType.PROJET;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      data.get("password") as string,
      salt
    );

    const user: User = {
      name: (data.get("name") as string) || null,
      email: (data.get("email") as string) || null,
      image: (data.get("image") as string) || null,
      password: (hashedPassword as string) || null,
      role: chosinRole || null,
      address: (data.get("address") as string) || null,
      supervisor: data.get("supervisor") as string,
      CV: (data.get("CV") as string) || null,
      internshipStartDate: (data.get("internshipStartDate") as string)
        ? new Date(data.get("internshipStartDate") as string)
        : null,
      internshipType: typeTotake || null,
      internshipDuration:
        parseInt(data.get("internshipDuration") as string) || null,
    };
    if (user.image === null) await addUserWithoutImageFile(user);
    else await addUserWithImageFile(user, imageFile);
    return NextResponse.json({ message: "User added successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const data = await request.formData();
    const email = data.get("email") as string;
    const supervisor = data.get("supervisor") as string;

    await updateIntern(email, supervisor);

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
