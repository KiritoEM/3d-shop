"use client";

import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Mesh, Material } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  visible?: boolean;
}

interface GLTFResult {
  nodes: {
    Object_4: Mesh;
    Object_5: Mesh;
    Object_6: Mesh;
    Object_7: Mesh;
    Object_8: Mesh;
    Object_9: Mesh;
    Object_10: Mesh;
    Object_11: Mesh;
    Object_12: Mesh;
    Object_13: Mesh;
    Object_14: Mesh;
    Object_15: Mesh;
  };
  materials: {
    ana_renk: Material;
    logo: Material;
    cam_materyal: Material;
    ereve: Material;
    kamera: Material;
    wallpaper: Material;
    flas: Material;
    kamera2: Material;
    kamera1: Material;
    lens: Material;
    glass: Material;
    screw: Material;
  };
}

export const IphoneModel = forwardRef<THREE.Group, ModelProps>(
  (
    { position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, visible = true },
    ref
  ) => {
    const internalRef = useRef<THREE.Group>(null);
    const { nodes, materials } = useGLTF(
      "/iphone_16_pro_max.glb"
    ) as unknown as GLTFResult;

    const groupRef = ref || internalRef;

    return (
      <group
        ref={groupRef}
        dispose={null}
        position={position}
        rotation={rotation}
        scale={scale}
        visible={visible}
      >
        <group rotation={[1, Math.PI, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group
              rotation={[-Math.PI, 1.222, Math.PI / 3]}
              scale={[0.815, 0.041, 0.388]}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.ana_renk}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials.logo}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_6.geometry}
                material={materials.cam_materyal}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_7.geometry}
                material={materials.ereve}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_8.geometry}
                material={materials.kamera}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_9.geometry}
                material={materials.wallpaper}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_10.geometry}
                material={materials.flas}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_11.geometry}
                material={materials.kamera2}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_12.geometry}
                material={materials.kamera1}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_13.geometry}
                material={materials.lens}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_14.geometry}
                material={materials.glass}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_15.geometry}
                material={materials.screw}
              />
            </group>
          </group>
        </group>
      </group>
    );
  }
);

IphoneModel.displayName = "IphoneModel";

useGLTF.preload("/iphone_16_pro_max.glb");
