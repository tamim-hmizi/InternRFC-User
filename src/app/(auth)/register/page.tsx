import SignUpForm from "@/components/SignUpForm/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Inscription",
};
export default function page() {
  return <SignUpForm />;
}
