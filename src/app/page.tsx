"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { QuestionCard } from "@/components/QuestionCard";
import AskQuestionForm from "@/components/AskQuestionForm";
import Link from "next/link";

type Question = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  answers: number;
  created_at: string;
};

export default function Header() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("user_name");
    setUser(name);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching:", error);
      else setQuestions(data);
    };

    fetchQuestions();
  }, []);

  return (
  <>
    <header className="flex justify-between items-center p-4 bg-green-100">
      <h1 className="text-xl text-black font-bold">🌾 Farming Q&A</h1>
      {user ? (
        <div className="flex text-black gap-4 items-center">
          <span>Hello, {user}</span>
          <button onClick={logout} className="text-red-600 hover:underline">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="text-green-600 hover:underline">
            Login
          </Link>
          <Link href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </div>
      )}
    </header>

    <main className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Recent Questions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((question) => (
          <QuestionCard
            id ={question.id}
            key={question.id}
            title={question.title}
            description={question.description}
            tags={question.tags}
            answers={question.answers}
            date={new Date(question.created_at).toLocaleDateString()}
          />
        ))}
      </div>
    </main>
    <footer className="bg-green-100 p-4 text-center">
      <div className="min-h-screen bg-black-50 p-6">
        <AskQuestionForm />
      </div>
    </footer>
  </>
  );
}
