
"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WordInputForm from "@/components/WordInputForm";
import WordPractice from "@/components/WordPractice";
import WritingPractice from "@/components/WritingPractice";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">HSK Buddy</h1>
      <Tabs defaultvalue="wordInput">
        <TabsList className="mb-4">
          <TabsTrigger value="wordInput">Word Input</TabsTrigger>
          <TabsTrigger value="wordPractice">Word Practice</TabsTrigger>
          <TabsTrigger value="writingPractice">Writing Practice</TabsTrigger>
        </TabsList>
        <TabsContent value="wordInput">
          <WordInputForm />
        </TabsContent>
        <TabsContent value="wordPractice">
          <WordPractice />
        </TabsContent>
        <TabsContent value="writingPractice">
          <WritingPractice />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}
