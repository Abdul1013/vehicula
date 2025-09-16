import { useState } from "react";

export function useCart() {
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);

  const toggleSelect = (service) => {
    setSelectedId(service.id);
    if (!cart.find((item) => item.id === service.id)) {
      setCart([...cart, service]);
    }
  };

  return { selectedId, cart, toggleSelect };
}