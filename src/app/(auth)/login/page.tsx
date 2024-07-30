import LoginForm from "@/components/loginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connexion",
};
export default function Page() {
  return <LoginForm />;
}
