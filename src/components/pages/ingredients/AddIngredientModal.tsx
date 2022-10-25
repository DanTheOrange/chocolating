import { IngredientForm } from "components/pages/ingredients/IngredientForm"
import { PrimaryButton } from "components/Button"
import { Modal } from "components/Modal"
import { useState } from "react"
import { createIngredientSchema } from "schemas/ingredients"

export const AddIngredientModal = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <PrimaryButton onClick={openModal} className="sm:w-auto md:w-fit">
        Add ingredient
      </PrimaryButton>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add an ingredient">
        <IngredientForm
          onSubmit={closeModal}
          // schema={createIngredientSchema}
        />
      </Modal>
    </>
  )
}
