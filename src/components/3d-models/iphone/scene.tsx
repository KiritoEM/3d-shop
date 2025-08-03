import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Float } from "@react-three/drei";
import useIphoneScene from "@/hooks/useIphoneScene";
import { IphoneModel } from "./model";

gsap.registerPlugin(ScrollTrigger);

const IphoneScene = (): JSX.Element => {
    const { ref } = useIphoneScene();

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.6}
            floatIntensity={0.6}
            floatingRange={[-0.05, 0.05]}
        >
            <IphoneModel
                scale={3.3}
                ref={ref}
                position={[0, 0, 0]}
                rotation={[0.05, Math.PI, 0]}
            />
        </Float>
    );
};

export default IphoneScene;
