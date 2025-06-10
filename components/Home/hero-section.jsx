"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import ResumeUpload from "./ResumeUpload";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function HeroSection() {
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    setId(uuidv4());
  }, []);

  return (
    <section className="py-20 px-4 text-center space-y-16 overflow-hidden">
      {/* Headline */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
          Master Your Career with AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-100">
          Practice interviews, get real-time feedback, and build the perfect
          resume with our AI-powered platform.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 animate-fade-in animation-delay-200">
        <Button
          size="lg"
          asChild
          className="transition-all hover:scale-105 hover:shadow-lg"
        >
          <Link href="/interview-lab">Start Practicing Now</Link>
        </Button>
        {isSignedIn ? (
          <Button
            size="lg"
            variant="outline"
            onClick={() => setOpen(true)}
            className="transition-all hover:scale-105 hover:shadow-lg"
          >
            Build Your Resume
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button
              size="lg"
              variant="outline"
              className="transition-all hover:scale-105 hover:shadow-lg"
            >
              Build Your Resume
            </Button>
          </SignInButton>
        )}

        <Button
          size="lg"
          variant="outline"
          asChild
          className="transition-all hover:scale-105 hover:shadow-lg"
        >
          <Link href="/code-review">Code Review</Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          asChild
          className="transition-all hover:scale-105 hover:shadow-lg"
        >
          <Link href={`/chat-agent/${id}`}>Chat with AI</Link>
        </Button>
      </div>

      {/* Demo Placeholder */}
      <div className="relative h-64 md:h-96 mt-12 rounded-xl overflow-hidden shadow-xl animate-fade-in animation-delay-300 bg-muted">
        <img
          src="/banner.png"
          alt="Demo Placeholder"
          className="object-cover"
        />
      </div>

      {/* Stats Section */}
      <div className="max-w-2xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center animate-fade-in animation-delay-400">
        <div className="space-y-1">
          <h3 className="text-3xl font-bold text-primary">98%</h3>
          <p className="text-sm text-muted-foreground">Interview Confidence</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold text-primary">1000+</h3>
          <p className="text-sm text-muted-foreground">Practice Questions</p>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold text-primary">78%</h3>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>
      </div>

      {/* Resume Upload Modal */}
      <ResumeUpload open={open} setOpen={setOpen} />
    </section>
  );
}
