"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

const ChatHistory = () => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/history-list", {
          params: { userId },
        });
        if (res.status === 200) {
          setHistoryList(res.data?.data?.[0]?.AiChat || []);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 border border-gray-200 shadow-sm rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">🧠 Chat History</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : historyList.length > 0 ? (
        <ul className="space-y-4">
          {historyList.map((item, index) => (
            <Link
              href={`/chat-agent/${item}`}
              key={index}
              className="block hover:bg-blue-50 transition-all rounded-lg border p-4 shadow-sm hover:shadow-md group"
            >
              <div className="flex justify-between items-center">
                <span className="text-blue-700 font-medium group-hover:underline">
                  Chat ID: {item}
                </span>
                <ArrowBigRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No chat history found.</p>
      )}
    </div>
  );
};

export default ChatHistory;
