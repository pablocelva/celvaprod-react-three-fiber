import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense, useRef, useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

function Microfono({ route }) {
    const { scene } = useGLTF("/microfono/scene.gltf")
    const ref = useRef()

    useFrame(() => {
        if (route === "/servicios") {
        ref.current.rotation.y += 0.02
        } else if (route === "/contacto") {
        ref.current.rotation.y -= 0.01
        } else {
        ref.current.rotation.y += 0.005
        }
    })

    return <primitive ref={ref} object={scene} position={[0, 0.5, -1]} />
}

const SceneContent = () => {
    
    const location = useLocation()
    const route = location.pathname
    const cameraRef = useRef()
    const modelRef = useRef()
    const [targetRoute, setTargetRoute] = useState(route)

    useEffect(() => {
        setTargetRoute(location.pathname)
    }, [location.pathname])

    const targetPositions = {
        "/": { cam: [0, 1, -5], model: [0, 0.5, -1] },
        "/servicios": { cam: [6, 2, -5], model: [1, 0.5, -2] },
        "/contacto": { cam: [-5, 1, 3], model: [1, 0.5, -1] }
    }

    useFrame(({ camera }) => {
        if (!targetRoute) return

        const t = 0.095 // velocidad de interpolación
        camera.position.lerp(new THREE.Vector3(...targetPositions[route].cam),t)

        if (modelRef.current) {
        modelRef.current.position.lerp(
            new THREE.Vector3(...targetPositions[route].model),
            t
        )

        if (route === "/servicios") modelRef.current.rotation.y += 0.02
        else if (route === "/contacto") modelRef.current.rotation.y -= 0.01
        else modelRef.current.rotation.y += 0.005
        }
    })
    useEffect(() => {
        const handleScroll = () => {
        setRoute(window.scrollY > 200 ? "/servicios" : "/")
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <>
            <ambientLight intensity={0.5} color={0xf62456} />
            <spotLight position={[0, 10, 5]} angle={Math.PI / 3} penumbra={0.5} intensity={200} castShadow />
            <Microfono route={route} />
            <Environment files="/enviorments/river_walk_1_4k.hdr" background />
            <OrbitControls
                //enableZoom={false}
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
}

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
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            shadows
            camera={{ position: [0, 1, -5], fov: 75 }}
            gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.45 }}
        >
            <SceneContent />
        </Canvas>
    )
}