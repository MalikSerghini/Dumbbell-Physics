import { Clone, useGLTF } from '@react-three/drei'

export default function WeightPlate(props){

    const model = useGLTF("./models/weightPlate.gltf")

    return<>
        <Clone castShadow {...props}  object={model.scene}/>
    </>
}

useGLTF.preload("./models/weightPlate.gltf")
