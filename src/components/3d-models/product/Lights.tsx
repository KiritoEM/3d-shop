import { Fragment } from "react";

const Lights = (): JSX.Element => {
  return (
    <Fragment>
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        color="#ffffff"
      />

      <directionalLight
        position={[-3, 4, 3]}
        intensity={0.4}
        castShadow={false}
        color="#f8f8ff"
      />

      <directionalLight
        position={[-2, 2, -4]}
        intensity={0.8}
        castShadow={false}
        color="#ffffff"
      />

      <directionalLight
        position={[0, 10, 0]}
        intensity={0.3}
        castShadow={false}
        color="#ffffff"
      />

      <ambientLight intensity={0.3} color="#f5f5f5" />

      <hemisphereLight
        intensity={0.5}
        groundColor="#404040"
        color="#ffffff"
      />
    </Fragment>
  );
};

export default Lights;