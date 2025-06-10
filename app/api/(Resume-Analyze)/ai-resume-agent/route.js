import { inngest } from "@/inngest/client";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import axios from "axios";
import { NextResponse } from "next/server";

// This will handle only POST requests
export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const recordId = formData.get("recordId");
    const userId = formData.get("userId");
    if (!file || !recordId) {
      return new NextResponse("Missing file or recordId", { status: 400 });
    }

    const loader = new WebPDFLoader(file);
    const data = await loader.load();
    const textContent = data[0]?.pageContent || "";

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const resultIds = await inngest.send({
      name: "AiResumeAnalyze",
      data: {
        recordId,
        base64ResumeFile: base64,
        pdfText: textContent,
        userId,
      },
    });

    if (!resultIds?.ids?.length) {
      return new NextResponse("Failed to trigger Inngest workflow", {
        status: 500,
      });
    }

    const runId = resultIds.ids[0];
    let runStatus;

    while (true) {
      runStatus = await getRuns(runId);

      const currentStatus = runStatus?.data?.[0]?.status;
      if (currentStatus === "Completed") break;
      if (currentStatus === "Failed") {
        return new NextResponse("Run failed", { status: 500 });
      }

      // Wait 500ms before checking again (avoid spamming the API)
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    const output = runStatus?.data?.[0]?.output?.output?.[0];

    return NextResponse.json({ output });
    return;
  } catch (err) {
    console.error("Error processing resume:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function getRuns(runId) {
  const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;

  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  });

  if (result.status !== 200) {
    throw new Error("Failed to fetch run status");
  }

  return result.data;
}
