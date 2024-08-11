import { deleteUser, getUserByEmail, updateUser, updateUsersSupervisorToNull } from "@/lib/data";
import { InternshipType, ROLE, User } from "@/lib/User";
import bcrypt from "bcryptjs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const { email } = params;

    // Check if the user to be deleted is a supervisor
    const user = await getUserByEmail(email);
    if (user && user.role === ROLE.SUPERVISER) {
      // Update users' supervisor attribute to null if this supervisor is deleted
      await updateUsersSupervisorToNull(email);
    }

    // Proceed to delete the user
    await deleteUser(email);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const { email } = params;
    const data = await request.formData();
    const imageFile = (data.get("image") as File) || null;
    let roleTotake: string = (data.get("role") as string) || "";
    let chosinRole: ROLE = ROLE.SUPERVISER;

    if (roleTotake === ROLE.SUPERVISER.toString()) chosinRole = ROLE.SUPERVISER;
    if (roleTotake === ROLE.ADMIN.toString()) chosinRole = ROLE.ADMIN;
    if (roleTotake === ROLE.INTERN.toString()) chosinRole = ROLE.INTERN;

    let typeTotake: any = (data.get("internshipType") as string) || "";
    if (typeTotake === "OUVRIER") typeTotake = InternshipType.OUVRIER;
    if (typeTotake === "PFE") typeTotake = InternshipType.PFE;
    if (typeTotake === "PROJET") typeTotake = InternshipType.PROJET;

    const password = data.get("password") as string;
    const hashedPassword = password
      ? await bcrypt.hash(password, await bcrypt.genSalt(10))
      : null;

    const user: User = {
      name: (data.get("name") as string) || undefined,
      email: (data.get("email") as string) || undefined,
      image: (data.get("image") as string) || undefined,
      password: hashedPassword || undefined || null,
      role: chosinRole || undefined,
      address: (data.get("address") as string) || undefined || null,
      supervisor: (data.get("supervisor") as string) || undefined || null,
      CV: (data.get("CV") as string) || undefined || null,
      internshipStartDate: (data.get("internshipStartDate") as string)
        ? new Date(data.get("internshipStartDate") as string)
        : undefined || null,
      internshipType: typeTotake || undefined,
      internshipDuration:
        parseInt(data.get("internshipDuration") as string) || undefined || null,
    };

    const updatedUser = await updateUser(user.email as string, user, imageFile);
    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};


