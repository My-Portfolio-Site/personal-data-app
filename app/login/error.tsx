'use client';
import Image from 'next/image';
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
import { Separator } from '@/components/ui/separator';

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
    <section className='w-full h-screen'>
      <div className="w-full flex items-center justify-center gap-2 mt-5">
        <div className="flex size-8 items-center justify-center rounded-md">
          <svg width="25" height="25" viewBox="0 0 85 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Logo Frame">
              <g id="Logo">
                <path id="Vector 3" d="M40.836 66.2022L79.9836 6.54866C80.42 5.88365 79.943 5 79.1476 5H55.926C55.5768 5 55.2528 5.18217 55.0715 5.48058L39.1454 31.6813C39.0503 31.8378 38.9999 32.0175 38.9999 32.2007V65.6536C38.9999 66.6467 40.2911 67.0325 40.836 66.2022Z" fill="#AC6DA6" />
                <path id="Union" d="M6 6.12871C6 5.52864 6.52951 5.06362 7.12415 5.14406C21.5689 7.09789 26.3455 11.8988 28 27V86.8713C28 87.4714 27.4705 87.9364 26.8758 87.8559C12.4311 85.9021 7.65446 81.1012 6 66V6.12871Z" fill="#2C6397" />
                <path id="Vector 2" d="M40.0168 86.4511L57.2798 60.1578C57.654 59.5878 58.4764 59.5513 58.8997 60.0859L79.7168 86.3792C80.2358 87.0348 79.7689 88 78.9327 88H40.8528C40.0572 88 39.5802 87.1161 40.0168 86.4511Z" fill="#2CAB7D" />
              </g>
            </g>
          </svg>
        </div>
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-5 bg-primary"
        />
        <span className="text-xl font-bold">Personal Data App</span>
      </div>
      <div className="flex w-full h-3/5 flex-col items-center justify-center p-4">
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
    </section>
  );
}