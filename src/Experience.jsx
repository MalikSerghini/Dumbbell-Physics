import { Environment, OrbitControls, useHelper } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { DirectionalLightHelper } from "three"
import { useControls, folder } from "leva"
import { Perf } from "r3f-perf"
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier"

import Dumbbell from "./components/Dumbbell"
import Bottle from "./components/Bottle"

export default function Experience()
{
    const directionalLight = useRef()
    const dumbBellRef = useRef()

    useHelper(directionalLight, DirectionalLightHelper,1,  "crimson")

    const cubeJump = () =>{

        // https://rapier.rs/javascript3d/classes/RigidBody.html
        dumbBellRef.current.applyImpulse({x: 0, y: 5, z: 0})

        // dumbBellRef.current.applyTorqueImpulse({
        //     x: Math.random() - 0.5,
        //     y: Math.random() - 0.5,
        //     z: Math.random() - 0.5,
        // })
    }


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
        <Environment preset="park"/>

        <directionalLight ref={directionalLight} position={dlPosition} castShadow/>

        <axesHelper scale={5} position-y={0.5}/>

        <Physics gravity={[0, -9.81, 0]}>

            {/* <Debug/> */}

            {/* 
            //- Dumbbell 
            */}
            <Suspense>
                <RigidBody 
                     gravityScale={1} 
                     restitution={0.5} //Bounciness
                     friction={0.7}
                     colliders={"hull"}
                     position={[-0.5,2,0]}
                     ref={dumbBellRef}
                     onClick={cubeJump}
                >

                    <Dumbbell                        
                        scale={0.4}
                        rotation-y={-Math.PI / 2}
                    />
                </RigidBody>  
            </Suspense>

            {/* 
            //- Bottle 
            */}
            <Suspense>
                <RigidBody 
                     gravityScale={1} 
                     restitution={0.5} //Bounciness
                     friction={0.7}
                     colliders={"hull"}
                     position={[0.7,1,0.8]}
                >

                    <Bottle scale={0.5}/>
                </RigidBody>  
            </Suspense>
          

            {/* 
            //- Floor 
            */}
            <RigidBody type="fixed">

                <mesh position-y={0.27} castShadow receiveShadow>
                    <boxGeometry args={[2, 0.5, 4]}/>
                    <meshStandardMaterial color={"#679EBC"}/>
                </mesh>

                <mesh rotation-x={-Math.PI / 2} receiveShadow>
                    <planeGeometry args={[100,100]}/>
                    {/* <meshStandardMaterial color={"#93BBBD"}/> */}
                    <meshStandardMaterial color={"#679EBC"}/>
                </mesh>

            </RigidBody>

        </Physics>

    </>
}