import { Fragment } from "react";

const Lights = (): JSX.Element => {
  return (
    <Fragment>
      <directionalLight
        position={[2, 6, 3]}
        intensity={4.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
        color="#ffffff"
      />

      <directionalLight
        position={[6, 2, 1]}
        intensity={2.5}
        castShadow={false}
      />

      <directionalLight
        position={[-3, 3, 2]}
        intensity={2.2}
      />

      <directionalLight
        position={[-2, 1, -3]}
        intensity={1.8}
      />

      <directionalLight
        position={[0, 3, 5]}
        intensity={2.0}
        color="#ffffff"
      />

      <directionalLight
        position={[0, 8, 0]}
        intensity={2.2}
      />

      <ambientLight intensity={2.2} color="#ffffff" />

      <hemisphereLight
        groundColor="#ffffff"
        intensity={1.8}
      />
    </Fragment>
  );
};

export default Lights;