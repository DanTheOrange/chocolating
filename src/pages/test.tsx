import type { NextPage } from "next"
import Head from "next/head"
import {
  BUTTON_SIZES,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
} from "../components/Button"

const Test: NextPage = () => (
  <>
    <Head>
      <title>Chocolating - Components</title>
    </Head>

    <div className="flex flex-col gap-4 p-10">
      <h1 className="text-2xl">Components</h1>
      <h2 className="text-xl">Buttons</h2>
      <h3 className="text-lg">Primary</h3>
      <div className="flex flex-row gap-2">
        {BUTTON_SIZES.map((size) => (
          <div key={size}>
            <p>{size}</p>
            <PrimaryButton size={size}>Chocolate</PrimaryButton>
          </div>
        ))}
      </div>
      <h3 className="text-lg">Secondary</h3>
      <div className="flex flex-row gap-2">
        {BUTTON_SIZES.map((size) => (
          <div key={size}>
            <p>{size}</p>
            <SecondaryButton size={size}>Chocolate</SecondaryButton>
          </div>
        ))}
      </div>
      <h3 className="text-lg">Danger</h3>
      <div className="flex flex-row gap-2">
        {BUTTON_SIZES.map((size) => (
          <div key={size}>
            <p>{size}</p>
            <DangerButton size={size}>Chocolate</DangerButton>
          </div>
        ))}
      </div>
    </div>
  </>
)

export default Test
