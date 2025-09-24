"use client";

import { useState } from "react";

export type Car = {
  _id: string;             
  make: string;            
  model: string;
  year: number | null;
  color?: string;          
};


const API = "http://localhost:7078/ssp/cars";

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  // Fetch all cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(API, { cache: "no-store" });
      const json = await res.json();
      setCars(json.data || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Update a car
  const updateCar = async (id: number, updates: Partial<Car>) => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update car");

      await fetchCars(); // refresh list after update
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { cars, isLoading, hasError, fetchCars, updateCar, setCars };
};
