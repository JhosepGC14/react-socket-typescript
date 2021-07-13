import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import {
  SocketContextProps,
  SocketProviderProps,
} from "../interfaces/socket.context.interface";

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  online: false,
});

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online } = useSocket("http://localhost:8080");

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
