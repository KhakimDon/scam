type VariantsConfig = Record<
    string,
    Record<string, string>
>;

export type DefaultVariants = Record<string, string>;

type CvaOptions = {
    variants: VariantsConfig;
    defaultVariants?: DefaultVariants;
    base?: string;
};

export function createCva({
                              base = '',
                              variants,
                              defaultVariants = {},
                          }: CvaOptions) {
    return (options: Record<string, string | undefined> = {}) => {
        const classes = [base];

        // Loop through variants and apply the selected or default variant.
        for (const [key, variantMap] of Object.entries(variants)) {
            const selected = options[key] || defaultVariants[key];
            if (selected && variantMap[selected]) {
                classes.push(variantMap[selected]);
            }
        }

        return classes.join(' ');
    };
}

export {default as Button} from './BaseButton.vue'

export const buttonVariants = createCva({
    base: 'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_i]:pointer-events-none [&_i]:size-5 [&_i]:shrink-0 dark:focus-visible:ring-blue active:scale-[.985] disabled:cursor-not-allowed select-none',
    variants: {
        variant: {
            default: 'bg-blue text-white hover:bg-blue',
            danger: 'bg-red/10 text-red hover:bg-red/15',
            gray: 'bg-gray-100 hover:bg-gray-150 text-gray-900 disabled:text-gray-200',
        },
        size: {
            default: 'px-5 !py-2.5 rounded-lg',
            sm: 'rounded-md py-4 px-2 text-xs',
            icon: 'h-9 w-9',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

