"use client";

import CarsList from "./CarsList";
import { Card } from "@/components/ui/card";

export default function CarsWrapper() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cars Dashboard</h1>
      <CarsList />
    </Card>
  );
}
