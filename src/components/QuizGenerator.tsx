
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Zap, CheckCircle, XCircle, Brain, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizGenerator = () => {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic for the quiz");
      return;
    }

    setIsGenerating(true);
    toast.info("Generating AI-powered quiz questions...");

    // Simulate API call to generate questions using T5/GPT-4o
    setTimeout(() => {
      const generatedQuestions: Question[] = [
        {
          id: '1',
          question: `What is the primary purpose of ${topic} in modern applications?`,
          options: [
            "To improve user experience",
            "To reduce development time",
            "To enhance security",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: `${topic} serves multiple purposes including improving user experience, reducing development time, and enhancing security measures.`
        },
        {
          id: '2',
          question: `Which of the following is a key characteristic of ${topic}?`,
          options: [
            "Scalability",
            "Complexity",
            "Limited functionality",
            "High resource consumption"
          ],
          correctAnswer: 0,
          explanation: `Scalability is indeed a key characteristic that makes ${topic} valuable in various applications.`
        },
        {
          id: '3',
          question: `When implementing ${topic}, what should be the primary consideration?`,
          options: [
            "Cost efficiency",
            "Performance optimization",
            "User requirements",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: `All factors - cost efficiency, performance optimization, and user requirements - are crucial when implementing ${topic}.`
        }
      ];

      setQuestions(generatedQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setShowResult(false);
      setQuizCompleted(false);
      setIsGenerating(false);
      toast.success("Quiz generated successfully!");
    }, 2000);
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer");
      return;
    }

    const isCorrect = parseInt(selectedAnswer) === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer("");
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        toast.success(`Quiz completed! Your score: ${score + (isCorrect ? 1 : 0)}/${questions.length}`);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setTopic("");
  };

  if (quizCompleted) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
          <CardTitle className="flex items-center justify-center text-2xl">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Quiz Completed!
          </CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6 py-8">
          <div className="space-y-4">
            <div className="text-4xl font-bold text-gray-900">{finalScore}/{questions.length}</div>
            <div className="text-xl text-gray-600">Score: {percentage}%</div>
            <Progress value={percentage} className="w-full h-4" />
          </div>
          
          <div className="space-y-2">
            <Badge 
              variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Learning!"}
            </Badge>
            <p className="text-gray-600">
              {percentage >= 80 
                ? "Outstanding performance! You've mastered this topic." 
                : percentage >= 60 
                ? "Good work! Review the missed concepts to improve further."
                : "Don't worry! Practice makes perfect. Try again after reviewing the material."
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={resetQuiz} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New Quiz
            </Button>
            <Button variant="outline" onClick={() => setQuizCompleted(false)}>
              Review Answers
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            AI Quiz Generator
          </CardTitle>
          <CardDescription>
            Generate adaptive quizzes using Hugging Face T5 and GPT-4o
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 py-8">
          <div className="space-y-4">
            <Label htmlFor="topic" className="text-lg font-medium">
              Enter a topic for your quiz:
            </Label>
            <Input
              id="topic"
              placeholder="e.g., JavaScript, Machine Learning, Data Structures..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="text-lg py-3"
            />
          </div>
          
          <Button 
            onClick={generateQuiz}
            disabled={isGenerating || !topic.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
          >
            {isGenerating ? (
              <>
                <Brain className="w-5 h-5 mr-2 animate-pulse" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Generate AI Quiz
              </>
            )}
          </Button>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AI analyzes your topic using advanced NLP models</li>
              <li>• Generates 3-5 adaptive questions tailored to your level</li>
              <li>• Provides instant feedback and explanations</li>
              <li>• Tracks your progress and suggests improvements</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <Badge variant="outline">Topic: {topic}</Badge>
        </div>
        <Progress value={progress} className="w-full h-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">{currentQ.question}</h3>
          
          {!showResult ? (
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-2 p-3 border rounded-lg ${
                    index === currentQ.correctAnswer 
                      ? 'bg-green-50 border-green-200' 
                      : parseInt(selectedAnswer) === index 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-gray-50'
                  }`}
                >
                  {index === currentQ.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : parseInt(selectedAnswer) === index ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <div className="w-5 h-5" />
                  )}
                  <span className="flex-1">{option}</span>
                </div>
              ))}
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800">{currentQ.explanation}</p>
              </div>
            </div>
          )}
        </div>
        
        {!showResult && (
          <Button 
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Submit Answer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizGenerator;
