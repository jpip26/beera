import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

const useSocketIO = () => {
  const socketUrl = process.env.NEXT_PUBLIC_BEERA_API_WS_URL;
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (socketUrl) {
      const socketIo = io(socketUrl);
      setSocket(socketIo);
      return () => socketIo.disconnect();
    }
  }, []);
  return socket;
};

const useNotifications = () => {
  const socket = useSocketIO();
  useEffect(() => {
    if (socket) {
      socket.on('overdueBeer', ({ message }) => {
        toast(`⏰ ${message}`);
      });
    }
  }, [socket]);
};

export default useNotifications;
