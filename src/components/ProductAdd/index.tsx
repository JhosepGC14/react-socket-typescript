import { FormEvent, useState } from "react";

type ProductAddProps = {
  onAddProduct: (name: string) => void;
};

const ProductAdd = ({ onAddProduct }: ProductAddProps) => {
  const [newName, setNewName] = useState<string>("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newName.trim().length > 0) {
      onAddProduct(newName);
      setNewName("");
    }
  };

  return (
    <>
      <h3>Agregar Producto</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="nuevo nombre producto"
          className="form-control"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </form>
    </>
  );
};

export default ProductAdd;
