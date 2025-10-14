"use client";
import { useEffect, useState } from "react";
import { ModelCard } from "@/components/model/ModelCard";

interface Model {
  id: string;
  fileName: string;
  key: string;
  size: number;
  contentType: string;
  modelUrl: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

const PublicModelsPage = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicModels = async () => {
      try {
        const response = await fetch("/api/public/models");
        if (!response.ok) {
          throw new Error("Failed to fetch public models");
        }
        const data = await response.json();
        setModels(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicModels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="container mx-auto px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extralight text-slate-900 mb-6">
              Public Downloads
            </h1>
            <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
              Explore what others have downloaded and shared with the community
            </p>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-white/50 rounded-2xl p-6 animate-pulse"
              >
                <div className="aspect-square bg-slate-200 rounded-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-light text-slate-800 mb-4">
            Failed to load models
          </h3>
          <p className="text-slate-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extralight text-slate-900 mb-6">
            Public Downloads
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto mb-8">
            Explore what others have downloaded and shared with the community
          </p>
          <div className="text-sm text-slate-500">
            {models.length} {models.length === 1 ? "model" : "models"} available
          </div>
        </div>

        {/* Models Grid */}
        {models.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-light text-slate-800 mb-4">
              No public models yet
            </h3>
            <p className="text-slate-600">
              Be the first to share your creations with the community!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {models.map((model) => (
              <ModelCard
                key={model.id}
                model={{
                  id: model.id,
                  fileName: model.fileName,
                  fileUrl: model.modelUrl,
                  modelUrl: model.modelUrl,
                  createdAt: model.createdAt,
                  user: model.user,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicModelsPage;