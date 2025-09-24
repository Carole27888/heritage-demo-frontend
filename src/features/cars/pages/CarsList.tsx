"use client";

import { useEffect, useState } from "react";
import { useCars, Car } from "../hooks/useCars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const API = "http://localhost:7078/ssp/cars";

export default function CarsList() {
  const { cars, fetchCars } = useCars();
  const [selected, setSelected] = useState<Car | null>(null);

  // form must use "make" (not brand!)
  const [form, setForm] = useState({ make: "", model: "", year: "", color: "" });

  useEffect(() => {
    fetchCars();
  }, []);

  async function addCar() {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        make: form.make,
        model: form.model,
        year: Number(form.year) || null,
        color: form.color || "Gray",
      }),
    });
    console.log("Add response:", await res.json());
    setForm({ make: "", model: "", year: "", color: "" });
    await fetchCars();
  }

  async function deleteCar(_id: string) {
    const res = await fetch(`${API}/${_id}`, { method: "DELETE" });
    console.log("Delete response:", await res.json());
    if (selected?._id === _id) setSelected(null);
    await fetchCars();
  }

  async function updateCar(_id: string) {
    console.log("Sending update for", _id, form);
    const res = await fetch(`${API}/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        make: form.make,
        model: form.model,
        year: Number(form.year) || null,
        color: form.color,
      }),
    });

    const data = await res.json();
    console.log("Update response:", data);

    if (!res.ok) {
      alert("Update failed: " + (data.message || "unknown error"));
      return;
    }

    setSelected(null);
    setForm({ make: "", model: "", year: "", color: "" });
    await fetchCars();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cars Table */}
      <div className="lg:col-span-2 space-y-4">
        {/* Add Form */}
        <div className="flex gap-2">
          <Input
            placeholder="Make"
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
          />
          <Input
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <Input
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
          <Input
            placeholder="Color"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
          <Button onClick={addCar}>Add</Button>
        </div>

        {/* Cars List Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Make</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.make}</TableCell>
                <TableCell>{c.model}</TableCell>
                <TableCell>{c.year}</TableCell>
                <TableCell>{c.color}</TableCell>
                <TableCell className="flex gap-2">
                  {/* Edit Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelected(c);
                          setForm({
                            make: c.make,
                            model: c.model,
                            year: c.year?.toString() || "",
                            color: c.color || "",
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Car</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        <Input
                          placeholder="Make"
                          value={form.make}
                          onChange={(e) => setForm({ ...form, make: e.target.value })}
                        />
                        <Input
                          placeholder="Model"
                          value={form.model}
                          onChange={(e) => setForm({ ...form, model: e.target.value })}
                        />
                        <Input
                          placeholder="Year"
                          value={form.year}
                          onChange={(e) => setForm({ ...form, year: e.target.value })}
                        />
                        <Input
                          placeholder="Color"
                          value={form.color}
                          onChange={(e) => setForm({ ...form, color: e.target.value })}
                        />
                        <Button onClick={() => updateCar(c._id)}>Save</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Delete */}
                  <Button variant="destructive" onClick={() => deleteCar(c._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Details Panel */}
      <div className="border rounded p-4">
        <h2 className="font-semibold mb-3">Details</h2>
        {!selected && <p>Select a car to view details</p>}
        {selected && (
          <ul className="space-y-2">
            <li><b>ID:</b> {selected._id}</li>
            <li><b>Make:</b> {selected.make}</li>
            <li><b>Model:</b> {selected.model}</li>
            <li><b>Year:</b> {selected.year}</li>
            <li><b>Color:</b> {selected.color}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
