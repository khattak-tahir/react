import React, { createContext, useContext, useState } from "react";
// import { useRoute } from '@react-navigation/native'; // Import useRoute from @react-navigation/native

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};


export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("timetable");

  const navigateTo = (page) => {
    console.log('page at' , page)
    setCurrentPage(page);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};
