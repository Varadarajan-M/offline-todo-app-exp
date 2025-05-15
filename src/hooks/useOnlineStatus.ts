import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine);

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  return online;
};
