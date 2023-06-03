import { Environment, OrbitControls, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { DirectionalLightHelper } from "three"


export default function Experience()
{
    const directionalLight = useRef()

    useHelper(directionalLight, DirectionalLightHelper,1,  "crimson")

    return <>

        <OrbitControls/>
        <Environment preset="warehouse"/>

        <directionalLight ref={directionalLight}/>

        <axesHelper scale={5}/>

        {/* 
        //- Platform 
        */}
        <mesh position-y={1} castShadow>
            <boxGeometry args={[1,1, 1]}/>
            <meshStandardMaterial color={"#93BBBD"}/>
        </mesh>

        {/* 
        //- Floor 
        */}
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
            <planeGeometry args={[10,10]}/>
            <meshStandardMaterial color={"#93BBBD"}/>
        </mesh>

    </>
}