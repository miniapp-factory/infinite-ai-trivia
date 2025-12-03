"use client";

import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function QuizResult({ animal }: { animal: string }) {
  const imageMap: Record<string, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const titleMap: Record<string, string> = {
    cat: "You are a Cat!",
    dog: "You are a Dog!",
    fox: "You are a Fox!",
    hamster: "You are a Hamster!",
    horse: "You are a Horse!",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">{titleMap[animal]}</h2>
      <img
        src={imageMap[animal]}
        alt={animal}
        width={256}
        height={256}
        className="rounded"
      />
      <Share text={`I just took the Animal Quiz and I am a ${animal}! ${url}`} />
      <button
        className="px-4 py-2 bg-secondary text-secondary-foreground rounded"
        onClick={() => window.location.reload()}
      >
        Retake Quiz
      </button>
    </div>
  );
}
