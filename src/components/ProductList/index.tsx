import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { SocketContextProps } from "../../interfaces/socket.context.interface";
import { Products } from "../../interfaces/products.interface";

const ProductList = () => {
  //state y context
  const [productos, setProductos] = useState<Products[]>([]);
  const { socket } = useContext<SocketContextProps>(SocketContext);

  //escuchamos cualquier evento emitido del servidor con el key "current-products"
  useEffect(() => {
    socket.on("current-products", (products: Products[]) => {
      setProductos(products);
    });

    return () => socket.off("current-products");
  }, [socket]);

  //onChange del input
  const onChangeName = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const newName = event.target.value;
    setProductos((productos) =>
      productos.map((producto) => {
        if (producto.id === id) {
          producto.name = newName;
        }
        return producto;
      })
    );
  };

  //onBlur del input para que cuando desenfoque haga un evento
  const onBlurChange = (id: string, newName: string) => {
    changeNameProduct(id, newName);
  };

  //function para dar like al producto
  const likeProduct = (id: string): void => {
    socket.emit("like-product", id);
  };

  //function para cambiar el nombre al producto
  const changeNameProduct = (id: string, name: string): void => {
    socket.emit("change-name-product", { id, name });
  };

  //function para cambiar el nombre al producto
  const deleteProduct = (id: string): void => {
    socket.emit("delete-product", id);
  };

  //function para crear las filas de la tabla
  const createRows = () => {
    return productos.map((item, index) => (
      <tr key={index}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => likeProduct(item.id)}
          >
            {" "}
            +1{" "}
          </button>
        </td>
        <td>
          <input
            type="text"
            value={item.name}
            onChange={(e) => onChangeName(e, item.id)}
            onBlur={() => onBlurChange(item.id, item.name)}
            className="form-control"
          />
        </td>
        <td>
          <h3>{item.likes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteProduct(item.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};

export default ProductList;
