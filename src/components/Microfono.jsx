import { forwardRef } from "react"
import { useGLTF } from "@react-three/drei"

const Microfono = forwardRef((props, ref) => {
    const { scene } = useGLTF("/microfono/scene.gltf")
    return <primitive ref={ref} object={scene} />
})

export default Microfono