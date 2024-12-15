import { motion } from 'framer-motion';
import { ProjectGrid } from '../Section2/ProjectGrid/ProjectGrid';
import { ProjectSubmissionForm } from '../Section2/ProjectGrid/ProjectSubmissionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Grid } from 'lucide-react';

export const Projects = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent">
            Project Showcase
          </h1>
        </motion.div>
        <Tabs defaultValue="browse">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Browse Projects
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Submit Project
            </TabsTrigger>
          </TabsList>
          <TabsContent value="browse">
            <ProjectGrid />
          </TabsContent>
          <TabsContent value="submit">
            <ProjectSubmissionForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Projects;