import { Fragment } from "react";

const Lights = (): JSX.Element => {
  return (
    <Fragment>
      <directionalLight
        position={[2, 6, 3]}
        intensity={5.4}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
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
        intensity={1.2}
      />

      <directionalLight
        position={[-2, 1, -3]}
        intensity={1.8}
      />

      <directionalLight
        position={[0, 8, 0]}
        intensity={0.7}
      />

      <ambientLight intensity={2.2} />

      <hemisphereLight
        intensity={2.2}
      />
    </Fragment>
  );
};

export default Lights;