import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ModelCardProps {
  model: {
    id: string;
    fileName: string;
    modelUrl: string;
    createdAt: string;
  };
}

const ModelCard = ({ model }: ModelCardProps) => {
  return (
    <div className="rounded-md border shadow-sm p-4 w-full max-w-md">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{model.fileName}</p>
          <p className="text-xs text-muted-foreground">
            Uploaded on {new Date(model.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Button asChild>
          <a
            href={model.modelUrl}
            download={model.fileName}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-4 h-4 text-white" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ModelCard;
