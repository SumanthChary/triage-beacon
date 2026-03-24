import { useState } from "react";
import { ArrowLeft, Smartphone, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const quickSymptoms = [
  "Chest pain",
  "Breathing difficulty",
  "Fever",
  "Bleeding",
  "Dizziness",
  "Abdominal pain",
];

const MobileQuickTriagePage = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [vitals, setVitals] = useState({ hr: "", bp: "", temp: "" });

  const toggleSymptom = (chip: string) => {
    setSelectedSymptoms((prev) => (prev.includes(chip) ? prev.filter((v) => v !== chip) : [...prev, chip]));
  };

  const canRun = selectedSymptoms.length > 0 && vitals.hr.trim() && vitals.bp.trim();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-sm px-4 py-5">
        <div className="mb-5 flex items-center justify-between">
          <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Smartphone className="h-3.5 w-3.5" />
            Mobile Quick Triage
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground">Quick Triage</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fast intake for on-floor staff.</p>

        <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="text-sm font-semibold text-foreground mb-3">Symptoms</p>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map((chip) => (
              <button
                key={chip}
                onClick={() => toggleSymptom(chip)}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                  selectedSymptoms.includes(chip)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-background text-foreground"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="text-sm font-semibold text-foreground mb-3">Vitals</p>
          <div className="grid grid-cols-1 gap-3">
            <label className="text-xs text-muted-foreground">
              Heart rate
              <input
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm"
                placeholder="e.g. 108"
                value={vitals.hr}
                onChange={(e) => setVitals((prev) => ({ ...prev, hr: e.target.value }))}
              />
            </label>
            <label className="text-xs text-muted-foreground">
              Blood pressure
              <input
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm"
                placeholder="e.g. 150/95"
                value={vitals.bp}
                onChange={(e) => setVitals((prev) => ({ ...prev, bp: e.target.value }))}
              />
            </label>
            <label className="text-xs text-muted-foreground">
              Temperature
              <input
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm"
                placeholder="e.g. 38.2"
                value={vitals.temp}
                onChange={(e) => setVitals((prev) => ({ ...prev, temp: e.target.value }))}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-card/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-sm">
          <Button className="w-full h-12 text-base" variant="hero" disabled={!canRun} onClick={() => navigate("/triage/processing")}>
            Run AI triage
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileQuickTriagePage;
