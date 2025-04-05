"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AskQuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const tagArray = tags.split(",").map((tag) => tag.trim());

    const { error } = await supabase.from("questions").insert({
      title,
      description,
      tags: tagArray,
      answers: 0,
    });

    if (error) {
      setMessage("❌ Failed to submit question.");
      console.error(error);
    } else {
      setMessage("✅ Question submitted!");
      setTitle("");
      setDescription("");
      setTags("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Ask a Farming Question</h2>

      <div className="mb-4">
        <label className="block text-black font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-xl text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-black font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded-xl text-black"
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-black font-medium mb-1">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border p-2 rounded-xl text-black"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Question"}
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </form>
  );
}
