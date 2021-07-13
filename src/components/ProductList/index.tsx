import { ChangeEvent, useEffect, useState } from "react";
import { Products } from "../../interfaces/products.interface";

type ProductListProps = {
  products: Products[];
  onLikeProduct: (id: string) => void;
  onChangeNameProduct: (id: string, name: string) => void;
  onDeleteProduct: (id: string) => void;
};

const ProductList = ({
  products,
  onLikeProduct,
  onChangeNameProduct,
  onDeleteProduct,
}: ProductListProps) => {
  const [productos, setProductos] = useState(products);

  //useffect que setea la data si existe algun cambio
  useEffect(() => {
    setProductos(products);
  }, [products]);

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
    onChangeNameProduct(id, newName);
  };

  //function para crear las filas de la tabla
  const createRows = () => {
    return productos.map((item, index) => (
      <tr key={index}>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => onLikeProduct(item.id)}
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
            onClick={() => onDeleteProduct(item.id)}
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
