import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Search, Bell, CheckCircle, TrendingUp, BarChart3 } from "lucide-react";

type Priority = "HIGH" | "MEDIUM" | "LOW";

interface Patient {
  priority: Priority;
  name: string;
  id: string;
  age: number;
  symptom: string;
  waitTime: string;
  aiScore: string;
}

const patients: Patient[] = [
  { priority: "HIGH", name: "John Davis", id: "#48291", age: 62, symptom: "Chest Pain, Shortness of Breath", waitTime: "5 mins", aiScore: "92% - High" },
  { priority: "HIGH", name: "Maria Rodriguez", id: "#48292", age: 78, symptom: "Severe Stroke Symptoms", waitTime: "7 mins", aiScore: "95% - High" },
  { priority: "MEDIUM", name: "Michael Lee", id: "#48293", age: 45, symptom: "Fractured Wrist, Severe Pain", waitTime: "18 mins", aiScore: "78% - Medium" },
  { priority: "MEDIUM", name: "Emily White", id: "#48294", age: 32, symptom: "High Fever, Persistent Cough", waitTime: "25 mins", aiScore: "74% - Medium" },
  { priority: "LOW", name: "David Kim", id: "#48295", age: 21, symptom: "Minor Laceration on Arm", waitTime: "42 mins", aiScore: "45% - Low" },
  { priority: "HIGH", name: "Sarah Johnson", id: "#48296", age: 55, symptom: "Chest Pain, Dizziness", waitTime: "3 mins", aiScore: "90% - High" },
  { priority: "MEDIUM", name: "Robert Chen", id: "#48297", age: 38, symptom: "Abdominal Pain, Nausea", waitTime: "20 mins", aiScore: "72% - Medium" },
  { priority: "LOW", name: "Lisa Park", id: "#48298", age: 28, symptom: "Mild Headache, Fatigue", waitTime: "50 mins", aiScore: "35% - Low" },
];

const priorityBadge = (p: Priority) => {
  const styles = {
    HIGH: "bg-priority-high/10 text-priority-high border-priority-high/20",
    MEDIUM: "bg-priority-medium/10 text-priority-medium border-priority-medium/20",
    LOW: "bg-priority-low/10 text-priority-low border-priority-low/20",
  };
  return `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${styles[p]}`;
};

const rowBg = (p: Priority) => {
  const styles = {
    HIGH: "bg-priority-high/[0.03]",
    MEDIUM: "bg-priority-medium/[0.03]",
    LOW: "",
  };
  return styles[p];
};

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.symptom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const counts = {
    HIGH: patients.filter((p) => p.priority === "HIGH").length,
    MEDIUM: patients.filter((p) => p.priority === "MEDIUM").length,
    LOW: patients.filter((p) => p.priority === "LOW").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="app" />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">
          {/* Patient queue - left */}
          <div className="flex-1 min-w-0">
            <h1 className="text-display-sm text-foreground mb-6">Patient Queue</h1>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-card"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-accent/40">
                    <th className="text-left px-5 py-3 text-caption text-muted-foreground font-medium">Priority</th>
                    <th className="text-left px-5 py-3 text-caption text-muted-foreground font-medium">Name / ID</th>
                    <th className="text-left px-5 py-3 text-caption text-muted-foreground font-medium">Age</th>
                    <th className="text-left px-5 py-3 text-caption text-muted-foreground font-medium">Main Symptom</th>
                    <th className="text-left px-5 py-3 text-caption text-muted-foreground font-medium">Waiting Time</th>
                    <th className="text-left px-5 py-3 text-caption text-muted-foreground font-medium">AI Risk Score</th>
                    <th className="text-left px-5 py-3 text-caption text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <motion.tr
                      key={i}
                      className={`border-b border-border/60 hover:bg-accent/60 transition-colors cursor-pointer ${rowBg(p.priority)}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <td className="px-5 py-3.5"><span className={priorityBadge(p.priority)}>{p.priority}</span></td>
                      <td className="px-5 py-3.5 font-medium text-foreground">{p.name} / {p.id}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{p.age}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{p.symptom}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{p.waitTime}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{p.aiScore}</td>
                      <td className="px-5 py-3.5">
                        <Button variant="outline" size="sm" className="text-xs">Open case</Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overview cards - right */}
          <div className="w-72 space-y-4 shrink-0">
            {/* Queue overview */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h3 className="text-subheading text-foreground mb-4">Current queue overview</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs font-bold text-priority-high">HIGH:</p>
                  <p className="text-2xl font-extrabold text-foreground">{counts.HIGH}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-priority-medium">MEDIUM:</p>
                  <p className="text-2xl font-extrabold text-foreground">{counts.MEDIUM}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-priority-low">LOW:</p>
                  <p className="text-2xl font-extrabold text-foreground">{counts.LOW}</p>
                </div>
              </div>
            </motion.div>

            {/* Average wait */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className="text-subheading text-foreground mb-2">Average wait time</h3>
              <div className="flex items-end gap-3">
                <p className="text-3xl font-extrabold text-foreground">28 min</p>
                <TrendingUp className="h-8 w-8 text-priority-low mb-1" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Past 4 hours</p>
            </motion.div>

            {/* AI performance */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-5 shadow-card"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="text-subheading text-foreground mb-3">AI performance today</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-lg font-bold text-foreground">94%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-lg font-bold text-foreground">89%</p>
                    <p className="text-xs text-muted-foreground">Triage Speed Improvement</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-lg font-bold text-foreground">150</p>
                    <p className="text-xs text-muted-foreground">Cases Analyzed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
