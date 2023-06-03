import { Clone, useGLTF } from '@react-three/drei'

export default function Dumbbell(){

    const model = useGLTF("./models/dumbbell.gltf")

    return<>
        <Clone  object={model.scene}/>
    </>
}

useGLTF.preload("./models/dumbbell.gltf")
