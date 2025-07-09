import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input shadow-xs flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm md:text-base outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                className,
            )}
            autoComplete="off"
            {...props}
        />
    );
}

type PasswordInputTypes = {
    placeholder: string;
    field: any;
    className?: string;
};

const PasswordInput: React.FC<PasswordInputTypes> = ({
    placeholder,
    field,
    className,
}) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    return (
        <div className={cn("password-input relative", className)}>
            <Input
                className="pr-8"
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                {...field}
            />
            <div
                className="eye-icon absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                ) : (
                    <EyeIcon className="h-4 w-4" />
                )}
            </div>
        </div>
    );
};

export { Input, PasswordInput };
