
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, BookOpen, MessageSquare, Star, AlertCircle, Activity, Wifi, WifiOff } from "lucide-react";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { students } from "@/data/realDatasets";

const AdminDashboard = () => {
  const { metrics, performanceUpdates, recentFeedback, isLive, isConnected } = useRealTimeData();

  const studentAnalytics = {
    totalStudents: 1247,
    activeToday: metrics.activeUsers,
    averageScore: 87.5,
    completionRate: 78
  };

  const sentimentTrends = [
    { period: "This Week", positive: 78, negative: 12, neutral: 10 },
    { period: "Last Week", positive: 72, negative: 18, neutral: 10 },
    { period: "This Month", positive: 75, negative: 15, neutral: 10 }
  ];

  const topPerformers = students.slice(0, 3).map(student => ({
    name: student.name,
    score: student.currentGrade,
    courses: student.completedCourses.length,
    streak: Math.floor(Math.random() * 30) + 10
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Monitor student progress and platform analytics</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
              isLive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? (
                <Wifi className="w-4 h-4" />
              ) : (
                <WifiOff className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {isLive ? 'Live' : 'Offline'}
              </span>
            </div>
            {isLive && (
              <div className="flex items-center space-x-1 text-gray-600">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-sm">Last updated: {metrics.lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{studentAnalytics.totalStudents.toLocaleString()}</div>
            <div className="flex items-center mt-2">
              <Users className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-sm text-blue-600">{studentAnalytics.activeToday} active today</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{studentAnalytics.averageScore}%</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+3.2% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{studentAnalytics.completionRate}%</div>
            <div className="flex items-center mt-2">
              <BookOpen className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-sm text-purple-600">Course completion</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Sentiment Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">8.2/10</div>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-sm text-orange-600">Student satisfaction</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Real-time Performance Updates */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              Real-time Performance
            </CardTitle>
            <CardDescription>
              Live student performance updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {performanceUpdates.length > 0 ? (
                performanceUpdates.map((update, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border animate-fade-in">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="font-medium text-gray-900">
                          {students.find(s => s.id === update.studentId)?.name || 'Student'}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600">{update.subject} - Score: {update.newScore}%</p>
                      <p className="text-xs text-gray-500">{update.timestamp.toLocaleTimeString()}</p>
                    </div>
                    <div className={`text-sm font-medium ${
                      update.improvement > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {update.improvement > 0 ? '+' : ''}{update.improvement.toFixed(1)}%
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Waiting for live updates...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis Trends */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Sentiment Analysis Trends
            </CardTitle>
            <CardDescription>
              Student feedback sentiment over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sentimentTrends.map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{trend.period}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-green-600">+{trend.positive}%</span>
                      <span className="text-red-600">-{trend.negative}%</span>
                      <span className="text-gray-500">~{trend.neutral}%</span>
                    </div>
                  </div>
                  <div className="flex space-x-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 h-full" 
                      style={{ width: `${trend.positive}%` }}
                    />
                    <div 
                      className="bg-red-500 h-full" 
                      style={{ width: `${trend.negative}%` }}
                    />
                    <div 
                      className="bg-gray-400 h-full" 
                      style={{ width: `${trend.neutral}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-600" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Students with highest performance scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.courses} courses • {student.streak} day streak</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{student.score}%</div>
                    <Progress value={student.score} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card className="shadow-lg border-0 mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
            Recent Student Feedback
          </CardTitle>
          <CardDescription>
            Latest feedback with AI-powered sentiment analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    {students.find(s => s.id === feedback.studentId)?.name || 'Student'}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={feedback.sentiment === 'positive' ? 'default' : feedback.sentiment === 'negative' ? 'destructive' : 'secondary'}
                      className={feedback.sentiment === 'positive' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {Math.round(feedback.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{feedback.text}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
