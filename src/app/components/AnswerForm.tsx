"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";

interface Props {
  questionId: string;
}

export default function AnswerForm({ questionId }: Props) {
  const [answer, setAnswer] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    setUser(name);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to answer.");
      return;
    }

    const { error } = await supabase.from("answers").insert([
      {
        question_id: questionId,
        answer,
        user_name: userName,
      },
    ]);

    if (error) {
      console.error("Error submitting answer:", error);
    } else {
      setAnswer("");
      window.location.reload();
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        className="w-full p-2 border rounded text-black"
        rows={3}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer..."
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Answer
      </button>
    </form>
  );
}
