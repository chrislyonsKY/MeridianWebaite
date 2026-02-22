import { useState } from "react";
import { useStories } from "@/hooks/use-stories";
import { StoryCard } from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const TOPICS = ["All", "Politics", "World", "Technology", "Business", "Science"];

export default function FeedPage() {
  const [activeTopic, setActiveTopic] = useState("All");
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError } = useStories({
    topic: activeTopic === "All" ? undefined : activeTopic.toLowerCase(),
    page,
    limit: 12
  });

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
            The Feed
          </h1>
          
          <div className="flex flex-wrap gap-2 border-b border-border/50 pb-4">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setActiveTopic(topic);
                  setPage(1); // Reset page on topic change
                }}
                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeTopic === topic
                    ? "bg-foreground text-background"
                    : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="text-center py-32 border border-border bg-card">
            <h3 className="font-serif text-2xl text-foreground mb-2">Unable to load stories</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        ) : data?.stories.length === 0 ? (
          <div className="text-center py-32 border border-border bg-card">
            <h3 className="font-serif text-2xl text-foreground mb-2">No stories found</h3>
            <p className="text-muted-foreground">Check back later for updates on {activeTopic}.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {data?.stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>

            {/* Pagination Controls */}
            {data && data.totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4 border-t border-border/50 pt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-none font-serif"
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground font-medium">
                  Page {data.currentPage} of {data.totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                  disabled={page === data.totalPages}
                  className="rounded-none font-serif"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
