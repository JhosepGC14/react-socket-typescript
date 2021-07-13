import { useEffect, useState } from "react";
import io from "socket.io-client";
import ProductAdd from "./components/ProductAdd";
import ProductList from "./components/ProductList";
import { Products } from "./interfaces/products.interface";

const connectSocketServer = () => {
  const socket = io("http://localhost:8080/", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState<boolean>(false);
  const [products, setProducts] = useState<Products[]>([]);

  //Initilization of socket client
  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  //seteamos el valor cuando se conecta
  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  //seteamos el valor cuando se desconecta
  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  //escuchamos cualquier evento emitido del servidor con el key "current-products"
  useEffect(() => {
    socket.on("current-products", (products) => {
      setProducts(products);
    });
  }, [socket]);

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

  //function para cambiar el nombre al producto
  const addProduct = (name: string): void => {
    socket.emit("add-product", name);
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status:{" "}
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>Lista de Productos</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <ProductList
            products={products}
            onLikeProduct={likeProduct}
            onChangeNameProduct={changeNameProduct}
            onDeleteProduct={deleteProduct}
          />
        </div>
        <div className="col-4">
          <ProductAdd onAddProduct={addProduct} />
        </div>
      </div>
    </div>
  );
}

export default App;
