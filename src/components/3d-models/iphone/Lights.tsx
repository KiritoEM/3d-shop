import { Fragment } from "react";

const Lights = (): JSX.Element => {
    return (
        <Fragment>
            <directionalLight
                position={[-10, 0, -5]}
                intensity={1}
                color="blue"
            />
            <directionalLight
                position={[-1, -2, -5]}
                intensity={0.2}
                color="#0c8cbf"
            />
            <spotLight
                position={[5, 0, 5]}
                intensity={2.5}
                penumbra={1}
                angle={0.35}
                castShadow
                color="#0c8cbf"
            />
        </Fragment>
    );
};

export default Lights;
