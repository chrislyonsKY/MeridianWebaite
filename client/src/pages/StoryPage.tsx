import { useParams, Link } from "wouter";
import { useStory } from "@/hooks/use-stories";
import { format } from "date-fns";
import { BiasBadge } from "@/components/ui/BiasBadge";
import { ArrowLeft, ExternalLink, Loader2, Info } from "lucide-react";

export default function StoryPage() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  
  const { data: story, isLoading, isError } = useStory(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <h2 className="font-serif text-3xl mb-4">Story not found</h2>
        <Link href="/feed" className="text-primary hover:underline">Return to feed</Link>
      </div>
    );
  }

  const publishedDate = story.publishedAt ? new Date(story.publishedAt) : new Date(story.createdAt);

  return (
    <article className="min-h-screen bg-background pb-32">
      {/* Top Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link href="/feed" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Feed
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-foreground text-background text-xs font-bold uppercase tracking-widest">
              {story.topic}
            </span>
            <time className="text-sm text-muted-foreground font-medium">
              {format(publishedDate, "MMMM d, yyyy")}
            </time>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-8">
            {story.headline}
          </h1>
        </header>

        {/* The Neutral Summary */}
        <section className="prose prose-lg prose-slate max-w-none mb-16">
          <p className="drop-cap text-xl leading-relaxed text-foreground">
            {story.summary}
          </p>
        </section>

        <div className="editorial-divider"></div>

        {/* Key Facts & Divergence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
          {/* Key Facts */}
          {story.keyFacts && story.keyFacts.length > 0 && (
            <section className="bg-card p-8 border border-border">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center border-b border-border/50 pb-4">
                Established Facts
              </h3>
              <ul className="space-y-4">
                {story.keyFacts.map((fact, index) => (
                  <li key={index} className="flex gap-3 text-sm text-foreground leading-relaxed">
                    <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-foreground flex-shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Divergence */}
          {story.divergenceSummary && (
            <section className="bg-muted/30 p-8 border border-border">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center border-b border-border/50 pb-4">
                Narrative Divergence
              </h3>
              <p className="text-sm text-foreground leading-relaxed">
                {story.divergenceSummary}
              </p>
            </section>
          )}
        </div>

        <div className="editorial-divider"></div>

        {/* Source Analysis */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-3xl font-bold text-foreground">Source Coverage</h3>
            <div className="flex items-center text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
              <Info className="w-3 h-3 mr-1.5" />
              Snippets extracted directly from source
            </div>
          </div>

          <div className="space-y-6">
            {story.storyArticles?.map((sa) => (
              <div key={sa.id} className="bg-card border border-border p-6 transition-all hover:border-foreground/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {sa.article.source.logoUrl ? (
                      <img src={sa.article.source.logoUrl} alt={sa.article.source.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <div className="w-6 h-6 bg-muted flex items-center justify-center font-serif text-xs font-bold text-foreground">
                        {sa.article.source.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-serif font-bold text-lg">{sa.article.source.name}</span>
                    <BiasBadge bias={sa.article.source.biasRating} />
                  </div>
                  <a 
                    href={sa.article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                  >
                    Read Original <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                
                <div className="pl-0 sm:pl-9">
                  <h4 className="font-sans font-semibold text-foreground mb-2 line-clamp-1">
                    {sa.article.title}
                  </h4>
                  {sa.sourceSnippet && (
                    <blockquote className="border-l-2 border-border pl-4 text-sm text-muted-foreground italic leading-relaxed">
                      "{sa.sourceSnippet}"
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
