import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Main } from "./components/Section1/Hero/Main";
import Test from "./components/routes/Test";
import Projects from "./components/routes/Projects";
import Community from "./components/routes/Community";
import Resources from "./components/routes/Resources";
import Contact from "./components/routes/Contact";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/auth/Dashboard";
import Blogs from "./components/routes/Blogs";
import Loader from "./components/elements/Loader"


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/loader" element={<Loader />} />

                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </SignedIn>
              <SignedOut>
                <Navigate to="/auth" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;