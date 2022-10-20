import { useRouter } from "next/router"

const Recipe = () => {
  const router = useRouter()
  const { rid } = router.query

  return <p>Recipe: {rid}</p>
}

export default Recipe
