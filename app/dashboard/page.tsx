"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { ModelCard } from "@/components/model/ModelCard";

interface Model {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

const DashboardPage = () => {
  const user = useCurrentUser();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  const handleModelDelete = (deletedModelId: string) => {
    setModels(prevModels => prevModels.filter(model => model.id !== deletedModelId));
  };

  useEffect(() => {
    const fetchModels = async () => {
      if (!user) return;
      
      try {
        const response = await fetch("/api/models");
        if (response.ok) {
          const data = await response.json();
          setModels(data);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="px-8 pt-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
              Welcome back, <span className="font-medium">{user.name?.split(' ')[0]}</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover, create, and share extraordinary 3D experiences with our premium platform
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-light text-slate-800 mb-2">{models.length}</div>
              <div className="text-slate-600">Models Created</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-light text-slate-800 mb-2">2.4k</div>
              <div className="text-slate-600">Total Views</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-light text-slate-800 mb-2">156</div>
              <div className="text-slate-600">Likes Received</div>
            </div>
          </div>

          {/* Models Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-light text-slate-800">Your Creations</h2>
              <div className="text-sm text-slate-500">
                {models.length} {models.length === 1 ? 'model' : 'models'}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white/50 rounded-2xl p-6 animate-pulse">
                    <div className="aspect-square bg-slate-200 rounded-xl mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : models.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-slate-800 mb-4">No models yet</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                  Start your creative journey by uploading your first 3D model. Share your vision with the world.
                </p>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-colors duration-200 font-medium">
                  Upload Your First Model
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {models.map((model) => (
                <ModelCard key={model.id} model={model} onDelete={handleModelDelete} />
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
