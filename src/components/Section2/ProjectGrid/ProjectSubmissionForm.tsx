import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Link, Tag, X, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FormData {
  title: string;
  author: string;
  description: string;
  category: string;
  imageUrl: string;
  demoUrl: string;
  codeUrl: string;
  tags: string[];
}

export const ProjectSubmissionForm = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: user?.fullName || '',
    description: '',
    category: '',
    imageUrl: '',
    demoUrl: '',
    codeUrl: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://ts-backend-6swe.onrender.com/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Project submitted successfully!');
        setFormData({
          title: '',
          author: user?.fullName || '',
          description: '',
          category: '',
          imageUrl: '',
          demoUrl: '',
          codeUrl: '',
          tags: []
        });
      } else {
        throw new Error('Failed to submit project');
      }
    } catch (error) {
      toast.error('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-black border-purple-800">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-400">Submit Your Project</CardTitle>
          <CardDescription>Share your amazing project with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-purple-400">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-black border-purple-800 focus:border-purple-600 text-white"
                placeholder="Enter your project title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-purple-400">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-black border-purple-800 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-black border-purple-800">
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Apps</SelectItem>
                  <SelectItem value="ai">AI/ML</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-purple-400">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-black border-purple-800 focus:border-purple-600 text-white min-h-[120px]"
                placeholder="Describe your project..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-purple-400">
                <Upload className="w-4 h-4 inline mr-2" />
                Project Image URL
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="bg-black border-purple-800 focus:border-purple-600 text-white"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl" className="text-purple-400">
                <Link className="w-4 h-4 inline mr-2" />
                Demo URL
              </Label>
              <Input
                id="demoUrl"
                value={formData.demoUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                className="bg-black border-purple-800 focus:border-purple-600 text-white"
                placeholder="Enter demo URL"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeUrl" className="text-purple-400">
                <Code className="w-4 h-4 inline mr-2" />
                Code Repository URL
              </Label>
              <Input
                id="codeUrl"
                value={formData.codeUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, codeUrl: e.target.value }))}
                className="bg-black border-purple-800 focus:border-purple-600 text-white"
                placeholder="Enter repository URL"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-purple-400">
                <Tag className="w-4 h-4 inline mr-2" />
                Tags
              </Label>
              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="bg-black border-purple-800 focus:border-purple-600 text-white"
                  placeholder="Add tags..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button 
                  type="button"
                  onClick={addTag}
                  className="bg-purple-800 hover:bg-purple-700 text-white"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline"
                    className="bg-purple-900/20 text-purple-300 border-purple-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-800 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectSubmissionForm;