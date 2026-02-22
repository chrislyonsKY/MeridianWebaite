import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import type { StoryResponse } from "@shared/routes";
import { BiasBadge } from "./ui/BiasBadge";
import { ArrowRight, Clock } from "lucide-react";

interface StoryCardProps {
  story: StoryResponse;
}

export function StoryCard({ story }: StoryCardProps) {
  // Extract unique sources to display at the bottom of the card
  const uniqueSources = Array.from(
    new Map(
      story.storyArticles?.map((sa) => [sa.article.source.id, sa.article.source])
    ).values()
  );

  const publishedDate = story.publishedAt ? new Date(story.publishedAt) : new Date(story.createdAt);

  return (
    <div className="group flex flex-col justify-between bg-card border border-border/60 hover:border-foreground/30 transition-all duration-300 overflow-hidden">
      <Link href={`/story/${story.id}`} className="flex flex-col flex-grow p-6 sm:p-8 cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {story.topic}
          </span>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {formatDistanceToNow(publishedDate, { addSuffix: true })}
          </div>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-foreground mb-4 group-hover:text-primary/80 transition-colors line-clamp-3">
          {story.headline}
        </h2>

        <p className="font-sans text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
          {story.summary}
        </p>

        <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Sources Analyzed
            </span>
            <div className="flex flex-wrap gap-2 items-center">
              {uniqueSources.slice(0, 4).map((source) => (
                <div key={source.id} className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-foreground">{source.name}</span>
                  <BiasBadge bias={source.biasRating} showLabel={false} />
                </div>
              ))}
              {uniqueSources.length > 4 && (
                <span className="text-xs text-muted-foreground">+{uniqueSources.length - 4} more</span>
              )}
            </div>
          </div>
          
          <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
}
