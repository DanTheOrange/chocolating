import type { NextPage } from "next"
import Head from "next/head"
import { Button } from "../components/Button"
import { useIngredients } from "../hooks/useIngredients"
import { useState } from "react"
import { Modal } from "../components/Modal"
import { AddIngredientForm } from "../components/AddIngredientForm"

const IngredientManager: NextPage = () => {
  const { ingredients } = useIngredients()
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Head>
        <title>Chocolating - Ingredient manager</title>
      </Head>

      <div>
        <h1>Ingredient manager</h1>

        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.uuid}>{ingredient.name}</li>
          ))}
          <li></li>
        </ul>
        <Button onClick={openModal}>Add ingredient</Button>
        <Modal isOpen={isOpen} closeModal={closeModal} title="Test">
          <AddIngredientForm />
        </Modal>
      </div>
    </>
  )
}

export default IngredientManager
