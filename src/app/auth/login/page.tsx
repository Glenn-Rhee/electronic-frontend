import Auth from "@/components/dashboard/auth/Auth";
import AuthShell from "@/components/dashboard/auth/AuthShell";
import LoginForm from "@/components/dashboard/auth/LoginForm";
import Title from "@/components/dashboard/auth/Title";

export default function LoginPage() {
  return (
    <Auth className="pt-10">
      <AuthShell className="min-w-[30%]">
        <Title>Login</Title>
        <div className="mt-10">
          <LoginForm />
        </div>
      </AuthShell>
    </Auth>
  );
}
