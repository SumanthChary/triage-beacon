import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight } from "lucide-react";

const conditions = [
  { name: "Acute myocardial infarction", confidence: 87, color: "bg-priority-high" },
  { name: "Unstable angina", confidence: 65, color: "bg-priority-medium" },
  { name: "Pulmonary embolism", confidence: 28, color: "bg-muted-foreground" },
];

const factors = [
  "Severe chest pain",
  "Elevated troponin levels",
  "History of hypertension",
  "ECG changes",
];

const actions = ["Order ECG", "Move to resus bay", "Request Cardiology consult", "Administer Aspirin", "Initiate Oxygen Therapy"];

const ResultsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-display-sm text-foreground">AI assessment results</h1>
          <span className="rounded-full border border-border bg-card px-4 py-1.5 text-caption text-muted-foreground">
            Not yet confirmed by doctor
          </span>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Patient summary */}
          <motion.div
            className="col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-subheading text-foreground mb-3">Patient summary</h2>
            <p className="text-sm text-foreground">John Doe · ID: 83721-B</p>
            <p className="text-sm text-foreground">Age: 54</p>
            <p className="text-sm text-foreground"><span className="font-semibold">Symptom summary:</span> Chest pain, shortness of breath</p>
            <div className="flex gap-3 mt-4">
              {[
                { label: "BP: 150/95", danger: true },
                { label: "HR: 110 bpm", danger: true },
                { label: "Temp: 36.8°C", danger: false },
              ].map((v) => (
                <span key={v.label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-sm">
                  <span className={`h-2 w-2 rounded-full ${v.danger ? "bg-priority-high" : "bg-muted-foreground"}`} />
                  {v.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Risk gauge */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h2 className="text-subheading text-foreground mb-3">Overall risk level</h2>
            <p className="text-2xl font-extrabold text-priority-high mb-1">HIGH RISK</p>
            {/* Simple gauge */}
            <div className="relative w-32 h-16 mt-2">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="hsl(var(--priority-high))" strokeWidth="8" strokeLinecap="round" />
                <path d="M 50 45 A 10 10 0 0 1 90 45" fill="none" stroke="hsl(var(--priority-medium))" strokeWidth="8" strokeLinecap="round" />
                <path d="M 75 25 A 40 40 0 0 1 90 45" fill="none" stroke="hsl(var(--priority-low))" strokeWidth="8" strokeLinecap="round" />
                {/* Needle */}
                <line x1="50" y1="45" x2="22" y2="25" stroke="hsl(var(--foreground))" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="50" cy="45" r="3" fill="hsl(var(--foreground))" />
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Predicted conditions */}
          <motion.div
            className="col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <h2 className="text-subheading text-foreground mb-4">Top predicted conditions</h2>
            <div className="space-y-4">
              {conditions.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{c.name} · {c.confidence}%</span>
                    <span className="text-xs text-muted-foreground">Confidence</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-accent overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${c.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${c.confidence}%` }}
                      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key factors */}
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 shadow-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-subheading text-foreground mb-4">Key factors</h2>
            <ul className="space-y-2">
              {factors.map((f) => (
                <li key={f} className="text-sm text-muted-foreground">· {f}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Recommended actions */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 shadow-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <h2 className="text-subheading text-foreground mb-4">Recommended next actions</h2>
          <div className="flex flex-wrap gap-3">
            {actions.map((a) => (
              <Button key={a} variant="default" size="sm" className="rounded-full">
                {a}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 flex justify-end">
          <Button variant="hero" onClick={() => navigate("/triage/priority")}>
            Continue to priority assignment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
