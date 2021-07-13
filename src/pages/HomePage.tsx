import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { SocketContextProps } from "../interfaces/socket.context.interface";
import ProductAdd from "../components/ProductAdd";
import ProductList from "../components/ProductList";
import ChartProducts from "../components/ChartProducts";

function HomePage() {
  const { online } = useContext<SocketContextProps>(SocketContext);

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
        <div className="col">
          <ChartProducts />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <ProductList />
        </div>
        <div className="col-4">
          <ProductAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
