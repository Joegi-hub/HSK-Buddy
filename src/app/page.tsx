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
      <h1 className="text-3xl font-bold mb-6">HSK 버디</h1>
      <Tabs defaultValue="wordInput">
        <TabsList className="mb-4">
          <TabsTrigger value="wordInput">단어 입력</TabsTrigger>
          <TabsTrigger value="wordPractice">단어 연습</TabsTrigger>
          <TabsTrigger value="writingPractice">작문 연습</TabsTrigger>
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
