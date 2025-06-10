"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";
import { v4 as uuid } from "uuid";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmptyState from "../_components/EmptyState";

import { History, Plus, Save, Send } from "lucide-react";
import aichatAction from "@/app/server/actions/aichat.action";

const AiChat = () => {
  const { isSignedIn, user } = useUser();
  const { chatId } = useParams();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const userId = user?.id;

  const handleNewChat = () => {
    setMessage("");
    setMessageList([]);
    const newChatId = uuid();
    router.push(`/chat-agent/${newChatId}`);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setMessageList((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await axios.post("/api/ai-chat-agent", { message });
      if (res.status === 200) {
        setMessage("");
        setMessageList((prev) => [...prev, res.data]);
      } else {
        console.error("Send Error:", res.statusText);
      }
    } catch (err) {
      console.error("Send Error:", err);
    }

    setLoading(false);
  };

  const handleSaveMessages = async () => {
    if (!messageList.length) return;

    try {
      const res = await aichatAction({ userId, chatId, content: messageList });
      console.log("Messages saved:", res?.data);
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get("/api/chat-history", {
        params: { chatId, userId },
      });
      if (res.status === 200) {
        setMessageList(res.data.data || []);
      }
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    if (chatId && userId) {
      fetchChatHistory();
    }
  }, [chatId, userId]);

  const navigateToHistory = () => {
    router.push(`/chat-agent/chat-history/${userId}`);
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            🔒 Sign in to Career Chat
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Please sign in to use the AI Chat feature.
          </p>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 lg:px-40 xl:px-60 2xl:px-80 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">AI Career Chat</h2>
          <p className="text-sm text-muted-foreground">
            Talk to an AI career expert
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={navigateToHistory}
            className="flex items-center gap-1"
          >
            <History className="h-4 w-4" /> History
          </Button>
          <Button onClick={handleNewChat} className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>
      </div>

      <div className="flex flex-col h-[70vh] p-4 rounded-lg shadow border overflow-y-auto bg-white dark:bg-gray-800">
        {!message && messageList.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState selectedQuestion={(q) => setMessage(q)} />
          </div>
        ) : (
          <div className="flex-1 space-y-4">
            {messageList.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-lg p-3 rounded-md ${
                  msg.role === "user"
                    ? "bg-blue-100 dark:bg-blue-900 ml-auto text-right"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {loading && idx === messageList.length - 1 ? (
                  <div className="animate-pulse">Typing...</div>
                ) : (
                  <ReactMarkdown className="prose dark:prose-invert">
                    {msg.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-1"
          >
            <Send className="h-4 w-4" /> Send
          </Button>
          {messageList.length > 0 && (
            <Button
              onClick={handleSaveMessages}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" /> Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChat;
