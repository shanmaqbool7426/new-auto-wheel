"use client";
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/api-endpoints';

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [comparisonVehicles, setComparisonVehicles] = useState([]);

  const addToComparison = async (vehicle) => {
    if (comparisonVehicles.length < 3) {
      try {
        // Fetch full vehicle details immediately when adding
        const response = await axios.get(`${BASE_URL}/api/new-vehicles/get-newVehicle-details`, {
          params: {
            make: vehicle.Info.make,
            model: vehicle.Info.model,
            variant: vehicle.Info.variant
          }
        });

        console.log("response...")
        
        if (response.data) {
          setComparisonVehicles([...comparisonVehicles, response.data]);
        }
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    }
  };

  const removeFromComparison = (make, model, variant) => {
    setComparisonVehicles(prev => 
      prev.filter(vehicle => 
        !(vehicle.data.make === make && 
          vehicle.data.model === model && 
          vehicle.data.variant === variant)
      )
    );
  };


  console.log("comparisonVehicles",comparisonVehicles)
  const updateVehicleVariant = async (index, newSelection) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/new-vehicles/get-newVehicle-details`, {
        params: {
          make: newSelection.make,
          model: newSelection.model,
          variant: newSelection.variant
        }
      });

      console.log("response>>>",response.data)

      if (response.data) {
        setComparisonVehicles(prev => {
          const updated = [...prev];
          updated[index] = response.data;
          return updated;
        });
      }
    } catch (error) {
      console.error('Error updating vehicle variant:', error);
    }
  };

  return (
    <ComparisonContext.Provider value={{ 
      comparisonVehicles,
      setComparisonVehicles, 
      addToComparison, 
      removeFromComparison,
      updateVehicleVariant
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};