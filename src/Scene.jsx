import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { Suspense } from "react"
import Loader from "./Loader"

function Microfono() {
    const { scene } = useGLTF("/microfono/scene.gltf")

    useFrame(() => {
        scene.rotation.y += 0.01
    })

    return <primitive object={scene} position={[0, 0.5, -1]} />
}

export default function Scene() {
    return (
        <Canvas
        style={{
            width: "100vw",
            height: "100vh",
        }}
        dpr={[1, 1.5]}
        //frameloop="demand"
        performance={{ min: 0.5 }}
        shadows
        //camera={{ fov: 10, position: [14, 24, 101] }}  
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ toneMapping: THREE.NeutralToneMapping, toneMappingExposure: 0.45 }}
        >
        {/* <Suspense fallback={<Loader />}> */}

            {/* Luces */}
            <ambientLight intensity={0.5} color={0xf62456} />
            <spotLight
                position={[0, 10, 5]}
                angle={Math.PI / 3}
                penumbra={0.5}
                intensity={200}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            {/* Objetos */}
            <Microfono />

            {/* Environment HDRI */}
            <Environment files="/enviorments/river_walk_1_4k.hdr" background />

            {/* Controles */}
            <OrbitControls
                enableDamping
                enablePan={false}
                minDistance={5}
                maxDistance={20}
                minPolarAngle={0.5}
                maxPolarAngle={1.5}
                target={[0, 1, 0]}
            />
        {/* </Suspense> */}
        </Canvas>
    )
}