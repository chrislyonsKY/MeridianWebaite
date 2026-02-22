import { Link } from "wouter";
import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="h-6 w-6 text-foreground" />
              <span className="font-serif font-bold text-xl tracking-tight text-foreground">
                The Meridian
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              We aggregate the world's news, identify the key facts, and neutralize the narrative. 
              Read the news without the noise.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4 tracking-wide">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/feed" className="hover:text-foreground transition-colors">The Feed</Link></li>
              <li><Link href="/methodology" className="hover:text-foreground transition-colors">Methodology</Link></li>
              <li><Link href="/sources" className="hover:text-foreground transition-colors">Sources index</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4 tracking-wide">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} The Meridian. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Objective reality is out there.</p>
        </div>
      </div>
    </footer>
  );
}
