
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";

export default function UserNotVerified() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="text-yellow-500 mb-2" size={48} />
          <CardTitle className="text-2xl font-bold text-center">Account Not Verified</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center text-muted-foreground">
            Your account is currently <span className="font-semibold text-yellow-600 dark:text-yellow-400">not verified</span> by the admin.<br />
            Please wait for verification. You will receive an email once your account is approved.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
