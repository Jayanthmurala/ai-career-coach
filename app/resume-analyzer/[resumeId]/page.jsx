"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ResumeAnalysis from "./components/ResumeAnalysis";

import { useUser, SignInButton } from "@clerk/nextjs";

const ResumeAnalyzerPage = () => {
  const [feedback, setFeedback] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSignedIn } = useUser();

  const { resumeId } = useParams();
  const { user } = useUser();
  const userId = user?.id;

  if (!isSignedIn)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            🔒 Sign in to Resume Analyzer
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Please sign in to use the AI resume analyzer feature. It's quick and
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

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!resumeId || !userId) return;

      try {
        const res = await axios.get(
          `/api/ai-resume-agent/feedback?recordId=${resumeId}&userId=${userId}`
        );

        const data = res?.data?.data?.[0];

        if (data) {
          setResumeUrl(data.resumeUrl || "");
          setFeedback(data.content || {});
        } else {
          setError("No feedback found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load resume analysis.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [resumeId, userId]);

  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 p-4">
      <div className="col-span-2 bg-white rounded-xl shadow p-4 overflow-y-auto max-h-screen">
        {loading ? (
          <div className="text-gray-600 text-center mt-20">
            Analyzing Resume...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-20">{error}</div>
        ) : (
          <ResumeAnalysis data={feedback} />
        )}
      </div>

      <div className="col-span-3">
        {resumeUrl ? (
          <iframe
            className="w-full h-screen rounded-xl border shadow"
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            title="Resume Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="text-center text-gray-500 mt-20">
            No Resume Preview Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzerPage;
