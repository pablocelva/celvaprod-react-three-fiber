import { forwardRef, type Ref } from "react"
import { useGLTF } from "@react-three/drei"
import type { Group } from "three"

const Microfono = forwardRef<Group, object>((_props, ref) => {
  const { scene } = useGLTF("/microfono/scene.gltf")
  return <primitive ref={ref as Ref<Group>} object={scene} />
})

export default Microfono
