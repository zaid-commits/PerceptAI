'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three-stdlib'
import { Mesh } from 'three'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

function Model({ url, scale, rotation }: { url: string, scale: number, rotation: number }) {
  const gltf = useLoader(GLTFLoader, url)
  const meshRef = useRef<Mesh>()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotation
    }
  })

  return (
    <primitive 
      object={(gltf as any).scene} 
      scale={[scale, scale, scale]} 
      ref={meshRef}
    />
  )
}

const modelOptions = [
  { name: 'Robot Head', url: '/robot-head.glb' },
  { name: 'Drone', url: '/drone.glb' },
  { name: 'Smart Camera', url: '/smart-camera.glb' },
]

export  function InteractiveModelViewer() {
  const [currentModel, setCurrentModel] = useState(modelOptions[0])
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0.002)

  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          3D Model <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Viewer</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Explore 3D models of computer vision devices and systems. Interact with the models to see them from all angles.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <div className="w-full max-w-2xl h-[400px] bg-black rounded-lg overflow-hidden shadow-xl">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Model url={currentModel.url} scale={scale} rotation={rotation} />
              <OrbitControls />
            </Canvas>
          </div>
          <div className="w-full max-w-md space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {modelOptions.map((model) => (
                <Button
                  key={model.name}
                  onClick={() => setCurrentModel(model)}
                  variant={currentModel.name === model.name ? "default" : "outline"}
                  className="py-2"
                >
                  {model.name}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <label htmlFor="scale" className="block text-sm font-medium text-gray-400">
                Model Scale
              </label>
              <Slider
                id="scale"
                min={0.5}
                max={2}
                step={0.1}
                value={[scale]}
                onValueChange={(value: number[]) => setScale(value[0])}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="rotation" className="block text-sm font-medium text-gray-400">
                Rotation Speed
              </label>
              <Slider
                id="rotation"
                min={0}
                max={0.01}
                step={0.001}
                value={[rotation]}
                onValueChange={(value: number[]) => setRotation(value[0])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}