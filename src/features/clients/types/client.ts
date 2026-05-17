export type ClientVipStatus = "VIP" | "Standard";

export type Client = {
  id: string;
  name: string;
  phone: string;
  cars: string[];
  lastVisit: string;
  totalSpent: number;
  vipStatus: ClientVipStatus;
};

export type ClientTag =
  | "Ceramic"
  | "Fleet"
  | "Paint correction"
  | "Priority"
  | "Seasonal storage"
  | "Sport interior";

export type ClientVehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  mileage: number;
  plateNumber: string;
  nextServiceDue: string;
};

export type ServiceHistoryStatus =
  | "Completed"
  | "In progress"
  | "Scheduled"
  | "Quoted";

export type ServiceHistoryItem = {
  id: string;
  date: string;
  vehicle: string;
  service: string;
  status: ServiceHistoryStatus;
  price: number;
  advisor: string;
  notes: string;
};

export type ClientActivityItem = {
  id: string;
  date: string;
  title: string;
  description: string;
};

export type ClientPreferences = {
  contactMethod: "Phone" | "Email" | "SMS";
  pickupWindow: string;
  invoicePreference: string;
  waitingArea: string;
  specialInstructions: string[];
  favoriteServices: string[];
};

export type ClientNote = {
  id: string;
  author: {
    name: string;
    role: string;
  };
  timestamp: string;
  body: string;
};

export type ClientPhoto = {
  id: string;
  title: string;
  type: "Before" | "After";
  vehicle: string;
  date: string;
  imageUrl: string;
};

export type ClientProfile = Client & {
  email: string;
  initials: string;
  address: string;
  joinedAt: string;
  tags: ClientTag[];
  stats: {
    bookings: number;
    vehicles: number;
    averageTicket: number;
    loyaltyScore: number;
  };
  vehicles: ClientVehicle[];
  history: ServiceHistoryItem[];
  preferences: ClientPreferences;
  notes: ClientNote[];
  photos: ClientPhoto[];
  recentActivity: ClientActivityItem[];
};
