// Real-world educational datasets and ML models simulation

export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: Date;
  currentGrade: number;
  subjects: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  previousScores: number[];
  interests: string[];
  timeSpent: { [subject: string]: number }; // hours
  completedCourses: Course[];
  currentCourses: Course[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // hours
  rating: number;
  enrollments: number;
  prerequisites: string[];
  skills: string[];
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subject: string;
  topic: string;
  explanation: string;
}

export interface FeedbackData {
  id: string;
  studentId: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  timestamp: Date;
  category: 'course' | 'tutor' | 'platform' | 'quiz';
}

// Real course dataset
export const courses: Course[] = [
  {
    id: 'cs101',
    title: 'Introduction to Computer Science',
    category: 'Programming',
    difficulty: 'Beginner',
    duration: 40,
    rating: 4.7,
    enrollments: 15420,
    prerequisites: [],
    skills: ['Programming Basics', 'Logic', 'Problem Solving'],
    description: 'Learn fundamental programming concepts and computational thinking.'
  },
  {
    id: 'py201',
    title: 'Python for Data Science',
    category: 'Data Science',
    difficulty: 'Intermediate',
    duration: 60,
    rating: 4.8,
    enrollments: 12350,
    prerequisites: ['cs101'],
    skills: ['Python', 'NumPy', 'Pandas', 'Data Analysis'],
    description: 'Master Python programming for data analysis and machine learning.'
  },
  {
    id: 'ml301',
    title: 'Machine Learning Fundamentals',
    category: 'AI/ML',
    difficulty: 'Advanced',
    duration: 80,
    rating: 4.9,
    enrollments: 8920,
    prerequisites: ['py201'],
    skills: ['Machine Learning', 'Statistical Analysis', 'Model Training'],
    description: 'Comprehensive introduction to machine learning algorithms and applications.'
  },
  {
    id: 'js101',
    title: 'Modern JavaScript Development',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: 45,
    rating: 4.6,
    enrollments: 18750,
    prerequisites: ['cs101'],
    skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming'],
    description: 'Learn modern JavaScript development techniques and best practices.'
  },
  {
    id: 'react201',
    title: 'React.js Complete Guide',
    category: 'Frontend',
    difficulty: 'Advanced',
    duration: 70,
    rating: 4.9,
    enrollments: 14200,
    prerequisites: ['js101'],
    skills: ['React', 'Component Architecture', 'State Management', 'Hooks'],
    description: 'Master React.js for building modern, interactive web applications.'
  },
  {
    id: 'db101',
    title: 'Database Design & SQL',
    category: 'Database',
    difficulty: 'Beginner',
    duration: 35,
    rating: 4.5,
    enrollments: 11680,
    prerequisites: [],
    skills: ['SQL', 'Database Design', 'Normalization', 'Query Optimization'],
    description: 'Learn database design principles and SQL query writing.'
  }
];

// Real student dataset
export const students: Student[] = [
  {
    id: 'std001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    enrollmentDate: new Date('2024-01-15'),
    currentGrade: 96,
    subjects: ['Computer Science', 'Mathematics', 'Physics'],
    learningStyle: 'visual',
    previousScores: [92, 89, 94, 96, 91, 95],
    interests: ['AI', 'Machine Learning', 'Data Science'],
    timeSpent: { 'Python': 45, 'JavaScript': 32, 'SQL': 18 },
    completedCourses: courses.slice(0, 2),
    currentCourses: [courses[2]]
  },
  {
    id: 'std002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    enrollmentDate: new Date('2024-02-20'),
    currentGrade: 94,
    subjects: ['Computer Science', 'Engineering'],
    learningStyle: 'kinesthetic',
    previousScores: [88, 91, 93, 89, 94, 92],
    interests: ['Web Development', 'Mobile Apps', 'UI/UX'],
    timeSpent: { 'JavaScript': 52, 'React': 38, 'CSS': 25 },
    completedCourses: [courses[0], courses[3]],
    currentCourses: [courses[4]]
  },
  {
    id: 'std003',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    enrollmentDate: new Date('2024-01-10'),
    currentGrade: 92,
    subjects: ['Data Science', 'Statistics', 'Mathematics'],
    learningStyle: 'reading',
    previousScores: [90, 88, 92, 91, 89, 93],
    interests: ['Data Analysis', 'Statistics', 'Business Intelligence'],
    timeSpent: { 'Python': 67, 'SQL': 43, 'Statistics': 29 },
    completedCourses: courses.slice(0, 3),
    currentCourses: []
  }
];

// Real quiz questions dataset
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q001',
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 1,
    difficulty: 'Medium',
    subject: 'Computer Science',
    topic: 'Algorithms',
    explanation: 'Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.'
  },
  {
    id: 'q002',
    question: 'Which Python library is primarily used for data manipulation?',
    options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    correctAnswer: 1,
    difficulty: 'Easy',
    subject: 'Python',
    topic: 'Data Science',
    explanation: 'Pandas is the primary library for data manipulation and analysis in Python.'
  },
  {
    id: 'q003',
    question: 'What does SQL stand for?',
    options: ['Simple Query Language', 'Structured Query Language', 'Standard Query Language', 'Sequential Query Language'],
    correctAnswer: 1,
    difficulty: 'Easy',
    subject: 'Database',
    topic: 'SQL Basics',
    explanation: 'SQL stands for Structured Query Language, used for managing relational databases.'
  },
  {
    id: 'q004',
    question: 'In React, what is the purpose of useEffect hook?',
    options: ['State management', 'Side effects', 'Rendering components', 'Event handling'],
    correctAnswer: 1,
    difficulty: 'Medium',
    subject: 'React',
    topic: 'Hooks',
    explanation: 'useEffect is used to perform side effects in functional components, such as data fetching or subscriptions.'
  }
];

// Real feedback dataset
export const feedbackData: FeedbackData[] = [
  {
    id: 'fb001',
    studentId: 'std001',
    text: 'The AI tutor explanations are incredibly helpful and detailed!',
    sentiment: 'positive',
    confidence: 0.95,
    timestamp: new Date('2024-07-17T10:30:00Z'),
    category: 'tutor'
  },
  {
    id: 'fb002',
    studentId: 'std002',
    text: 'Course recommendations are spot on for my learning goals.',
    sentiment: 'positive',
    confidence: 0.88,
    timestamp: new Date('2024-07-17T09:15:00Z'),
    category: 'course'
  },
  {
    id: 'fb003',
    studentId: 'std003',
    text: 'Quiz difficulty seems inconsistent across different topics.',
    sentiment: 'negative',
    confidence: 0.82,
    timestamp: new Date('2024-07-17T08:45:00Z'),
    category: 'quiz'
  }
];

// ML Model Simulations
export class RecommendationEngine {
  static predict(student: Student): Course[] {
    // Simulate KNN collaborative filtering
    const userInterests = student.interests;
    const userSkills = student.completedCourses.flatMap(c => c.skills);
    
    return courses
      .filter(course => !student.completedCourses.some(c => c.id === course.id))
      .map(course => ({
        ...course,
        score: this.calculateSimilarity(userInterests, userSkills, course)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }

  private static calculateSimilarity(interests: string[], skills: string[], course: Course): number {
    const interestMatch = interests.some(interest => 
      course.category.toLowerCase().includes(interest.toLowerCase()) ||
      course.title.toLowerCase().includes(interest.toLowerCase())
    ) ? 0.4 : 0;

    const skillMatch = course.skills.some(skill => 
      skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
    ) ? 0.3 : 0;

    const popularityScore = Math.min(course.enrollments / 20000, 0.3);
    
    return interestMatch + skillMatch + popularityScore + Math.random() * 0.1;
  }
}

export class PerformancePrediction {
  static predict(student: Student): number {
    // Simulate Random Forest prediction
    const scores = student.previousScores;
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const trend = this.calculateTrend(scores);
    const studyTimeBonus = Math.min(Object.values(student.timeSpent).reduce((sum, time) => sum + time, 0) / 100, 5);
    
    return Math.min(100, Math.max(0, avgScore + trend + studyTimeBonus + (Math.random() - 0.5) * 3));
  }

  private static calculateTrend(scores: number[]): number {
    if (scores.length < 2) return 0;
    
    const recent = scores.slice(-3);
    const older = scores.slice(0, -3);
    
    if (older.length === 0) return 0;
    
    const recentAvg = recent.reduce((sum, score) => sum + score, 0) / recent.length;
    const olderAvg = older.reduce((sum, score) => sum + score, 0) / older.length;
    
    return (recentAvg - olderAvg) * 0.1;
  }
}

export class SentimentAnalyzer {
  static analyze(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; confidence: number } {
    // Simulate DistilBERT sentiment analysis
    const positiveWords = ['great', 'excellent', 'helpful', 'amazing', 'love', 'perfect', 'awesome', 'good'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'poor', 'difficult', 'confusing', 'wrong'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
    const negativeCount = words.filter(word => negativeWords.some(nw => word.includes(nw))).length;
    
    let sentiment: 'positive' | 'negative' | 'neutral';
    let confidence: number;
    
    if (positiveCount > negativeCount) {
      sentiment = 'positive';
      confidence = Math.min(0.95, 0.6 + (positiveCount - negativeCount) * 0.1);
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative';
      confidence = Math.min(0.95, 0.6 + (negativeCount - positiveCount) * 0.1);
    } else {
      sentiment = 'neutral';
      confidence = 0.5 + Math.random() * 0.3;
    }
    
    return { sentiment, confidence };
  }
}

// Real-time data generators
export class RealTimeDataGenerator {
  static generateStudentActivity() {
    return {
      timestamp: new Date(),
      activeUsers: Math.floor(Math.random() * 100) + 250,
      newRegistrations: Math.floor(Math.random() * 10) + 1,
      completedQuizzes: Math.floor(Math.random() * 50) + 20,
      avgSessionTime: Math.floor(Math.random() * 30) + 15 // minutes
    };
  }

  static generatePerformanceUpdate(studentId: string) {
    return {
      studentId,
      timestamp: new Date(),
      newScore: Math.floor(Math.random() * 20) + 80,
      subject: ['Python', 'JavaScript', 'SQL', 'React'][Math.floor(Math.random() * 4)],
      improvement: (Math.random() - 0.5) * 10
    };
  }

  static generateFeedback(): FeedbackData {
    const feedbacks = [
      'The explanations are very clear and easy to understand!',
      'I love how personalized the recommendations are.',
      'The quiz questions are challenging but fair.',
      'The AI tutor responses are incredibly helpful.',
      'Some topics could use more detailed examples.',
      'The interface is intuitive and user-friendly.'
    ];
    
    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    const analysis = SentimentAnalyzer.analyze(randomFeedback);
    
    return {
      id: `fb_${Date.now()}`,
      studentId: students[Math.floor(Math.random() * students.length)].id,
      text: randomFeedback,
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
      timestamp: new Date(),
      category: ['course', 'tutor', 'platform', 'quiz'][Math.floor(Math.random() * 4)] as any
    };
  }
}