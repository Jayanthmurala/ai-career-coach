import React from "react";
import { Rocket, CalendarClock } from "lucide-react";

const Interview = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center space-y-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <Rocket className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-bounce" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Interview Lab 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          We're working hard to bring you the best AI-powered interview
          experience.
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-1">
          <CalendarClock className="w-4 h-4" /> Coming Soon!
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 cursor-pointer">
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default Interview;
