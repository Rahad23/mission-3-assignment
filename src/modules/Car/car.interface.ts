type isAvailable = "available" | "unavailable";

export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: isAvailable;
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};
