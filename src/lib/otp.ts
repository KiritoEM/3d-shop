interface IOTPGenerator {
    generate: (length: number) => string;
}

interface IOTPValidator {
    isExpired: (createdAt: number, maxDuration: number) => boolean;
    validate: (otp: string, providedOtp: string) => boolean;
}

class OTPGenerator implements IOTPGenerator {
    private readonly pattern = "0123456789";

    generate(length: number): string {
        let otp = "";

        for (let i = 0; i < length; i++) {
            otp +=
                this.pattern[Math.floor(Math.random() * this.pattern.length)];
        }

        return otp;
    }
}

class OTPValidator implements IOTPValidator {
    isExpired(createdAt: number, maxDuration: number): boolean {
        return Date.now() > createdAt + maxDuration * 1000;
    }

    validate(otp: string, providedOtp: string): boolean {
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
        maxDuration: number = 5 * 60, // 5 minutes par défaut
        generator: IOTPGenerator = new OTPGenerator(),
        validator: IOTPValidator = new OTPValidator(),
        limit: number = 6,
    ) {
        this.maxDuration = maxDuration;
        this.generator = generator;
        this.validator = validator;
        this.limit = limit;
    }

    get getOTPCode(): string | undefined {
        return this.otp;
    }

    generateOTPCode(): string {
        this.otp = this.generator.generate(this.limit);
        this.createdAt = Date.now();

        return this.otp;
    }

    checkOTP(providedOTP: string): boolean {
        if (
            !this.createdAt ||
            !this.otp ||
            providedOTP.length === 0 ||
            this.validator.isExpired(this.createdAt, this.maxDuration)
        ) {
            return false;
        }

        return this.validator.validate(this.otp, providedOTP);
    }
}

export default OTP;
