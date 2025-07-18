
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, MessageSquare, Zap, Star, Award, ChevronRight, Target } from "lucide-react";
import VirtualTutor from "./VirtualTutor";
import QuizGenerator from "./QuizGenerator";
import SentimentFeedback from "./SentimentFeedback";
import { students, RecommendationEngine, PerformancePrediction, courses } from "@/data/realDatasets";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentStudent] = useState(students[0]); // Using Alice Johnson as default
  const [recommendations, setRecommendations] = useState(courses.slice(0, 3));
  const [performanceData, setPerformanceData] = useState({
    currentScore: 85,
    predictedScore: 92,
    improvement: 7,
    streak: 12
  });

  // Generate real recommendations and predictions
  useEffect(() => {
    const aiRecommendations = RecommendationEngine.predict(currentStudent);
    const predictedScore = PerformancePrediction.predict(currentStudent);
    
    setRecommendations(aiRecommendations.slice(0, 3));
    setPerformanceData(prev => ({
      ...prev,
      currentScore: currentStudent.currentGrade,
      predictedScore: Math.round(predictedScore)
    }));
  }, [currentStudent]);

  const recentQuizzes = currentStudent.previousScores.slice(-3).map((score, index) => ({
    subject: ["JavaScript", "Python", "SQL"][index] || "General",
    score,
    date: `${index + 1} week${index === 0 ? '' : 's'} ago`
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {currentStudent.name.split(' ')[0]}!</h2>
        <p className="text-gray-600">Ready to continue your learning journey?</p>
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
          <span>Learning Style: {currentStudent.learningStyle}</span>
          <span>•</span>
          <span>Total Study Time: {Object.values(currentStudent.timeSpent).reduce((sum, time) => sum + time, 0)} hours</span>
          <span>•</span>
          <span>Courses Completed: {currentStudent.completedCourses.length}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            Courses
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="tutor" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            AI Tutor
          </TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Current Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{performanceData.currentScore}%</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Predicted Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">{performanceData.predictedScore}%</div>
                <div className="flex items-center mt-2">
                  <Target className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-sm text-purple-600">AI Prediction</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Learning Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{performanceData.streak} days</div>
                <div className="flex items-center mt-2">
                  <Award className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Keep it up!</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">+{performanceData.improvement}%</div>
                <div className="flex items-center mt-2">
                  <Zap className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">This month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                AI-Powered Recommendations
              </CardTitle>
              <CardDescription>
                Personalized course suggestions based on your learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{course.title}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary">{course.difficulty}</Badge>
                        <span className="text-sm text-gray-600">{course.duration} hours</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium text-gray-700">{course.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Start Course
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Performance */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Recent Quiz Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuizzes.map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{quiz.subject}</h4>
                      <p className="text-sm text-gray-600">{quiz.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{quiz.score}%</div>
                      <Progress value={quiz.score} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((course, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-gray-50 to-white">
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{course.difficulty}</Badge>
                        <span className="text-sm text-gray-600">{course.duration} hours</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{course.rating}/5.0</span>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes">
          <QuizGenerator />
        </TabsContent>

        <TabsContent value="tutor">
          <VirtualTutor />
        </TabsContent>

        <TabsContent value="feedback">
          <SentimentFeedback />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
