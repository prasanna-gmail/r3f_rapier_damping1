import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from 'react'


import { Box, Sphere, useTexture } from "@react-three/drei";
import { RigidBody, RigidBodyApi, RigidBodyProps } from "@react-three/rapier";
import { MeshPhysicalMaterial, RepeatWrapping } from "three";
import { Demo } from "../../App";

const material = new MeshPhysicalMaterial();


export const Damping: Demo = () => {
  const floor = useTexture(new URL("./white.png", import.meta.url).toString());
  const ramp = useTexture(new URL("./red.png", import.meta.url).toString());
  const ball = useTexture(new URL("./green.png", import.meta.url).toString());

  floor.wrapS = floor.wrapT = RepeatWrapping;

  const balls = Array.from(Array(1).keys());

  /**
   * https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
   * 
   */

  const RigidBodyFloor = (props: RigidBodyProps) => {

    const [isAsleep, setIsAsleep] = useState(false);
    const myTorus = useRef<RigidBodyApi>(null);



    // const ref = useRef()
    // console.log("pkp:  ~ file: DampingExample.tsx:27 ~ RigidBodyFloor ~ ref", ref)
    useFrame((state, delta, xrFrame) => {
      console.log("pkp:  ~ file: ApiUsageExample.tsx:24 ~ mass :::: ", myTorus.current?.mass);
      // console.log("pkp:  ~ file: DampingExample.tsx:27 ~ useFrame ~ state", state)

      // console.log("pkp:  ~ file: ApiUsageExample.tsx:24 ~ mass :::: ", myTorus.current.mass())

      // This function runs at the native refresh rate inside of a shared render-loop
    })

    /**
     * useEffect: 
     * https://github.com/pmndrs/use-cannon/blob/90dfc122945877b91f8d58700e3363e828a52d1b/packages/react-three-cannon-examples/src/demos/demo-CompoundBody.tsx
     * 
     */

    /*  useEffect(() => {
       if (setPosition) {
         return api.position.subscribe(setPosition)
       }
     }, [api, setPosition])
  */


    const torus = useRef<RigidBodyApi>(null);

    return (
      <RigidBody ref={myTorus} mass={2}
        name="myFloor" type="fixed" colliders="cuboid">
        <Box args={[40, 1, 100]} position={[18, -1, 25]}>
          <meshStandardMaterial map={floor} />
        </Box>
      </RigidBody>
    );
  };



  const Ball = () => {
    const rb = useRef<RigidBodyApi>(null);

    const restartBall = () => {
      rb.current?.setTranslation({ x: 0, y: -7, z: -8 });
      rb.current?.setLinvel({ x: 0, y: 0, z: 7 });
    };

    useFrame(() => {
      if (rb.current) {
        if (rb.current.translation().z > 10) {
          restartBall();
        }
      }
    });

    useEffect(() => {
      restartBall();
    });

    return (
      <RigidBody ref={rb} colliders="ball">
        <Sphere material={material} castShadow />
      </RigidBody>
    );
  };

  /*  function MyBox(props) {
     // This reference gives us direct access to the THREE.Mesh object
     const ref = useRef()
     // Hold state for hovered and clicked events
     const [hovered, hover] = useState(false)
     const [clicked, click] = useState(false)
     // Subscribe this component to the render-loop, rotate the mesh every frame
     useFrame((state, delta) => (ref.current.rotation.x += delta))
     // Return the view, these are regular Threejs elements expressed in JSX
     return (
       <mesh
         {...props}
         ref={ref}
         scale={clicked ? 1.5 : 1}
         onClick={(event) => click(!clicked)}
         onPointerOver={(event) => hover(true)}
         onPointerOut={(event) => hover(false)}>
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
       </mesh>
     )
   } */


  return (
    <>
      <group>

        <RigidBodyFloor colliders="hull" mass={3} />
        {/*  <RigidBody
          name="aFloor" type="fixed" colliders="cuboid">
          <Box args={[40, 1, 100]} position={[18, -1, 25]}>
            <meshStandardMaterial map={floor} />
          </Box>
        </RigidBody>
 */}
        <RigidBody name="aRamp" type="fixed" colliders="cuboid">

          <Box
            args={[40, 0.0000000001, 14]}
            position={[18, 1.660, -5]}
            rotation={[Math.PI / 10, 0, 0]}
          >
            <meshStandardMaterial map={ramp} />
          </Box>
        </RigidBody>


        {balls.map((i) => (
          <RigidBody
            mass={1} name="a" key={i} colliders="ball"
            position={[i * 3, 10, -10]} angularDamping={i / 2}
            onCollisionEnter={(payload) => {
              console.log("pkp:  ~ file: DampingExample.tsx:51 ~ payload ", i, payload)
            }}>
            <Sphere>
              <meshStandardMaterial map={ball} />
            </Sphere>
          </RigidBody>
        ))}

        {/* {balls.map((i) => (
          <RigidBody
            mass={1} name="a" key={i} colliders="ball"
            position={[i * 3, 10, -10]} angularDamping={i / 2}
            onCollisionEnter={(payload) => {
              console.log("pkp:  ~ file: DampingExample.tsx:51 ~ payload ", i, payload)
            }}>
            <Sphere>
              <meshStandardMaterial map={ball} />
            </Sphere>
          </RigidBody>
        ))} */}



      </group>
    </>
  );
};
