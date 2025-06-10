import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="bg-muted py-8 px-10 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>
        <LoginForm />
        <p className="text-center mt-4 text-sm text-muted-foreground">Only invited users can login.</p>
      </div>
    </div>
  );
}