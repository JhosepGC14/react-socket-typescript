import HomePage from "./pages/HomePage";
import { SocketProvider } from "./context/SocketContext";

const ProductsApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};

export default ProductsApp;
