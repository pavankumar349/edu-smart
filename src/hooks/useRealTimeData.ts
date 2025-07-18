import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { RealTimeDataGenerator, students, FeedbackData } from '@/data/realDatasets';

interface RealTimeMetrics {
  activeUsers: number;
  newRegistrations: number;
  completedQuizzes: number;
  avgSessionTime: number;
  lastUpdated: Date;
}

interface PerformanceUpdate {
  studentId: string;
  newScore: number;
  subject: string;
  improvement: number;
  timestamp: Date;
}

export const useRealTimeData = () => {
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    activeUsers: 342,
    newRegistrations: 15,
    completedQuizzes: 127,
    avgSessionTime: 24,
    lastUpdated: new Date()
  });

  const [performanceUpdates, setPerformanceUpdates] = useState<PerformanceUpdate[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<FeedbackData[]>([]);
  const [isLive, setIsLive] = useState(false);

  const handleWebSocketMessage = useCallback((message: any) => {
    switch (message.type) {
      case 'metrics_update':
        setMetrics(prev => ({
          ...prev,
          ...message.data,
          lastUpdated: new Date()
        }));
        break;
      case 'performance_update':
        setPerformanceUpdates(prev => [message.data, ...prev.slice(0, 9)]);
        break;
      case 'new_feedback':
        setRecentFeedback(prev => [message.data, ...prev.slice(0, 4)]);
        break;
    }
  }, []);

  const { isConnected, sendMessage } = useWebSocket({
    url: 'ws://localhost:8080/realtime',
    onMessage: handleWebSocketMessage,
    onConnect: () => setIsLive(true),
    onDisconnect: () => setIsLive(false)
  });

  // Simulate real-time updates when WebSocket is not available
  useEffect(() => {
    if (!isConnected) {
      const interval = setInterval(() => {
        // Generate activity metrics
        const newActivity = RealTimeDataGenerator.generateStudentActivity();
        setMetrics(prev => ({
          activeUsers: newActivity.activeUsers,
          newRegistrations: prev.newRegistrations + newActivity.newRegistrations,
          completedQuizzes: prev.completedQuizzes + newActivity.completedQuizzes,
          avgSessionTime: newActivity.avgSessionTime,
          lastUpdated: newActivity.timestamp
        }));

        // Generate performance updates
        if (Math.random() > 0.7) {
          const studentId = students[Math.floor(Math.random() * students.length)].id;
          const update = RealTimeDataGenerator.generatePerformanceUpdate(studentId);
          setPerformanceUpdates(prev => [update, ...prev.slice(0, 9)]);
        }

        // Generate new feedback
        if (Math.random() > 0.8) {
          const newFeedback = RealTimeDataGenerator.generateFeedback();
          setRecentFeedback(prev => [newFeedback, ...prev.slice(0, 4)]);
        }
      }, 3000); // Update every 3 seconds

      setIsLive(true);

      return () => {
        clearInterval(interval);
        setIsLive(false);
      };
    }
  }, [isConnected]);

  const requestUpdate = useCallback((type: string) => {
    if (isConnected) {
      sendMessage({ type: 'request_update', data: { updateType: type } });
    }
  }, [isConnected, sendMessage]);

  return {
    metrics,
    performanceUpdates,
    recentFeedback,
    isLive,
    isConnected,
    requestUpdate
  };
};