import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect, memo, useMemo } from "react"
import { useLocation } from 'react-router-dom'

// Preload modelo al montar componente
useGLTF.preload("/microfono/scene.gltf")

// Componente memoizado para evitar re-renders
const MicrofonoModel = memo(function MicrofonoModel({ route, modelRef }) {
    const { scene } = useGLTF("/microfono/scene.gltf")
    
    useFrame(() => {
        if (!modelRef.current) return
        if (route === "/servicios") modelRef.current.rotation.y += 0.02
        else if (route === "/contacto") modelRef.current.rotation.y -= 0.01
        else modelRef.current.rotation.y += 0.005
    })

    return <primitive ref={modelRef} object={scene} position={[0, 0.5, -1]} />
})

const SceneContent = memo(function SceneContent() {
    const location = useLocation()
    const route = location.pathname
    const modelRef = useRef()
    const [targetRoute, setTargetRoute] = useState(route)
    const [exposure, setExposure] = useState(0) 

    useEffect(() => {
        setTargetRoute(location.pathname)
    }, [location.pathname])

    useFrame(({ gl }) => {
        if (exposure < 0.45) {
            setExposure((prev) => Math.min(prev + 0.008, 0.45))
        }
        gl.toneMappingExposure = exposure
    })

    const targetPositions = useMemo(() => ({
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
        let { cam, model } = targetPositions[targetRoute]

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
            <MicrofonoModel route={route} modelRef={modelRef} />
            <Environment files="/enviorments/river_walk_1_4k.hdr" background />
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
            frameloop="auto"
            camera={{ position: [0, 1, -5], fov: 75 }}
            gl={{ 
                toneMapping: THREE.NeutralToneMapping, 
                toneMappingExposure: 0.45,
                antialias: true,
                alpha: true,
            }}
        >
            <SceneContent />
        </Canvas>
    )
}