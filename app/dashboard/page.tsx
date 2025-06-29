"use client";
import ModelCard from "@/components/model/ModelCard";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

interface Model {
  id: string;
  fileName: string;
  modelUrl: string;
  createdAt: string;
  user: {
    name: string;
    image?: string | null;
  };
  description?: string;
  likes?: number;
}
export default function Page() {
  const user = useCurrentUser();
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch("/api/models");
        if (!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();
        setModels(data);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    }

    if (user) {
      fetchModels();
    }
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex overflow-x-auto gap-4 m-10">
        {models.length === 0 ? (
          <p className="text-muted-foreground">No models uploaded yet.</p>
        ) : (
          models.map((model) => (
            <div key={model.id} className="min-w-[300px] max-w-[300px]">
              <ModelCard key={model.id} model={model} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
