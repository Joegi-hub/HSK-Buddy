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
        title: "오류",
        description: "한자, 병음, 뜻은 필수 입력 항목입니다.",
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
      title: "성공",
      description: `"${hanzi}" 단어가 성공적으로 추가되었습니다!`,
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
        <CardTitle>새 HSK 단어 입력</CardTitle>
        <CardDescription>한자, 병음, 뜻, 예시 문장을 입력하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="hanzi" className="block text-sm font-medium leading-6 text-gray-900">
              한자
            </label>
            <div className="mt-2">
              <Input
                type="text"
                id="hanzi"
                value={hanzi}
                onChange={(e) => setHanzi(e.target.value)}
                placeholder="한자 입력"
                required
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="pinyin" className="block text-sm font-medium leading-6 text-gray-900">
              병음
            </label>
            <div className="mt-2">
              <Input
                type="text"
                id="pinyin"
                value={pinyin}
                onChange={(e) => setPinyin(e.target.value)}
                placeholder="병음 입력"
                required
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="meaning" className="block text-sm font-medium leading-6 text-gray-900">
              의미
            </label>
            <div className="mt-2">
              <Textarea
                id="meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="의미 입력"
                required
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              예시 문장
            </label>
            {exampleSentences.map((sentence, index) => (
              <div key={index} className="mt-2 flex gap-2">
                <Input
                  type="text"
                  value={sentence}
                  onChange={(e) => handleExampleSentenceChange(index, e.target.value)}
                  placeholder={`예시 문장 ${index + 1}`}
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
              예시 문장 추가
            </Button>
          </div>
          <Button type="submit">제출</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WordInputForm;
