import { Environment, OrbitControls, useHelper } from "@react-three/drei"
import { useRef } from "react"
import { DirectionalLightHelper } from "three"
import { useControls, folder } from "leva"
import { Perf } from "r3f-perf"


export default function Experience()
{
    const directionalLight = useRef()

    useHelper(directionalLight, DirectionalLightHelper,1,  "crimson")

    const [{dlPosition}] = useControls(
        "Directional Light",
        () =>({
            transform: folder({
                dlPosition: {
                    // value: [-2.5, 4, -1.5],
                    value: [2.5, 9, 1.5],
                    min: -10,
                    max: 10,
                    step: 0.1
                }
            })
        })
    )

    return <>

        <Perf position="top-left"/>
        <OrbitControls/>
        <Environment preset="warehouse"/>

        <directionalLight ref={directionalLight} position={dlPosition} castShadow/>

        <axesHelper scale={5} position-y={0.5}/>

        {/* 
        //- Platform 
        */}
        <mesh position-y={0.27} castShadow>
            <boxGeometry args={[2, 0.5, 4]}/>
            <meshStandardMaterial color={"#679EBC"}/>
        </mesh>

        {/* 
        //- Floor 
        */}
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
            <planeGeometry args={[100,100]}/>
            {/* <meshStandardMaterial color={"#93BBBD"}/> */}
            <meshStandardMaterial color={"#679EBC"}/>
        </mesh>

    </>
}