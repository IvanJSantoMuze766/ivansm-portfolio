import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Mail } from "lucide-react";

export const CONTACT_EMAIL = "ivan.santo.muzee@gmail.com";
export const GITHUB_URL = "https://github.com/IvanJSantoMuze766";
export const AVAILABILITY_COPY = "Available for immediate freelance projects, data automation pipelines, and hybrid contracts.";

export function ContactDialog({ children }: { children: ReactNode }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="glass border-border-white/20 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Let's build something fast.</DialogTitle>
          <DialogDescription>{AVAILABILITY_COPY} I reply within 24 hours.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-background/60 p-4 font-mono text-sm">
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-primary">
            <Mail className="h-4 w-4 text-primary" /> {CONTACT_EMAIL}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
            <Github className="h-4 w-4 text-primary" /> github.com/IvanJSantoMuze766
          </a>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Project details</Label>
            <Textarea id="message" required rows={5} maxLength={2000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" variant="hero" className="w-full h-11">Send message</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
