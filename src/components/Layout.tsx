import { ReactElement } from "react"
import { Footer } from "./Footer"

type AllowedElements =
  | ReactElement<React.ComponentProps<"header">>
  | ReactElement<React.ComponentProps<"main">>

type LayoutProps = {
  children: AllowedElements[]
  className?: string
}

export const Layout = ({ children, className }: LayoutProps) => {
  // in an ideal world this div would be the body
  return (
    <div className={className}>
      {children.find((child) => child.type === "header")}
      {children.find((child) => child.type === "main")}
      <Footer />
    </div>
  )
}
