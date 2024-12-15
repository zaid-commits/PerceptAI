import Footer from "../Footer";
import FloatingNavbar from "../Section1/Navbar/Navbar";
import ProjectGrid from "../Section2/ProjectGrid/ProjectGrid";
import ProjectSubmissionForm from "../Section2/ProjectGrid/ProjectSubmissionForm";
function Projects() {
  return (
    <div>
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center text-purple-500 mb-8">Add Your Project</h2>
        <ProjectSubmissionForm />
      </div>
      <ProjectGrid />
      <Footer />
    </div>
  );
}

export default Projects;