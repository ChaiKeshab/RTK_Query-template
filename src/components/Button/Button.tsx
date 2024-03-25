import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonClasses = tv({
    base: 'px-4 py-1.5 rounded-md hover:opacity-80',
    variants: {
        color: {
            primary: 'bg-blue-500 text-white',
            neutral: 'bg-zinc-500 text-black dark:text-white',
            danger: "bg-red-600 text-white"
        },
        flat: {
            true: 'bg-transparent'
        }
    },
    defaultVariants: {
        color: 'primary'
    },
    // compoundVariants will replace variants if any property coincide
    compoundVariants: [
        {
            color: 'primary',
            flat: true,
            class: 'bg-blue-500/40'
        },
        {
            color: 'neutral',
            flat: true,
            class: 'bg-zinc-500/20'
        }
    ]
});


type ButtonVariants = VariantProps<typeof buttonClasses>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: ButtonVariants;
    children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ variants, children, ...rest }) => {
    return (
        <button
            className={buttonClasses(variants)}
            {...rest}
        >
            {children}
        </button>
    )
};

/**
 * Usage:
 * 
    <Button
        onClick={handleSubmit}
        variants={{ color: "primary", flat: true }}
    >Label
    </Button>
 */