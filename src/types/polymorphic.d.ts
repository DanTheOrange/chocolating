// Having fun testing polymorphic components.
// I can't say I truely understand all of this yet, but I get the gist!
// not my code!
// https://github.com/ohansemmanuel/polymorphic-react-component/blob/master/06.tsx
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"]

export type AsProp<C extends React.ElementType> = {
  as?: C
}

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = Record<string, unknown>
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = Record<string, unknown>
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }
