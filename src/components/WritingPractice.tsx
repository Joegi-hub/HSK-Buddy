"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCcw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getWritingFeedback, WritingFeedbackOutput } from "@/ai/flows/writing-feedback";

interface HSKWord {
  hanzi: string;
  pinyin: string;
  meaning: string;
  exampleSentences: string[];
}

const DUMMY_WORDS: HSKWord[] = [
  { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Hello", exampleSentences: ["你好世界！"] },
  { hanzi: "谢谢", pinyin: "xiè xiè", meaning: "Thanks", exampleSentences: ["谢谢你的帮助。"] },
  { hanzi: "再见", pinyin: "zài jiàn", meaning: "Goodbye", exampleSentences: ["明天再见！"] },
  { hanzi: "朋友", pinyin: "péng you", meaning: "Friend", exampleSentences: ["他是我最好的朋友。"] },
  { hanzi: "学习", pinyin: "xué xí", meaning: "Study", exampleSentences: ["我喜欢学习汉语。"] },
  { hanzi: "工作", pinyin: "gōng zuò", meaning: "Work", exampleSentences: ["我在家工作。"] },
];

interface WritingPracticeProps { }

const WritingPractice: React.FC<WritingPracticeProps> = () => {
  const [presentedWords, setPresentedWords] = useState<string[]>([]);
  const [writingSample, setWritingSample] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const { toast } = useToast();

  const generateRandomWords = () => {
    const randomWords = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * DUMMY_WORDS.length);
      randomWords.push(DUMMY_WORDS[randomIndex].hanzi);
    }
    setPresentedWords(randomWords);
  };

  const handleRefreshWords = () => {
    generateRandomWords();
  };

  const handleCopyWriting = () => {
    navigator.clipboard.writeText(writingSample);
    toast({
      title: "Copied!",
      description: "Writing sample copied to clipboard.",
    });
  };

  const handleDeleteWriting = () => {
    setWritingSample("");
    toast({
      title: "Deleted!",
      description: "Writing sample cleared.",
    });
  };

  const handleGetFeedback = async () => {
    if (!writingSample) {
      toast({
        title: "Error",
        description: "Please enter a writing sample.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result: WritingFeedbackOutput = await getWritingFeedback({
        writingSample: writingSample,
        hskWords: presentedWords,
      });
      setFeedback(result.feedback);
      toast({
        title: "Feedback Generated!",
        description: "AI feedback has been generated.",
      });
    } catch (error: any) {
      console.error("Error getting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to generate feedback.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    generateRandomWords();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Writing Practice</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold">Presented Words:</div>
            <div>{presentedWords.join(", ")}</div>
          </div>
          <Button variant="secondary" onClick={handleRefreshWords}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh Words
          </Button>
        </div>

        <div>
          <label htmlFor="writing" className="block text-sm font-medium leading-6 text-gray-900">
            Writing Practice:
          </label>
          <div className="mt-2">
            <Textarea
              id="writing"
              value={writingSample}
              onChange={(e) => setWritingSample(e.target.value)}
              placeholder="Write something using the presented words..."
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCopyWriting}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button variant="destructive" onClick={handleDeleteWriting}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
        <Button onClick={handleGetFeedback}>Get AI Feedback</Button>

        {feedback && (
          <div className="mt-4">
            <div className="font-bold">AI Feedback:</div>
            <div>{feedback}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WritingPractice;
