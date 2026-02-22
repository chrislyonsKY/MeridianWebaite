import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import LandingPage from "@/pages/LandingPage";
import FeedPage from "@/pages/FeedPage";
import StoryPage from "@/pages/StoryPage";
import MethodologyPage from "@/pages/MethodologyPage";
import AdminPage from "@/pages/AdminPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/feed" component={FeedPage} />
      <Route path="/story/:id" component={StoryPage} />
      <Route path="/methodology" component={MethodologyPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
