import { supabase } from "@/lib/supabase/client";
import type { Car, CarServiceStatus } from "@/features/cars/types/car";

type ClientRelation =
  | {
      id: string | null;
      full_name: string | null;
    }
  | Array<{
      id: string | null;
      full_name: string | null;
    }>
  | null;

type CarRow = {
  id: string;
  client_id: string | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  vin: string | null;
  plate_number: string | null;
  color: string | null;
  mileage: number | null;
  last_service_date: string | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  client?: ClientRelation;
  clients?: ClientRelation;
};

export type CreateCarInput = {
  brand: string;
  model: string;
  year: number;
  vin: string;
  plate_number: string;
  color: string;
  mileage: number;
  client_id: string;
};

function normalizeStatus(status: string | null): CarServiceStatus {
  const value = status?.toLowerCase() ?? "";

  if (value.includes("service")) {
    return "In service";
  }

  if (value.includes("sched")) {
    return "Scheduled";
  }

  if (value.includes("follow")) {
    return "Follow-up";
  }

  return "Ready";
}

function getLinkedClient(row: CarRow) {
  const relation = row.client ?? row.clients ?? null;

  return Array.isArray(relation) ? relation[0] : relation;
}

function mapCarRow(row: CarRow): Car {
  const client = getLinkedClient(row);

  return {
    id: row.id,
    brand: row.brand ?? "Unknown brand",
    model: row.model ?? "Unknown model",
    year: row.year ?? 0,
    vin: row.vin ?? "Not recorded",
    plateNumber: row.plate_number ?? "Not recorded",
    owner: client?.full_name ?? "Unassigned",
    ownerId: client?.id ?? row.client_id ?? "",
    mileage: row.mileage ?? 0,
    lastServiceDate:
      row.last_service_date ?? row.updated_at ?? row.created_at ?? new Date(0).toISOString(),
    status: normalizeStatus(row.status),
    color: row.color ?? "Not recorded",
  };
}

export async function getCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from("cars")
    .select("*, client:clients(id, full_name)")
    .order("last_service_date", { ascending: false, nullsFirst: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => mapCarRow(row as CarRow));
}

export async function getCar(id: string): Promise<Car | null> {
  const { data, error } = await supabase
    .from("cars")
    .select("*, client:clients(id, full_name)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapCarRow(data as CarRow) : null;
}

export async function createCar(input: CreateCarInput): Promise<Car> {
  const { data, error } = await supabase
    .from("cars")
    .insert({
      brand: input.brand,
      model: input.model,
      year: input.year,
      vin: input.vin,
      plate_number: input.plate_number,
      color: input.color,
      mileage: input.mileage,
      client_id: input.client_id,
      status: "active",
    })
    .select("*, client:clients(id, full_name)")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCarRow(data as CarRow);
}
