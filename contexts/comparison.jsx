"use client";
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/api-endpoints';

const ComparisonContext = createContext();

export function ComparisonProvider({ children }) {
  const [comparisonVehicles, setComparisonVehicles] = useState([]);

  const addToComparison = async (vehicle) => {
    console.log("vehicle", vehicle);
    
    // Check if we already have this vehicle in the comparison
    const isDuplicate = comparisonVehicles.some(item => 
      (item.data.make === vehicle.make && 
       item.data.model === vehicle.model && 
       item.data.variant === vehicle.variant) ||
      (item.data.Info?.make === vehicle.Info?.make && 
       item.data.Info?.model === vehicle.Info?.model && 
       item.data.Info?.variant === vehicle.Info?.variant)
    );
    
    // If it's a duplicate, don't add it again
    if (isDuplicate) {
      console.log("Vehicle already in comparison");
      return;
    }
    
    // Only proceed if we have less than 3 vehicles
    if (comparisonVehicles.length < 3) {
      try {
        // Determine which API parameters to use based on vehicle structure
        const params = vehicle.Info ? {
          make: vehicle.Info.make,
          model: vehicle.Info.model,
          variant: vehicle.Info.variant
        } : {
          make: vehicle.make,
          model: vehicle.model,
          variant: vehicle.variant
        };
        
        // Fetch full vehicle details
        const response = await axios.get(`${BASE_URL}/api/new-vehicles/get-newVehicle-details`, {
          params: params
        });
        
        console.log("response...", response.data);
        
        if (response.data?.data) {
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


  const handleRemoveComparison = (vehicleId) => {
    // Remove from comparisonVehicles context
    // removeFromComparison(vehicleId);

    // Remove from newVehicleDetails state
    setComparisonVehicles(prev =>
      prev.filter(item => item.data._id !== vehicleId)
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
      handleRemoveComparison,
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