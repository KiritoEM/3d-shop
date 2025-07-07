interface IOTPGenerator {
    generate: (length: number) => void;
}

interface IOTPValidator {
    isExpired: (createdAt: number, maxDuration: number) => boolean;
    validate: (otp: string, providedOtp: string) => boolean;
}

class OTPGenerator implements IOTPGenerator {
    private readonly pattern = "0123456789";

    generate(length: number) {
        let otp = "";

        for (let i = 0; i < length; i++) {
            otp +=
                this.pattern[Math.floor(Math.random() * this.pattern.length)];
        }
    }
}

class OTPValidator implements IOTPValidator {
    isExpired(createdAt: number, maxDuration: number) {
        return Date.now() > createdAt + maxDuration * 1000;
    }

    validate(otp: string, providedOtp: string) {
        return otp === providedOtp;
    }
}

class OTP {
    private otp: string | undefined;
    private maxDuration: number;
    private generator: IOTPGenerator;
    private validator: IOTPValidator;
    private createdAt: number | undefined;
    private limit: number;

    constructor(
        maxDuration: number = 5 * 60, //5 minutes by default
        generator: IOTPGenerator = new OTPGenerator(),
        validator: IOTPValidator = new OTPValidator(),
        limit: number = 6,
    ) {
        this.maxDuration = maxDuration;
        this.generator = generator;
        this.validator = validator;
        this.limit = limit;
    }

    get getOTPCode() {
        return this.otp;
    }

    generateOTPCode() {
        this.generator.generate(this.limit);
        this.createdAt = Date.now();
    }

    checkOTP(providedOTP: string): boolean {
        if (
            this.validator.isExpired(this.createdAt!, this.maxDuration) ||
            !this.otp ||
            providedOTP.length === 0
        )
            return false;

        return this.validator.validate(this.otp!, providedOTP);
    }
}
