import { useEffect, useState, useContext } from "react";
import Bar from "react-chartjs-2";
import { SocketContextProps } from "../../interfaces/socket.context.interface";
import { SocketContext } from "../../context/SocketContext";
import { Products } from "../../interfaces/products.interface";

const ChartProducts = () => {
  const [data, setData] = useState({});
  const [options, setOptions] = useState({});
  const { socket } = useContext<SocketContextProps>(SocketContext);

  //escuchamos cualquier evento emitido del servidor con el key "current-products"
  useEffect(() => {
    socket.on("current-products", (products: Products[]) => {
      createGraphical(products);
    });
    return () => socket.off("current-products");
  }, [socket]);

  const createGraphical = (products: Products[]) => {
    setData({
      labels: products.map((item) => item.name),
      datasets: [
        {
          axis: "y",
          label: "My First Dataset",
          fill: false,
          data: products.map((item) => item.likes),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

    setOptions({
      indexAxis: "y",
      animation: false,
      responsive: true,
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    });
  };

  return (
    <>
      <Bar type="bar" data={data} options={options} />
    </>
  );
};

export default ChartProducts;
