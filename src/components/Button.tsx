import cn from "classnames"

export const BUTTON_SIZES = ["xs", "sm", "md", "lg"] as const

type TButtonSizes = typeof BUTTON_SIZES[number]

const ButtonSizeMap = new Map<TButtonSizes, string>([
  ["xs", "py-0.5 px-2 text-xs"],
  ["sm", "py-1 px-3 text-sm"],
  ["md", "py-1.5 px-4 text-md"],
  ["lg", "py-2 px-5 text-lg"],
])

type TButtonProps = React.ComponentProps<"button"> & {
  size?: TButtonSizes
}

const BaseButton = ({ className, size = "md", ...props }: TButtonProps) => (
  <button
    className={cn("rounded font-semibold", ButtonSizeMap.get(size), className)}
    {...props}
  />
)

export const PrimaryButton = ({ className, ...props }: TButtonProps) => (
  <BaseButton
    className={cn(
      "rounded bg-blue-200 py-2 px-4 font-bold text-slate-800 hover:bg-blue-300",
      className
    )}
    {...props}
  />
)

export const SecondaryButton = ({ className, ...props }: TButtonProps) => (
  <BaseButton
    className={cn(
      "rounded bg-amber-100 py-2 px-4 font-bold text-slate-800 hover:bg-amber-200",
      className
    )}
    {...props}
  />
)

export const DangerButton = ({ className, ...props }: TButtonProps) => (
  <BaseButton
    className={cn(
      "rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-700",
      className
    )}
    {...props}
  />
)
