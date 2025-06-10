"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, LogOut, LogIn } from "lucide-react";
import { SignOutButton, SignInButton, useUser } from "@clerk/nextjs";
import Account from "@/components/settings/Account";

export default function SettingsPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            <Settings className="inline-block w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>

            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>

            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>

            {isSignedIn ? (
              <SignOutButton redirectUrl="/">
                <TabsTrigger
                  value="logout"
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </TabsTrigger>
              </SignOutButton>
            ) : (
              <SignInButton>
                <TabsTrigger
                  value="login"
                  className="flex items-center gap-2 text-green-600"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </TabsTrigger>
              </SignInButton>
            )}
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your profile details and email settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Account />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive and how.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <p>Email alerts for code reviews</p>
                <p>Push notifications for interview feedback</p>
                <p>Weekly summary email of activity</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your data sharing and visibility preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <p>Choose who can view your profile</p>
                <p>Opt-out of usage tracking</p>
                <p>Manage third-party integrations</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
