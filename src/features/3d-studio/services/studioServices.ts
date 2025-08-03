import { I3DMaterial } from "@/types";

export const getMaterials = async (materials: I3DMaterial[]) => {
    const response = await fetch("/api/bot/get_3d_materials", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ materials }),
    });

    if (!response.ok) {
        throw new Error("Error when fetching materials");
    }

    return response.json();
};
