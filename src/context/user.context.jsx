import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//priveder actual component, che useremo per wrappare qualsiasi componente che deve poter accedere al valore

export const UserProvider = ({ children }) => {
  //il null lo passiamo per lo stato non per il valore del contesto
  const [currentUser, setCurrentUser] = useState(null);
  //voglio essere in grado di vedere il valore e di poter anche aggiornarne lo stato in qualsiasi componente nidificato dentro il context provider.
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
