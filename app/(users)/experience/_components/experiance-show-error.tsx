'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation';

export default function ShowError({ error, mainpage = false }: { error: string, mainpage?: boolean }) {
  const router = useRouter();

  const handleRefresh = () => {
    router.push('/refresh'); // Adjust the path as needed to trigger a refresh
  };

  if (mainpage) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={handleRefresh}>Refresh</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/experience">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Experience
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-lg font-semibold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild>
            <Link href="/experience">Return to Experience List</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}