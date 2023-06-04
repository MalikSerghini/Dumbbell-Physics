import { Center, Text3D, useMatcapTexture } from "@react-three/drei";
import { useState } from "react";

export default function InfoText(props){

    const [matcaptTexture] = useMatcapTexture("496DBA_94C9F2_72A7E2_84B4EC", 256)

    const [material, setMaterial] = useState()



    return<>

    <meshMatcapMaterial ref={setMaterial} matcap={matcaptTexture}/>

        <Center>
            <Text3D
                castShadow
                // material={material}
                font={"./fonts/Inter_Bold.json"}
                size={1}
                height={0.5}
                curveSegments={32}
                bevelEnabled
                lineHeight={0.6}
                letterSpacing={-0.06}
                bevelThickness={0.1}
                bevelSize={0.04}
                bevelOffset={0}
                bevelSegments={5}
            >
                {props.value}
                <meshNormalMaterial />

            </Text3D>
        </Center>
    </>
}