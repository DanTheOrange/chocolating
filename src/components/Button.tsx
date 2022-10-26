import cn from "classnames"
import { forwardRef } from "react"
import type { ElementType } from "react"
import { PolymorphicComponentPropWithRef, PolymorphicRef } from "types/polymorphic"

// Button stuff
type TButtonSizes = typeof BUTTON_SIZES[number]

const ButtonSizeMap = new Map<TButtonSizes | "custom", string>([
  ["xs", "py-0.5 px-2 text-xs"],
  ["sm", "py-1 px-3 text-sm"],
  ["md", "py-1.5 px-4 text-md"],
  ["lg", "py-2 px-5 text-lg"],
  ["custom", ""],
])

export const BUTTON_SIZES = ["xs", "sm", "md", "lg"] as const

const defaultElement = "button"

type TButtonProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  { size?: TButtonSizes; isDisabled?: boolean }
>

// TODO: implement this
// type TButtonComponent = <C extends React.ElementType = typeof defaultElement>(
//   props: TButtonProps<C>
// ) => React.ReactElement | null

export const BaseButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { as, className, size = "md", isDisabled = false, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const As = as ?? defaultElement

    return (
      <As
        ref={ref}
        className={cn(
          "block rounded font-semibold transition-colors",
          { "cursor-pointer": !isDisabled, "cursor-not-allowed": isDisabled },
          ButtonSizeMap.get(size),
          className
        )}
        disabled={isDisabled}
        {...props}
      />
    )
  }
)

BaseButton.displayName = "BaseButton"

export const PrimaryButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => (
    <BaseButton
      ref={ref}
      className={cn(
        "rounded bg-blue-600 font-bold text-slate-100",
        {
          "opacity-50": props.isDisabled,
          "hover:bg-blue-700 active:bg-blue-800": !props.isDisabled,
        },
        className
      )}
      {...props}
    />
  )
)

PrimaryButton.displayName = "PrimaryButton"

export const SecondaryButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => (
    <BaseButton
      ref={ref}
      className={cn(
        "-m-px rounded border border-blue-500 font-bold text-slate-800",
        {
          "opacity-50": props.isDisabled,
          "hover:border-blue-700 hover:bg-blue-200 active:border-blue-800 active:bg-blue-300":
            !props.isDisabled,
        },
        className
      )}
      {...props}
    />
  )
)

SecondaryButton.displayName = "SecondaryButton"

export const NeutralButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => (
    <BaseButton
      ref={ref}
      className={cn(
        "rounded bg-stone-600 font-bold text-slate-100",
        {
          "opacity-50": props.isDisabled,
          "hover:bg-stone-700 active:bg-stone-800": !props.isDisabled,
        },
        className
      )}
      {...props}
    />
  )
)

NeutralButton.displayName = "NeutralButton"

export const DangerButton = forwardRef(
  <C extends ElementType = typeof defaultElement>(
    { className, ...props }: TButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => (
    <BaseButton
      ref={ref}
      className={cn(
        "rounded bg-red-600 font-bold text-white",
        {
          "opacity-50": props.isDisabled,
          "hover:bg-red-700 active:bg-red-800": !props.isDisabled,
        },
        className
      )}
      {...props}
    />
  )
)

DangerButton.displayName = "DangerButton"
