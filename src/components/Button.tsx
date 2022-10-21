import cn from "classnames"
import { forwardRef } from "react"
import type { ElementType } from "react"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "types/polymorphic"

// Button stuff
type TButtonSizes = typeof BUTTON_SIZES[number]

const ButtonSizeMap = new Map<TButtonSizes, string>([
  ["xs", "py-0.5 px-2 text-xs"],
  ["sm", "py-1 px-3 text-sm"],
  ["md", "py-1.5 px-4 text-md"],
  ["lg", "py-2 px-5 text-lg"],
])

export const BUTTON_SIZES = ["xs", "sm", "md", "lg"] as const

const defaultElement = "button"

type TButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  { size?: TButtonSizes }
>

type TButtonComponent = <C extends React.ElementType = typeof defaultElement>(
  props: TButtonProps<C>
) => React.ReactElement | null

const BaseButton: TButtonComponent = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, size = "md", as, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const As = as ?? defaultElement

    return (
      <As
        ref={ref}
        className={cn("rounded font-semibold", ButtonSizeMap.get(size), className)}
        {...props}
      />
    )
  }
)

export const PrimaryButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => (
    <BaseButton
      ref={ref}
      className={cn(
        "rounded bg-blue-200 py-2 px-4 font-bold text-slate-800 hover:bg-blue-300",
        className
      )}
      {...props}
    />
  )
)

export const SecondaryButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => (
    <BaseButton
      ref={ref}
      className={cn(
        "rounded bg-amber-100 py-2 px-4 font-bold text-slate-800 hover:bg-amber-200",
        className
      )}
      {...props}
    />
  )
)

export const DangerButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => (
    <BaseButton
      ref={ref}
      className={cn(
        "rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-700",
        className
      )}
      {...props}
    />
  )
)
