import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background pt-16 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            Methodology
          </h1>
          <p className="text-xl text-muted-foreground font-serif italic">
            How we build the neutral ground.
          </p>
          <div className="editorial-divider"></div>
        </header>

        <div className="prose prose-lg prose-slate max-w-none text-foreground">
          <p className="drop-cap">
            The Meridian was built on a simple premise: the news is broken. Algorithms optimize for engagement, 
            engagement requires emotion, and emotion destroys objectivity. Our goal is not to tell you what to 
            think, but to provide the raw materials required for rational thought.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 border-b border-border pb-2">1. Ingestion</h2>
          <p>
            We continuously monitor RSS feeds and sitemaps from over 50 major news organizations. We explicitly 
            categorize these sources based on established media bias charts (Left, Center-Left, Center, Center-Right, Right).
            To create a "Story", an event must be covered by multiple sources across this spectrum.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 border-b border-border pb-2">2. Clustering</h2>
          <p>
            Our pipeline uses semantic similarity to cluster individual articles into "Stories". When an event occurs, 
            we gather the <em>New York Times</em> coverage, the <em>Fox News</em> coverage, and the <em>Reuters</em> 
            wire, grouping them into a single entity for analysis.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 border-b border-border pb-2">3. The Neutrality Engine</h2>
          <p>
            Once clustered, we feed the raw text of these articles into a Large Language Model (currently OpenAI's GPT series) 
            with strict systemic prompts. The engine is instructed to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Identify the undeniable <strong>Key Facts</strong> that all sources agree upon.</li>
            <li>Strip away all adjectives, emotional framing, and speculative commentary.</li>
            <li>Write a <strong>Neutral Summary</strong> based strictly on the overlapping facts.</li>
            <li>Identify the <strong>Narrative Divergence</strong>—explicitly stating what details were highlighted by left-leaning sources versus right-leaning sources.</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-12 mb-6 border-b border-border pb-2">4. Transparency</h2>
          <p>
            We don't hide the original articles. At the bottom of every story, we provide the specific snippets from the 
            underlying articles showing exactly how that publication framed the event, along with a link to read their full piece.
          </p>
        </div>

        <div className="mt-20 pt-10 border-t border-border flex justify-center">
          <Link href="/feed" className="inline-flex items-center px-6 py-3 bg-foreground text-background font-serif font-bold hover:bg-foreground/90 transition-colors">
            Read The Feed <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
