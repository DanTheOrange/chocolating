import {
  BUTTON_SIZES,
  PrimaryButton,
  SecondaryButton,
  NeutralButton,
  DangerButton,
} from "components/Button"
import toast from "react-hot-toast"
import { Fragment } from "react"

const buttonTypes = [
  { buttonType: "Primary", Component: PrimaryButton },
  { buttonType: "Secondary", Component: SecondaryButton },
  { buttonType: "Neutral", Component: NeutralButton },
  { buttonType: "Danger", Component: DangerButton },
]

const modifiers = [
  { modifier: "Normal", props: {} },
  { modifier: "As anchor", props: { as: "a", href: "#" } },
  { modifier: "isDisabled", props: { isDisabled: true } },
]

export const Buttons = () => (
  <>
    <h2 className="text-xl">Buttons</h2>
    <div className="flex flex-row flex-wrap gap-8">
      {/* Loop through the types of button */}
      {buttonTypes.map(({ buttonType, Component }) => (
        <div className="flex flex-col gap-2" key={buttonType}>
          <h3 className="text-lg">{buttonType}</h3>
          {/* Loop through the modifiers */}
          {modifiers.map(({ modifier, props }) => (
            <Fragment key={modifier}>
              <h4>{modifier}</h4>
              <div className="flex flex-row gap-2">
                {/* Loop through the sizes */}
                {BUTTON_SIZES.map((size) => (
                  <div key={size}>
                    <p>{size}</p>
                    <Component
                      size={size}
                      onClick={() =>
                        toast(
                          `${buttonType} ${size} ${
                            modifier.charAt(0).toUpperCase() + modifier.slice(1)
                          } button clicked`
                        )
                      }
                      {...props}
                    >
                      Chocolate
                    </Component>
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  </>
)
