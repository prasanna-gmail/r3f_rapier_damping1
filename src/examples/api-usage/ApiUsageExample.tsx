import { Torus } from "@react-three/drei";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { Demo } from "../../App";

export const ApiUsage: Demo = () => {
  const myTorus = useRef<RigidBodyApi>(null);

  useEffect(() => {
    if (myTorus.current) {
      myTorus.current.applyTorqueImpulse({
        x: 1,
        y: 3,
        z: 1
      });
    }

    const timer = setInterval(() => {
      // console.log("pkp:  ~ file: ApiUsageExample.tsx:19 ~ timer ~ timer", timer)
      if (myTorus.current) {
        myTorus.current.setTranslation({ x: 0, y: 0, z: 0 });
        myTorus.current.setLinvel({ x: 0, y: 5, z: 0 });
        // myTorus.current.mass();
        console.log("pkp:  ~ file: ApiUsageExample.tsx:24 ~ mass :::: ", myTorus.current.mass())
      }
    }, 2000);

    return () => {
      // console.log("pkp:  ~ file: ApiUsageExample.tsx:19 ~ timer ~ timer", timer)
      // clearInterval(timer);
    };
  }, []);

  return (
    <group rotation={[0, 0, 0]} scale={1}>
      <RigidBody colliders="hull" mass={1} ref={myTorus} restitution={2}>
        <Torus castShadow>
          <meshPhysicalMaterial />
        </Torus>
      </RigidBody>
    </group>
  );
};
