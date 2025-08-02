import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        "primary-default": "bg-info-main-normal text-typo-white hover:bg-info-main-hover active:bg-info-main-active",
        "primary-outline": "border-2 border-info-main-normal text-info-main-normal hover:bg-info-main-normal hover:text-typo-white",
        "primary-link": "text-info-main-normal underline-info-main-normal-4 hover:underline",
        "success-default": "bg-success-main-normal text-typo-white hover:bg-success-main-hover active:bg-success-main-active",
        "success-outline": "border-2 border-success-main-normal text-success-main-normal hover:bg-success-main-normal hover:text-typo-white",
        "success-link": "text-success-main-normal underline-success-main-normal-4 hover:underline",
        "warning-default": "bg-warning-main-normal text-typo-white hover:bg-warning-main-hover active:bg-warning-main-active",
        "warning-outline": "border-2 border-warning-main-normal text-warning-main-normal hover:bg-warning-main-normal hover:text-typo-white",
        "warning-link": "text-warning-main-normal underline-warning-main-normal-4 hover:underline",
        "danger-default": "bg-danger-main-normal text-typo-white hover:bg-danger-main-hover active:bg-danger-main-active",
        "danger-outline": "border-2 border-danger-main-normal text-danger-main-normal hover:bg-danger-main-normal hover:text-typo-white",
        "danger-link": "text-danger-main-normal underline-danger-main-normal-4 hover:underline",
        "disabled-default": "bg-typo-outline-2 text-inline",
        "disabled-outline": "border-2 border-typo-outline-2 text-inline",
        "disabled-disabled": "text-inline",
        "disabled-link": "text-typo-inline underline-typo-inline-4",
      },
      size: {
        lg: "px-[26px] py-[12px] rounded-sm text-base",
        md: "px-[22px] py-2 rounded-sm text-sm",
        sm: "px-[18px] py-1 rounded-sm text-xs",
      },
    },
    defaultVariants: {
      variant: "primary-default",
      size: "lg",
    },
  }
)
