"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Trash2 } from "lucide-react";

interface WordInputFormProps { }

interface HSKWord {
  hanzi: string;
  pinyin: string;
  meaning: string;
  exampleSentences: string[];
}

const WordInputForm: React.FC<WordInputFormProps> = () => {
  const [hanzi, setHanzi] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [meaning, setMeaning] = useState("");
  const [exampleSentences, setExampleSentences] = useState([""]);
  const { toast } = useToast();

  const handleAddExampleSentence = () => {
    setExampleSentences([...exampleSentences, ""]);
  };

  const handleExampleSentenceChange = (
    index: number,
    newValue: string
  ) => {
    const updatedSentences = [...exampleSentences];
    updatedSentences[index] = newValue;
    setExampleSentences(updatedSentences);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!hanzi || !pinyin || !meaning) {
      toast({
        title: "Error",
        description: "Hanzi, Pinyin, and meaning are required.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    const newWord: HSKWord = {
      hanzi,
      pinyin,
      meaning,
      exampleSentences,
    };

    console.log("Form submitted with data:", newWord);

    toast({
      title: "Success",
      description: `Word "${hanzi}" added successfully!`,
    });

    // Clear the form
    setHanzi("");
    setPinyin("");
    setMeaning("");
    setExampleSentences([""]);
  };

  const handleRemoveExampleSentence = (index: number) => {
    const updatedSentences = [...exampleSentences];
    updatedSentences.splice(index, 1);
    setExampleSentences(updatedSentences);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter New HSK Word</CardTitle>
        <CardDescription>Input the Hanzi, Pinyin, meaning, and example sentences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="hanzi" className="block text-sm font-medium leading-6 text-gray-900">
              Hanzi
            </label>
            <div className="mt-2">
              <Input
                type="text"
                id="hanzi"
                value={hanzi}
                onChange={(e) => setHanzi(e.target.value)}
                placeholder="Enter Hanzi"
                required
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="pinyin" className="block text-sm font-medium leading-6 text-gray-900">
              Pinyin
            </label>
            <div className="mt-2">
              <Input
                type="text"
                id="pinyin"
                value={pinyin}
                onChange={(e) => setPinyin(e.target.value)}
                placeholder="Enter Pinyin"
                required
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="meaning" className="block text-sm font-medium leading-6 text-gray-900">
              Meaning
            </label>
            <div className="mt-2">
              <Textarea
                id="meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="Enter Meaning"
                required
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Example Sentences
            </label>
            {exampleSentences.map((sentence, index) => (
              <div key={index} className="mt-2 flex gap-2">
                <Input
                  type="text"
                  value={sentence}
                  onChange={(e) => handleExampleSentenceChange(index, e.target.value)}
                  placeholder={`Example Sentence ${index + 1}`}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveExampleSentence(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={handleAddExampleSentence} className="mt-2">
              Add Example Sentence
            </Button>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WordInputForm;
