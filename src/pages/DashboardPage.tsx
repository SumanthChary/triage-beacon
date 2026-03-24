import { Link } from "react-router-dom";
import { Bell, Search, Filter, Plus, Info, TrendingUp, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

type Priority = "HIGH" | "MEDIUM" | "LOW";

interface PatientRow {
  priority: Priority;
  name: string;
  id: string;
  age: string;
  symptom: string;
  wait: string;
  aiRisk: number;
}

const rows: PatientRow[] = [
  { priority: "HIGH", name: "Marcus Sterling", id: "#MD-92810", age: "54y", symptom: "Chest Pain, Left Arm Numbness", wait: "04:12m", aiRisk: 98 },
  { priority: "MEDIUM", name: "Elena Rodriguez", id: "#MD-92815", age: "29y", symptom: "Deep Laceration (Right Thigh)", wait: "14:45m", aiRisk: 62 },
  { priority: "LOW", name: "Julian Barnes", id: "#MD-92822", age: "41y", symptom: "Persistent Fever, Mild Nausea", wait: "32:10m", aiRisk: 18 },
  { priority: "LOW", name: "Sarah Jenkins", id: "#MD-92824", age: "67y", symptom: "Joint Inflammation, Hand Swelling", wait: "45:02m", aiRisk: 12 },
];

const badgeClasses: Record<Priority, string> = {
  HIGH: "bg-priority-high text-white",
  MEDIUM: "bg-priority-medium text-white",
  LOW: "bg-priority-low text-white",
};

const rowTint: Record<Priority, string> = {
  HIGH: "bg-priority-high/5 hover:bg-priority-high/10",
  MEDIUM: "bg-priority-medium/5 hover:bg-priority-medium/10",
  LOW: "bg-white hover:bg-accent/50",
};

const dotColor: Record<Priority, string> = {
  HIGH: "bg-priority-high",
  MEDIUM: "bg-priority-medium",
  LOW: "bg-priority-low",
};

const QueueCard = () => (
  <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
    <p className="mb-6 text-[11px] font-bold tracking-widest uppercase text-muted-foreground">Current queue overview</p>
    <div className="space-y-6">
      {[
        { label: "High Urgency", count: "04", dot: "bg-priority-high" },
        { label: "Medium Urgency", count: "12", dot: "bg-priority-medium" },
        { label: "Low Urgency", count: "18", dot: "bg-priority-low" },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${item.dot}`} />
            <span className="text-sm font-semibold text-foreground/80">{item.label}</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">{item.count}</span>
        </div>
      ))}
    </div>
    <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
      <span className="text-sm text-muted-foreground">Total in queue</span>
      <span className="text-sm font-bold text-primary">34 Patients</span>
    </div>
  </div>
);

const WaitCard = () => (
  <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card">
    <p className="mb-2 text-[11px] font-bold tracking-widest uppercase text-muted-foreground">Average wait time</p>
    <div className="mb-4 flex items-baseline gap-2">
      <h2 className="text-5xl font-bold tracking-tight text-foreground">
        22<span className="ml-1 text-2xl text-muted-foreground">m</span>
      </h2>
      <div className="inline-flex items-center rounded-full bg-priority-high/10 px-2 py-0.5 text-xs font-bold text-priority-high">
        <TrendingUp className="mr-1 h-3 w-3" />
        4%
      </div>
    </div>
    <div className="mt-4 h-12 w-full">
      <svg className="h-full w-full fill-transparent stroke-secondary stroke-[1.5]" viewBox="0 0 100 30">
        <path d="M0,25 C10,24 20,28 30,22 C40,16 50,20 60,12 C70,4 80,18 90,10 C100,2 100,2 100,2" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);

const PerformanceCard = () => (
  <div className="group relative overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-elevated">
    <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-transform group-hover:scale-110" />
    <p className="relative z-10 mb-6 text-[11px] font-bold tracking-widest uppercase text-blue-400">AI performance today</p>
    <div className="relative z-10 space-y-6">
      <div>
        <div className="mb-1 text-[10px] font-bold uppercase tracking-tight text-slate-400">Assessments</div>
        <div className="text-3xl font-bold text-white">82</div>
      </div>
      <div className="h-px w-full bg-white/10" />
      <div>
        <div className="mb-1 text-[10px] font-bold uppercase tracking-tight text-slate-400">Model Accuracy</div>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-white">94%</div>
          <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-400">Optimal</span>
        </div>
      </div>
    </div>
  </div>
);

const InsightCard = () => (
  <div className="mt-4 rounded-2xl border border-primary/10 bg-primary/5 p-5">
    <div className="flex items-start gap-3">
      <Info className="h-5 w-5 text-primary" />
      <div>
        <p className="text-xs font-bold text-foreground">Predictive Alert</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Admission volume is projected to increase by 20% in the next 2 hours based on regional EMS reports.
        </p>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 shadow-soft backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-8 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-foreground">MediTriage</span>
              <span className="h-4 w-px bg-border opacity-60" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Emergency triage dashboard</span>
            </div>
          </div>

          <div className="flex-1 px-12">
            <div className="group relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                className="w-full rounded-full border-0 bg-accent py-2.5 pl-12 pr-4 text-sm transition-all focus:ring-2 focus:ring-primary/20"
                placeholder="Search patients…"
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative rounded-full p-2 transition-colors hover:bg-accent">
              <Bell className="h-5 w-5 text-foreground/70" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-priority-high" />
            </button>
            <Link to="/triage/mobile" className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5" />
                Mobile
              </span>
            </Link>
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <div className="text-right">
                <p className="text-sm font-bold leading-none text-foreground">Dr. Chen</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-tight text-blue-700">St. Mary's</p>
              </div>
              <img
                alt="Dr. Chen"
                className="h-10 w-10 rounded-full border-2 border-primary/20 object-cover"
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1440px] gap-10 px-8 py-10">
        <section className="w-[70%]">
          <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-3 shadow-card">
            {[
              { label: "Type Input", to: "/triage/new" },
              { label: "Voice Input", to: "/triage/voice" },
              { label: "AI Processing", to: "/triage/processing" },
              { label: "Results", to: "/triage/results" },
              { label: "Priority", to: "/triage/priority" },
              { label: "Mobile", to: "/triage/mobile" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground hover:border-primary/30"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Live Admissions</span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">Patient Triage Queue</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="hero" className="rounded-full">
                <Plus className="h-4 w-4" />
                New Admission
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-accent/60">
                  <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Priority</th>
                  <th className="px-4 py-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Patient / ID</th>
                  <th className="px-4 py-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Age</th>
                  <th className="px-4 py-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Symptom</th>
                  <th className="px-4 py-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Wait Time</th>
                  <th className="px-4 py-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">AI Risk</th>
                  <th className="px-8 py-6 text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className={`transition-colors ${rowTint[row.priority]}`}>
                    <td className="px-8 py-7">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${badgeClasses[row.priority]}`}>{row.priority}</span>
                    </td>
                    <td className="px-4 py-7">
                      <div className="font-bold text-foreground">{row.name}</div>
                      <div className="text-xs text-muted-foreground">{row.id}</div>
                    </td>
                    <td className="px-4 py-7 text-foreground/70">{row.age}</td>
                    <td className="px-4 py-7">
                      <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${dotColor[row.priority]}`} />
                        <span className="text-sm font-medium text-foreground/90">{row.symptom}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-7 text-sm font-semibold ${row.priority === "HIGH" ? "text-priority-high" : row.priority === "MEDIUM" ? "text-priority-medium" : "text-muted-foreground"}`}>
                      {row.wait}
                    </td>
                    <td className="px-4 py-7">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{row.aiRisk}%</span>
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-200">
                          <div className={`h-full ${dotColor[row.priority]}`} style={{ width: `${row.aiRisk}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-7 text-right">
                      <button
                        className={`rounded-lg border px-4 py-1.5 text-xs font-bold transition-all ${
                          row.priority === "HIGH"
                            ? "border-red-200 text-priority-high hover:bg-priority-high hover:text-white"
                            : row.priority === "MEDIUM"
                            ? "border-amber-200 text-priority-medium hover:bg-priority-medium hover:text-white"
                            : "border-slate-200 text-muted-foreground hover:bg-slate-900 hover:text-white"
                        }`}
                      >
                        Open Case
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-accent/50 px-8 py-6 text-center">
              <button className="text-xs font-bold uppercase tracking-widest text-primary transition-all hover:tracking-[0.15em]">
                Load 12 more admissions
              </button>
            </div>
          </div>
        </section>

        <aside className="w-[30%] space-y-6">
          <QueueCard />
          <WaitCard />
          <PerformanceCard />
          <InsightCard />
        </aside>
      </main>

      <footer className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-border px-8 py-12 opacity-60">
        <p className="text-[10px] font-bold uppercase tracking-widest">System Status: All Nodes Active</p>
        <div className="flex gap-6">
          <span className="text-[10px] font-bold uppercase tracking-widest">Security Level: Grade A</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Last Sync: 2m ago</span>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
