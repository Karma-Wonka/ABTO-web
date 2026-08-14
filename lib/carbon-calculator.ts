/**
 * All factors below are illustrative planning estimates, not a certified
 * lifecycle assessment. Swap FLIGHT_KM and the *_KG tables for a real
 * emissions-factor dataset when one is available — the calculation
 * functions below don't care where the numbers come from.
 */

export const FLIGHT_KM: Record<string, number> = {
  "Delhi, India": 1580, "Kolkata, India": 1150, "Guwahati, India": 830, "Bagdogra, India": 600,
  "Kathmandu, Nepal": 620, "Dhaka, Bangladesh": 950, "Bangkok, Thailand": 1780, Singapore: 3110,
  "Kuala Lumpur, Malaysia": 2950, "Dubai, UAE": 3900, "Tokyo, Japan": 4700, "Hong Kong": 2450,
  "London, UK": 7950, "Paris, France": 7700, "Frankfurt, Germany": 7300, "Amsterdam, Netherlands": 7500,
  "New York, USA": 12700, "Los Angeles, USA": 13300, "Toronto, Canada": 12000, "Sydney, Australia": 8000
};
export const FLIGHT_KM_DEFAULT = 6500;

export type Cabin = "economy" | "premium" | "business" | "first";
export type RoadMode = "ev" | "bus" | "rental" | "private" | "taxi";
export type AccomType = "eco" | "homestay" | "standard" | "luxury" | "camping";
export type Activity = "trekking" | "cultural" | "cycling" | "kayaking" | "rafting" | "horse" | "helicopter" | "wellness" | "camping";
export type Food = "vegan" | "vegetarian" | "mixed" | "meatheavy";

export const FLIGHT_KG_PER_PAX_KM: Record<Cabin, number> = { economy: 0.15, premium: 0.22, business: 0.35, first: 0.6 };
export const ROAD_KG_PER_KM: Record<RoadMode, number> = { ev: 0.015, bus: 0.05, rental: 0.17, private: 0.19, taxi: 0.21 };
export const ACCOM_KG_PER_NIGHT: Record<AccomType, number> = { eco: 9, homestay: 6, standard: 22, luxury: 38, camping: 2 };
export const ACTIVITY_KG: Record<Activity, number> = { trekking: 2, cultural: 3, cycling: 1, kayaking: 2.5, rafting: 3, horse: 1.5, helicopter: 180, wellness: 4, camping: 1.5 };
export const FOOD_KG_PER_DAY: Record<Food, number> = { vegan: 1.2, vegetarian: 2.2, mixed: 4.2, meatheavy: 7.6 };

export const TREE_KG_PER_YEAR = 21;
export const CAR_KG_PER_KM = 0.19;
export const ELEC_KG_PER_KWH = 0.42;
export const PHONE_CHARGE_KG = 0.0056;
export const BENCHMARK_KG = 650;

export const DESTINATIONS = ["Thimphu", "Paro", "Punakha", "Bumthang", "Haa Valley", "Phobjikha", "Trashigang (Eastern Bhutan)", "Multiple regions"];

export const ROAD_DEFS: { v: RoadMode; icon: string; t: string; x: string }[] = [
  { v: "ev", icon: "i-bolt", t: "Electric Vehicle", x: "Charged on Bhutan's near-100% hydropower grid — the cleanest option available." },
  { v: "bus", icon: "i-car", t: "Shared Bus", x: "Scheduled or chartered group transport between towns." },
  { v: "rental", icon: "i-car", t: "Rental Car", x: "Self-drive or operator-arranged rental for the visit." },
  { v: "private", icon: "i-car", t: "Private Vehicle", x: "A dedicated car and driver for the length of the trip." },
  { v: "taxi", icon: "i-car", t: "Taxi", x: "Metered or point-to-point taxi journeys." }
];

export const ACCOM_DEFS: { v: AccomType; icon: string; t: string; x: string }[] = [
  { v: "eco", icon: "i-leaf", t: "Eco Lodge", x: "Certified low-impact lodging with active conservation practices." },
  { v: "homestay", icon: "i-user", t: "Homestay", x: "A registered village household — income goes directly to the family." },
  { v: "standard", icon: "i-pin", t: "Standard Hotel", x: "A mid-range hotel with typical amenities." },
  { v: "luxury", icon: "i-pin", t: "Luxury Hotel", x: "A five-star property with the highest service level." },
  { v: "camping", icon: "i-tent", t: "Camping", x: "Trek-side camping with full support crew." }
];

export const ACTIVITY_DEFS: { v: Activity; icon: string; t: string; x: string }[] = [
  { v: "trekking", icon: "i-mtn", t: "Trekking", x: "Multi-day routes on foot, from the Druk Path to high alpine passes." },
  { v: "cultural", icon: "i-doc", t: "Cultural Tour", x: "Dzongs, lhakhangs and the thirteen traditional arts." },
  { v: "cycling", icon: "i-bike", t: "Cycling", x: "Valley roads and trails by bike." },
  { v: "kayaking", icon: "i-wave", t: "Kayaking", x: "Paddling Bhutan's rivers and lakes." },
  { v: "rafting", icon: "i-wave", t: "Rafting", x: "White-water and scenic river descents." },
  { v: "horse", icon: "i-user", t: "Horse Riding", x: "Pack animals and mounted travel on trekking routes." },
  { v: "helicopter", icon: "i-rotor", t: "Helicopter Tour", x: "Aerial sightseeing or a scenic transfer." },
  { v: "wellness", icon: "i-leaf", t: "Wellness", x: "Hot-stone baths and traditional wellness treatments." },
  { v: "camping", icon: "i-tent", t: "Camping", x: "A night under canvas away from fixed lodging." }
];

export const FOOD_DEFS: { v: Food; icon: string; t: string; x: string }[] = [
  { v: "vegan", icon: "i-leaf", t: "Vegan", x: "Plant-based meals throughout the trip." },
  { v: "vegetarian", icon: "i-leaf", t: "Vegetarian", x: "No meat or fish; dairy and eggs included." },
  { v: "mixed", icon: "i-leaf", t: "Mixed", x: "A typical mix of vegetarian and meat dishes." },
  { v: "meatheavy", icon: "i-leaf", t: "Meat-heavy", x: "Meat or fish at most meals." }
];

export type CalcState = {
  step: number;
  done: boolean;
  trip: { origin: string; destination: string; travelers: number; nights: number; season: string };
  flight: { cabin: Cabin; roundTrip: boolean };
  road: { mode: RoadMode; distanceKm: number };
  accommodation: { type: AccomType; nights: number };
  activities: Activity[];
  food: Food;
};

export function defaultState(): CalcState {
  return {
    step: 1,
    done: false,
    trip: { origin: "", destination: "Thimphu", travelers: 2, nights: 7, season: "" },
    flight: { cabin: "economy", roundTrip: true },
    road: { mode: "ev", distanceKm: 280 },
    accommodation: { type: "standard", nights: 7 },
    activities: [],
    food: "mixed"
  };
}

export function flightCityMatch(origin: string) {
  return Object.keys(FLIGHT_KM).find((k) => k.toLowerCase() === origin.trim().toLowerCase());
}
export function flightDistanceKm(origin: string) {
  const m = flightCityMatch(origin);
  return m ? FLIGHT_KM[m] : FLIGHT_KM_DEFAULT;
}
function flightKg(s: CalcState) {
  const km = flightDistanceKm(s.trip.origin) * (s.flight.roundTrip ? 2 : 1);
  return km * FLIGHT_KG_PER_PAX_KM[s.flight.cabin] * s.trip.travelers;
}
function roadKg(s: CalcState) {
  return s.road.distanceKm * ROAD_KG_PER_KM[s.road.mode] * s.trip.travelers;
}
function accomKg(s: CalcState) {
  return ACCOM_KG_PER_NIGHT[s.accommodation.type] * s.accommodation.nights * s.trip.travelers;
}
export const accomKgHelper = accomKg;
function activitiesKg(s: CalcState) {
  return s.activities.reduce((sum, a) => sum + (ACTIVITY_KG[a] || 0), 0) * s.trip.travelers;
}
function foodKg(s: CalcState) {
  const days = Math.max(1, s.trip.nights + 1);
  return FOOD_KG_PER_DAY[s.food] * days * s.trip.travelers;
}
export function breakdown(s: CalcState) {
  return { flights: flightKg(s), transport: roadKg(s), accommodation: accomKg(s), activities: activitiesKg(s), food: foodKg(s) };
}
export function totalKg(s: CalcState) {
  const b = breakdown(s);
  return b.flights + b.transport + b.accommodation + b.activities + b.food;
}
export function rating(perTravelerKg: number) {
  if (perTravelerKg < 300) return { grade: "A+", tone: "good" as const };
  if (perTravelerKg < 600) return { grade: "A", tone: "good" as const };
  if (perTravelerKg < 1000) return { grade: "B", tone: "mid" as const };
  if (perTravelerKg < 1600) return { grade: "C", tone: "mid" as const };
  return { grade: "D", tone: "poor" as const };
}
export function comparisons(total: number) {
  return {
    trees: total / TREE_KG_PER_YEAR,
    carKm: total / CAR_KG_PER_KM,
    elecKwh: total / ELEC_KG_PER_KWH,
    phoneCharges: total / PHONE_CHARGE_KG
  };
}
export function offset(total: number) {
  const kg = total * 1.1;
  return { kg, costUsd: kg * 0.02 };
}
export function recommendations(s: CalcState) {
  const recs: { t: string; x: string; gnh?: boolean }[] = [];
  if (s.flight.cabin === "business" || s.flight.cabin === "first") {
    recs.push({ t: "Fly economy or premium economy", x: "Business and first class seats carry a far larger share of a flight's emissions. Economy on the same route can cut your flight footprint by more than half." });
  }
  if (s.road.mode !== "ev" && s.road.mode !== "bus") {
    recs.push({ t: "Ask your operator for an EV transfer", x: "Bhutan's grid runs on hydropower, so an electric vehicle here produces a fraction of the emissions of a fuel car covering the same route." });
  }
  if (s.accommodation.type === "luxury" || s.accommodation.type === "standard") {
    recs.push({ t: "Consider an eco-lodge or homestay", x: "Certified eco-lodges and registered homestays put more of your spending directly into local communities, with a lighter footprint per night." });
  }
  if (s.activities.includes("helicopter")) {
    recs.push({ t: "Swap the helicopter tour for a trek", x: "A guided trek or day hike over similar terrain covers much the same ground for a fraction of the emissions." });
  }
  if (s.food === "meatheavy" || s.food === "mixed") {
    recs.push({ t: "Try more Bhutanese vegetarian dishes", x: "Ema datshi, kewa datshi and other local vegetarian staples are lighter on emissions and a more direct taste of the country." });
  }
  if (s.trip.nights < 5) {
    recs.push({ t: "Stay a little longer", x: "Flight emissions are fixed once you've booked them. Spreading the same flight over more days lowers your emissions per day of travel." });
  }
  recs.push({ t: "Bring a reusable water bottle", x: "Tap and boiled water is safe in most Bhutanese towns, cutting down on single-use plastic across the trip." });
  return recs.slice(0, 5).concat([{
    t: "Travel the Gross National Happiness way",
    x: "Bhutan measures progress by wellbeing and environmental balance, not GDP alone. Every lower-impact choice above travels in that same spirit.",
    gnh: true
  }]);
}

const STORAGE_KEY = "abto_cc_state_v1";
export function loadState(): CalcState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    // ignore malformed/unavailable storage
  }
  return defaultState();
}
export function saveState(state: CalcState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable — non-critical
  }
}
