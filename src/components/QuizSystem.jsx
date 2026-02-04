import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Clock, TrendingUp, Award, RefreshCw, ChevronRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function QuizSystem({
  lessonId,
  questions = [],
  passingScore = 70,
  onComplete = () => {},
  allowRetake = true
}) {
  const { user } = useAuth()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())
  const [attemptNumber, setAttemptNumber] = useState(1)
  const [previousAttempts, setPreviousAttempts] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user && lessonId) {
      loadPreviousAttempts()
    }
  }, [user, lessonId])

  const loadPreviousAttempts = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .order('attempted_at', { ascending: false })

      if (!error && data) {
        setPreviousAttempts(data)
        setAttemptNumber(data.length + 1)
      }
    } catch (error) {
      console.error('Error loading attempts:', error)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer
    })
  }

  const handleMultiSelectAnswer = (option) => {
    const currentAnswers = answers[currentQuestionIndex] || []
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter(a => a !== option)
      : [...currentAnswers, option]

    setAnswers({
      ...answers,
      [currentQuestionIndex]: newAnswers
    })
  }

  const checkAnswer = (questionIndex) => {
    const question = questions[questionIndex]
    const userAnswer = answers[questionIndex]

    switch (question.type) {
      case 'multiple-choice':
        return userAnswer === question.correctAnswer

      case 'multi-select':
        if (!Array.isArray(userAnswer) || !Array.isArray(question.correctAnswers)) return false
        return userAnswer.length === question.correctAnswers.length &&
               userAnswer.every(a => question.correctAnswers.includes(a))

      case 'true-false':
        return userAnswer === question.correctAnswer

      case 'short-answer':
        if (!userAnswer) return false
        const normalized = userAnswer.toLowerCase().trim()
        if (question.exactMatch) {
          return normalized === question.correctAnswer.toLowerCase()
        }
        return question.keywords?.some(keyword =>
          normalized.includes(keyword.toLowerCase())
        )

      default:
        return false
    }
  }

  const handleNext = () => {
    setShowFeedback(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleSubmitAnswer = () => {
    setShowFeedback(true)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((_, index) => {
      if (checkAnswer(index)) correct++
    })
    return Math.round((correct / questions.length) * 100)
  }

  const handleSubmitQuiz = async () => {
    const finalScore = calculateScore()
    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    const passed = finalScore >= passingScore

    setScore(finalScore)
    setQuizCompleted(true)

    if (user && lessonId) {
      setSaving(true)
      try {
        const { error } = await supabase
          .from('quiz_attempts')
          .insert({
            user_id: user.id,
            lesson_id: lessonId,
            score: finalScore,
            passed: passed,
            time_spent_seconds: timeSpent,
            answers: answers,
            attempt_number: attemptNumber
          })

        if (error) throw error

        await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: lessonId,
            is_completed: passed,
            completed_at: passed ? new Date().toISOString() : null,
            quiz_score: finalScore
          }, {
            onConflict: 'user_id,lesson_id'
          })

        if (passed) {
          onComplete(finalScore)
        }
      } catch (error) {
        console.error('Error saving quiz results:', error)
      } finally {
        setSaving(false)
      }
    }
  }

  const handleRetake = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowFeedback(false)
    setQuizCompleted(false)
    setScore(0)
    setStartTime(Date.now())
    setAttemptNumber(attemptNumber + 1)
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null

    const userAnswer = answers[currentQuestionIndex]
    const isCorrect = checkAnswer(currentQuestionIndex)

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = userAnswer === option
              const showCorrect = showFeedback && option === currentQuestion.correctAnswer
              const showWrong = showFeedback && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-accent-green bg-accent-green/10'
                      : showWrong
                      ? 'border-red-500 bg-red-500/10'
                      : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showCorrect && <CheckCircle className="text-accent-green" size={20} />}
                    {showWrong && <XCircle className="text-red-500" size={20} />}
                  </div>
                </button>
              )
            })}
          </div>
        )

      case 'multi-select':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
            {currentQuestion.options.map((option, index) => {
              const isSelected = userAnswer?.includes(option)
              const isCorrectOption = currentQuestion.correctAnswers.includes(option)
              const showCorrect = showFeedback && isCorrectOption
              const showWrong = showFeedback && isSelected && !isCorrectOption

              return (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleMultiSelectAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-accent-green bg-accent-green/10'
                      : showWrong
                      ? 'border-red-500 bg-red-500/10'
                      : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                    {showCorrect && <CheckCircle className="text-accent-green" size={20} />}
                    {showWrong && <XCircle className="text-red-500" size={20} />}
                  </div>
                </button>
              )
            })}
          </div>
        )

      case 'true-false':
        return (
          <div className="space-y-3">
            {['True', 'False'].map((option) => {
              const isSelected = userAnswer === option
              const showCorrect = showFeedback && option === currentQuestion.correctAnswer
              const showWrong = showFeedback && isSelected && !isCorrect

              return (
                <button
                  key={option}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-accent-green bg-accent-green/10'
                      : showWrong
                      ? 'border-red-500 bg-red-500/10'
                      : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{option}</span>
                    {showCorrect && <CheckCircle className="text-accent-green" size={20} />}
                    {showWrong && <XCircle className="text-red-500" size={20} />}
                  </div>
                </button>
              )
            })}
          </div>
        )

      case 'short-answer':
        return (
          <div>
            <textarea
              value={userAnswer || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder="Type your answer here..."
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none resize-none h-32 disabled:bg-gray-50"
            />
            {showFeedback && (
              <div className={`mt-3 p-3 rounded-lg ${
                isCorrect ? 'bg-accent-green/10 text-accent-green' : 'bg-red-500/10 text-red-700'
              }`}>
                {isCorrect ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>Correct!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle size={20} />
                      <span>Not quite right</span>
                    </div>
                    <p className="text-sm">
                      Expected answer: {currentQuestion.correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (quizCompleted) {
    const passed = score >= passingScore
    const bestScore = Math.max(...previousAttempts.map(a => a.score), score)
    const improvementFromFirst = previousAttempts.length > 0
      ? score - previousAttempts[previousAttempts.length - 1].score
      : 0

    return (
      <div className="max-w-3xl mx-auto">
        <div className="card text-center py-12">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
            passed ? 'bg-accent-green/10' : 'bg-yellow-500/10'
          }`}>
            {passed ? (
              <Award className="text-accent-green" size={48} />
            ) : (
              <RefreshCw className="text-yellow-600" size={48} />
            )}
          </div>

          <h2 className="text-4xl font-bold text-primary mb-4">
            {passed ? 'Congratulations!' : 'Keep Trying!'}
          </h2>

          <div className="text-6xl font-bold mb-6">
            <span className={passed ? 'text-accent-green' : 'text-yellow-600'}>
              {score}%
            </span>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            {passed
              ? `You passed the quiz! (${passingScore}% required)`
              : `You need ${passingScore}% to pass. You scored ${score}%`
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="card bg-gradient-to-br from-primary/5 to-secondary/5">
              <TrendingUp className="text-primary mx-auto mb-2" size={32} />
              <div className="text-3xl font-bold text-primary mb-1">{score}%</div>
              <div className="text-sm text-gray-600">Your Score</div>
            </div>

            <div className="card bg-gradient-to-br from-accent-green/5 to-accent-yellow/5">
              <CheckCircle className="text-accent-green mx-auto mb-2" size={32} />
              <div className="text-3xl font-bold text-primary mb-1">
                {questions.filter((_, i) => checkAnswer(i)).length}/{questions.length}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>

            <div className="card bg-gradient-to-br from-secondary/5 to-accent-yellow/5">
              <Clock className="text-secondary mx-auto mb-2" size={32} />
              <div className="text-3xl font-bold text-primary mb-1">#{attemptNumber}</div>
              <div className="text-sm text-gray-600">Attempt Number</div>
            </div>
          </div>

          {improvementFromFirst !== 0 && (
            <div className={`inline-block px-4 py-2 rounded-full mb-6 ${
              improvementFromFirst > 0 ? 'bg-accent-green/10 text-accent-green' : 'bg-red-500/10 text-red-700'
            }`}>
              {improvementFromFirst > 0 ? '+' : ''}{improvementFromFirst}% from first attempt
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-bold text-primary mb-4">Question Review</h3>
            <div className="space-y-3 text-left max-w-2xl mx-auto">
              {questions.map((question, index) => {
                const isCorrect = checkAnswer(index)
                return (
                  <div key={index} className="card flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-accent-green/10' : 'bg-red-500/10'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="text-accent-green" size={18} />
                      ) : (
                        <XCircle className="text-red-500" size={18} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-1">
                        Question {index + 1}: {question.question}
                      </p>
                      {!isCorrect && question.explanation && (
                        <p className="text-sm text-gray-600 mt-2">
                          💡 {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {allowRetake && !passed && (
            <button
              onClick={handleRetake}
              className="btn-primary text-lg px-8"
              disabled={saving}
            >
              <RefreshCw className="inline mr-2" size={20} />
              Retake Quiz
            </button>
          )}

          {passed && (
            <button
              onClick={() => onComplete(score)}
              className="btn-primary text-lg px-8"
            >
              Continue to Next Lesson
              <ChevronRight className="inline ml-2" size={20} />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">Quiz Time!</h2>
            <span className="text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {currentQuestion && (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {currentQuestion.question}
              </h3>
              {renderQuestion()}
            </div>

            {showFeedback && currentQuestion.explanation && (
              <div className={`p-4 rounded-lg mb-6 ${
                checkAnswer(currentQuestionIndex)
                  ? 'bg-accent-green/10 border-2 border-accent-green'
                  : 'bg-blue-50 border-2 border-blue-200'
              }`}>
                <p className="text-sm font-semibold mb-2">💡 Explanation:</p>
                <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex gap-4">
              {!showFeedback ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answers[currentQuestionIndex]}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="btn-primary flex-1"
                    >
                      Next Question
                      <ChevronRight className="inline ml-2" size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={saving}
                      className="btn-primary flex-1"
                    >
                      {saving ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
