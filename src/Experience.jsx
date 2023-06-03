import { Environment, OrbitControls, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { DirectionalLightHelper } from "three"
import { useControls, folder } from "leva"


export default function Experience()
{
    const directionalLight = useRef()

    useHelper(directionalLight, DirectionalLightHelper,1,  "crimson")

    const [{dlPosition}] = useControls(
        "Directional Light",
        () =>({
            transform: folder({
                dlPosition: {
                    value: [2,2,-1.5],
                    min: -10,
                    max: 10,
                    step: 0.1
                }
            })
        })
    )

    return <>

        <OrbitControls/>
        <Environment preset="warehouse"/>

        <directionalLight ref={directionalLight} position={dlPosition} castShadow/>

        <axesHelper scale={5} position-y={0.5}/>

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