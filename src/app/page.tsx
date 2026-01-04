import Link from "next/link"
import { ArrowRight, Brain, Code, Target, Terminal, Users, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      
      {/* 1. Navbar */}
      <nav className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span>CodeMentor<span className="text-purple-400">AI</span></span>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors pt-2">
              Dashboard (Demo)
            </Link>
            <Link
              href="/quiz"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-purple-300 mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            AI-Powered Personalization is Live
          </div>
          
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Stop Watching Tutorials. <br />
            <span className="text-purple-500">Start Building.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-400 mb-10 leading-relaxed">
            90% of coding students drop out because generic courses don't work.
            CodeMentor AI builds a <span className="text-white font-semibold">custom curriculum</span> just for you, 
            adapts to your learning style, and provides an <span className="text-white font-semibold">AI Mentor</span> when you get stuck.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quiz"
              className="group flex items-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Generate My Learning Path
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              View Demo Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Feature Grid */}
      <section className="py-24 bg-zinc-950/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:border-purple-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Smart Diagnostic Quiz</h3>
              <p className="text-gray-400">
                We don't guess. Our AI analyzes your goals, experience, and time availability to generate a JSON-structured roadmap unique to you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:border-blue-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3 text-blue-400">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">Interactive Sandbox</h3>
              <p className="text-gray-400">
                No setup needed. Code directly in the browser with our Monaco-powered editor. Run Python/JS instantly and get real-time feedback.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:border-green-500/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-4 inline-flex rounded-lg bg-green-500/10 p-3 text-green-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">24/7 AI Mentor</h3>
              <p className="text-gray-400">
                Stuck on a bug? Our Groq-powered AI reads your code context and gives Socratic hints—guiding you to the answer without spoiling it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Social Proof / Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">NOT AI Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">&lt;500ms</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Latency (Groq)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Infinite</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Learning Paths</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-8 text-center text-sm text-gray-600">
        <p>Built for the 2026 Hackathon • Powered by Next.js, Naman Chanana, and Vercel</p>
      </footer>
    </div>
  )
}