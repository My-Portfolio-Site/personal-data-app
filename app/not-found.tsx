
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader, PageContent } from "@/components/page-formatter";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section>
      <PageHeader title="Not Found" />
      <PageContent>
        <div className="flex h-full flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Page Not Found</CardTitle>
                <CardDescription>The page you are looking for, doesn't exist.</CardDescription>
              </CardHeader>
              {/* <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Page not found
                </p>
              </CardContent> */}
              <CardFooter className="flex items-center">
                <Link href='/'>
                  <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-1" />
                  Go to Home Page
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </PageContent>
    </section>
  );
}