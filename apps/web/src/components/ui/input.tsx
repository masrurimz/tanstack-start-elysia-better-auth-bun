import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "src/components/ui/utils";

const Input = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input"> & { variant?: "default" | "error" | "success" }
>(({ className, type, variant = "default", ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				variant === "error" && "border-red-500 focus-visible:ring-red-500",
				variant === "success" &&
					"border-green-500 focus-visible:ring-green-500",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

const InputHidable = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input"> & { variant?: "default" | "error" | "success" }
>((props, ref) => {
	const [isVisible, setIsVisible] = React.useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	return (
		<div className="space-y-2">
			<div className="relative">
				<Input
					{...props}
					className="pe-9"
					type={isVisible ? "text" : "password"}
					ref={ref}
				/>
				<button
					className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					type="button"
					onClick={toggleVisibility}
					aria-label={isVisible ? "Hide password" : "Show password"}
					aria-pressed={isVisible}
				>
					{isVisible ? (
						<EyeOff size={16} strokeWidth={2} aria-hidden="true" />
					) : (
						<Eye size={16} strokeWidth={2} aria-hidden="true" />
					)}
				</button>
			</div>
		</div>
	);
});
InputHidable.displayName = "InputHidable";

export { Input, InputHidable };
