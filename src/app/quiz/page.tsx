'use client';

import { useState } from 'react';

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: '',
    experience: '',
    language: '',
    style: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const questions = [
    {
      id: 'goal',
      question: 'What do you want to build or achieve with coding?',
      options: ['A website or web app', 'A mobile app', 'Data analysis / AI projects', 'Games', 'Automation scripts', 'Just learn basics for fun'],
    },
    {
      id: 'experience',
      question: 'What is your current coding experience?',
      options: ['Complete beginner (never coded)', 'Tried a little (Hello World)', 'Some experience (built small projects)', 'Intermediate'],
    },
    {
      id: 'language',
      question: 'Which language interests you most?',
      options: ['Python (easy, great for beginners & AI)', 'JavaScript (for web development)', 'No preference — suggest one'],
    },
    {
      id: 'style',
      question: 'How do you prefer to learn?',
      options: ['Visual (diagrams, block code → real code)', 'Hands-on (build projects immediately)', 'Theory first, then practice', 'Mix of everything'],
    },
    {
      id: 'time',
      question: 'How much time can you dedicate weekly?',
      options: ['Less than 5 hours', '5-10 hours', '10-20 hours', '20+ hours'],
    },
  ];

  const current = questions[step];

  const handleNext = (value: string) => {
    const updatedAnswers = { ...answers, [current.id]: value };
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Final step — generate roadmap!
      generateRoadmap(updatedAnswers);
    }
  };

  const generateRoadmap = async (finalAnswers: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to generate');
      }

      const data = await response.json();
      setRoadmap(data);
      console.log('Your Personalized Roadmap:', data);

      // Save to localStorage so dashboard can read it
      localStorage.setItem('userRoadmap', JSON.stringify(data));
      localStorage.setItem('quizAnswers', JSON.stringify(finalAnswers));

      // Small delay to show success message, then redirect
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

    } catch (err: any) {
      console.error('Generation error:', err);
      alert('Error generating your path. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">CodeMentor AI Quiz</h1>
        <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-2xl mb-4">🤖 Generating your personalized path...</div>
              <div className="text-purple-400">This takes 3-8 seconds</div>
            </div>
          ) : roadmap ? (
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold mb-4 text-green-400">Success! Path Generated 🎉</h2>
                <p className="text-xl text-purple-300 mb-6">Your personalized learning journey is ready</p>
                <div className="text-2xl animate-pulse">🚀 Redirecting to Dashboard...</div>
              </div>
            ) : (
            <>
              <div className="mb-8">
                <div className="text-sm text-gray-400 mb-2">Question {step + 1} of {questions.length}</div>
                <h2 className="text-2xl font-semibold mb-6">{current.question}</h2>
              </div>

              <div className="space-y-4">
                {current.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleNext(option)}
                    className="w-full text-left p-6 bg-gray-800 hover:bg-purple-900 rounded-xl transition-all duration-200 border border-gray-700 hover:border-purple-600"
                  >
                    <span className="text-lg">{option}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="px-6 py-3 bg-gray-700 rounded-lg disabled:opacity-50"
                >
                  Back
                </button>
                <div className="text-sm text-gray-400">
                  {step + 1} / {questions.length}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}