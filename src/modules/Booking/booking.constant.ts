interface Time {
  startTime: string;
  endTime: string;
}

interface BookingDetails extends Time {
  pricePerHour: number;
}

export function calculateTotalCost({
  startTime,
  endTime,
  pricePerHour,
}: BookingDetails): number | null {
  const startHours = parseInt(startTime.toString().split(":")[0], 10);
  const endHours = parseInt(endTime.toString().split(":")[0], 10);

  const durationHours = endHours - startHours;

  if (durationHours < 0) {
    throw new Error("End time cannot be before start time");
  }

  const totalCost = durationHours * pricePerHour;

  return totalCost;
}

export const cartStatus = {
  available: "available",
  unavailable: "unavailable",
};
