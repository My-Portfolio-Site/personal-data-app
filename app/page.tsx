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

        <div className="w-full bg-card rounded-xl shadow-sm p-8 flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent">Coming Soon: AI-Powered Features</span>
            <span className="ml-2 text-2xl" role="img" aria-label="AI Robot">🤖</span>
          </h2>
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                <span className="inline-flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-400">Smart Profile Matching</span>
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Automatically match your profile with job descriptions to find the perfect opportunities.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                <span className="inline-flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-400">Dynamic Resume Generation</span>
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Generate tailored resumes that highlight your most relevant experiences for specific job descriptions.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                <span className="inline-flex items-center gap-2">
                  <span className="text-xl">🔍</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-400">Skills Gap Analysis</span>
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Get AI-powered insights on skills you should develop based on your career goals.
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-purple-900 text-purple-300 text-sm">
            Stay tuned for these exciting AI features!
          </div>
        </div>
      </PageContent>
    </section>
  );
}
