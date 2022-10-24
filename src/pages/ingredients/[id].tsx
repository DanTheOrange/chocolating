import Head from "next/head"
import { useRouter } from "next/router"

const Recipe = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return

  return (
    <>
      <Head>
        <title>Chocolating - Recipe Creator</title>
      </Head>

      {id}
    </>
  )
}

export default Recipe
