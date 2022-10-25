import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import ingredients from "../../public/ingredients.webp"
import recipes from "../../public/recipes.webp"
import scales from "../../public/scales.webp"

type TCard = {
  href: string
  img: { src: StaticImageData; alt?: string }
  title: string
  info?: string
}

const cards: TCard[] = [
  {
    href: "/ingredients",
    img: {
      src: ingredients,
    },
    title: "Ingredient manager",
    info: "Add ingredients to use in recipe creation.",
  },
  {
    href: "/recipes",
    img: {
      src: recipes,
    },
    title: "Recipe creator",
    info: "Formulate a chocolate recipe. Figure out tempering viability, percentage and chocolate type.",
  },
  {
    href: "#",
    img: {
      src: scales,
    },
    title: "Batch calculator",
  },
]

const Home: NextPage = () => (
  <>
    <Head>
      <title>Chocolating</title>
    </Head>
    <h1 className="bold m-auto my-12 text-center text-7xl text-amber-900">Chocolating</h1>
    <section className="mx-10 mb-10 flex justify-center">
      <div className="max-w-6xl rounded-md border border-slate-400 bg-slate-300 p-8 shadow">
        <h2 className="mb-8 text-center text-2xl">Tools</h2>
        <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-8">
          {cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </ul>
      </div>
    </section>
  </>
)

export default Home

const Card = ({ href, img, title, info, ...props }: React.ComponentProps<"li"> & TCard) => (
  <li
    className="overflow-hidden rounded-md border border-slate-400 bg-slate-100 transition-all hover:scale-105 hover:shadow-md"
    {...props}
  >
    <Link href={href}>
      <a className="flex h-full flex-col gap-2 pb-4">
        <div>
          <Image quality={60} alt="" {...img} />
        </div>
        <p className="mx-2 text-lg font-semibold">{title}</p>
        {info && <p className="mx-2">{info}</p>}
      </a>
    </Link>
  </li>
)
