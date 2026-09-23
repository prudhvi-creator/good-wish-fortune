import { FORTUNES, LUCKY_COLORS, SECONDARY_PRINTS, RTC_STATIONS, type Fortune } from '../data/fortunes';

export interface GeneratedResult {
  fortune: Fortune;
  luckyNumber: number;
  luckyColor: string;
  secondaryPrint: string;
  station: string;
  ticketSerial: string;
  formattedDate: string;
  attempt: number;
}

/**
 * FNV-1a Hash Algorithm
 * Returns a 32-bit positive integer from string input
 */
function fnv1aHash(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    // Math.imul handles 32-bit integer multiplication
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

export function generateFortuneResult(
  name: string,
  gender: string,
  weight: number,
  attempt: number = 1
): GeneratedResult {
  const cleanName = name.trim().toLowerCase() || 'traveler';
  const cleanGender = gender.trim().toLowerCase();
  const weightFixed = Number(weight.toFixed(1));

  // Build seed string
  const seedString = `${cleanName}_${cleanGender}_${weightFixed}_att${attempt}`;
  const baseHash = fnv1aHash(seedString);

  // Deterministically map to elements
  const fortuneIndex = baseHash % FORTUNES.length;
  const selectedFortune = FORTUNES[fortuneIndex];

  // Secondary hash for distinct lucky number
  const hash2 = fnv1aHash(`${seedString}_number`);
  const luckyNumber = (hash2 % 99) + 1;

  // Hash for lucky color
  const hash3 = fnv1aHash(`${seedString}_color`);
  const colorIndex = hash3 % LUCKY_COLORS.length;
  const luckyColor = LUCKY_COLORS[colorIndex];

  // Hash for secondary advice/message
  const hash4 = fnv1aHash(`${seedString}_print`);
  const printIndex = hash4 % SECONDARY_PRINTS.length;
  const secondaryPrint = SECONDARY_PRINTS[printIndex];

  // Hash for station stamp
  const hash5 = fnv1aHash(`${seedString}_station`);
  const stationIndex = hash5 % RTC_STATIONS.length;
  const station = RTC_STATIONS[stationIndex];

  // Generate ticket serial number e.g. RTC-8492-93
  const serialPart1 = 1000 + (baseHash % 9000);
  const serialPart2 = 10 + (hash2 % 90);
  const ticketSerial = `RTC-${serialPart1}-${serialPart2}`;

  // Current formatted date (e.g. 10 AUG 1996 style or current date)
  const now = new Date();
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  return {
    fortune: selectedFortune,
    luckyNumber,
    luckyColor,
    secondaryPrint,
    station,
    ticketSerial,
    formattedDate,
    attempt
  };
}
