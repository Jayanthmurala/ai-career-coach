import { Brain, FileCheck, PieChart, Mic, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "AI Voice Interviews",
    description:
      "Practice with realistic interview scenarios using our advanced AI voice agents tailored to your industry and role.",
  },
  {
    icon: Brain,
    title: "Personalized Feedback",
    description:
      "Receive detailed feedback on your responses, including clarity, relevance, and confidence scores with actionable tips.",
  },
  {
    icon: FileCheck,
    title: "Smart resume Builder",
    description:
      "Create tailored resumes that highlight your strengths with AI-powered suggestions and optimizations.",
  },
  {
    icon: PieChart,
    title: "Progress Tracking",
    description:
      "Monitor your improvement over time with detailed analytics and performance metrics.",
  },
  {
    icon: Shield,
    title: "Industry Standards",
    description:
      "Questions and feedback aligned with current industry standards and expectations for your specific role.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get immediate feedback after each interview session with comprehensive analysis and improvement suggestions.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform offers everything you need to prepare for interviews and
          create impressive resumes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 transition-all duration-300 hover:shadow-md bg-card"
          >
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
