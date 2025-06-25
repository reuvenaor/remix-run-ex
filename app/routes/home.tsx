import type { Route } from "./+types/home";
import { AppKeyboard } from "~/components/wordle/app-keyboard";
import { WordInput } from "~/components/wordle/app-word-input";

const WORD_SIZE = 5;

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div className="p-4 h-screen flex flex-col justify-center items-center">
    <h1 className="text-2xl text-center mb-8">Wordle Game</h1>
    <WordInput size={WORD_SIZE} />
    <AppKeyboard />
  </div>;
}
