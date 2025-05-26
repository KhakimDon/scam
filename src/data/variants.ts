import type {TabVariantKeys, TabVariants} from "@/types/components";

export const tabVariants: Record<TabVariants, TabVariantKeys> = {
    default: {
        wrapperClass: "bg-gray-6 p-1 rounded-lg",
        suffixClass: "bg-red text-white",
        itemClass: "py-2 px-4 text-dark",
        itemActiveClass: "",
        activeClass:
            "bg-white shadow-tab-item w-full !h-[calc(100%-8px)] !top-1/2 -translate-y-1/2 !rounded-lg",
    },
    full: {
        wrapperClass: "!max-w-2xl !w-full",
        suffixClass: "bg-red border text-white",
        itemClass: "py-4 px-2 rounded-t-md !w-full",
        activeClass: "h-0.5  bottom-0 bg-blue",
        itemActiveClass: "!text-blue",
    },
    bordered: {
        wrapperClass: "border-b border-gray-3 !w-full max-w-xl",
        activeClass:
            "!h-full before:content-[''] before:absolute before:top-px before:left-px before:rounded-xl before:rounded-b-none before:h-full before:w-[calc(100%-2px)] before:!bg-white rounded-t-xl rounded-b-none !bg-gray-3",
        itemClass: "py-3",
        itemActiveClass: "",
        suffixClass: "",
    },
};