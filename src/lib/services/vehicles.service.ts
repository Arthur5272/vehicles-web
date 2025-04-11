import { api } from "@/lib/client";

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  status: boolean;
}

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await api.get("/vehicles");
  return response.data;
}

export async function createVehicle(data: {
  name: string;
  plate: string;
}): Promise<Vehicle> {
  const response = await api.post("/vehicles", data);
  return response.data;
}

export async function updateVehicle(
  id: string,
  data: Partial<Vehicle>
): Promise<Vehicle> {
  const response = await api.put(`/vehicles/${id}`, data);
  return response.data;
}

export async function archiveVehicle(id: string): Promise<Vehicle> {
  const response = await api.patch(`/vehicles/${id}/archive`);
  return response.data;
}

export async function unarchiveVehicle(id: string): Promise<Vehicle> {
  const response = await api.patch(`/vehicles/${id}/unarchive`);
  return response.data;
}

export async function deleteVehicle(id: string): Promise<void> {
  await api.delete(`/vehicles/${id}`);
}

export interface VehicleStats {
  inactive: number;
  active: number;
  total: number;
  totalVehicles: number;
  activeVehicles: number;
  inactiveVehicles: number;
}

export async function getVehicleStats(): Promise<VehicleStats> {
  const response = await api.get("/vehicles/stats");
  return response.data;
}
