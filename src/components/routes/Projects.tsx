import { motion } from 'framer-motion';
import { ProjectGrid } from '@/components/Section2/ProjectGrid/ProjectGrid';
import { ProjectSubmissionForm } from '@/components/Section2/ProjectGrid/ProjectSubmissionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Grid, List } from 'lucide-react';
import FloatingNavbar from '../Section1/Navbar/Navbar';
import Promo from '../Section5/promo';
import Footer from '../Footer';

export const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar/>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent">
            Project Showcasee
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover amazing projects from our community or share your own creations with the world.
          </p>
        </motion.div>

        <Tabs defaultValue="browse" className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <TabsList className="bg-black border border-purple-800 rounded-lg overflow-hidden">
              <TabsTrigger 
                value="browse"
                className="data-[state=active]:bg-purple-800 data-[state=active]:text-white px-4 py-2 transition-colors duration-300"
              >
                <Grid className="w-4 h-4 mr-2" />
                Browse Projects
              </TabsTrigger>
              <TabsTrigger 
                value="submit"
                className="data-[state=active]:bg-purple-800 data-[state=active]:text-white px-4 py-2 transition-colors duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Project
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-purple-800 text-purple-400 hover:bg-purple-800 hover:text-white transition-colors duration-300"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-purple-800 text-purple-400 hover:bg-purple-800 hover:text-white transition-colors duration-300"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="browse" className="mt-0">
            <ProjectGrid />
          </TabsContent>

          <TabsContent value="submit" className="mt-0">
            <ProjectSubmissionForm />
          </TabsContent>
        </Tabs>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className="text-center py-16 border-t border-purple-800"
          >
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
          Want to contribute?
          </h2>
          <p className="text-gray-400 mb-6">
          Join our community and showcase your projects to the world.
          </p>
          <Button className="bg-purple-800 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-transform duration-300 transform hover:scale-105">
            Get Started
            </Button>
            </motion.div> */}
      </div>
            <Promo/>
            <Footer/>
    </div>
  );
};

export default ProjectsPage;