import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which tissue type is responsible for transporting water from roots to leaves?",
    options: ["Phloem", "Xylem", "Epidermis", "Parenchyma"],
    correctAnswer: 1,
    explanation: "Xylem is a vascular tissue that transports water and dissolved minerals upward from the roots. Unlike phloem, xylem cells are dead at maturity.",
  },
  {
    id: 2,
    question: "What is the main function of meristematic tissue?",
    options: ["Protection", "Storage", "Cell division and growth", "Photosynthesis"],
    correctAnswer: 2,
    explanation: "Meristematic tissues contain undifferentiated cells that continuously divide, enabling plant growth throughout the plant's life.",
  },
  {
    id: 3,
    question: "Where are apical meristems located?",
    options: ["Between xylem and phloem", "At the tips of roots and shoots", "In the bark", "Inside leaves"],
    correctAnswer: 1,
    explanation: "Apical meristems are found at the tips (apex) of roots and shoots, enabling the plant to grow in length.",
  },
  {
    id: 4,
    question: "Which ground tissue cell type provides flexible support while the plant is still growing?",
    options: ["Sclerenchyma", "Parenchyma", "Collenchyma", "Tracheid"],
    correctAnswer: 2,
    explanation: "Collenchyma cells have unevenly thickened primary walls that provide flexible support to growing parts of the plant.",
  },
  {
    id: 5,
    question: "What structure in the epidermis regulates gas exchange?",
    options: ["Cuticle", "Trichome", "Stomata", "Guard cells only"],
    correctAnswer: 2,
    explanation: "Stomata (singular: stoma) are pores in the epidermis that allow CO2 uptake and O2/water vapor release. Guard cells control their opening.",
  },
];

export function PlantQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult || answeredQuestions.has(currentQuestion)) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion]));
    
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsComplete(false);
    setAnsweredQuestions(new Set());
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / quizQuestions.length) * 100;

  if (isComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-marigold-400 to-fern-500">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          
          <h3 className="mb-2 font-display text-3xl font-bold text-foreground">
            Quiz Complete!
          </h3>
          
          <p className="mb-6 text-lg text-muted-foreground">
            You scored <span className="font-bold text-primary">{score}</span> out of{" "}
            <span className="font-bold">{quizQuestions.length}</span> ({percentage}%)
          </p>

          <div className="mb-8">
            {percentage >= 80 ? (
              <div className="flex items-center justify-center gap-2 text-fern-500">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Excellent! You're a plant tissue expert!</span>
              </div>
            ) : percentage >= 60 ? (
              <p className="text-marigold-400">Good job! Keep learning about plant biology.</p>
            ) : (
              <p className="text-muted-foreground">Review the material and try again!</p>
            )}
          </div>

          <button
            onClick={resetQuiz}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{score} correct</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-fern-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h3 className="mb-6 text-lg font-semibold text-foreground md:text-xl">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrectness = showResult;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full rounded-lg border p-4 text-left transition-all",
                  !showResult && "hover:border-primary/50 hover:bg-primary/5",
                  showCorrectness && isCorrect && "border-fern-500 bg-fern-500/10",
                  showCorrectness && isSelected && !isCorrect && "border-terracotta-500 bg-terracotta-500/10",
                  !showCorrectness && isSelected && "border-primary bg-primary/10",
                  !showCorrectness && !isSelected && "border-border bg-transparent"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "font-medium",
                    showCorrectness && isCorrect && "text-fern-500",
                    showCorrectness && isSelected && !isCorrect && "text-terracotta-500"
                  )}>
                    {option}
                  </span>
                  {showCorrectness && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-fern-500" />
                  )}
                  {showCorrectness && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-terracotta-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-6 animate-fade-in rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Explanation: </span>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {showResult && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={nextQuestion}
              className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
