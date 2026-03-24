import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, Pause, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const keywordChips = [
  "sudden chest pain",
  "left arm numbness",
  "shortness of breath",
  "pain scale 8/10",
];

const VoiceInputPage = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-display-sm text-foreground">New Patient Triage</h1>
          <span className="text-caption text-muted-foreground">Step 1 of 3 · Voice input</span>
        </div>
        <div className="h-px bg-border mb-8" />

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            <button
              onClick={() => navigate("/triage/new")}
              className="rounded-full px-6 py-2 text-sm font-semibold transition-all text-muted-foreground hover:text-foreground"
            >
              Type symptoms
            </button>
            <button className="rounded-full px-6 py-2 text-sm font-semibold transition-all bg-primary text-primary-foreground shadow-soft">
              Speak symptoms
            </button>
          </div>
        </div>

        <motion.div
          className="rounded-2xl border border-border bg-card p-8 shadow-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-heading text-foreground text-center mb-8">Capture patient symptoms by voice</h2>

          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary/20"
                animate={isListening ? { scale: [1, 1.18, 1], opacity: [0.35, 0.1, 0.35] } : { scale: 1, opacity: 0.15 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ margin: "-20px" }}
              />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-secondary/30 bg-accent">
                <Mic className="h-10 w-10 text-secondary" />
              </div>
            </div>

            <p className="text-sm font-semibold text-foreground">{isListening ? "Listening..." : "Paused"}</p>
            <p className="mt-4 max-w-xl rounded-xl border border-border bg-accent/40 p-4 text-sm leading-relaxed text-muted-foreground">
              54-year-old male reports sudden chest pain radiating to left arm, shortness of breath, and
              dizziness starting approximately 20 minutes ago.
            </p>

            <div className="mt-5 w-full">
              <p className="text-caption text-muted-foreground mb-2">Detected keywords</p>
              <div className="flex flex-wrap gap-2">
                {keywordChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-3">
            <Button variant="outline" onClick={() => setIsListening((prev) => !prev)}>
              <Pause className="h-4 w-4" />
              {isListening ? "Pause capture" : "Resume capture"}
            </Button>
            <Button variant="hero" onClick={() => navigate("/triage/processing")}>
              Stop & analyze
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceInputPage;
