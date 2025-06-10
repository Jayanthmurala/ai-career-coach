// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function CodeReviewPage() {
  const { isSignedIn } = useUser();
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  if (!isSignedIn)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            🔒 Sign in to Review Code
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Please sign in to use the AI code review feature. It's quick and
            secure.
          </p>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );

  const handleReview = async () => {
    setLoading(true);
    setReview("");
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      const output =
        typeof data.review === "string"
          ? data.review
          : data.review?.text ?? "❌ Unexpected response";
      setReview(output);
    } catch (error) {
      setReview("❌ Something went wrong while reviewing your code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Code Input */}
      <div className="w-full md:w-1/2 p-6 space-y-4">
        <h1 className="text-2xl font-bold">✍️ Paste your code</h1>
        <Textarea
          placeholder="Enter your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[300px] font-mono text-sm bg-white dark:bg-gray-800"
        />
        <Button
          onClick={handleReview}
          disabled={loading}
          className="w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Reviewing...
            </>
          ) : (
            "🔍 Review Code"
          )}
        </Button>
      </div>

      {/* Review Output */}
      <div className="w-full md:w-1/2 p-6 bg-white dark:bg-gray-950">
        <h2 className="text-2xl font-bold mb-4">✅ AI Review Output</h2>
        <Card className="h-full max-h-[80vh] overflow-y-auto prose dark:prose-invert p-4">
          <CardContent>
            {review ? (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {review}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-500">The AI review will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
