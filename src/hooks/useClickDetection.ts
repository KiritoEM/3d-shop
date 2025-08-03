import { RefObject, useEffect, useState } from "react";

const useClickDetection = <T extends HTMLElement>(targetRef: RefObject<T>) => {
    const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.log(targetRef);
            if (!targetRef.current || !e.target) {
                return;
            }

            const isOutside = !targetRef.current.contains(e.target as Node);
            setIsClickedOutside(isOutside);
        };

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [targetRef]);

    const resetClickDetection = () => setIsClickedOutside(false);

    return { isClickedOutside, resetClickDetection };
};

export default useClickDetection;
