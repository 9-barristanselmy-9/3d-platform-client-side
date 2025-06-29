"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

interface ModelViewerProps {
  url: string;
}

function Model({ url }: ModelViewerProps) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const ModelViewer = ({ url }: ModelViewerProps) => {
  return (
    <div className="w-full rounded-md overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<p>Loading 3D model...</p>}>
          <Model url={url} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
