"use client";

import { IPagination } from "@/types";
import { useState } from "react";

const usePagination = () => {
    const [paginationOpt, setPagination] = useState<IPagination>({
        take: 10,
        skip: 0,
    });

    const handleChangePagination = (opt: IPagination) => {
        setPagination((prev) => ({
            ...prev,
            ...opt,
        }));
    };

    return { paginationOpt, handleChangePagination };
};

export default usePagination;
