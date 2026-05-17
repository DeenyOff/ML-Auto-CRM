export type CarServiceStatus =
  | "Ready"
  | "In service"
  | "Scheduled"
  | "Follow-up";

export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin: string;
  plateNumber: string;
  owner: string;
  ownerId: string;
  mileage: number;
  lastServiceDate: string;
  status: CarServiceStatus;
  color: string;
};
