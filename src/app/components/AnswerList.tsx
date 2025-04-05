"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  questionId: string;
}

export default function AnswerList({ questionId }: Props) {
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .eq("question_id", questionId)
        .order("created_at", { ascending: false });

      if (!error) setAnswers(data);
    };

    fetchAnswers();
  }, [questionId]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Answers</h2>
      {answers.length === 0 ? (
        <p>No answers yet. Be the first!</p>
      ) : (
        answers.map((a) => (
          <div key={a.id} className="mb-3 p-3 border rounded bg-white">
            <p className="text-gray-800">{a.answer}</p>
            <p className="text-sm text-gray-500 mt-1">— {a.user_name}</p>
          </div>
        ))
      )}
    </div>
  );
}
