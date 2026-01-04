"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  BookOpen,
  Code,
  Trophy,
  User,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  Lock,
  Circle,
  TrendingUp,
  Clock,
  Brain,
  ChevronRight,
  Star,
  Award,
} from "lucide-react"
import { useState } from "react"

type LearningStatus = "completed" | "in-progress" | "locked"

type LearningModule = {
  id: number
  title: string
  description: string
  status: LearningStatus
  xp: number
  progress?: number
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("roadmap")
  const userName = "Alex"
  const streakDays = 7

  const learningPath: LearningModule[] = [
    { id: 1, title: "Python Basics", status: "completed", description: "Variables, data types, syntax", xp: 500 },
    { id: 2, title: "Loops & Conditionals", status: "completed", description: "Control flow fundamentals", xp: 450 },
    {
      id: 3,
      title: "Functions & Methods",
      status: "in-progress",
      description: "Building reusable code",
      xp: 300,
      progress: 65,
    },
    { id: 4, title: "Data Structures", status: "locked", description: "Lists, dicts, sets, tuples", xp: 600 },
    { id: 5, title: "Object-Oriented Programming", status: "locked", description: "Classes and inheritance", xp: 750 },
    { id: 6, title: "API Integration", status: "locked", description: "Working with REST APIs", xp: 800 },
  ]

  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 4.0 },
    { day: "Sat", hours: 2.8 },
    { day: "Sun", hours: 3.5 },
  ]

  const recentAchievements = [
    { title: "First Streak", icon: "🔥", date: "2 days ago" },
    { title: "Fast Learner", icon: "⚡", date: "5 days ago" },
    { title: "Bug Hunter", icon: "🐛", date: "1 week ago" },
  ]

  const stats = [
    {
      label: "XP Points",
      value: "2,450",
      icon: Sparkles,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      glowColor: "shadow-yellow-500/20",
    },
    {
      label: "Current Level",
      value: "8",
      subtext: "Beginner",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      glowColor: "shadow-purple-500/20",
    },
    {
      label: "Challenges Won",
      value: "12",
      subtext: "Victories",
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      glowColor: "shadow-green-500/20",
    },
    {
      label: "Hours Coded",
      value: "47",
      subtext: "This Month",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      glowColor: "shadow-blue-500/20",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text font-mono text-lg font-bold text-transparent">
              CodeMentor AI
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <NavItem
              icon={BookOpen}
              label="My Roadmap"
              active={activeNav === "roadmap"}
              onClick={() => setActiveNav("roadmap")}
            />
            <NavItem
              icon={Code}
              label="Coding Sandbox"
              active={activeNav === "sandbox"}
              onClick={() => setActiveNav("sandbox")}
            />
            <NavItem
              icon={Trophy}
              label="Boss Battles"
              active={activeNav === "battles"}
              onClick={() => setActiveNav("battles")}
            />
            <NavItem
              icon={User}
              label="Portfolio"
              active={activeNav === "portfolio"}
              onClick={() => setActiveNav("portfolio")}
            />
          </nav>

          {/* User Profile */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3 transition-all hover:bg-sidebar-accent">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">Level 8 Developer</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="fixed inset-0 ml-64 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-pink-500/20 blur-[120px] animate-pulse animation-delay-2000" />
          <div className="absolute bottom-20 right-1/4 h-60 w-60 rounded-full bg-orange-500/20 blur-[100px] animate-pulse animation-delay-4000" />
        </div>

        <div className="relative mx-auto max-w-7xl p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-balance text-4xl font-bold tracking-tight text-transparent">
                Welcome back, {userName}!
              </h1>
              <p className="text-muted-foreground">Continue your coding journey and level up your skills</p>
            </div>
            <Card className="group relative w-fit overflow-hidden border-0 transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 opacity-20 blur-2xl transition-opacity group-hover:opacity-30" />
              <CardContent className="relative flex items-center gap-3 rounded-xl border border-orange-500/50 bg-gradient-to-br from-card/90 to-card/50 p-4 shadow-2xl shadow-orange-500/20 backdrop-blur-xl">
                <div className="text-4xl animate-pulse">🔥</div>
                <div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-orange-300 via-red-400 to-yellow-300 bg-clip-text text-transparent">
                    {streakDays} Day Streak
                  </p>
                  <p className="text-xs text-muted-foreground">Keep the fire burning!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all hover:border-primary/50 hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-all duration-300 group-hover:opacity-10`}
                />
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${stat.color} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`}
                />
                <CardContent className="relative p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${stat.bgColor} transition-transform group-hover:scale-110`}>
                      <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-medium">+12%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      {stat.subtext && <span className="text-sm text-muted-foreground">{stat.subtext}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            {/* Learning Path - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">Your Learning Path</h2>
                  <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-purple-500/50">
                    3/6 Complete
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 border-border/50 bg-card/50 backdrop-blur">
                  <Brain className="h-4 w-4" />
                  View All
                </Button>
              </div>
              <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur shadow-2xl">
                <CardContent className="p-6">
                  <div className="relative">
                    {/* Path Line with gradient */}
                    <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-muted" />

                    {/* Learning Nodes */}
                    <div className="space-y-4">
                      {learningPath.map((module, index) => (
                        <LearningNode key={module.id} {...module} isLast={index === learningPath.length - 1} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Activity & Achievements */}
            <div className="space-y-6">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Weekly Activity</h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12%</span>
                  </div>
                </div>
                <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-end justify-between gap-2" style={{ height: "160px" }}>
                      {weeklyActivity.map((day, index) => {
                        const maxHours = 4
                        const heightPercent = (day.hours / maxHours) * 100
                        const isToday = index === 4 // Friday is highlighted
                        return (
                          <div key={index} className="group flex flex-1 flex-col items-center gap-2">
                            <div className="relative w-full flex-1">
                              <div
                                className={`absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t transition-all duration-300 ${
                                  isToday
                                    ? "from-orange-500 to-yellow-500 shadow-lg shadow-orange-500/50"
                                    : "from-purple-500 to-pink-500 group-hover:from-purple-400 group-hover:to-pink-400"
                                }`}
                                style={{ height: `${heightPercent}%` }}
                              />
                            </div>
                            <div className="flex flex-col items-center">
                              <span
                                className={`text-xs font-medium ${isToday ? "text-orange-400" : "text-muted-foreground"}`}
                              >
                                {day.day}
                              </span>
                              <span className="text-[10px] text-muted-foreground">{day.hours}h</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-6 flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Hours</p>
                        <p className="text-lg font-bold text-foreground">20.9 hrs</p>
                      </div>
                      <div className="h-10 w-px bg-border" />
                      <div>
                        <p className="text-xs text-muted-foreground">Daily Average</p>
                        <p className="text-lg font-bold text-foreground">3.0 hrs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Recent Achievements</h3>
                  <Award className="h-4 w-4 text-yellow-500" />
                </div>
                <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur shadow-xl">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {recentAchievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-3 rounded-lg border border-border/50 bg-gradient-to-r from-background/80 to-background/40 p-3 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-secondary/50 text-xl shadow-inner transition-transform group-hover:scale-110">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{achievement.date}</p>
                          </div>
                          <Star className="h-4 w-4 text-yellow-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 w-full gap-2 text-xs hover:bg-primary/10 hover:text-primary"
                    >
                      View All Achievements
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <Card className="group relative overflow-hidden border-0 transition-all hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl transition-opacity group-hover:opacity-100" />
            <CardContent className="relative rounded-xl border border-purple-500/30 bg-gradient-to-br from-card/90 to-card/60 p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 shadow-lg shadow-purple-500/50 transition-transform group-hover:scale-110 group-hover:rotate-12">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-balance text-lg font-medium italic leading-relaxed text-foreground">
                    "The expert in anything was once a beginner. Keep pushing forward!"
                  </p>
                  <p className="text-sm text-muted-foreground">— Helen Hayes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-sidebar-accent-foreground shadow-lg shadow-purple-500/20"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground hover:shadow-md"
      }`}
    >
      <Icon className={`h-5 w-5 transition-transform ${active ? "" : "group-hover:scale-110"}`} />
      {label}
      {active && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />}
    </button>
  )
}

function LearningNode({
  title,
  description,
  status,
  xp,
  progress,
  isLast,
}: {
  title: string
  description: string
  status: "completed" | "in-progress" | "locked"
  xp: number
  progress?: number
  isLast: boolean
}) {
  const getIcon = () => {
    if (status === "completed") return <CheckCircle2 className="h-6 w-6 text-green-400" />
    if (status === "in-progress")
      return (
        <div className="relative">
          <Circle className="h-6 w-6 text-purple-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-purple-400 animate-pulse" />
          </div>
        </div>
      )
    return <Lock className="h-6 w-6 text-muted-foreground" />
  }

  const getBgColor = () => {
    if (status === "completed") return "bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/10"
    if (status === "in-progress") return "bg-purple-500/10 border-purple-500/50 shadow-xl shadow-purple-500/20"
    return "bg-secondary/30 border-border/30"
  }

  const getNodeBg = () => {
    if (status === "completed") return "bg-green-500/20 border-green-500/50 shadow-xl shadow-green-500/30 scale-100"
    if (status === "in-progress")
      return "bg-purple-500/20 border-purple-500 shadow-xl shadow-purple-500/40 scale-110 animate-pulse"
    return "bg-secondary border-border scale-90"
  }

  return (
    <div className="group relative flex items-center gap-4">
      {/* Node Circle */}
      <div
        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${getNodeBg()}`}
      >
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div
          className={`rounded-xl border p-4 transition-all duration-300 ${
            status === "locked"
              ? "border-border bg-secondary/30 opacity-60"
              : `${getBgColor()} hover:scale-[1.02] hover:shadow-2xl`
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <span className="rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-lg shadow-orange-500/30">
                  +{xp} XP
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
              {status === "in-progress" && progress && (
                <div className="mt-3">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Progress</span>
                    <span className="font-bold text-purple-400">{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            {status === "in-progress" && (
              <Button
                size="sm"
                className="group/btn shrink-0 gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 transition-all hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:shadow-purple-500/50"
              >
                Continue
                <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            )}
            {status === "completed" && (
              <div className="flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1.5 text-sm font-medium text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Done
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
