import { Environment, OrbitControls, TransformControls, useHelper } from "@react-three/drei"
import { Suspense, useRef } from "react"
import { DirectionalLightHelper } from "three"
import { useControls, folder } from "leva"
import { Perf } from "r3f-perf"
import { CuboidCollider, Debug, Physics, RigidBody } from "@react-three/rapier"

import Dumbbell from "./components/Dumbbell"
import Bottle from "./components/Bottle"
import WeightPlate from "./components/WeightPlate"
import InfoText from "./components/InfoText"

export default function Experience()
{
    const directionalLight = useRef()

    const dumbBellRef = useRef()
    const weightplateTopRef = useRef()
    const weightplateBottomRef = useRef()
    const infoTextRef = useRef()

    const bottleRef = useRef()

    // useHelper(directionalLight, DirectionalLightHelper,1,  "crimson")

    const cubeJump = (object, force) =>{

        // https://rapier.rs/javascript3d/classes/RigidBody.html
        // object.current.applyImpulse({x: 0, y: 5, z: 0})
        object.current.applyImpulse({x: 0, y: force, z: 0})

        // dumbBellRef.current.applyTorqueImpulse({
        //     x: Math.random() - 0.5,
        //     y: Math.random() - 0.5,
        //     z: Math.random() - 0.5,
        // })
    }


    // const [{dlPosition}] = useControls(
    //     "Directional Light",
    //     () =>({
    //         transform: folder({
    //             dlPosition: {
    //                 // value: [-2.5, 4, -1.5],
    //                 value: [2.5, 9, 1.5],
    //                 min: -10,
    //                 max: 10,
    //                 step: 0.1
    //             }
    //         })
    //     }),
    // )

    return <>

        {/* <Perf position="top-left"/> */}
        <OrbitControls 
            maxDistance={20}
            minDistance={3}
            maxPolarAngle={1.5}
        />
        <Environment preset="park"/>

        {/* <directionalLight ref={directionalLight} position={dlPosition} castShadow/> */}
        <directionalLight ref={directionalLight} position={[2.5, 9, 1.5]} castShadow/>

        {/* <axesHelper scale={5} position-y={0.5}/> */}

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
                     position={[-0.8,2,0]}
                     ref={dumbBellRef}
                     onClick={() => cubeJump(dumbBellRef, 3)}
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
                     restitution={0.7} //Bounciness
                     friction={0.7}
                     colliders={"hull"}
                     position={[0.7,1,0.8]}
                     ref={bottleRef}
                     onClick={() => cubeJump(bottleRef, 0.08)}
                >

                    <Bottle scale={0.5}/>
                </RigidBody>  
            </Suspense>

            {/* 
            //- Weight Plate Bottom 
            */}
            <Suspense>
                <RigidBody 
                     gravityScale={1} 
                     restitution={0.7} //Bounciness
                     friction={0.7}
                     colliders={"cuboid"}
                     position={[1.5, 1, -0.7]}
                     rotation-y={-Math.PI}
                     ref={weightplateBottomRef}
                     onClick={() => cubeJump(weightplateBottomRef, 0.3)}
                >

                    <WeightPlate scale={0.5}/>
                </RigidBody>  
            </Suspense>

                       {/* 
            //- Weight Plate Top 
            */}
            <Suspense>
                <RigidBody 
                     gravityScale={1} 
                     restitution={0.7} //Bounciness
                     friction={0.7}
                     colliders={"cuboid"}
                     position={[1, 2, -0.7]}
                     rotation-y={-Math.PI}
                     ref={weightplateTopRef}
                     onClick={() => cubeJump(weightplateTopRef, 0.3)}
                >

                    <WeightPlate scale={0.5}/>
                </RigidBody>  
            </Suspense>

            {/* 
            //- InfoText 
            */}
            <RigidBody ref={infoTextRef} position={[1,1.2,-7]} rotation-y={Math.PI * 0.1} onClick={() => cubeJump(infoTextRef, 30)} restitution={0.7}>
                
                <InfoText value={`click to\ninteract`}/>

            </RigidBody>
          

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