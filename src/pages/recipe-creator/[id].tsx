import { useRouter } from "next/router"

const Recipe = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Recipe: {id}</p>
}

export default Recipe
