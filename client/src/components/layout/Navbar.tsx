import { Link, useLocation } from "wouter";
import { Compass, Menu, X, User as UserIcon, LogOut, Settings } from "lucide-react";
import { useState } from "react";
// Assuming the useAuth hook exists from the Replit Auth integration
import { useAuth } from "@/hooks/use-auth"; 
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: "The Feed", href: "/feed" },
    { label: "Methodology", href: "/methodology" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Compass className="h-6 w-6 text-foreground group-hover:rotate-45 transition-transform duration-500" />
              <span className="font-serif font-bold text-xl tracking-tight text-foreground">
                The Meridian
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  location.startsWith(link.href)
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth / Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    {user?.profileImageUrl ? (
                      <img 
                        src={user.profileImageUrl} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border">
                        <UserIcon className="h-4 w-4 text-foreground" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.firstName || user?.email || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = '/admin'}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Pipeline</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="font-serif tracking-wide rounded-none px-6">
                <a href="/api/login">Sign In</a>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  location.startsWith(link.href)
                    ? "bg-muted border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <a
                href="/api/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-foreground hover:bg-muted/50"
              >
                Sign In
              </a>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-destructive hover:bg-muted/50"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
