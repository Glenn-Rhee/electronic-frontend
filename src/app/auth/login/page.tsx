import Auth from "@/components/dashboard/auth/Auth";
import AuthShell from "@/components/dashboard/auth/AuthShell";
import LoginForm from "@/components/dashboard/auth/LoginForm";
import Title from "@/components/dashboard/auth/Title";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Login Page",
};

export default async function LoginPage() {
  const cookiestore = cookies();
  const xtr = cookiestore.get("xtr")?.value;

  return (
    <Auth className="pt-20">
      <AuthShell className="min-w-[80%] md:min-w-[50%] lg:min-w-[40%] ">
        <Title>Login</Title>
        <div className="mt-10">
          <LoginForm xtr={xtr} />
        </div>
      </AuthShell>
    </Auth>
  );
}
