import { createFileRoute } from "@tanstack/react-router";
import { Nav, Hero, Stats, Stack, Projects, Experience, Process, Contact, Footer } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ivan Santo Muze — Full-Stack & Data Automation Engineer" },
      { name: "description", content: "High-performance web apps and Python data automation. Freelance full-stack developer in Tucumán, Argentina." },
      { property: "og:title", content: "Ivan Santo Muze — Full-Stack & Data Automation Engineer" },
      { property: "og:description", content: "High-performance web apps and Python data automation for businesses worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Stats />
      <Stack />
      <Projects />
      <Experience />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
