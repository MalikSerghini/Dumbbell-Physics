import { Clone, useGLTF } from '@react-three/drei'

export default function Bottle(props){

    const model = useGLTF("./models/bottle.gltf")

    return<>
        <Clone castShadow {...props}  object={model.scene}/>
    </>
}

useGLTF.preload("./models/bottle.gltf")
