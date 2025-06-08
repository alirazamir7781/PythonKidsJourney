import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AchievementNotificationProps {
  title: string;
  description: string;
  points: number;
  onClose: () => void;
}

export default function AchievementNotification({
  title,
  description,
  points,
  onClose
}: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed top-20 right-6 z-50 transform transition-transform duration-300 ${
      isVisible ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <Card className="gradient-sunny text-white shadow-2xl achievement-glow rounded-xl overflow-hidden max-w-sm">
        <CardContent className="p-0">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 right-2 text-4xl">🏆</div>
              <div className="absolute bottom-2 left-2 text-2xl">⭐</div>
            </div>
            
            <div className="relative p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-trophy text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="text-sm opacity-90">{description}</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 h-6 w-6 p-0"
                >
                  <i className="fas fa-times text-xs"></i>
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-star text-[#FECA57]"></i>
                  <span className="font-bold">+{points} points earned!</span>
                </div>
                
                <div className="text-2xl animate-bounce">🎉</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
