import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Zap, Shield, ArrowRight, Clock, Handshake, Play, Activity, Lock, LineChart, Hospital, MessageSquareHeart, Stethoscope } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/layout/Navbar";

const stats = [
  { icon: Clock, value: "37%", label: "Lower Wait Time" },
  { icon: Zap, value: "2.3s", label: "Analysis Speed" },
  { icon: Handshake, value: "94%", label: "Agreement Rate" },
];

const badges = [
  { icon: CheckCircle, label: "FDA-Cleared" },
  { icon: Zap, label: "EHR Integrated" },
  { icon: Shield, label: "Real-time Analysis" },
];

const steps = [
  { num: "01", title: "Input symptoms", desc: "Type or speak the patient's symptoms and enter basic vitals." },
  { num: "02", title: "AI analysis", desc: "MediTriage predicts probable conditions in under 3 seconds." },
  { num: "03", title: "Confirm priority", desc: "Review the AI suggestion, confirm or override, and add to the queue." },
];

const productFeatures = [
  {
    icon: Stethoscope,
    title: "Clinical-first triage workspace",
    desc: "A focused intake flow designed for ER speed with structured vitals, symptom capture, and safe defaults.",
  },
  {
    icon: LineChart,
    title: "Explainable risk prediction",
    desc: "Condition confidence, risk factors, and recommended next actions are visible at a glance for rapid review.",
  },
  {
    icon: Hospital,
    title: "Queue orchestration for teams",
    desc: "Shared queue view with priority-aware rows, wait-time visibility, and clear handoff into treatment.",
  },
];

const caseStudies = [
  {
    name: "Northbridge General",
    impact: "42% faster critical-case identification",
    detail: "Large urban ER reduced median time-to-bed for high-risk patients from 18m to 10m.",
  },
  {
    name: "St. Helena Regional",
    impact: "31% lower queue bottlenecks",
    detail: "Nursing triage teams improved queue balancing during evening spikes without extra headcount.",
  },
  {
    name: "Cedar Valley Health",
    impact: "94% clinician-AI agreement",
    detail: "Pilot across 12,000 admissions maintained high consistency while preserving physician control.",
  },
];

const pricingCards = [
  {
    name: "Pilot",
    price: "Custom",
    blurb: "For single-hospital validation",
    points: ["Up to 2 ER sites", "Onboarding + clinical training", "Weekly outcome reporting"],
    cta: "Start pilot",
    emphasis: false,
  },
  {
    name: "Network",
    price: "Custom",
    blurb: "For multi-site health systems",
    points: ["Unlimited ER sites", "EHR + SSO integration", "Priority enterprise support"],
    cta: "Talk to sales",
    emphasis: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="landing" />

      {/* Hero */}
      <section id="product" className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h1
                className="text-hero-sm lg:text-hero text-foreground text-balance"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Triage the right patient first.
              </motion.h1>

              <motion.p
                className="mt-6 text-body-lg text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                AI-powered clinical decision support for faster, safer, and more accurate emergency care.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {badges.map((b) => (
                  <span key={b.label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-caption text-muted-foreground">
                    <b.icon className="h-3.5 w-3.5 text-primary" />
                    {b.label}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="mt-10 flex items-center gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button variant="hero" asChild>
                  <Link to="/triage/new">
                    Start Your Trial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="hero-outline">
                  <Play className="h-4 w-4" />
                  Watch Video
                </Button>
              </motion.div>
            </div>

            {/* Product preview card */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="rounded-2xl border border-border bg-card shadow-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Dashboard</h3>
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-priority-low" />
                    <span className="h-2.5 w-2.5 rounded-full bg-priority-medium" />
                    <span className="h-2.5 w-2.5 rounded-full bg-priority-high" />
                  </div>
                </div>
                {/* Mini patient rows */}
                {[
                  { name: "Patient A", score: 92, priority: "HIGH", color: "bg-priority-high" },
                  { name: "Patient B", score: 78, priority: "MED", color: "bg-priority-medium" },
                  { name: "Patient C", score: 45, priority: "LOW", color: "bg-priority-low" },
                  { name: "Patient D", score: 88, priority: "HIGH", color: "bg-priority-high" },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3 mb-2 last:mb-0 hover:bg-accent/50 transition-colors"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${p.color}`} />
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">Score: {p.score}</span>
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        p.priority === "HIGH" ? "bg-priority-high/10 text-priority-high" :
                        p.priority === "MED" ? "bg-priority-medium/10 text-priority-medium" :
                        "bg-priority-low/10 text-priority-low"
                      }`}>
                        {p.priority}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <motion.section
        className="mx-auto max-w-7xl px-6 -mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl border border-border bg-card shadow-card">
          {stats.map((s, i) => (
            <div key={i} className={`flex items-center gap-5 px-10 py-8 ${i < 2 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-display-sm text-foreground">{s.value}</p>
                <p className="text-caption text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How it works */}
      <section id="solutions" className="mx-auto max-w-7xl px-6 py-28">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-display text-foreground">How it works</h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-xl mx-auto">
            Three simple steps from patient arrival to prioritized queue. The doctor always has final say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-border bg-card p-8 shadow-card hover:shadow-medium transition-shadow duration-300"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-caption text-primary font-bold">{s.num}</span>
              <h3 className="mt-3 text-heading text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {productFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-card hover:shadow-medium transition-shadow duration-300"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-subheading text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="cases" className="mx-auto max-w-7xl px-6 pb-28">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-display-sm text-foreground">Clinical case studies</h2>
            <p className="mt-2 text-body-lg text-muted-foreground max-w-2xl">
              Real-world outcomes from emergency departments using MediTriage in production pilots.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard">View live dashboard</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-card"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-caption text-primary font-semibold">{study.name}</p>
              <h3 className="mt-2 text-heading text-foreground">{study.impact}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{study.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 pb-28">
        <div className="text-center mb-10">
          <h2 className="text-display-sm text-foreground">Pricing for hospitals, not startups</h2>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Deployment plans are scoped with your clinical governance and IT security teams.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-6">
          {pricingCards.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className={`rounded-2xl border p-7 shadow-card ${plan.emphasis ? "border-primary/30 bg-primary/[0.03]" : "border-border bg-card"}`}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-caption text-muted-foreground">{plan.name}</p>
              <h3 className="mt-2 text-3xl font-bold text-foreground">{plan.price}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>
              <ul className="mt-5 space-y-2">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.emphasis ? "hero" : "outline"} className="mt-6 w-full">
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-28">
        <motion.div
          className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-elevated"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-display-sm text-foreground">Deploy with confidence</h2>
              <p className="mt-3 text-body-lg text-muted-foreground">
                Book a clinical + technical walkthrough with our team. We’ll map MediTriage to your ER workflow.
              </p>
              <div className="mt-6 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-foreground">
                  <Lock className="h-4 w-4 text-primary" />
                  SOC 2 controls and role-based access
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-foreground">
                  <MessageSquareHeart className="h-4 w-4 text-primary" />
                  Clinician-guided onboarding
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <p className="text-sm font-semibold text-foreground mb-4">Request a hospital demo</p>
              <div className="grid grid-cols-1 gap-3">
                <input className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm" placeholder="Work email" />
                <input className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm" placeholder="Hospital / system name" />
                <textarea className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm min-h-24" placeholder="Tell us about your ER volume and triage goals" />
              </div>
              <Button variant="hero" className="mt-4 w-full">Request Demo</Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">MediTriage</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 MediTriage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
