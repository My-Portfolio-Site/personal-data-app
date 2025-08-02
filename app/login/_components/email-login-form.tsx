'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { GoogleLoginButton } from "@/app/login/_components/google-login-button"
import { GithubLoginButton } from "@/app/login/_components/github-login-button"

export function EmailLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email (coming soon...)</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            disabled={true}
          />
        </div>
        <Button type="submit" className="w-full" disabled={true}>
          Login
        </Button>
      </div>
    </form>
  )
}
