import { UUID } from "crypto";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  answers: number;
  date: string;
};

export const QuestionCard = ({id,title, description, tags, answers, date }: Props) => {
  return (
  <Link href={`/question/${id}`}>
    <div className="bg-white p-4 rounded-2xl shadow-sm border mb-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-green-700">{title}</h2>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600">{answers} answers</div>
      </div>
    </div>
  </Link>
  );
};
