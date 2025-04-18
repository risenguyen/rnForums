import { createFileRoute, redirect } from "@tanstack/react-router";
import AuthLayout from "../../../components/layouts/auth-layout";
import LoginForm from "../../../features/auth/components/login-form";

export const Route = createFileRoute("/(auth)/login")({
  component: LoginComponent,
  beforeLoad({ context: { auth } }) {
    if (auth?.isAuthenticated) {
      throw redirect({
        to: "/app",
      });
    }
  },
});

function LoginComponent() {
  return (
    <AuthLayout title="Log In">
      <LoginForm />
    </AuthLayout>
  );
}
