'use client';

import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PageHeader, PageContent } from "@/components/page-formatter";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {

  }, [error]);

  return (
    <section>
      <PageHeader title="Error" />
      <PageContent>
        <div className="flex h-full flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Error Occurred</CardTitle>
                <CardDescription>{error.message}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {error.digest ? `Error ID: ${error.digest}` : 'An unexpected error occurred'}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  variant="destructive"
                  className='text-white'
                  onClick={() => reset()}
                >
                  Try again
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </PageContent>
    </section>
  );
}