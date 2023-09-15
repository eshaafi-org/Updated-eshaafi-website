import { createContext, useState } from "react";
export const drawer = createContext(null);
export const loginModel = createContext(null);
function Context({ children }) {
  const [loginModal, setLoginModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  return (
    <>
      <drawer.Provider value={{ drawer, setDrawer }}>
        <loginModal.Provider value={{ loginModal, setLoginModal }}>
          {children}
        </loginModal.Provider>
      </drawer.Provider>
    </>
  );
}

export default Context;
