import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  BarChart3,
  Shield,
  Brain,
  Heart,
  Zap,
  Scale,
  Moon,
  Pill,
  Users,
  BookOpen,
  Sparkles,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-36 max-w-6xl items-center justify-between px-6">
          <img src="/logo.png" alt="MedCompare" className="h-[120px] w-auto" />
          <Link
            href="/dashboard"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Open Tool
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Find the antidepressant that fits{" "}
              <span className="text-indigo-600">your life</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Not all medications are the same. Tell us what matters to you — sleep, sexual health,
              weight, energy — and we'll show you which options score best for your specific priorities.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Try the Comparison Tool
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Product Screenshot */}
          <div className="mt-16 relative">
            <div className="absolute -inset-4 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
              <img
                src="/screenshot.jpg"
                alt="MedCompare dashboard showing medication comparison"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-900">14</p>
              <p className="mt-1 text-sm text-slate-500">Medications</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">27</p>
              <p className="mt-1 text-sm text-slate-500">Dimensions Tracked</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">4</p>
              <p className="mt-1 text-sm text-slate-500">Drug Classes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="mt-1 text-sm text-slate-500">Evidence-Based</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
            <p className="mt-3 text-slate-500">Three steps to a personalized comparison</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 mb-5">
                <SlidersHorizontal className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Pick your concerns</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Select up to 5 priorities from 27 dimensions — sexual health, sleep, weight, anxiety, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 mb-5">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">See your rankings</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Medications instantly re-rank based on how well they score across your specific priorities.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 mb-5">
                <BookOpen className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Dive into details</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Explore dosing, side effects, clinical notes, and FDA indications for each medication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features — Mock Cards */}
      <section className="py-24 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">What we track</h2>
            <p className="mt-3 text-slate-500">27 dimensions across 7 categories that actually matter</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Heart, label: "Sexual & Reproductive", items: ["Libido", "Orgasm function", "Arousal"], color: "text-rose-500 bg-rose-50" },
              { icon: Zap, label: "Autonomic & Cardiovascular", items: ["Heart rate", "Blood pressure", "Sweating"], color: "text-amber-500 bg-amber-50" },
              { icon: Scale, label: "Metabolic & Physical", items: ["Weight neutrality", "Appetite stability"], color: "text-emerald-500 bg-emerald-50" },
              { icon: Moon, label: "Sleep & Energy", items: ["Sleep quality", "Low sedation", "Insomnia risk"], color: "text-indigo-500 bg-indigo-50" },
              { icon: Brain, label: "Cognitive", items: ["Mental clarity", "Emotional range", "Motivation"], color: "text-violet-500 bg-violet-50" },
              { icon: Pill, label: "Practical & Lifestyle", items: ["Easy to stop", "Drug interactions", "Cost"], color: "text-slate-500 bg-slate-100" },
            ].map(({ icon: Icon, label, items, color }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color.split(" ")[1]}`}>
                  <Icon className={`h-5 w-5 ${color.split(" ")[0]}`} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{label}</h3>
                <ul className="mt-2 space-y-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-3.5 w-3.5 text-slate-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Because &ldquo;just try this one&rdquo; isn&rsquo;t good enough
          </h2>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Choosing an antidepressant shouldn't feel like a guessing game. Every medication has a
            different profile — different impacts on your sleep, your weight, your sex life, your
            energy. MedCompare gives you the information to have a better conversation with your
            doctor, armed with data about what matters to <em>you</em>.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Built for</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-slate-200 bg-white p-8">
              <Users className="h-8 w-8 text-indigo-500 mb-4" />
              <h3 className="font-semibold text-slate-900">Patients exploring options</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Starting medication for the first time and want to understand what's out there before your appointment.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-8">
              <Sparkles className="h-8 w-8 text-emerald-500 mb-4" />
              <h3 className="font-semibold text-slate-900">People considering a switch</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Already on something but dealing with side effects. See what else might work better for your specific concerns.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-8">
              <Shield className="h-8 w-8 text-violet-500 mb-4" />
              <h3 className="font-semibold text-slate-900">Clinicians & educators</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                A quick reference for comparing profiles across classes when discussing options with patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Ready to find your match?</h2>
          <p className="mt-4 text-slate-500">
            No signup required. Pick your priorities and see results instantly.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Open the Comparison Tool
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <img src="/logo.png" alt="MedCompare" className="h-24 w-auto opacity-60" />
            <div className="text-center sm:text-right space-y-2">
              <Link href="/disclaimer" className="text-xs text-slate-400 underline hover:text-slate-600">
                Disclaimer & Terms of Use
              </Link>
              <p className="text-xs text-slate-400 max-w-md">
                This tool is a proof of concept for educational purposes only and does not constitute
                medical advice. Always consult a qualified healthcare provider before making medication decisions.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
