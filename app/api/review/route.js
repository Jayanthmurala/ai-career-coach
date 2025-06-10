// import { generateContent } from "@/service/ai.api";
// import { NextResponse } from "next/server";
// export async function POST(request) {
//   try {
//     const { code } = await request.json();
//     console.log("Received code for review:", code);

//     // Simulate a code review process
//     const review = await generateContent(code);
//     console.log("Generated review:", review);
//     return NextResponse.json({ review });
//   } catch (error) {
//     console.error("Error during code review:", error);
//     return NextResponse.json(
//       { error: "Failed to review code." },
//       { status: 500 }
//     );
//   }
// }
import { generateContent } from "@/service/ai.api";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // or similar unique ID generator

export async function POST(request) {
  const requestId = uuidv4();
  try {
    const { code } = await request.json();

    // Input validation
    if (!code || typeof code !== "string" || code.length > 10000) {
      // Example limit
      console.error(`[${requestId}] Invalid code input:`, code);
      return NextResponse.json(
        {
          error:
            "Invalid code provided. Please provide a string with a maximum length of 10000 characters.",
        },
        { status: 400 }
      );
    }

    const review = await generateContent(code);
    return NextResponse.json(
      { requestId, timestamp: Date.now(), review },
      { status: 200 }
    );
  } catch (error) {
    console.error(`[${requestId}] Error during code review:`, error);
    // Consider more sophisticated error handling, perhaps classifying errors
    return NextResponse.json(
      {
        requestId,
        error: "Failed to review code. Please try again later.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
