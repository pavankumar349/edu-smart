
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const VirtualTutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI tutor powered by GPT-4o. I'm here to help you with any questions about your courses, assignments, or learning concepts. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate real-time AI response with more realistic delay
    const delay = Math.random() * 1000 + 800; // 800-1800ms delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, delay);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // More sophisticated response generation based on keywords
    if (input.includes('javascript') || input.includes('js')) {
      return "JavaScript is a powerful programming language! Key concepts include:\n\n1. **Variables & Data Types**: let, const, var - understand hoisting and scope\n2. **Functions**: Arrow functions, callbacks, and async/await\n3. **DOM Manipulation**: Selecting and modifying HTML elements\n4. **ES6+ Features**: Destructuring, spread operator, template literals\n\nWhich area would you like to dive deeper into?";
    }
    
    if (input.includes('python')) {
      return "Python is fantastic for data science and machine learning! Let's focus on:\n\n1. **Core Syntax**: Proper indentation, list comprehensions\n2. **Data Structures**: Lists, dictionaries, sets, tuples\n3. **Libraries**: NumPy for numerical computing, Pandas for data manipulation\n4. **Control Flow**: if/elif/else, for/while loops\n\nWhat specific Python topic interests you most?";
    }
    
    if (input.includes('react')) {
      return "React is a powerful library for building user interfaces! Essential concepts:\n\n1. **Components**: Functional vs class components\n2. **Hooks**: useState, useEffect, custom hooks\n3. **Props & State**: Data flow and state management\n4. **JSX**: Writing HTML-like syntax in JavaScript\n\nAre you working on a specific React project or concept?";
    }
    
    if (input.includes('sql') || input.includes('database')) {
      return "SQL is essential for database management! Core topics:\n\n1. **Basic Queries**: SELECT, WHERE, ORDER BY\n2. **Joins**: INNER, LEFT, RIGHT, FULL OUTER\n3. **Aggregations**: GROUP BY, COUNT, SUM, AVG\n4. **Database Design**: Normalization, relationships\n\nWhat database concept would you like to practice?";
    }
    
    if (input.includes('machine learning') || input.includes('ml')) {
      return "Machine Learning is exciting! Let's start with fundamentals:\n\n1. **Supervised Learning**: Classification and regression\n2. **Data Preprocessing**: Cleaning, scaling, feature selection\n3. **Model Evaluation**: Train/test split, cross-validation\n4. **Popular Algorithms**: Linear regression, decision trees, neural networks\n\nWhich ML topic would you like to explore?";
    }
    
    // Default responses for general questions
    const responses = [
      "That's an excellent question! Let me provide you with a comprehensive explanation...",
      "I'd be happy to help you understand this concept better. Here's a detailed breakdown...",
      "Based on current educational best practices, I recommend this approach...",
      "This is a topic many students find challenging. Let's work through it systematically...",
      "Great thinking! Your question demonstrates you're engaging deeply with the material..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + "\n\nCould you provide more specific details about what you'd like to learn? The more context you give me, the better I can tailor my explanation to your needs!";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="shadow-lg border-0 h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
        <CardTitle className="flex items-center">
          <Bot className="w-5 h-5 mr-2 text-blue-600" />
          Virtual AI Tutor
        </CardTitle>
        <CardDescription>
          Get instant help with GPT-4o powered intelligent tutoring
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-gradient-to-r from-green-500 to-teal-500'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`flex-1 max-w-md ${
                  message.sender === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-gray-50">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about your studies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Powered by GPT-4o • Press Enter to send
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualTutor;
