import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

export default function SecurityQuiz({ onCompleteChallenge, onOpenCertificate }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  const handleAnswerSelect = (optionIdx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(optionIdx);
    setAnswers({ ...answers, [currentIdx]: optionIdx });
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(answers[currentIdx + 1] ?? null);
    } else {
      let correctCount = 0;
      quizQuestions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) correctCount++;
      });
      const scorePercent = Math.round((correctCount / quizQuestions.length) * 100);
      setQuizFinished(true);

      if (scorePercent >= 80) {
        onCompleteChallenge(100, 'cyber_certified');
      }
    }
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswers({});
    setQuizFinished(false);
  };

  let correctCount = 0;
  quizQuestions.forEach((q, idx) => {
    if (answers[idx] === q.correctAnswer) correctCount++;
  });
  const scorePercent = Math.round((correctCount / quizQuestions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-white/10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-wider uppercase mb-1">
          <Award className="w-3.5 h-3.5 text-white" /> Evaluation & Assessment
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">Cybersecurity Certification Assessment</h1>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Demonstrate competency across core threat categories (Score &ge; 80% to generate official credential).
        </p>
      </div>

      <div className="glass-specular p-8 sm:p-10 rounded-3xl border border-white/15 space-y-6 shadow-2xl">
        
        {quizFinished ? (
          <div className="text-center py-8 space-y-6 animate-fade-in">
            <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center mx-auto ${
              scorePercent >= 80 
                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.4)]' 
                : 'bg-zinc-900 text-zinc-400 border-zinc-700'
            }`}>
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Evaluation Result</span>
              <h2 className="text-3xl font-bold text-white font-heading">
                Assessment Score: <span className="text-metallic">{scorePercent}%</span>
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                {correctCount} of {quizQuestions.length} Questions Correct
              </p>
            </div>

            {scorePercent >= 80 ? (
              <div className="p-6 rounded-2xl bg-white/[0.06] border border-white/25 text-white text-xs sm:text-sm space-y-4 max-w-lg mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <p className="font-semibold text-zinc-200">
                  Competency Verified. You have qualified for the official CyberGuard Pro Certificate.
                </p>
                <button
                  onClick={onOpenCertificate}
                  className="w-full py-3.5 btn-glossy rounded-xl text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" /> Generate Official Certificate
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-zinc-900/90 border border-white/10 text-zinc-300 text-xs sm:text-sm space-y-4 max-w-lg mx-auto">
                <p>A minimum score of 80% is required for credential issuance. Review modules and retake the exam.</p>
                <button
                  onClick={handleRetake}
                  className="px-6 py-3.5 btn-obsidian rounded-xl text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Assessment
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header Tracker */}
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500 border-b border-white/10 pb-4">
              <span>Question {currentIdx + 1} of {quizQuestions.length}</span>
              <span className="text-white font-semibold bg-white/[0.08] px-3 py-1 rounded-full border border-white/15">
                {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed font-heading">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-black/50 border-white/10 text-zinc-300 hover:bg-white/[0.05] hover:border-white/20';
                if (selectedOpt !== null) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle = 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]';
                  } else if (idx === selectedOpt) {
                    btnStyle = 'bg-zinc-900 border-white/30 text-zinc-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all text-xs sm:text-sm leading-relaxed flex items-center justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt !== null && idx === currentQ.correctAnswer && <CheckCircle2 className="w-5 h-5 text-black shrink-0 ml-3" />}
                    {selectedOpt !== null && idx === selectedOpt && idx !== currentQ.correctAnswer && <XCircle className="w-5 h-5 text-zinc-400 shrink-0 ml-3" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after selection */}
            {selectedOpt !== null && (
              <div className="p-5 rounded-2xl bg-black/90 border border-white/15 text-xs text-zinc-300 space-y-2 animate-fade-in shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                <p className="font-bold text-white uppercase font-mono tracking-wider text-[10px]">Educational Takeaway:</p>
                <p className="leading-relaxed font-sans">{currentQ.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {selectedOpt !== null && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 btn-glossy rounded-2xl text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2"
              >
                {currentIdx + 1 === quizQuestions.length ? 'Finalize Assessment' : 'Next Question'} <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
