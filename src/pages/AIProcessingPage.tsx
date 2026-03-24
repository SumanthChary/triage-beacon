import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Circle, User, Heart, Activity } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";

const steps = [
  { label: "Extracting symptoms", duration: 1000 },
  { label: "Predicting probable conditions", duration: 1200 },
  { label: "Assigning priority level", duration: 800 },
];

const AIProcessingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const advance = (step: number) => {
      if (step < steps.length) {
        timeout = setTimeout(() => {
          setCurrentStep(step + 1);
          advance(step + 1);
        }, steps[step].duration);
      } else {
        timeout = setTimeout(() => navigate("/triage/results"), 600);
      }
    };
    advance(0);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3 shadow-card">
          {[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Type Input", to: "/triage/new" },
            { label: "Voice Input", to: "/triage/voice" },
            { label: "Results", to: "/triage/results" },
            { label: "Priority", to: "/triage/priority" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-12">
          Analyzing patient data · usually under 3 seconds
        </p>

        <div className="flex gap-8 items-start">
          {/* Main card */}
          <motion.div
            className="flex-1 rounded-2xl border border-border bg-card p-10 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress steps */}
            <div className="flex items-center justify-between mb-12">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    {i > 0 && (
                      <div className={`flex-1 h-0.5 transition-colors duration-500 ${i <= currentStep ? "bg-primary" : "bg-border"}`} />
                    )}
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ${
                      i < currentStep ? "bg-primary" :
                      i === currentStep ? "border-2 border-primary bg-card" :
                      "border-2 border-border bg-card"
                    }`}>
                      {i < currentStep ? (
                        <CheckCircle className="h-5 w-5 text-primary-foreground" />
                      ) : i === currentStep ? (
                        <div className="h-3 w-3 rounded-full bg-primary" />
                      ) : (
                        <Circle className="h-3 w-3 text-border" />
                      )}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 transition-colors duration-500 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <p className={`mt-3 text-xs text-center font-medium transition-colors ${
                    i === currentStep ? "text-foreground font-bold" : i < currentStep ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Animated loader area */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <Loader2 className="h-12 w-12 text-primary animate-spin-slow" />
                <div className="absolute -top-4 -left-8">
                  <span className="text-xs font-medium text-primary bg-primary/5 border border-primary/20 rounded-full px-2 py-0.5">Symptoms</span>
                </div>
                <div className="absolute -top-6 right-[-3rem]">
                  <span className="text-xs font-medium text-primary bg-primary/5 border border-primary/20 rounded-full px-2 py-0.5">Vitals</span>
                </div>
                <div className="absolute top-10 right-[-3rem]">
                  <span className="text-xs font-medium text-primary bg-primary/5 border border-primary/20 rounded-full px-2 py-0.5">History</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center max-w-md mt-4">
                {currentStep < steps.length
                  ? `Reviewing reported chest pain, shortness of breath, and abnormal blood pressure...`
                  : "Analysis complete. Preparing results..."}
              </p>
            </div>
          </motion.div>

          {/* Patient summary sidebar */}
          <motion.div
            className="w-64 space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-caption text-muted-foreground">Patient Summary</p>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Age: 42</span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Main Symptoms: Chest Pain, Shortness of Breath</span>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Vitals: BP 150/95, HR 110 bpm</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIProcessingPage;
