import ImageKit from "imagekit";
import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import aiResumeAnalyzerAction from "@/app/server/actions/aiResumeAnalyzer.action";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const AiCareerChatAgent = createAgent({
  name: "AiCareerChatAgent",
  description:
    "AI Career Chat Agent to assist users with career-related questions in the AI field.",
  system: `You are an AI career expert.
    You will assist users with career-related questions in the any field.
    Your goal is to provide helpful and informative answers to users. always respond in a friendly and professional manner.
    If you don't know the answer, say "I don't know" and suggest the user to search online.`,
  model: gemini({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
  }),
});

export const AiCareerChat = inngest.createFunction(
  { id: "AiCareerChat" },
  { event: "AiCareerChat" },
  async ({ event, step }) => {
    const { message } = event.data;
    const result = await AiCareerChatAgent.run(message);
    return result;
  }
);

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const AiResumeAnalyze = inngest.createFunction(
  { id: "AiResumeAnalyze" },
  { event: "AiResumeAnalyze" },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, userId } = event.data;

    // Step 1: Upload the PDF to ImageKit
    const imagekitUrl = await step.run("uploadImage", async () => {
      const res = await imagekit.upload({
        file: base64ResumeFile,
        fileName: `${recordId}-resume.pdf`,
        isPublished: true,
      });
      return res.url;
    });

    // Step 2: Run AI analysis on extracted PDF text
    const aiResumeReport = await AiResumeAnalyzeAgent.run(pdfText);
    const rawContent = aiResumeReport.output[0].content;
    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const aiResumeReportJson = JSON.parse(rawContentJson);

    // Step 3: Save to database
    await step.run("dbsave", async () => {
      const res = await aiResumeAnalyzerAction(userId, recordId, {
        content: aiResumeReportJson,
        resumeUrl: imagekitUrl,
      });
      console.log("dbsave", res);
    });

    // Step 4: Return the JSON report
    return aiResumeReportJson;
  }
);

export const AiResumeAnalyzeAgent = createAgent({
  name: "AiResumeAnalyzeAgent",
  description: "AI Resume Analyze Agent to analyze resumes.",
  system: `You are an advanced AI Resume Analyzer Agent.
Your task is to evaluate a candidate’s resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.

📥 INPUT: I will provide a plain text resume.
🎯 GOAL: Output a JSON report as per the schema below. The report should reflect:

overall_score (0–100)

overall_feedback (short message e.g., "Excellent", "Needs improvement")

summary_comment (1–2 sentence evaluation summary)

Section scores for:

Contact Info

Experience

Education

Skills

Each section should include:

score (as percentage)

Optional comment about that section

Tips for improvement (3–5 tips)
What’s Good (1–3 strengths)
Needs Improvement (1–3 weaknesses)

📤 Output JSON Schema:

json
Copy
Edit
{
  "overall_score": 85,
  "overall_feedback": "Excellent.",
  "summary_comment": "Your resume is strong, but there are areas to refine.",
  "sections": {
    "contact_info": {
      "score": 95,
      "comment": "Perfectly structured and complete."
    },
    "experience": {
      "score": 88,
      "comment": "Strong bullet points and impact."
    },
    "education": {
      "score": 70,
      "comment": "Consider adding relevant coursework."
    },
    "skills": {
      "score": 60,
      "comment": "Expand on specific skill proficiencies."
    }
  },
  "tips_for_improvement": [
    "Add more numbers and metrics to your experience section to show impact.",
    "Integrate more industry-specific keywords relevant to your target job.",
    "Start bullet points with strong action verbs to make your achievements stand out."
  ],
  "whats_good": [
    "Clean and professional formatting.",
    "Clear and concise contact information.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Skills section lacks detail.",
    "Some experience bullet points could be stronger.",
    "Missing a professional summary/objective."
  ]
}`,
  model: gemini({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
  }),
});
