export type HaryanaCity = {
  id: string;
  name: string;
  district: string;
  typicalRatePerSqYard: number;
  highRatePerSqYard: number;
};

export const haryanaCities: HaryanaCity[] = [
  { id: 'sonipat', name: 'Sonipat', district: 'Sonipat', typicalRatePerSqYard: 26000, highRatePerSqYard: 42000 },
  { id: 'panipat', name: 'Panipat', district: 'Panipat', typicalRatePerSqYard: 21000, highRatePerSqYard: 36000 },
  { id: 'rohtak', name: 'Rohtak', district: 'Rohtak', typicalRatePerSqYard: 23000, highRatePerSqYard: 38000 },
  { id: 'karnal', name: 'Karnal', district: 'Karnal', typicalRatePerSqYard: 19000, highRatePerSqYard: 32000 },
  { id: 'hisaar', name: 'Hisar', district: 'Hisar', typicalRatePerSqYard: 18000, highRatePerSqYard: 30000 },
  { id: 'ambala', name: 'Ambala', district: 'Ambala', typicalRatePerSqYard: 22000, highRatePerSqYard: 36000 },
  { id: 'gurugram', name: 'Gurugram', district: 'Gurugram', typicalRatePerSqYard: 85000, highRatePerSqYard: 160000 },
  { id: 'faridabad', name: 'Faridabad', district: 'Faridabad', typicalRatePerSqYard: 68000, highRatePerSqYard: 125000 },
];

export type AreaType = 'urban' | 'rural';
export type BuyerType =
  | 'male'
  | 'female'
  | 'joint-male-female'
  | 'joint-two-males'
  | 'joint-two-females';

export const haryanaStampDuty: Record<AreaType, Record<BuyerType, number>> = {
  urban: {
    male: 0.07,
    female: 0.05,
    'joint-male-female': 0.06,
    'joint-two-males': 0.07,
    'joint-two-females': 0.05,
  },
  rural: {
    male: 0.05,
    female: 0.03,
    'joint-male-female': 0.04,
    'joint-two-males': 0.05,
    'joint-two-females': 0.03,
  },
};

export const registrationFeeSlabs: { max: number; fee: number }[] = [
  { max: 50000, fee: 100 },
  { max: 100000, fee: 500 },
  { max: 500000, fee: 2500 },
  { max: 1000000, fee: 5000 },
  { max: 2000000, fee: 10000 },
  { max: 5000000, fee: 20000 },
  { max: Number.POSITIVE_INFINITY, fee: 50000 },
];

export function haryanaRegistrationFee(value: number): number {
  const slab = registrationFeeSlabs.find((entry) => value <= entry.max);
  return slab ? slab.fee : 50000;
}

export const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);