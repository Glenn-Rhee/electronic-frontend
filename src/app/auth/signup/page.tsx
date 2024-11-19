import Title from "@/components/dashboard/auth/Title";
import AuthShell from "@/components/dashboard/auth/AuthShell";
import SignupForm from "@/components/dashboard/auth/SignupForm";
import Auth from "@/components/dashboard/auth/Auth";

export default function SignUpPage() {
  return (
    <Auth>
      <AuthShell className="min-w-[90%] md:min-w-[70%] lg:min-w-[50%]">
        <Title>Sign Up</Title>
        <div className="mt-10">
          <SignupForm />
        </div>
      </AuthShell>
    </Auth>
  );
}
