// src/ai/flows/writing-feedback.ts
'use server';
/**
 * @fileOverview An AI agent for providing feedback on Chinese writing practice using HSK words.
 *
 * - getWritingFeedback - A function that handles the process of providing writing feedback.
 * - WritingFeedbackInput - The input type for the getWritingFeedback function.
 * - WritingFeedbackOutput - The return type for the getWritingFeedback function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const WritingFeedbackInputSchema = z.object({
  writingSample: z.string().describe('The Chinese writing sample to provide feedback on.'),
  hskWords: z
    .array(z.string())
    .describe('The list of HSK words that the writing sample should be based on.'),
});
export type WritingFeedbackInput = z.infer<typeof WritingFeedbackInputSchema>;

const WritingFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The AI-generated feedback on the writing sample.'),
});
export type WritingFeedbackOutput = z.infer<typeof WritingFeedbackOutputSchema>;

export async function getWritingFeedback(input: WritingFeedbackInput): Promise<WritingFeedbackOutput> {
  return writingFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'writingFeedbackPrompt',
  input: {
    schema: z.object({
      writingSample: z.string().describe('The Chinese writing sample to provide feedback on.'),
      hskWords: z
        .array(z.string())
        .describe('The list of HSK words that the writing sample should be based on.'),
    }),
  },
  output: {
    schema: z.object({
      feedback: z.string().describe('The AI-generated feedback on the writing sample.'),
    }),
  },
  prompt: `You are an AI writing tutor specializing in providing feedback on Chinese writing, especially for learners studying HSK.

  Provide detailed feedback on the following writing sample, focusing on grammar, vocabulary usage (especially the use of the provided HSK words), sentence structure, and overall coherence. Point out areas for improvement and suggest alternative ways to express ideas more clearly and accurately.

  Writing Sample: {{{writingSample}}}
  HSK Words: {{#each hskWords}}{{{this}}} {{/each}}

  Ensure that the feedback is constructive and helpful for language learners.
  Please provide feedback in the form of a string.
  `,
});

const writingFeedbackFlow = ai.defineFlow<
  typeof WritingFeedbackInputSchema,
  typeof WritingFeedbackOutputSchema
>({
  name: 'writingFeedbackFlow',
  inputSchema: WritingFeedbackInputSchema,
  outputSchema: WritingFeedbackOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
