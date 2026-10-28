import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Github, Mail, MapPin, Zap, Code2, Rocket, Database, Terminal, ShoppingCart, BarChart3, Briefcase, Users, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog, CONTACT_EMAIL } from "./ContactDialog";
import { useReveal } from "@/hooks/use-reveal";

const GITHUB = "https://github.com/ivansantomuze";

function SectionHead({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">// {tag}</p>
      <h2 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h2>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3">
        <a href="#top" className="font-display text-lg font-bold">ism<span className="text-primary">.</span>dev</a>
        <div className="hidden gap-7 text-sm text-muted-foreground md:flex">
          <a href="#stack" className="hover:text-foreground">Stack</a>
          <a href="#projects" className="hover:text-foreground">Projects</a>
          <a href="#experience" className="hover:text-foreground">Experience</a>
          <a href="#process" className="hover:text-foreground">Process</a>
        </div>
        <ContactDialog><Button variant="hero" size="sm" className="pulse-cta rounded-full">Hire me</Button></ContactDialog>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-24 pt-40 md:pt-48">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand opacity-20 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="glass mx-auto inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
          </span>
          Available for Freelance &amp; Hybrid Contracts
        </div>
        <h1 className="mt-8 text-5xl font-bold leading-[1.02] md:text-7xl">
          Engineering <span className="text-gradient">High-Performance</span> Web Apps &amp; Automated Data Systems.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Bridging full-stack software architecture with advanced Python automation to turn chaotic business data into clean, scalable assets.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="hero" size="lg" className="h-12 px-7">
            <a href="#projects">View Projects <ArrowRight /></a>
          </Button>
          <ContactDialog>
            <Button variant="glass" size="lg" className="h-12 px-7">Direct Contact</Button>
          </ContactDialog>
        </div>
        <p className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Tucumán, Argentina · Remote worldwide</p>
      </div>
    </section>
  );
}

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);
  return value;
}

const stats = [
  { value: 1.2, decimals: 1, prefix: "+", suffix: "M", label: "Rows Cleaned", sub: "by automated data pipelines" },
  { value: 100, decimals: 0, prefix: "", suffix: "%", label: "Automated", sub: "custom Python workflows" },
  { value: 0, decimals: 0, prefix: "", suffix: "", label: "Downtime", sub: "scalable web architecture", zero: true },
];

function Stat({ stat, active, delay }: { stat: (typeof stats)[number]; active: boolean; delay: number }) {
  const n = useCountUp(stat.value, active);
  const display = stat.zero ? "Zero" : `${stat.prefix}${n.toFixed(stat.decimals)}${stat.suffix}`;
  return (
    <Reveal delay={delay} className="h-full">
      <div className="glass glow-card h-full rounded-2xl px-6 py-8 text-center">
        <p className="text-gradient font-display text-4xl font-bold md:text-5xl">{display}</p>
        <p className="mt-2 font-display text-lg font-semibold">{stat.label}</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{stat.sub}</p>
      </div>
    </Reveal>
  );
}

export function Stats() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8">
      <div ref={ref} className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Stat key={s.label} stat={s} active={visible} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}

const stack = [
  { group: "Frontend", items: ["React.js", "Next.js", "TypeScript"], span: "md:col-span-2", icon: Code2 },
  { group: "Backend", items: ["Node.js"], span: "", icon: Terminal },
  { group: "Automation", items: ["Python"], span: "", icon: Zap },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "SQL"], span: "md:col-span-2", icon: Database },
  { group: "Business Intelligence", items: ["Tableau"], span: "md:col-span-2", icon: BarChart3 },
];

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-24">
      <Reveal><SectionHead tag="core stack" title="Tools I ship with." /></Reveal>
      <div className="grid gap-4 md:grid-cols-4">
        {stack.map(({ group, items, span, icon: Icon }, i) => (
          <Reveal key={group} delay={i * 100} className={span}>
            <div className="glass glow-card h-full rounded-2xl p-6">
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">{group}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="font-display text-2xl font-semibold">{item}<span className="text-accent">{item === items[items.length - 1] ? "" : " /"}</span></span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const projects = [
  {
    title: "Data Cleaner Master Toolkit",
    edition: "Enterprise Edition",
    desc: "Custom local Python automation pipeline built to ingest, merge, sanitize, and clean multi-file messy CSV/Excel datasets — handling hybrid dates, anomalies, and duplicates in milliseconds.",
    tech: ["Python", "Pandas", "CLI", "Data Engineering"],
    icon: Terminal,
    span: "md:col-span-2 md:row-span-2",
    flagship: true,
  },
  {
    title: "E-Commerce Full-Stack Platform",
    desc: "Scalable web architecture featuring secure backend endpoints, dynamic state management, and optimized database handling.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    icon: ShoppingCart,
    span: "",
  },
  {
    title: "Logistics & Performance Log Analysis Dashboard",
    desc: "Advanced analytics workflow tracking operational logs, anomalies, and key metrics into visual business intelligence.",
    tech: ["Tableau", "SQL", "Python"],
    icon: BarChart3,
    span: "",
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <Reveal><SectionHead tag="flagship projects" title="The heavy hitters." /></Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map(({ title, edition, desc, tech, icon: Icon, span, flagship }, i) => (
          <Reveal key={title} delay={i * 120} className={span}>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="glass glow-card group flex h-full flex-col rounded-2xl p-7">
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-brand p-3 text-primary-foreground"><Icon className="h-6 w-6" /></div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              {flagship && (
                <pre className="mt-8 overflow-hidden rounded-xl border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
{`$ dcm clean ./raw/*.xlsx --dedupe --fix-dates
`}<span className="text-primary">{`✓ 14 files merged · 1.2M rows
✓ 38,410 duplicates removed
✓ 6 date formats normalized
✓ done in 842ms`}</span>
                </pre>
              )}
              <div className="mt-auto pt-8">
                {edition && <p className="font-mono text-xs uppercase tracking-widest text-accent">{edition}</p>}
                <h3 className={`mt-1 font-bold ${flagship ? "text-3xl md:text-4xl" : "text-xl"}`}>{title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tech.map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs">{t}</span>)}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const experience = [
  {
    role: "Remote Full-Stack Developer",
    company: "Grupo Start",
    period: "Recent",
    points: [
      { icon: Users, text: "Collaborated daily with UX designers and product managers to ship user-facing features end to end." },
      { icon: Code2, text: "Refactored the frontend architecture, cutting complexity and making the codebase faster to build on." },
      { icon: Gauge, text: "Optimized backend client-server response times, measurably improving app performance under load." },
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <Reveal><SectionHead tag="track record" title="Industry experience. Real impact." /></Reveal>
      <div className="relative border-l border-border pl-8 md:pl-12">
        {experience.map(({ role, company, period, points }, i) => (
          <Reveal key={company} delay={i * 120}>
            <div className="relative">
              <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-primary-foreground md:-left-[57px]">
                <Briefcase className="h-3 w-3" />
              </span>
              <div className="glass glow-card rounded-2xl p-7 md:p-9">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-bold md:text-3xl">{role}</h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-primary">{period}</span>
                </div>
                <p className="mt-1 font-mono text-sm text-accent">{company}</p>
                <ul className="mt-6 space-y-4">
                  {points.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 text-muted-foreground">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const pillars = [
  { n: "01", title: "Kill the spreadsheet chaos", desc: "Manual copy-paste workflows replaced by Python pipelines that run in milliseconds — zero human error.", icon: Zap },
  { n: "02", title: "Production-grade code", desc: "Typed, tested, documented. Architecture that your next engineer will thank you for.", icon: Code2 },
  { n: "03", title: "Lightning-fast delivery", desc: "Optimized web apps deployed quickly, built to drive immediate, measurable business results.", icon: Rocket },
];

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <Reveal><SectionHead tag="how i solve problems" title="Brutal efficiency. By design." /></Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map(({ n, title, desc, icon: Icon }, i) => (
          <Reveal key={n} delay={i * 120} className="h-full">
            <div className="glass glow-card h-full rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-primary">{n}</span>
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-10 text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-muted-foreground">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={150}>
        <div className="glass relative mt-4 overflow-hidden rounded-2xl p-10 text-center md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-brand opacity-10" />
          <h3 className="relative text-3xl font-bold md:text-5xl">Got messy data or a slow app?</h3>
          <p className="relative mt-3 text-muted-foreground">Let's turn it into your competitive edge.</p>
          <ContactDialog><Button variant="hero" size="lg" className="pulse-cta relative mt-8 h-12 px-8">Start a project <ArrowRight /></Button></ContactDialog>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Ivan J. Santo Muze · Tucumán, Argentina</p>
        <div className="flex gap-5">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary"><Github className="h-4 w-4" /> github.com/ivansantomuze</a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-primary"><Mail className="h-4 w-4" /> Email</a>
        </div>
      </div>
    </footer>
  );
}
