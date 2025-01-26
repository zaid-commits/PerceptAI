import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FloatingNavbar from "../Navbar";
import ModernPurpleLoader from "../elements/Loader";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa";
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
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Link copied to clipboard!"),
      (err) => console.error("Could not copy text: ", err)
    );
  };

  return (
    <div
      className="relative bg-[#ffffff0c] border-b-2 border-l-2 border-purple-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform h-full flex flex-col justify-between"
    >
      <button
        onClick={() => copyToClipboard(resource.sharableLink)}
        className="absolute top-4 right-4 bg-purple-900 text-white p-2 rounded hover:bg-purple-700 transition-colors flex items-center"
      >
        <FaShare className="h-5 w-5 text-purple-400" />
      </button>
      <div>
        <h3 className="text-xl font-bold text-white">{resource.title}</h3>
        <span className="inline-block bg-purple-800 text-white text-xs px-2 py-1 rounded mb-4">
          {resource.category}
        </span>
        <p className="text-gray-400 mb-1">
          {truncateText(resource.description, 20)}
        </p>
      </div>
      <div>
        <Link
          to={`/resources/${resource._id}`}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          View full resource
        </Link>
        <div className="mt-4 flex items-center w-full">
          <div className="flex items-center justify-between w-full">
            <span className="text-white ml-2">
              posted by {" "}
              <a href="#" className="text-purple-400">
                {resource.posterUsername ?? "Unknown"}
              </a>
            </span>
            {resource.posterImage && (
              <img
                className="rounded-lg w-10 h-10 ml-4"
                src={resource.posterImage || "/placeholder.svg"}
                alt={resource.posterUsername ?? "Poster"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AllResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/resources");
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
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredResources = resources.filter((resource) =>
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <ModernPurpleLoader />;
  }

  return (
    <div className="bg-black min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold py-4 text-white">
            PerceptAI Resource Library
          </h2>
          <div className="flex items-center space-x-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gray-300 text-purple-800 hover:bg-gray-350"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Resources
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-lg bg-black border-black text-white">
                <Command className="rounded-lg bg-black text-white">
                  <CommandInput
                    placeholder="Type to search..."
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    className="text-white"
                  />
                  <CommandList className="bg-black text-white">
                    <CommandEmpty className="text-white">No results found.</CommandEmpty>
                    <CommandGroup heading="Resources" className="text-white">
                      {filteredResources.map((resource) => (
                        <CommandItem
                          key={resource._id}
                          onSelect={() => {
                            setOpen(false);
                            window.location.href = `/resources/${resource._id}`;
                          }}
                          className="text-white"
                        >
                          <span>{resource.title}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
            <Link
              to="/resources/submit"
              className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Submit Resource
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllResources;
