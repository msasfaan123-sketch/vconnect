import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Heart, 
  Camera, 
  Mic, 
  TrendingUp, 
  Users, 
  Shield,
  BarChart3,
  Activity,
  Smile,
  Frown,
  Meh,
  MessageCircle
} from "lucide-react";

interface EmotionData {
  emotion: string;
  confidence: number;
  color: string;
  icon: any;
}

interface BehaviorPattern {
  pattern: string;
  frequency: number;
  trend: "up" | "down" | "stable";
}

const SoulScan = () => {
  const [textInput, setTextInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [currentEmotions, setCurrentEmotions] = useState<EmotionData[]>([]);
  const [behaviorPatterns, setBehaviorPatterns] = useState<BehaviorPattern[]>([
    { pattern: "Positive Communication", frequency: 85, trend: "up" },
    { pattern: "Help-Seeking Behavior", frequency: 72, trend: "stable" },
    { pattern: "Community Engagement", frequency: 65, trend: "up" },
    { pattern: "Stress Indicators", frequency: 28, trend: "down" }
  ]);

  const analyzeText = async () => {
    if (!textInput.trim()) return;
    
    setAnalyzing(true);
    
    // Simulate AI emotion detection
    setTimeout(() => {
      const emotions: EmotionData[] = [
        { emotion: "Joy", confidence: 75, color: "text-green-600", icon: Smile },
        { emotion: "Neutral", confidence: 60, color: "text-blue-600", icon: Meh },
        { emotion: "Concern", confidence: 45, color: "text-yellow-600", icon: Frown },
        { emotion: "Hope", confidence: 80, color: "text-purple-600", icon: Heart }
      ];
      
      setCurrentEmotions(emotions.sort((a, b) => b.confidence - a.confidence));
      setAnalyzing(false);
    }, 2000);
  };

  const emotionalTrends = [
    { week: "Week 1", happiness: 65, stress: 35, engagement: 70 },
    { week: "Week 2", happiness: 72, stress: 28, engagement: 75 },
    { week: "Week 3", happiness: 78, stress: 25, engagement: 82 },
    { week: "Week 4", happiness: 75, stress: 30, engagement: 85 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="glass-card p-3 rounded-full">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            SoulScan
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          AI-powered emotional intelligence and behavioral insights for personal well-being
        </p>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analysis">Real-time Analysis</TabsTrigger>
          <TabsTrigger value="patterns">Behavior Patterns</TabsTrigger>
          <TabsTrigger value="trends">Emotional Trends</TabsTrigger>
          <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          {/* Text Analysis Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Emotion Detection</span>
              </CardTitle>
              <CardDescription>
                Share your thoughts and let AI analyze your emotional state
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="How are you feeling today? Share what's on your mind..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-24 bg-white/50"
              />
              <Button 
                onClick={analyzeText}
                disabled={analyzing || !textInput.trim()}
                className="w-full"
              >
                {analyzing ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze Emotions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Current Emotions Display */}
          {currentEmotions.length > 0 && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Detected Emotions</CardTitle>
                <CardDescription>Real-time emotional analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentEmotions.map((emotion, index) => {
                    const IconComponent = emotion.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <IconComponent className={`h-5 w-5 ${emotion.color}`} />
                          <span className="font-medium">{emotion.emotion}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={emotion.confidence} className="w-20" />
                          <span className="text-sm font-medium">{emotion.confidence}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Future Features Placeholder */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card border-dashed border-2 opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Facial Recognition</span>
                  <Badge variant="secondary">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>
                  Advanced emotion detection through facial expressions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card border-dashed border-2 opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="h-5 w-5" />
                  <span>Voice Analysis</span>
                  <Badge variant="secondary">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>
                  Emotion detection through voice tone and patterns
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Behavioral Patterns</span>
              </CardTitle>
              <CardDescription>
                Analysis of your interaction patterns and behaviors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behaviorPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <span className="font-medium">{pattern.pattern}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={pattern.frequency} className="w-24" />
                      <span className="text-sm font-medium">{pattern.frequency}%</span>
                      <Badge variant={
                        pattern.trend === "up" ? "default" : 
                        pattern.trend === "down" ? "destructive" : "secondary"
                      }>
                        {pattern.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Emotional Trends</span>
              </CardTitle>
              <CardDescription>
                Track your emotional well-being over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {emotionalTrends.map((trend, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium">{trend.week}</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Happiness</span>
                          <span>{trend.happiness}%</span>
                        </div>
                        <Progress value={trend.happiness} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Stress</span>
                          <span>{trend.stress}%</span>
                        </div>
                        <Progress value={trend.stress} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engagement</span>
                          <span>{trend.engagement}%</span>
                        </div>
                        <Progress value={trend.engagement} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compatibility" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Community Compatibility</span>
              </CardTitle>
              <CardDescription>
                Find emotionally compatible community members for better social connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-8 bg-white/20 rounded-lg">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Privacy Protected</h3>
                  <p className="text-muted-foreground">
                    Your emotional data is anonymized and used only for community matching algorithms
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/30 rounded-lg">
                    <h4 className="font-medium mb-2">Compatibility Score</h4>
                    <div className="flex items-center space-x-2">
                      <Progress value={78} className="flex-1" />
                      <span className="font-bold">78%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on emotional patterns and communication style
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/30 rounded-lg">
                    <h4 className="font-medium mb-2">Suggested Connections</h4>
                    <div className="space-y-2">
                      <Badge variant="outline">Supportive Community Members</Badge>
                      <Badge variant="outline">Similar Interest Groups</Badge>
                      <Badge variant="outline">Mentorship Opportunities</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SoulScan;