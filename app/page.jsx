"use client";

import { ArrowRight, FileText, Mic, PieChart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeroSection from "../components/home/hero-section";
import FeatureGrid from "../components/home/feature-grid";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  const cards = [
    {
      icon: <Mic className="h-5 w-5" />,
      title: "Interview Practice",
      description: "Practice with AI interviewers tailored to your industry",
      content:
        "Choose from role-specific templates and get real-time feedback on your responses. Perfect your interview skills with our AI-powered mock interviews.",
      link: isSignedIn ? "/interview-lab/new" : "/sign-in",
      cta: isSignedIn ? "Start a new interview" : "Sign in to practice",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Resume Analysis",
      description: "Get personalized feedback on your resume",
      content:
        "Receive detailed feedback on your resume, including clarity, relevance, and confidence scores. Optimize your resume with AI-powered suggestions and optimizations.",
      cta: "View resume analysis",
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "Dashboard",
      description: "Track your progress and manage your content",
      content:
        "View your interview history, track performance metrics, and manage your résumé versions all in one convenient dashboard.",
      link: "/dashboard",
      cta: "View dashboard",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className="transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {card.icon}
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{card.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <FeatureGrid />
    </div>
  );
}
