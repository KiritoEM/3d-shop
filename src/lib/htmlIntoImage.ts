import { toPng } from "html-to-image";
import { RefObject } from "react";

export const convertHtmlToImage = (elementRef: RefObject<any>) => {
    toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl: string) => {
            const link = document.createElement("a");
            link.download = `Mon_model_3d.png`;
            link.href = dataUrl;
            link.click();
        })
        .catch((err) => {
            console.log(err);
        });
};
