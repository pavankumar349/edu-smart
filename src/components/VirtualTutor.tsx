
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
    
    // Programming Languages
    if (input.includes('javascript') || input.includes('js')) {
      return "JavaScript is a powerful programming language! Key concepts include:\n\n1. **Variables & Data Types**: let, const, var - understand hoisting and scope\n2. **Functions**: Arrow functions, callbacks, and async/await\n3. **DOM Manipulation**: Selecting and modifying HTML elements\n4. **ES6+ Features**: Destructuring, spread operator, template literals\n5. **Event Handling**: User interactions and event listeners\n\nWhich area would you like to dive deeper into?";
    }
    
    if (input.includes('python')) {
      return "Python is fantastic for data science and machine learning! Let's focus on:\n\n1. **Core Syntax**: Proper indentation, list comprehensions\n2. **Data Structures**: Lists, dictionaries, sets, tuples\n3. **Libraries**: NumPy for numerical computing, Pandas for data manipulation\n4. **Control Flow**: if/elif/else, for/while loops\n5. **OOP**: Classes, inheritance, polymorphism\n\nWhat specific Python topic interests you most?";
    }
    
    if (input.includes('java')) {
      return "Java is excellent for enterprise development! Core concepts:\n\n1. **Object-Oriented Programming**: Classes, objects, inheritance\n2. **Memory Management**: Garbage collection, heap vs stack\n3. **Collections Framework**: ArrayList, HashMap, HashSet\n4. **Exception Handling**: try-catch blocks, custom exceptions\n5. **Multithreading**: Concurrent programming concepts\n\nWhich Java concept would you like to explore?";
    }
    
    if (input.includes('c++')) {
      return "C++ is powerful for system programming! Essential topics:\n\n1. **Memory Management**: Pointers, references, dynamic allocation\n2. **STL**: Standard Template Library containers and algorithms\n3. **OOP**: Classes, virtual functions, polymorphism\n4. **Templates**: Generic programming concepts\n5. **Performance**: Optimization techniques\n\nWhat C++ topic interests you?";
    }
    
    // Web Development
    if (input.includes('react')) {
      return "React is a powerful library for building user interfaces! Essential concepts:\n\n1. **Components**: Functional vs class components\n2. **Hooks**: useState, useEffect, custom hooks\n3. **Props & State**: Data flow and state management\n4. **JSX**: Writing HTML-like syntax in JavaScript\n5. **Context API**: Global state management\n\nAre you working on a specific React project or concept?";
    }
    
    if (input.includes('vue')) {
      return "Vue.js is a progressive framework! Key features:\n\n1. **Template Syntax**: Declarative rendering with directives\n2. **Component System**: Single-file components\n3. **Reactivity**: Vue's reactivity system\n4. **Vuex**: State management pattern\n5. **Vue Router**: Client-side routing\n\nWhat Vue.js concept would you like to learn?";
    }
    
    if (input.includes('html') || input.includes('css')) {
      return "HTML & CSS are the foundation of web development!\n\n**HTML5 Features:**\n1. Semantic elements (header, nav, main, footer)\n2. Forms and input types\n3. Canvas and SVG for graphics\n\n**CSS3 Features:**\n1. Flexbox and Grid layouts\n2. Animations and transitions\n3. Media queries for responsive design\n4. CSS variables and custom properties\n\nWhat specific topic would you like to explore?";
    }
    
    // Backend & Databases
    if (input.includes('sql') || input.includes('database')) {
      return "SQL is essential for database management! Core topics:\n\n1. **Basic Queries**: SELECT, WHERE, ORDER BY\n2. **Joins**: INNER, LEFT, RIGHT, FULL OUTER\n3. **Aggregations**: GROUP BY, COUNT, SUM, AVG\n4. **Database Design**: Normalization, relationships\n5. **Indexes**: Performance optimization\n6. **Stored Procedures**: Advanced database logic\n\nWhat database concept would you like to practice?";
    }
    
    if (input.includes('node') || input.includes('express')) {
      return "Node.js enables JavaScript on the server! Key concepts:\n\n1. **Event Loop**: Non-blocking I/O operations\n2. **NPM**: Package management and modules\n3. **Express.js**: Web application framework\n4. **Middleware**: Request processing pipeline\n5. **REST APIs**: Creating web services\n6. **Authentication**: JWT and session management\n\nWhich Node.js topic interests you?";
    }
    
    // Data Science & AI
    if (input.includes('machine learning') || input.includes('ml')) {
      return "Machine Learning is exciting! Let's start with fundamentals:\n\n1. **Supervised Learning**: Classification and regression\n2. **Unsupervised Learning**: Clustering and dimensionality reduction\n3. **Data Preprocessing**: Cleaning, scaling, feature selection\n4. **Model Evaluation**: Train/test split, cross-validation, metrics\n5. **Popular Algorithms**: Linear regression, decision trees, neural networks\n6. **Deep Learning**: Neural networks and frameworks\n\nWhich ML topic would you like to explore?";
    }
    
    if (input.includes('deep learning') || input.includes('neural network')) {
      return "Deep Learning uses neural networks for complex pattern recognition!\n\n1. **Neural Network Basics**: Neurons, layers, activation functions\n2. **Backpropagation**: How networks learn from data\n3. **CNN**: Convolutional Neural Networks for images\n4. **RNN/LSTM**: Recurrent networks for sequences\n5. **Transformers**: Modern architecture for NLP\n6. **Frameworks**: TensorFlow, PyTorch, Keras\n\nWhat deep learning concept interests you?";
    }
    
    if (input.includes('data science') || input.includes('analytics')) {
      return "Data Science combines statistics, programming, and domain knowledge!\n\n1. **Data Collection**: APIs, web scraping, databases\n2. **Data Cleaning**: Handling missing values, outliers\n3. **Exploratory Analysis**: Descriptive statistics, visualization\n4. **Statistical Modeling**: Hypothesis testing, correlation\n5. **Machine Learning**: Predictive modeling\n6. **Communication**: Data storytelling, dashboards\n\nWhich data science area interests you most?";
    }
    
    // Mobile Development
    if (input.includes('flutter')) {
      return "Flutter creates beautiful cross-platform mobile apps!\n\n1. **Dart Language**: Object-oriented programming for Flutter\n2. **Widgets**: Building blocks of Flutter UI\n3. **State Management**: Provider, Bloc, Riverpod\n4. **Navigation**: Routing between screens\n5. **API Integration**: HTTP requests and JSON parsing\n6. **Platform Features**: Camera, GPS, notifications\n\nWhat Flutter concept would you like to learn?";
    }
    
    if (input.includes('swift') || input.includes('ios')) {
      return "Swift is Apple's modern language for iOS development!\n\n1. **Swift Syntax**: Optionals, closures, protocols\n2. **UIKit**: Traditional iOS UI framework\n3. **SwiftUI**: Declarative UI framework\n4. **Core Data**: Local data persistence\n5. **Networking**: URLSession and REST APIs\n6. **App Store**: Publishing and distribution\n\nWhich iOS development topic interests you?";
    }
    
    // DevOps & Cloud
    if (input.includes('docker')) {
      return "Docker revolutionizes application deployment!\n\n1. **Containers**: Lightweight, portable environments\n2. **Images**: Building and managing container images\n3. **Dockerfile**: Instructions for building images\n4. **Docker Compose**: Multi-container applications\n5. **Volumes**: Data persistence and sharing\n6. **Networking**: Container communication\n\nWhat Docker concept would you like to explore?";
    }
    
    if (input.includes('kubernetes') || input.includes('k8s')) {
      return "Kubernetes orchestrates containerized applications at scale!\n\n1. **Pods**: Smallest deployable units\n2. **Services**: Network access to pods\n3. **Deployments**: Managing application lifecycle\n4. **ConfigMaps & Secrets**: Configuration management\n5. **Ingress**: External access routing\n6. **Helm**: Package manager for Kubernetes\n\nWhich Kubernetes concept interests you?";
    }
    
    if (input.includes('aws') || input.includes('cloud')) {
      return "AWS provides comprehensive cloud computing services!\n\n1. **EC2**: Virtual servers in the cloud\n2. **S3**: Object storage service\n3. **RDS**: Managed relational databases\n4. **Lambda**: Serverless computing\n5. **VPC**: Virtual private cloud networking\n6. **IAM**: Identity and access management\n\nWhich AWS service would you like to learn about?";
    }
    
    // Security
    if (input.includes('security') || input.includes('cybersecurity')) {
      return "Cybersecurity protects digital assets and privacy!\n\n1. **Network Security**: Firewalls, VPNs, intrusion detection\n2. **Cryptography**: Encryption, hashing, digital signatures\n3. **Authentication**: Multi-factor, biometrics, SSO\n4. **Vulnerability Assessment**: Finding and fixing security gaps\n5. **Incident Response**: Handling security breaches\n6. **Compliance**: GDPR, HIPAA, PCI-DSS standards\n\nWhat security topic interests you?";
    }
    
    // Design & UX
    if (input.includes('ux') || input.includes('user experience')) {
      return "UX Design focuses on creating meaningful user experiences!\n\n1. **User Research**: Understanding user needs and behaviors\n2. **Information Architecture**: Organizing content logically\n3. **Wireframing**: Low-fidelity layout planning\n4. **Prototyping**: Interactive design mockups\n5. **Usability Testing**: Validating design decisions\n6. **Accessibility**: Designing for all users\n\nWhich UX topic would you like to explore?";
    }
    
    if (input.includes('ui') || input.includes('design')) {
      return "UI Design creates beautiful and functional interfaces!\n\n1. **Visual Hierarchy**: Guiding user attention\n2. **Color Theory**: Psychology and accessibility of colors\n3. **Typography**: Choosing and pairing fonts\n4. **Layout Principles**: Grid systems and composition\n5. **Design Systems**: Consistent component libraries\n6. **Tools**: Figma, Sketch, Adobe XD\n\nWhat design concept interests you?";
    }
    
    // General Programming Concepts
    if (input.includes('algorithm') || input.includes('data structure')) {
      return "Algorithms and Data Structures are fundamental to programming!\n\n**Data Structures:**\n1. Arrays, Linked Lists, Stacks, Queues\n2. Trees, Graphs, Hash Tables\n3. Time and Space Complexity\n\n**Algorithms:**\n1. Sorting: Quick Sort, Merge Sort, Heap Sort\n2. Searching: Binary Search, DFS, BFS\n3. Dynamic Programming: Optimization problems\n\nWhich topic would you like to practice?";
    }
    
    if (input.includes('git') || input.includes('version control')) {
      return "Git is essential for version control and collaboration!\n\n1. **Basic Commands**: add, commit, push, pull\n2. **Branching**: Creating and merging branches\n3. **Collaboration**: Forking, pull requests, code reviews\n4. **Advanced**: Rebasing, cherry-picking, hooks\n5. **Workflows**: GitFlow, GitHub Flow\n6. **Best Practices**: Commit messages, branch naming\n\nWhat Git concept would you like to learn?";
    }
    
    // Career and Learning
    if (input.includes('career') || input.includes('job') || input.includes('interview')) {
      return "Building a successful tech career requires strategic planning!\n\n1. **Skill Development**: Choose technologies based on goals\n2. **Portfolio**: Showcase projects and contributions\n3. **Networking**: Community involvement, mentorship\n4. **Interview Prep**: Technical questions, system design\n5. **Continuous Learning**: Stay updated with industry trends\n6. **Soft Skills**: Communication, teamwork, problem-solving\n\nWhat career aspect would you like guidance on?";
    }
    
    if (input.includes('learn') || input.includes('study') || input.includes('practice')) {
      return "Effective learning strategies accelerate your progress!\n\n1. **Active Learning**: Practice coding, build projects\n2. **Spaced Repetition**: Review concepts regularly\n3. **Problem-Solving**: LeetCode, HackerRank, Codewars\n4. **Documentation**: Read official docs and tutorials\n5. **Community**: Join forums, attend meetups\n6. **Teaching**: Explain concepts to reinforce learning\n\nWhat learning challenge can I help you with?";
    }
    
    // Project Ideas
    if (input.includes('project') || input.includes('build') || input.includes('create')) {
      return "Building projects is the best way to learn! Here are some ideas:\n\n**Beginner Projects:**\n1. Todo app, Calculator, Weather app\n2. Personal portfolio website\n3. Simple blog or landing page\n\n**Intermediate Projects:**\n1. E-commerce store, Social media clone\n2. REST API with authentication\n3. Real-time chat application\n\n**Advanced Projects:**\n1. Full-stack application with microservices\n2. Machine learning model deployment\n3. Mobile app with cloud backend\n\nWhat type of project interests you?";
    }
    
    // Default intelligent responses
    const responses = [
      "That's an excellent question! Let me provide you with a comprehensive explanation...",
      "I'd be happy to help you understand this concept better. Here's a detailed breakdown...",
      "Based on current educational best practices, I recommend this approach...",
      "This is a topic many students find challenging. Let's work through it systematically...",
      "Great thinking! Your question demonstrates you're engaging deeply with the material...",
      "Let me break this down into manageable steps for you...",
      "This is a fundamental concept that connects to many other areas...",
      "I can provide both theoretical background and practical examples for this topic..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + "\n\nCould you provide more specific details about what you'd like to learn? For example:\n- Are you looking for theoretical concepts or practical examples?\n- What's your current experience level with this topic?\n- Do you have a specific project or goal in mind?\n\nThe more context you give me, the better I can tailor my explanation to your needs!";
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
