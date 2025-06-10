import React from "react";
import { UserCircle, FileText, BarChart } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome to Your Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <UserCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Profile
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage your personal info and settings.
            </p>
          </div>

          {/* Resume Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <FileText className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Resume Workspace
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create, update, and analyze your resumes.
            </p>
          </div>

          {/* Insights Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md transition">
            <BarChart className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Progress & Insights
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Track your interview and resume performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
