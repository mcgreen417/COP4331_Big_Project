import React, { useState, createContext } from "react";
import { plantImages, myPlants, plantReminders2 } from "../constants/plants";

// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export function GlobalContextProvider(props) {
  const [plantEntries, setPlantEntries] = useState([]);
  const [photoObjects, setPhotoObjects] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        plantEntriesContext: [plantEntries, setPlantEntries],
        photoObjectsContext: [photoObjects, setPhotoObjects],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
