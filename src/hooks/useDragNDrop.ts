import { useState } from "react";

const useDragNDrop = (onChange: (e: File) => void) => {
    const [isDragged, setIsDragged] = useState<boolean>(false);

    const handleDrop = (e: React.DragEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onChange(files[0]);
        }
        setIsDragged(false);
    };

    const handleDragEnter = (e: React.DragEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragged(true);
    };

    const handleDragLeave = (e: React.DragEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragged(false);
        }
    };

    const handleDragOver = (e: React.DragEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return {
        isDragged,
        handleDrop,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
    };
};

export default useDragNDrop;
