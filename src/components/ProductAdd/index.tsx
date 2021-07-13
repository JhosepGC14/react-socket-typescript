import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { SocketContextProps } from "../../interfaces/socket.context.interface";

const ProductAdd = () => {
  const [newName, setNewName] = useState<string>("");
  const { socket } = useContext<SocketContextProps>(SocketContext);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newName.trim().length > 0) {
      addProduct(newName);
      setNewName("");
    }
  };

  //function para cambiar el nombre al producto
  const addProduct = (name: string): void => {
    socket.emit("add-product", name);
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
