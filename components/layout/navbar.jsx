"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Mic,
  FileText,
  UserCircle,
  BookOpen,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { useUser, SignInButton } from "@clerk/nextjs";
import { saveUserToDB } from "@/app/server/actions/user.actions";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Interview Lab", href: "/interview-lab", icon: Mic },
  { name: "Dashboard", href: "/dashboard", icon: UserCircle },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // ← use Clerk’s hook here:
  const { isSignedIn } = useUser();
  const user = useUser();
  // console.log("isSignedIn:", isSignedIn);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const userData = async () => {
      await saveUserToDB({
        name: user.user?.fullName || "Guest",
        email: user.user?.primaryEmailAddress?.emailAddress,
        userId: user.user?.id || "guest-id",
        imageUrl: user.user?.imageUrl || "",
      });
    };
    if (isSignedIn) {
      userData();
    }
  }, [isSignedIn]);

  const renderActionButton = () => {
    if (isSignedIn) {
      return (
        <Button asChild className="hidden md:inline-flex">
          <Link href="/interview-lab/new">New Interview</Link>
        </Button>
      );
    } else {
      return (
        <SignInButton mode="modal">
          <Button className="hidden md:inline-flex cursor-pointer">
            Sign In
          </Button>
        </SignInButton>
      );
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">AI CareerCoach</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {renderActionButton()}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex flex-col h-full p-4">
            <div className="flex justify-between items-center mb-8">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-bold text-xl">InterviewMaster AI</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md text-base font-medium transition-colors",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              {isSignedIn ? (
                <Button
                  className="w-full"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/interview-lab/new">New Interview</Link>
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full">Sign In</Button>
                </SignInButton>
              )}
              <div className="flex justify-center">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
