import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FloatingNavbar from "../Navbar";
import ModernPurpleLoader from "../elements/Loader";
import toast from "react-hot-toast";
import { FaShare, FaFilter, FaSort } from "react-icons/fa";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FaFile } from "react-icons/fa6";

interface Resource {
  _id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  author: string;
  posterImage?: string;
  posterUsername?: string;
  detailedDescription: string;
  tags: string[];
  sharableLink: string;
}

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Link copied to clipboard!"),
      (err) => console.error("Could not copy text: ", err)
    );
  };

  return (
    <Link to={`/resources/${resource._id}`} className="block">
      <div className="relative bg-[#0c0c0c] p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(resource.sharableLink);
          }}
          className="absolute top-4 right-4 bg-purple-800 text-white p-2 rounded-full hover:bg-purple-700 transition-colors flex items-center shadow-sm"
        >
          <FaShare className="h-5 w-5 text-white" />
        </button>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{resource.title}</h3>
          <span className="inline-block bg-purple-800 text-white text-sm px-3 py-1 rounded-full mb-4">
            {resource.category}
          </span>
          <p className="text-gray-300 mb-4">
            {truncateText(resource.description, 20)}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-white">
            Posted by{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
              {resource.posterUsername ?? "Unknown"}
            </a>
          </span>
          {resource.posterImage && (
            <img
              className="rounded-full w-10 h-10 ml-4 border-2 border-purple-800"
              src={resource.posterImage || "/placeholder.svg"}
              alt={resource.posterUsername ?? "Poster"}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

const AllResources: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("https://ts-backend-6swe.onrender.com/api/resources");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const data = await response.json();

        const updatedResources = data.map((resource: Resource) => ({
          ...resource,
          sharableLink: `http://localhost:5173/resources/${resource._id}`,
        }));

        setResources(updatedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Failed to load resources.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredResources = resources.filter((resource) =>
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <ModernPurpleLoader />;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <FloatingNavbar />
      <div className="py-10">
        {/* Hero Section */}
        <div className="bg-[#0c0c0c] py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              PerceptAI Resource Library
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Explore a curated collection of resources to enhance your projects and knowledge.
            </p>
            <div className="flex justify-center space-x-4">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-purple-800 text-white hover:bg-purple-700 hover:text-white transition-colors shadow-sm"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    CTRL+S to Search
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-lg bg-[#0c0c0c] text-white p-6 border ">
                  <Command className="bg-[#0c0c0c] text-white">
                    <CommandInput
                      placeholder="Type to search..."
                      value={searchTerm}
                      onValueChange={setSearchTerm}
                      className="bg-[#0c0c0c] text-white placeholder-gray-400"
                    />
                    <CommandList className="bg-[#0c0c0c] text-white">
                      {filteredResources.length > 0 ? (
                        <CommandGroup heading="Resources" className="text-white">
                          {filteredResources.map((resource) => (
                            <CommandItem
                              key={resource._id}
                              onSelect={() => {
                                setOpen(false);
                                navigate(`/resources/${resource._id}`);
                              }}
                              className="flex items-center space-x-2 rounded p-2 hover:bg-purple-800 hover:text-white transition-colors"
                            >
                              <FaFile className="text-purple-500 h-5 w-5" />
                              <span>{resource.title}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ) : (
                        <CommandEmpty className="text-white">
                          No results found.
                        </CommandEmpty>
                      )}
                    </CommandList>
                  </Command>
                </DialogContent>
              </Dialog>

              <Link
                to="/resources/submit"
                className="bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
              >
                Submit Resource
              </Link>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-4">
              <Button  className="bg-purple-800 text-white hover:bg-purple-700">
                <FaFilter className="mr-2" /> Filter
              </Button>
              <Button  className="bg-purple-800 text-white hover:bg-purple-700">
                <FaSort className="mr-2" /> Sort
              </Button>
            </div>
            <p className="text-green-400">
              Showing {filteredResources.length} resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllResources;