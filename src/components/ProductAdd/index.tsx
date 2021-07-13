import { ChangeEvent, FormEvent, useState } from "react";

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

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <>
      <h4>Agregar Producto</h4>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="nombre producto"
          className="form-control"
          value={newName}
          onChange={handleChangeName}
        />
      </form>
    </>
  );
};

export default ProductAdd;
