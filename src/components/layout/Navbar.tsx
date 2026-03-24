import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Case Studies", href: "#cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  variant?: "landing" | "app";
}

const Navbar = ({ variant = "landing" }: NavbarProps) => {
  const location = useLocation();
  const isApp = variant === "app" || location.pathname !== "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">MediTriage</span>
        </Link>

        {isApp ? (
          <div className="flex items-center gap-5">
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/triage/new" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Type</Link>
            <Link to="/triage/voice" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Voice</Link>
            <Link to="/triage/processing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Processing</Link>
            <Link to="/triage/results" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Results</Link>
            <Link to="/triage/priority" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Priority</Link>
            <Link to="/triage/mobile" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Mobile</Link>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">DC</span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground leading-none">Dr. Chen</p>
                <p className="text-xs text-muted-foreground">St. Mary's Hospital</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Sign In</Link>
              <Button variant="hero" size="sm" className="px-5 py-2 text-sm" asChild>
                <Link to="/triage/new">Request Demo</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
