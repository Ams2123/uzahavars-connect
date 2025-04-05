// src/app/question/[id]/page.tsx

import { supabase } from "@/lib/supabaseClient";
import AnswerForm from "@/app/components/AnswerForm";
import AnswerList from "@/app/components/AnswerList";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function QuestionPage({ params }: Props) {
  const questionId = params.id;

  const { data: question, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", questionId)
    .single();

  if (!question || error) return notFound();

  return (
    <main className="p-6 max-w-3xl bg-white mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-2">
        {question.title}
      </h1>
      <p className="text-gray-700 mb-4">{question.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Tags: {question.tags?.join(", ")}
      </p>

      <hr className="my-6" />

      <AnswerList questionId={questionId} />

      {typeof window !== "undefined" &&
      localStorage.getItem("user_name") ? (
        <AnswerForm questionId={questionId} />
      ) : (
        <p className="mt-6 text-gray-500 italic">
          Please <a href="/login" className="text-green-600 underline">log in</a> to submit an answer.
        </p>
      )}
    </main>
  );
}
