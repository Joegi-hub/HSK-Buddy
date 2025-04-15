"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Eye, RefreshCcw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
];

interface WordPracticeProps { }

const WordPractice: React.FC<WordPracticeProps> = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const { toast } = useToast();

  const currentWord = DUMMY_WORDS[currentWordIndex];

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex === DUMMY_WORDS.length - 1 ? 0 : prevIndex + 1
    );
    setShowMeaning(false);
  };

  const handlePreviousWord = () => {
    setCurrentWordIndex((prevIndex) =>
      prevIndex === 0 ? DUMMY_WORDS.length - 1 : prevIndex - 1
    );
    setShowMeaning(false);
  };

  const handleDeleteWord = () => {
    // In a real app, you'd handle deletion from your data store
    toast({
      title: "Word Deleted",
      description: `"${currentWord.hanzi}" has been deleted.`,
    });
  };

  const handleCorrectWord = () => {
    toast({
      title: "Word Corrected",
      description: `"${currentWord.hanzi}" has been marked as correct.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Word Practice</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="text-center text-4xl font-semibold">{currentWord.hanzi}</div>
        <div className="text-center text-xl">{currentWord.pinyin}</div>

        {showMeaning && (
          <div className="mt-4">
            <div className="font-bold">Meaning:</div>
            <div>{currentWord.meaning}</div>
            <div className="mt-2 font-bold">Example Sentences:</div>
            <ul>
              {currentWord.exampleSentences.map((sentence, index) => (
                <li key={index}>{sentence}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={() => setShowMeaning(!showMeaning)}>
            <Eye className="w-4 h-4 mr-2" />
            {showMeaning ? "Hide Meaning" : "See Meaning & Example"}
          </Button>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="secondary" onClick={handlePreviousWord}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button variant="secondary" onClick={handleNextWord}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="flex justify-between mt-4">
          <Button onClick={handleCorrectWord}>Correct</Button>
          <Button variant="destructive" onClick={handleDeleteWord}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WordPractice;
