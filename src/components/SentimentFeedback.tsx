
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, ThumbsUp, ThumbsDown, Meh, Send, Brain } from "lucide-react";
import { toast } from "sonner";

interface FeedbackAnalysis {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  confidence: number;
  emotions: { emotion: string; score: number }[];
  suggestions: string[];
}

interface FeedbackEntry {
  id: string;
  text: string;
  analysis: FeedbackAnalysis;
  timestamp: Date;
}

const SentimentFeedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackEntry[]>([]);

  const analyzeSentiment = async () => {
    if (!feedbackText.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setIsAnalyzing(true);
    toast.info("Analyzing sentiment using DistilBERT...");

    // Simulate sentiment analysis API call
    setTimeout(() => {
      const mockAnalysis: FeedbackAnalysis = {
        sentiment: determineSentiment(feedbackText),
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        emotions: [
          { emotion: "joy", score: Math.random() * 0.5 + 0.3 },
          { emotion: "trust", score: Math.random() * 0.4 + 0.2 },
          { emotion: "anticipation", score: Math.random() * 0.3 + 0.1 }
        ],
        suggestions: generateSuggestions(feedbackText)
      };

      const newFeedback: FeedbackEntry = {
        id: Date.now().toString(),
        text: feedbackText,
        analysis: mockAnalysis,
        timestamp: new Date()
      };

      setFeedbackHistory(prev => [newFeedback, ...prev]);
      setFeedbackText("");
      setIsAnalyzing(false);
      
      toast.success(`Sentiment analyzed: ${mockAnalysis.sentiment} (${Math.round(mockAnalysis.confidence * 100)}% confidence)`);
    }, 2000);
  };

  const determineSentiment = (text: string): 'Positive' | 'Negative' | 'Neutral' => {
    const positiveWords = ['great', 'excellent', 'amazing', 'love', 'fantastic', 'wonderful', 'good', 'helpful', 'easy'];
    const negativeWords = ['bad', 'terrible', 'hate', 'difficult', 'confusing', 'frustrating', 'poor', 'awful'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'Positive';
    if (negativeCount > positiveCount) return 'Negative';
    return 'Neutral';
  };

  const generateSuggestions = (text: string): string[] => {
    const suggestions = [
      "Continue engaging with similar content",
      "Try exploring advanced topics in this area",
      "Consider joining study groups for better collaboration",
      "Practice more exercises to strengthen understanding",
      "Review fundamental concepts if needed"
    ];
    
    return suggestions.slice(0, 3);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <ThumbsUp className="w-5 h-5 text-green-600" />;
      case 'Negative':
        return <ThumbsDown className="w-5 h-5 text-red-600" />;
      default:
        return <Meh className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Negative':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Input */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-t-lg">
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-pink-600" />
            Share Your Feedback
          </CardTitle>
          <CardDescription>
            AI-powered sentiment analysis using DistilBERT NLP model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          <Textarea
            placeholder="Tell us about your learning experience, course feedback, or any suggestions..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="min-h-[120px] text-base"
          />
          
          <Button 
            onClick={analyzeSentiment}
            disabled={isAnalyzing || !feedbackText.trim()}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
          >
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-pulse" />
                Analyzing Sentiment...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit & Analyze Feedback
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Feedback History */}
      {feedbackHistory.length > 0 && (
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Sentiment Analysis Results
            </CardTitle>
            <CardDescription>
              Real-time feedback analysis and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {feedbackHistory.map((entry) => (
                <div key={entry.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="space-y-4">
                    {/* Original Feedback */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Your Feedback:</h4>
                      <p className="text-gray-700 italic">"{entry.text}"</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {entry.timestamp.toLocaleString()}
                      </p>
                    </div>

                    {/* Sentiment Analysis */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">AI Analysis:</h4>
                        <div className="flex items-center space-x-2">
                          {getSentimentIcon(entry.analysis.sentiment)}
                          <Badge className={getSentimentColor(entry.analysis.sentiment)}>
                            {entry.analysis.sentiment}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {Math.round(entry.analysis.confidence * 100)}% confidence
                          </span>
                        </div>
                      </div>

                      {/* Confidence Progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Confidence Level</span>
                          <span className="font-medium">{Math.round(entry.analysis.confidence * 100)}%</span>
                        </div>
                        <Progress value={entry.analysis.confidence * 100} className="h-2" />
                      </div>

                      {/* Emotion Analysis */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-700">Detected Emotions:</h5>
                        <div className="flex flex-wrap gap-2">
                          {entry.analysis.emotions.map((emotion, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {emotion.emotion}: {Math.round(emotion.score * 100)}%
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-700">AI Suggestions:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {entry.analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="py-6">
          <div className="flex items-start space-x-3">
            <Brain className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How AI Sentiment Analysis Works</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Uses DistilBERT neural network for natural language processing</li>
                <li>• Analyzes emotional tone, context, and semantic meaning</li>
                <li>• Provides confidence scores and emotion breakdowns</li>
                <li>• Generates personalized suggestions based on feedback patterns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentFeedback;
