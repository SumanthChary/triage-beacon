import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { CheckCircle, ArrowUp, Minus, ArrowDown } from "lucide-react";

type Priority = "HIGH" | "MEDIUM" | "LOW";

const priorities: { level: Priority; icon: typeof ArrowUp; color: string; bgColor: string; borderColor: string; desc: string; time: string }[] = [
  {
    level: "HIGH",
    icon: ArrowUp,
    color: "text-priority-high",
    bgColor: "bg-priority-high/5",
    borderColor: "border-priority-high",
    desc: "Immediate attention required.",
    time: "See within 10 min",
  },
  {
    level: "MEDIUM",
    icon: Minus,
    color: "text-priority-medium",
    bgColor: "bg-priority-medium/5",
    borderColor: "border-priority-medium",
    desc: "Urgent, not life-threatening.",
    time: "See within 30 min",
  },
  {
    level: "LOW",
    icon: ArrowDown,
    color: "text-priority-low",
    bgColor: "bg-priority-low/5",
    borderColor: "border-priority-low",
    desc: "Non-urgent.",
    time: "See within 2 hours",
  },
];

const aiSuggestion: Priority = "HIGH";

const reasons = [
  "Patient presents with elevated heart rate (120 bpm) and shortness of breath.",
  "Systolic blood pressure is critically high (180/110).",
  "Symptoms indicate potential acute cardiac event.",
];

const PriorityPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Priority>(aiSuggestion);

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <span className="hover:text-foreground cursor-pointer">Dashboard</span>
          <span>›</span>
          <span className="hover:text-foreground cursor-pointer">Triage Queue</span>
          <span>›</span>
          <span className="hover:text-foreground cursor-pointer">Patient #12345</span>
          <span>›</span>
          <span className="text-foreground font-medium">Confirm Priority</span>
        </div>

        <motion.div
          className="rounded-2xl border border-border bg-card p-8 shadow-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-heading text-foreground mb-6">Confirm Triage Priority</h1>

          {/* Priority cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {priorities.map((p) => {
              const isSelected = selected === p.level;
              const isAI = p.level === aiSuggestion;
              return (
                <button
                  key={p.level}
                  onClick={() => setSelected(p.level)}
                  className={`relative rounded-xl border-2 p-6 text-center transition-all duration-200 hover:shadow-medium ${
                    isSelected ? `${p.borderColor} ${p.bgColor} shadow-medium` : "border-border bg-card hover:border-primary/20"
                  }`}
                >
                  {isAI && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold text-primary-foreground">
                      Recommended
                    </span>
                  )}
                  <p.icon className={`h-6 w-6 mx-auto mb-2 ${p.color}`} />
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className={`h-2.5 w-2.5 rounded-full ${p.level === "HIGH" ? "bg-priority-high" : p.level === "MEDIUM" ? "bg-priority-medium" : "bg-priority-low"}`} />
                    <span className="text-lg font-extrabold text-foreground">{p.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </button>
              );
            })}
          </div>

          {/* AI reasoning */}
          <div className="rounded-xl border border-border bg-accent/30 p-5 mb-8">
            <h3 className="text-subheading text-foreground mb-3">AI Reasoning</h3>
            <ul className="space-y-2">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/triage/results")}>
              Manual Override
            </Button>
            <Button variant="hero" className="flex-1" onClick={() => navigate("/dashboard")}>
              Confirm Priority
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PriorityPage;
