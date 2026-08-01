import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect, memo, useMemo } from "react"
import { useLocation } from 'react-router-dom'
import { useGLTFWithReady } from "../hooks/useGLTFWithReady"
import type { Group, Mesh } from "three"
import type { RouteName, TargetPositions } from "../types"

interface ModelRefProps {
  modelRef: React.RefObject<Group | null>
}

interface MicrofonoModelProps extends ModelRefProps {
  route: string
  onReady?: () => void
}

interface SceneContentProps {
  onModelReady: () => void
}

// Componente fallback - cubo simple para testear canvas
const FallbackModel = memo(function FallbackModel({ modelRef }: ModelRefProps) {
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={modelRef as React.RefObject<Mesh | null>} position={[0, 0.5, -1]}>
      <boxGeometry args={[1, 1.5, 1]} />
      <meshPhysicalMaterial color={0xf62456} />
    </mesh>
  )
})

// Componente memoizado para cargar modelo
const MicrofonoModel = memo(function MicrofonoModel({ route, modelRef, onReady }: MicrofonoModelProps) {
  const { scene, ready } = useGLTFWithReady("/microfono/scene.gltf")
  
  useEffect(() => {
    if (ready && onReady) {
      onReady()
    }
  }, [ready, onReady])
  
  useFrame(() => {
    if (!modelRef.current || !scene) return
    if (route === "/servicios") modelRef.current.rotation.y += 0.02
    else if (route === "/contacto") modelRef.current.rotation.y -= 0.01
    else modelRef.current.rotation.y += 0.005
  })

  if (!scene) return null
  return <primitive ref={modelRef} object={scene} position={[0, 0.5, -1]} />
})

const SceneContent = memo(function SceneContent({ onModelReady }: SceneContentProps) {
    const location = useLocation()
    const route = location.pathname
    const modelRef = useRef<Group>(null)
    const [targetRoute, setTargetRoute] = useState(route)
    const [exposure, setExposure] = useState(0)

    // Preload modelo en contexto seguro
    useEffect(() => {
        try {
          useGLTF.preload("/microfono/scene.gltf")
        } catch (_e) {
          // Silent fail
        }
    }, [])

    useEffect(() => {
        setTargetRoute(location.pathname)
    }, [location.pathname])

    useFrame(({ gl }) => {
        if (exposure < 0.45) {
            setExposure((prev) => Math.min(prev + 0.008, 0.45))
        }
        gl.toneMappingExposure = exposure
    })

    const targetPositions = useMemo<TargetPositions>(() => ({
        "/": { cam: [-2, 3, -5], model: [-2.5, 2, -2] },
        "/servicios": { cam: [6, 2, -5], model: [1, 0.5, -2] },
        "/servicios/composicion": { cam: [8, 2, -5], model: [1.5, 0.5, -2] },
        "/servicios/produccion": { cam: [10, 2, -5], model: [2, 0.5, -2] },
        "/servicios/clases": { cam: [12, 2, -5], model: [2.5, 0.5, -2] },
        "/contacto": { cam: [-5, 1, 3], model: [1, 0.5, -1] }
    }), [])

    useFrame(({ camera }) => {
        if (!targetRoute) return

        const t = 0.095 
        let { cam, model } = targetPositions[targetRoute as RouteName]

        // Detectar mobile
        const isMobile = window.innerWidth <= 768
        if (isMobile) {
            if (route === "/") cam = [0, 2, -4]
            if (route === "/servicios") cam = [5, 3, -4]
            if (route === "/contacto") cam = [-4, 2, 2]

            if (route === "/") model = [0, 0, -1]
            if (route === "/servicios") model = [0.5, 0.5, -1.5]
            if (route === "/contacto") model = [0.5, 0.5, -0.5]
        }
        
        camera.position.lerp(new THREE.Vector3(...cam), t)

        if (modelRef.current) {
            modelRef.current.position.lerp(
                new THREE.Vector3(...model),
                t
            )

            if (route === "/servicios") modelRef.current.rotation.y += 0.02
            else if (route === "/contacto") modelRef.current.rotation.y -= 0.01
            else modelRef.current.rotation.y += 0.005
        }
    })

    return (
        <>
            <ambientLight intensity={0.5} color={0xf62456} />
            <spotLight position={[0, 10, 5]} angle={Math.PI / 3} penumbra={0.5} intensity={200} castShadow />
            
            <Suspense fallback={<FallbackModel modelRef={modelRef} />}>
                <MicrofonoModel route={route} modelRef={modelRef} onReady={onModelReady} />
            </Suspense>
            
            <Suspense fallback={null}>
                <Environment files="/enviorments/river_walk_1_4k.hdr" background />
            </Suspense>
            
            <OrbitControls
                enableDamping
                enablePan={false}
                minDistance={5}
                maxDistance={20}
                minPolarAngle={0.5}
                maxPolarAngle={1.5}
                target={[0, 1, 0]}
            />
        </> 
    )
})

export default function Scene3D() {
    const [, setModelReady] = useState(false)
    
    return (
        <Canvas
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0,
            }}  
            dpr={typeof window !== 'undefined' && window.innerWidth <= 768 ? [1, 1] : [1, 1.5]}
            performance={{ min: 0.5, max: 1 }}
            shadows
            frameloop="always"
            camera={{ position: [0, 1, -5], fov: 75 }}
            gl={{ 
                toneMapping: THREE.NeutralToneMapping, 
                toneMappingExposure: 0.45,
                antialias: true,
                alpha: true,
            }}
        >
            <SceneContent onModelReady={() => setModelReady(true)} />
        </Canvas>
    )
}