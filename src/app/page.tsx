import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-8">CodeMentor AI</h1>
      <p className="text-xl mb-12">Your Personal AI Coding Tutor</p>
      <Link href="/dashboard" className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700">
        Enter Dashboard (Demo Mode)
      </Link>
    </div>
  );
}