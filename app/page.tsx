import Link from "next/link";
import { PageHeader, PageContent } from "@/components/page-formatter";

export default function Home() {
  return (
    <section>
      <PageHeader title="Home" />
      <PageContent>
        <div className="w-full bg-card rounded-xl shadow-sm p-8 flex flex-col items-center gap-5">
          <h1 className="text-xl md:text-2xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Welcome to the
          </h1>
          <h1 className="text-2xl md:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
            Personal Data App
          </h1>
          <p className="text-lg text-center text-muted-foreground">
            Manage your personal data, experience, education, skills, and more—all in one secure place.<br />
            Built for privacy, control, and ease of use.
          </p>
          <Link href="/aboutme">
            <button className="mt-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition">Get Started</button>
          </Link>
        </div>
      </PageContent>
    </section>
  );
}
