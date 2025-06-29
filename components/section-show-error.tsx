'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation';

export default function ShowSectionError({ sectionTitle, error, goBackTo, sectionPath }: { sectionTitle: string, error: string, goBackTo?: string, sectionPath: string }) {
  const router = useRouter();

  const handleRefresh = () => {
    router.push(sectionPath || '/');
  };

  if (sectionPath) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p className="text-destructive mb-4">{error}</p>
          {goBackTo ? (
            <Button size="sm" asChild>
              <Link href={goBackTo}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Go Back
              </Link>
            </Button>
          ) :
            <Button onClick={handleRefresh}>Refresh</Button>
          }
        </CardContent>
      </Card>
    )
  }
}