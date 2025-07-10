"use client";

import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const useRecaptcha = () => {
    const recaptachaRef = useRef<ReCAPTCHA>(null);
    const [recaptchaValue, setRecaptchaValue] = useState<string>("");

    const getRecaptchaValue = () => {
        return recaptachaRef.current?.getValue();
    };

    const handleChangeCaptcha = useCallback((value: string) => {
        setRecaptchaValue(value);
    }, []);

    return {
        recaptachaRef,
        recaptchaValue,
        getRecaptchaValue,
        handleChangeCaptcha,
    };
};

export default useRecaptcha;
