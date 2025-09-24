import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Eye, Heart, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModelCardProps {
  model: {
    id: string;
    title?: string;
    fileName?: string;
    description?: string;
    fileUrl?: string;
    modelUrl?: string;
    thumbnailUrl?: string;
    createdAt: string;
    user?: {
      name: string;
      image?: string;
    };
    likes?: number;
    views?: number;
  };
}

export const ModelCard = ({ model }: ModelCardProps) => {
  const title = model.title || model.fileName || "Untitled Model";
  const downloadUrl = model.fileUrl || model.modelUrl || "";
  const createdDate = new Date(model.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
        {model.thumbnailUrl ? (
          <img 
            src={model.thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-slate-300 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex items-center space-x-3">
            <Button 
              size="sm" 
              className="bg-white/90 text-slate-800 hover:bg-white shadow-lg backdrop-blur-sm border-0 rounded-full px-4 py-2"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button 
              size="sm" 
              asChild
              className="bg-slate-900/90 text-white hover:bg-slate-800 shadow-lg backdrop-blur-sm border-0 rounded-full px-4 py-2"
            >
              <a
                href={downloadUrl}
                download={title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-slate-800 truncate text-lg leading-tight">
              {title}
            </h3>
            {model.description && (
              <p className="text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {model.description}
              </p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100 rounded-full">
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-slate-700">
                Edit Model
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700">
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Creator Info */}
        {model.user && (
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8 border border-slate-200">
              <AvatarImage src={model.user.image} alt={model.user.name} />
              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs font-medium">
                {model.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {model.user.name}
              </p>
              <p className="text-xs text-slate-500">
                {createdDate}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-slate-500 hover:text-red-500 transition-colors duration-200">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{model.likes || 0}</span>
            </button>
            <div className="flex items-center space-x-1 text-slate-500">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{model.views || 0}</span>
            </div>
          </div>
          <div className="text-xs text-slate-400">
            {createdDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
