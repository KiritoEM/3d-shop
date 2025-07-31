import { Session as NextauthSession } from "next-auth";
import { NextRequest } from "next/server";
import { AdminFacialRecognition, AdminInfo, Session } from "@prisma/client";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Prettify } from "@/lib/utils";
import * as THREE from "three";

export type IResponseType<T = null> = {
    message: string;
    status: "success" | "error";
    data?: T;
};

export type OTPEmailProps = {
    validationCode: string;
};

export type EmailTemplateProps = {
    sendOTP: OTPEmailProps;
};

export type EmailTemplateType = "sendOTP";

export type IDBSession = Prettify<
    Pick<AdminInfo, "id" | "username" | "role"> & {
        image?: string;
        expires?: Date;
    }
>;

export type SessionwithFacial = Session & {
    admin: AdminInfo & {
        adminFacial: AdminFacialRecognition | null;
    };
};

export type NextRequestWithId = NextRequest & {
    userId?: string;
};

export type IPagination = {
    take?: number;
    skip: number;
};

export type IfileType = "IMAGE" | "VIDEO" | "MODEL_3D";

export type INextauthSession = Prettify<
    NextauthSession["user"] & {
        id: string;
        accessToken?: string;
    }
>;

export type IStep = {
    name: string;
    component: React.ComponentType;
};

export type IObjectEntity = {
    key: string;
    value: string;
};

export type IGLTFModel = Prettify<
    Pick<GLTF, "scene" | "animations"> & {
        materials: { [key: string]: THREE.Material };
    }
>;

export type I3DMaterial = Pick<THREE.Material, "name" | "type"> & {
    color?: THREE.Color | string | number;
    roughness?: number;
    metalness?: number;
    emissive?: THREE.Color | string | number;
    opacity?: number;
    transparent?: boolean;
    [key: string]: any;
};
