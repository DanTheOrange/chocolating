import { Buttons } from "components/budget-storybook/Buttons"
import type { NextPage } from "next"
import Head from "next/head"

// budget storybook 💸
const Test: NextPage = () => (
  <>
    <Head>
      <title>Chocolating - Components</title>
    </Head>

    <div className="flex flex-col gap-4 p-10">
      <h1 className="text-2xl">Components</h1>
      <Buttons />
    </div>
  </>
)

export default Test
