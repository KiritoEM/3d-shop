import React from "react";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useStudio } from "@/features/3d-studio/hooks/useStudio";

const Composer = (): JSX.Element => {
    const { hoveredMeshs, selectedMeshs } = useStudio();

    return (
        <EffectComposer autoClear={false}>
            {hoveredMeshs.length || selectedMeshs.length ? (
                <Outline
                    xRay={false}
                    selection={[
                        ...(selectedMeshs ?? []),
                        ...(hoveredMeshs ?? []),
                    ]}
                    edgeStrength={7}
                    pulseSpeed={0.0}
                    blur
                    visibleEdgeColor={0xffff00}
                    hiddenEdgeColor={0xcccc00}
                />
            ) : (
                <></>
            )}
        </EffectComposer>
    );
};

export default Composer;
