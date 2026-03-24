import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Mic } from "lucide-react";

const symptomChips = ["Chest pain", "Dizziness", "Shortness of breath", "Fever", "Nausea", "Headache", "Abdominal pain", "Weakness"];

const SymptomInputPage = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [inputMode, setInputMode] = useState<"type" | "speak">("type");
  const [vitals, setVitals] = useState({
    age: "", sex: "", bp: "", hr: "", temp: "", conditions: "",
  });

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleAnalyze = () => {
    navigate("/triage/processing", {
      state: { symptoms, chips: selectedChips, vitals },
    });
  };

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
            <button
              onClick={() => setInputMode("type")}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                inputMode === "type" ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Type symptoms
            </button>
            <button
              onClick={() => setInputMode("speak")}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                inputMode === "speak" ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Speak symptoms
            </button>
          </div>
        </div>

        {inputMode === "type" ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Symptom text input */}
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
            </div>

            {/* Vitals */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-subheading text-foreground mb-4">Basic health parameters</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: "age", label: "Age", placeholder: "45" },
                  { key: "sex", label: "Sex", placeholder: "Male" },
                  { key: "bp", label: "Blood pressure", placeholder: "135/85 mmHg" },
                  { key: "hr", label: "Heart rate", placeholder: "98 bpm" },
                  { key: "temp", label: "Temperature", placeholder: "37.8 °C" },
                  { key: "conditions", label: "Existing conditions", placeholder: "Hypertension, Diabetes" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-caption text-foreground mb-1.5 block">{field.label}</label>
                    <input
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                      placeholder={field.placeholder}
                      value={vitals[field.key as keyof typeof vitals]}
                      onChange={(e) => setVitals({ ...vitals, [field.key]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Voice input mode */
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">
              <h2 className="text-heading text-foreground mb-8">Speak the patient's symptoms</h2>
              
              <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
                <div className="flex flex-col items-center">
                  {/* Mic button with pulse ring */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-ring" style={{ margin: "-16px" }} />
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-accent border-2 border-primary/20">
                      <Mic className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Listening...</p>
                  <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
                    Patient presenting with sudden onset chest pain, radiating to the left arm and jaw. Difficulty breathing for the past 30 minutes.
                  </p>
                </div>

                <div className="text-left">
                  <h3 className="text-subheading text-foreground mb-3">AI-detected keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {["chest pain", "radiating to left arm", "difficulty breathing", "sudden onset", "stable vitals"].map((kw) => (
                      <span key={kw} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center gap-4">
                <Button variant="outline">Re-record</Button>
                <Button variant="hero" onClick={handleAnalyze}>
                  Stop & analyze
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Sticky footer */}
      <div className="sticky bottom-0 border-t border-border bg-card/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <p className="text-sm text-muted-foreground">
            MediTriage will extract key symptoms and provide a preliminary assessment using AI.
          </p>
          <div className="flex gap-3">
            <Button variant="outline">Save draft</Button>
            <Button variant="hero" onClick={handleAnalyze}>
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
