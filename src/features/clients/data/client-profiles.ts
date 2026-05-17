import type { ClientProfile } from "@/features/clients/types/client";
import { clients } from "@/features/clients/data/clients";

export const clientProfiles: ClientProfile[] = [
  {
    id: "andrius-petrauskas",
    name: "Andrius Petrauskas",
    initials: "AP",
    phone: "+370 612 44011",
    email: "andrius.petrauskas@private.lt",
    address: "Vilnius, Lithuania",
    cars: ["Porsche 911 Carrera", "Audi RS6 Avant"],
    lastVisit: "2026-05-14",
    joinedAt: "2023-09-18",
    totalSpent: 6840,
    vipStatus: "VIP",
    tags: ["Priority", "Ceramic", "Paint correction"],
    stats: {
      bookings: 18,
      vehicles: 2,
      averageTicket: 380,
      loyaltyScore: 96,
    },
    vehicles: [
      {
        id: "porsche-911",
        brand: "Porsche",
        model: "911 Carrera",
        year: 2023,
        vin: "WP0AB2A99NS221734",
        color: "Carrara White Metallic",
        mileage: 18420,
        plateNumber: "MLA 911",
        nextServiceDue: "2026-06-10",
      },
      {
        id: "audi-rs6",
        brand: "Audi",
        model: "RS6 Avant",
        year: 2022,
        vin: "WUAZZZF25NN904211",
        color: "Daytona Gray Pearl",
        mileage: 32780,
        plateNumber: "RS6 AUTO",
        nextServiceDue: "2026-07-02",
      },
    ],
    history: [
      {
        id: "svc-101",
        date: "2026-05-14",
        vehicle: "Porsche 911 Carrera",
        service: "Ceramic coating inspection",
        status: "Completed",
        price: 260,
        advisor: "Marius",
        notes: "Hydrophobic layer is stable. Added maintenance wash plan.",
      },
      {
        id: "svc-102",
        date: "2026-04-21",
        vehicle: "Audi RS6 Avant",
        service: "Two-stage paint correction",
        status: "Completed",
        price: 890,
        advisor: "Greta",
        notes: "Heavy door handle swirls corrected. Rear bumper needs follow-up.",
      },
      {
        id: "svc-103",
        date: "2026-06-03",
        vehicle: "Porsche 911 Carrera",
        service: "Interior leather treatment",
        status: "Scheduled",
        price: 320,
        advisor: "Marius",
        notes: "Use matte finish conditioner on all leather surfaces.",
      },
    ],
    preferences: {
      contactMethod: "Phone",
      pickupWindow: "Weekdays after 17:30",
      invoicePreference: "Company invoice by email",
      waitingArea: "Prefers vehicle drop-off",
      specialInstructions: [
        "Do not use scented interior products.",
        "Photograph paint defects before correction approval.",
        "Keep tire dressing satin, never glossy.",
      ],
      favoriteServices: [
        "Ceramic maintenance wash",
        "Paint correction",
        "Leather conditioning",
      ],
    },
    notes: [
      {
        id: "note-1",
        author: {
          name: "Marius Jonaitis",
          role: "Service advisor",
        },
        timestamp: "2026-05-14T16:20:00",
        body: "Client asked for a quarterly ceramic inspection reminder. Porsche should be prioritized for Friday afternoon slots.",
      },
      {
        id: "note-2",
        author: {
          name: "Greta V.",
          role: "Detailing lead",
        },
        timestamp: "2026-04-21T12:45:00",
        body: "RS6 rear bumper has deeper marks below the loading edge. Recommend quote before the next correction package.",
      },
    ],
    photos: [
      {
        id: "photo-1",
        title: "Front quarter paint condition",
        type: "Before",
        vehicle: "Porsche 911 Carrera",
        date: "2026-05-14",
        imageUrl:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "photo-2",
        title: "Ceramic coating finish",
        type: "After",
        vehicle: "Porsche 911 Carrera",
        date: "2026-05-14",
        imageUrl:
          "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "photo-3",
        title: "Interior leather before treatment",
        type: "Before",
        vehicle: "Audi RS6 Avant",
        date: "2026-04-21",
        imageUrl:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: "photo-4",
        title: "Corrected paint reflection",
        type: "After",
        vehicle: "Audi RS6 Avant",
        date: "2026-04-21",
        imageUrl:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      },
    ],
    recentActivity: [
      {
        id: "activity-1",
        date: "2026-05-14",
        title: "Ceramic inspection completed",
        description: "Porsche 911 maintenance wash and coating check.",
      },
      {
        id: "activity-2",
        date: "2026-05-09",
        title: "Photo set uploaded",
        description: "Before and after gallery added for client approval.",
      },
      {
        id: "activity-3",
        date: "2026-04-21",
        title: "Paint correction invoice paid",
        description: "Audi RS6 Avant two-stage correction closed.",
      },
    ],
  },
];

export function getClientProfile(id: string) {
  const detailedProfile = clientProfiles.find((client) => client.id === id);

  if (detailedProfile) {
    return detailedProfile;
  }

  const baseClient = clients.find((client) => client.id === id);

  if (!baseClient) {
    return undefined;
  }

  const [firstName = "", lastName = ""] = baseClient.name.split(" ");
  const firstVehicle = baseClient.cars[0] ?? "ML Auto Vehicle";

  return {
    ...baseClient,
    email: `${baseClient.id}@mlauto.example`,
    initials: `${firstName[0] ?? "M"}${lastName[0] ?? "L"}`.toUpperCase(),
    address: "Vilnius, Lithuania",
    joinedAt: "2024-01-18",
    tags: baseClient.vipStatus === "VIP" ? ["Priority", "Ceramic"] : ["Paint correction"],
    stats: {
      bookings: Math.max(baseClient.cars.length * 4, 4),
      vehicles: baseClient.cars.length,
      averageTicket: Math.round(baseClient.totalSpent / Math.max(baseClient.cars.length * 4, 1)),
      loyaltyScore: baseClient.vipStatus === "VIP" ? 92 : 74,
    },
    vehicles: baseClient.cars.map((car, index) => {
      const [brand = "Vehicle", ...modelParts] = car.split(" ");

      return {
        id: `${baseClient.id}-vehicle-${index + 1}`,
        brand,
        model: modelParts.join(" ") || "Model",
        year: 2021 + index,
        vin: `MLAUTO${String(index + 1).padStart(2, "0")}${baseClient.id.slice(0, 9).toUpperCase()}`,
        color: index % 2 === 0 ? "Obsidian Black" : "Silver Metallic",
        mileage: 24000 + index * 8300,
        plateNumber: `MLA ${100 + index}`,
        nextServiceDue: "2026-06-20",
      };
    }),
    history: [
      {
        id: `${baseClient.id}-history-1`,
        date: baseClient.lastVisit,
        vehicle: firstVehicle,
        service: "Premium detailing package",
        status: "Completed",
        price: Math.min(baseClient.totalSpent, 520),
        advisor: "ML Auto team",
        notes: "Mock service record generated for profile preview.",
      },
      {
        id: `${baseClient.id}-history-2`,
        date: "2026-06-12",
        vehicle: firstVehicle,
        service: "Maintenance wash",
        status: "Scheduled",
        price: 180,
        advisor: "ML Auto team",
        notes: "Next recommended visit based on client history.",
      },
    ],
    preferences: {
      contactMethod: "Phone",
      pickupWindow: "Weekday afternoons",
      invoicePreference: "Email invoice",
      waitingArea: "No waiting preference recorded",
      specialInstructions: [
        "Confirm service scope before vehicle handoff.",
        "Send finish photos before pickup.",
      ],
      favoriteServices: ["Maintenance wash", "Interior detailing"],
    },
    notes: [
      {
        id: `${baseClient.id}-note-1`,
        author: {
          name: "ML Auto team",
          role: "Service advisor",
        },
        timestamp: `${baseClient.lastVisit}T15:30:00`,
        body: "Mock note for profile layout preview. Replace with CRM note records when backend integration is ready.",
      },
    ],
    photos: [
      {
        id: `${baseClient.id}-photo-1`,
        title: "Vehicle intake",
        type: "Before",
        vehicle: firstVehicle,
        date: baseClient.lastVisit,
        imageUrl:
          "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
      },
      {
        id: `${baseClient.id}-photo-2`,
        title: "Final delivery finish",
        type: "After",
        vehicle: firstVehicle,
        date: baseClient.lastVisit,
        imageUrl:
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      },
    ],
    recentActivity: [
      {
        id: `${baseClient.id}-activity-1`,
        date: baseClient.lastVisit,
        title: "Latest service visit",
        description: `${firstVehicle} was checked into the ML Auto studio.`,
      },
      {
        id: `${baseClient.id}-activity-2`,
        date: "2026-05-01",
        title: "Client profile updated",
        description: "Mock preferences and vehicle metadata prepared.",
      },
    ],
  } satisfies ClientProfile;
}
