import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthLayout from "../../../components/layouts/auth-layout";
import SignupForm from "../../../features/auth/components/signup-form";

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupComponent,
  beforeLoad({ context: { auth } }) {
    if (auth?.isAuthenticated) {
      throw redirect({
        to: "/app",
      });
    }
  },
});

function SignupComponent() {
  return (
    <AuthLayout title="Sign Up">
      <SignupForm />
    </AuthLayout>
  );
}
