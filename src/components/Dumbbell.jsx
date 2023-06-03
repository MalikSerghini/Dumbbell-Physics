import { Clone, useGLTF } from '@react-three/drei'

export default function Dumbbell(props){

    const model = useGLTF("./models/dumbbell.gltf")

    return<>
        <Clone castShadow {...props}  object={model.scene}/>
    </>
}

useGLTF.preload("./models/dumbbell.gltf")
