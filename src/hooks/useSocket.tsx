import io from "socket.io-client";
import { useMemo, useState, useEffect } from "react";

export const useSocket = (serverPath: string) => {
  const socket = useMemo(
    () =>
      io(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );

  const [online, setOnline] = useState<boolean>(false);

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

  return {
    socket,
    online,
  };
};
