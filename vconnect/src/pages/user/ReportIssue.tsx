import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    issueType: '',
    title: '',
    description: '',
    location: '',
    urgency: '',
    contactNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const issueTypes = [
    'Water Supply',
    'Road & Transportation',
    'Education',
    'Healthcare',
    'Electricity',
    'Sanitation',
    'Agriculture Support',
    'Employment',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Can wait for scheduled maintenance' },
    { value: 'medium', label: 'Medium - Needs attention within a week' },
    { value: 'high', label: 'High - Urgent, needs immediate attention' },
    { value: 'critical', label: 'Critical - Emergency situation' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Issue Reported Successfully!",
      description: "Your report has been submitted and assigned ticket #VCT-2024-001",
    });

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="glass-card max-w-2xl mx-auto text-center">
          <CardContent className="py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Issue Reported Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your report has been submitted with ticket number <span className="font-mono font-semibold">#VCT-2024-001</span>
            </p>
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <p>• You will receive updates via SMS/WhatsApp</p>
              <p>• Expected response time: 24-48 hours</p>
              <p>• Track progress in the Status section</p>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  issueType: '',
                  title: '',
                  description: '',
                  location: '',
                  urgency: '',
                  contactNumber: ''
                });
              }}
              className="glass-button"
            >
              Report Another Issue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="glass-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            <span>Report an Issue</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Submit problems or requests for your village. We'll track and update you on progress.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueType">Issue Type *</Label>
                <Select value={formData.issueType} onValueChange={(value) => handleInputChange('issueType', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level *</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Brief description of the issue"
                className="glass-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location/Area *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Specific location where the issue occurs"
                className="glass-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Provide detailed information about the issue, when it started, how it affects the community, etc."
                className="glass-input h-32"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                placeholder="Your phone number for updates (optional)"
                className="glass-input"
              />
            </div>

            <div className="space-y-2">
              <Label>Attach Photos (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload images or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB each
                </p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full glass-button"
              disabled={isSubmitting || !formData.issueType || !formData.title || !formData.description || !formData.location || !formData.urgency}
            >
              {isSubmitting ? "Submitting Report..." : "Submit Issue Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}