import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { message } = await request.json();
  const resultIds = await inngest.send({
    name: "AiCareerChat",
    data: { message },
  });
  if (resultIds.length === 0) {
    return new Response("No results found", { status: 404 });
  }
  const runId = resultIds?.ids[0];
  let runStatus;
  while (true) {
    runStatus = await getRuns(runId);
    // console.log("Run Status:", runStatus?.data[0]?.status);
    if (runStatus?.data[0]?.status === "Completed") {
      break;
    } else if (runStatus.status === "failed") {
      return new Response("Run failed", { status: 500 });
    }
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 1 second before checking again
  }
  return NextResponse.json(runStatus.data?.[0].output?.output[0]);
}

export async function getRuns(runId) {
  const result = await axios.get(
    `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,
    {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    }
  );
  if (result.status !== 200) {
    throw new Error("Failed to fetch runs");
  }
  return result.data;
}
