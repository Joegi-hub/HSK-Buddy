// src/ai/flows/writing-feedback.ts
'use server';
/**
 * @fileOverview HSK 단어를 사용한 중국어 작문 연습에 대한 피드백을 제공하는 AI 에이전트입니다.
 *
 * - getWritingFeedback - 작문 피드백 제공 프로세스를 처리하는 함수입니다.
 * - WritingFeedbackInput - getWritingFeedback 함수의 입력 타입입니다.
 * - WritingFeedbackOutput - getWritingFeedback 함수의 반환 타입입니다.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const WritingFeedbackInputSchema = z.object({
  writingSample: z.string().describe('피드백을 제공할 중국어 작문 샘플입니다.'),
  hskWords: z
    .array(z.string())
    .describe('작문 샘플이 기반해야 하는 HSK 단어 목록입니다.'),
});
export type WritingFeedbackInput = z.infer<typeof WritingFeedbackInputSchema>;

const WritingFeedbackOutputSchema = z.object({
  feedback: z.string().describe('작문 샘플에 대한 AI 생성 피드백입니다.'),
});
export type WritingFeedbackOutput = z.infer<typeof WritingFeedbackOutputSchema>;

export async function getWritingFeedback(input: WritingFeedbackInput): Promise<WritingFeedbackOutput> {
  return writingFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'writingFeedbackPrompt',
  input: {
    schema: z.object({
      writingSample: z.string().describe('피드백을 제공할 중국어 작문 샘플입니다.'),
      hskWords: z
        .array(z.string())
        .describe('작문 샘플이 기반해야 하는 HSK 단어 목록입니다.'),
    }),
  },
  output: {
    schema: z.object({
      feedback: z.string().describe('작문 샘플에 대한 AI 생성 피드백입니다.'),
    }),
  },
  prompt: `당신은 중국어 작문, 특히 HSK를 공부하는 학습자에게 피드백을 제공하는 AI 작문 튜터입니다.

  다음 작문 샘플에 대한 자세한 피드백을 제공하고, 문법, 어휘 사용 (특히 제공된 HSK 단어의 사용), 문장 구조 및 전반적인 일관성에 중점을 둡니다. 개선할 영역을 지적하고 아이디어를 더 명확하고 정확하게 표현할 수 있는 대안적인 방법을 제안합니다.

  작문 샘플: {{{writingSample}}}
  HSK 단어: {{#each hskWords}}{{{this}}} {{/each}}

  피드백이 언어 학습자에게 건설적이고 도움이 되는지 확인하세요.
  피드백을 문자열 형태로 제공해주세요.
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
