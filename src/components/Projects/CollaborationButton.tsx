// Language: TypeScript (TSX)
// filepath: /d:/Projects/PerceptAI Ends/PerceptAI/src/components/Projects/CollaborationButton.tsx
import React from "react";
import { Button } from "../ui/button";

interface CollaborationButtonProps {
  mailToLink: string;
}

const CollaborationButton: React.FC<CollaborationButtonProps> = ({ mailToLink }) => {
  return (
    <a href={mailToLink} className="block">
      <Button variant="outline" className="text-black hover:bg-gray-300 border-none">
        Collaborate on this Project
      </Button>
    </a>
  );
};

export default CollaborationButton;