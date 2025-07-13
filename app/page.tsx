
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center max-h-screen p-4">
      <div className="max-w-xl w-full bg-white/80 dark:bg-slate-900/80 rounded-xl shadow-xl p-8 flex flex-col items-center gap-6 border border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Welcome to the Personal Data App</h1>
        <p className="text-lg text-center text-muted-foreground">
          Manage your personal data, experience, education, skills, and more—all in one secure place.<br />
          Built for privacy, control, and ease of use.
        </p>
        <Link href="/aboutme">
          <button className="mt-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition">Get Started</button>
        </Link>
      </div>
    </main>
  );
}
