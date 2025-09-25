import { forwardRef } from "react"
import { useGLTF } from "@react-three/drei"

const Microfono = forwardRef((props, ref) => {
    const { scene } = useGLTF("/microfono/scene.gltf")
    const [visible, setVisible] = useState(false);
    
        useEffect(() => {
            setTimeout(() => setVisible(true), 50); // pequeña espera para activar transición
        }, []);
    return <primitive ref={ref} object={scene} />
})

export default Microfono