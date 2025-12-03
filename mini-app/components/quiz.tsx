"use client";

import { useState } from "react";
import QuizResult from "./quiz-result";

type Question = {
  text: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Meat", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to spend a weekend?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring", animal: "fox" },
      { text: "Storing food", animal: "hamster" },
      { text: "Running", animal: "horse" },
    ],
  },
  {
    text: "What is your favorite activity?",
    options: [
      { text: "Purring", animal: "cat" },
      { text: "Barking", animal: "dog" },
      { text: "Sneaking", animal: "fox" },
      { text: "Chewing", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
  {
    text: "Which environment do you like most?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    text: "What is your personality like?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Clever", animal: "fox" },
      { text: "Curious", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<string>("");

  const handleSelect = (animal: string) => {
    setAnswers((prev) => [...prev, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const scores: Record<string, number> = {
        cat: 0,
        dog: 0,
        fox: 0,
        hamster: 0,
        horse: 0,
      };
      answers.concat(animal).forEach((a) => {
        scores[a] = (scores[a] ?? 0) + 1;
      });
      const max = Math.max(...Object.values(scores));
      const topAnimals = Object.entries(scores)
        .filter(([, v]) => v === max)
        .map(([k]) => k);
      setResultAnimal(topAnimals[0]); // pick first in case of tie
      setShowResult(true);
    }
  };

  if (showResult) {
    return <QuizResult animal={resultAnimal} />;
  }

  const currentQuestion = questions[current];
  const shuffledOptions = shuffleArray(currentQuestion.options);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <button
            key={opt.text}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleSelect(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
