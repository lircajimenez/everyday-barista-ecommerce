import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        bordered:
          "group relative bg-white border-[1px] border-black text-md text-black uppercase font-semibold rounded-full overflow-hidden transition-colors duration-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        extra: "!px-[26px] !py-[18px]",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  icon,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    icon?: React.ReactNode
  }) {
  const Comp = asChild ? Slot : "button"
  const isBordered = variant === "bordered"

  // 1. The Wave Layer (from before)
  const WaveLayer = isBordered && (
    <span className="absolute inset-0 z-0 h-full w-[120%] -translate-x-[110%] skew-x-12 bg-black transition-transform duration-500 ease-in-out group-hover:translate-x-[-10%] group-hover:skew-x-0" />
  )

  // 2. The Icon with Rebound Effect
  // We use a custom cubic-bezier (0.34, 1.56, 0.64, 1) for the "snap"
  const IconWrapper = icon && (
    <span className={cn(
      "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
      isBordered && "group-hover:translate-x-1.5"
    )}>
      {icon}
    </span>
  )

  // 3. Shared Content Wrapper
  const contentClasses = cn(
    "relative z-10 flex items-center justify-center gap-2 w-full h-full transition-colors duration-300",
    isBordered && "group-hover:text-white"
  )

  if (asChild) {
    const elementChildren = React.Children.toArray(children).filter((child) =>
      React.isValidElement(child)
    ) as React.ReactElement<{ className?: string; children?: React.ReactNode; ["data-slot"]?: string }>[]

    if (elementChildren.length !== 1) {
      throw new Error("Button with asChild expects a single React element child.")
    }

    const child = elementChildren[0]

    return React.cloneElement(
      child,
      {
        ...props,
        "data-slot": "button",
        className: cn(buttonVariants({ variant, size, className }), child.props.className),
      },
      <>
        {WaveLayer}
        <span className={contentClasses}>
          {child.props.children}
          {IconWrapper}
        </span>
      </>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {WaveLayer}
      <span className={contentClasses}>
        {children}
        {IconWrapper}
      </span>
    </Comp>
  )
}

// function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   icon,
//   children,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean
//     icon?: React.ReactNode
//   }) {
//   const Comp = asChild ? Slot : "button"
//   const isBordered = variant === "bordered"

//   // 1. The "Wave" Layer
//   // Added 'skew-x-12' to give it a more "wave/organic" leading edge
//   const WaveLayer = isBordered && (
//     <span className="absolute inset-0 z-0 h-full w-[120%] -translate-x-[110%] skew-x-12 bg-black transition-transform duration-500 ease-in-out group-hover:translate-x-[-10%] group-hover:skew-x-0" />
//   )

//   // 2. The Content Wrapper logic
//   // This ensures text and icons stay centered and change color
//   const contentClasses = cn(
//     "relative z-10 flex items-center justify-center gap-2 w-full h-full transition-colors duration-300",
//     isBordered && "group-hover:text-white"
//   )

//   if (asChild) {
//     const elementChildren = React.Children.toArray(children).filter((child) =>
//       React.isValidElement(child)
//     ) as React.ReactElement<{ className?: string; children?: React.ReactNode; ["data-slot"]?: string }>[]

//     if (elementChildren.length !== 1) {
//       throw new Error("Button with asChild expects a single React element child.")
//     }

//     const child = elementChildren[0]

//     return React.cloneElement(
//       child,
//       {
//         ...props,
//         "data-slot": "button",
//         className: cn(buttonVariants({ variant, size, className }), child.props.className),
//       },
//       <>
//         {WaveLayer}
//         <span className={contentClasses}>
//           {child.props.children}
//           {icon}
//         </span>
//       </>
//     )
//   }

//   // Standard Action Button (onClick)
//   return (
//     <Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props}
//     >
//       {WaveLayer}
//       <span className={contentClasses}>
//         {children}
//         {icon}
//       </span>
//     </Comp>
//   )
// }

// function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   icon,
//   children,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean
//     icon?: React.ReactNode
//   }) {
//   const Comp = asChild ? Slot : "button"
//   const mergedClassName = cn(buttonVariants({ variant, size, className }))

//   if (asChild) {
//     const elementChildren = React.Children.toArray(children).filter((child) =>
//       React.isValidElement(child)
//     ) as React.ReactElement<{ className?: string; children?: React.ReactNode; ["data-slot"]?: string }>[]

//     if (elementChildren.length !== 1) {
//       throw new Error("Button with asChild expects a single React element child.")
//     }

//     const child = elementChildren[0]

//     return React.cloneElement(
//       child,
//       {
//         ...props,
//         "data-slot": "button",
//         className: cn(mergedClassName, child.props.className),
//       },
//       <>
//         {child.props.children}
//         {icon}
//       </>
//     )
//   }

//   return (
//     <Comp
//       data-slot="button"
//       className={mergedClassName}
//       {...props}
//     >
//       {children}
//       {icon}
      
//     </Comp>
//   )
// }

export { Button, buttonVariants }
