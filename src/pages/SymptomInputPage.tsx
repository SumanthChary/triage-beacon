import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, CircleDot } from "lucide-react";

const symptomChips = ["Chest pain", "Dizziness", "Shortness of breath", "Fever", "Nausea", "Headache", "Abdominal pain", "Weakness"];

const SymptomInputPage = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [vitals, setVitals] = useState({
    age: "",
    sex: "",
    bp: "",
    hr: "",
    temp: "",
    conditions: "",
  });

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) => {
      const exists = prev.includes(chip);
      if (exists) {
        return prev.filter((c) => c !== chip);
      }

      const next = [...prev, chip];
      if (!symptoms.toLowerCase().includes(chip.toLowerCase())) {
        setSymptoms((current) => {
          const separator = current.trim().length > 0 ? ", " : "";
          return `${current}${separator}${chip}`;
        });
      }
      return next;
    });
  };

  const handleAnalyze = () => {
    navigate("/triage/processing", {
      state: { symptoms, chips: selectedChips, vitals },
    });
  };

  const highRiskVitals = useMemo(() => {
    const [systolicRaw] = vitals.bp.split("/");
    const systolic = Number(systolicRaw);
    const hr = Number(vitals.hr);
    const temp = Number(vitals.temp);

    return {
      bp: Number.isFinite(systolic) && systolic >= 150,
      hr: Number.isFinite(hr) && hr >= 110,
      temp: Number.isFinite(temp) && temp >= 38.5,
    };
  }, [vitals.bp, vitals.hr, vitals.temp]);

  const canAnalyze = symptoms.trim().length > 0 && vitals.age.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-display-sm text-foreground">New Patient Triage</h1>
          <span className="text-caption text-muted-foreground">Step 1 of 3 · Symptoms</span>
        </div>
        <div className="h-px bg-border mb-8" />

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            <button className="rounded-full px-6 py-2 text-sm font-semibold transition-all bg-primary text-primary-foreground shadow-soft">
              Type symptoms
            </button>
            <button
              onClick={() => navigate("/triage/voice")}
              className="rounded-full px-6 py-2 text-sm font-semibold transition-all text-muted-foreground hover:text-foreground"
            >
              Speak symptoms
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card mb-6">
            <h2 className="text-subheading text-foreground mb-3">Describe symptoms</h2>
            <textarea
              className="w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              placeholder="Please describe the patient's current symptoms in detail..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {symptomChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => toggleChip(chip)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    selectedChips.includes(chip)
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "border border-border bg-card text-foreground hover:bg-accent"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {selectedChips.length > 0 && (
              <div className="mt-4 rounded-xl border border-border bg-accent/40 p-3">
                <p className="text-caption text-muted-foreground mb-2">Captured tokens</p>
                <div className="flex flex-wrap gap-2">
                  {selectedChips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-subheading text-foreground mb-4">Basic health parameters</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: "age", label: "Age", placeholder: "45", risk: false },
                { key: "sex", label: "Sex", placeholder: "Male", risk: false },
                { key: "bp", label: "Blood pressure", placeholder: "135/85", risk: highRiskVitals.bp },
                { key: "hr", label: "Heart rate", placeholder: "98", risk: highRiskVitals.hr },
                { key: "temp", label: "Temperature", placeholder: "37.8", risk: highRiskVitals.temp },
                { key: "conditions", label: "Existing conditions", placeholder: "Hypertension, Diabetes", risk: false },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-caption text-foreground mb-1.5 block">
                    <span className="inline-flex items-center gap-1.5">
                      {field.label}
                      {field.risk && (
                        <CircleDot className="h-3.5 w-3.5 text-priority-high" aria-label="Risky vital value" />
                      )}
                    </span>
                  </label>
                  <input
                    className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all ${
                      field.risk ? "border-priority-high/30" : "border-border"
                    }`}
                    placeholder={field.placeholder}
                    value={vitals[field.key as keyof typeof vitals]}
                    onChange={(e) => setVitals({ ...vitals, [field.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-card/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground">
            AI triage supports rapid prioritization. The attending physician always makes the final call.
          </p>
          <div className="flex gap-3">
            <Button variant="outline">Save draft</Button>
            <Button variant="hero" onClick={handleAnalyze} disabled={!canAnalyze}>
              Analyze with AI
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomInputPage;
