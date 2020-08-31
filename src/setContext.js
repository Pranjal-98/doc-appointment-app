import React, { createContext, useState } from "react";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [me, setUser] = useState(null);

  const setUserState = (user) => {
    setUser(user);
  };
  return (
    <AppContext.Provider
      value={{
        me,
        setUserState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
