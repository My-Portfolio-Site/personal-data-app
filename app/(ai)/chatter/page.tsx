import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Chatter',
  description: 'AI chat application',
}



import Link from "next/link";
import { PageHeader, PageContent } from "@/components/page-formatter";

export default function Home() {
  return (
    <section>
      <PageHeader title="Home" />
      <PageContent>
        <div className="w-full bg-card rounded-xl shadow-sm p-8 flex flex-col items-center gap-5">
          <p className="text-lg text-center text-muted-foreground">
            Chat with documents uploaded in the db.
          </p>
          <div className="px-4 py-2 rounded-lg bg-purple-900 text-purple-300 text-sm">
            Coming soon...
          </div>
        </div>
      </PageContent>
    </section>
  );
}
