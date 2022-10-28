import { Buttons } from "components/budget-storybook/Buttons"
import { NutritionBlocks } from "components/budget-storybook/NutritionBlocks"
import { Layout } from "components/Layout"
import type { NextPage } from "next"
import Head from "next/head"

// budget storybook 💸
const Test: NextPage = () => (
  <>
    <Head>
      <title>Chocolating - Components</title>
    </Head>

    <Layout className="flex h-screen flex-col gap-10">
      <header className="mx-10 mt-10">
        <h1 className="text-2xl">Components</h1>
      </header>
      <main className="flex flex-grow flex-col gap-4 px-10">
        <Buttons />
        <NutritionBlocks />
      </main>
    </Layout>
  </>
)

export default Test
