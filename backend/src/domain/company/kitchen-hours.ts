export const DEFAULT_KITCHEN_TIMEZONE = 'America/Sao_Paulo';

export type KitchenHoursInterval = {
  /** 0 = domingo … 6 = sábado (igual a Date.getUTCDay? Não — usamos o dia civil no fuso da empresa, mapeado para 0–6 estilo JS getDay) */
  weekday: number;
  open: string;
  close: string;
};

export type KitchenHoursPayload = {
  timezone?: string;
  intervals?: KitchenHoursInterval[];
};

/** Aceita HH:mm ou HH:mm:ss (ex.: input type="time" com step em segundos). */
export function parseTimeToMinutes(hm: string): number | null {
  const m = /^([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/.exec(String(hm).trim());
  if (!m) return null;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function getZonedWeekdayAndMinutes(
  date: Date,
  timeZone: string,
): { weekday: number; minutes: number } {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      weekday: 'long',
    }).formatToParts(date);
    const hourPart = parts.find((p) => p.type === 'hour')?.value ?? '0';
    const minutePart = parts.find((p) => p.type === 'minute')?.value ?? '0';
    const wdPart = parts.find((p) => p.type === 'weekday')?.value ?? 'Sunday';
    let hour = parseInt(hourPart, 10);
    if (hour === 24) hour = 0;
    const minute = parseInt(minutePart, 10);
    const map: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const weekday = map[wdPart] ?? 0;
    return { weekday, minutes: hour * 60 + minute };
  } catch {
    if (timeZone !== DEFAULT_KITCHEN_TIMEZONE) {
      return getZonedWeekdayAndMinutes(date, DEFAULT_KITCHEN_TIMEZONE);
    }
    const d = date.getUTCDay();
    const m = date.getUTCHours() * 60 + date.getUTCMinutes();
    return { weekday: d, minutes: m };
  }
}

function isMinuteWithinOpenClose(
  nowMin: number,
  openMin: number,
  closeMin: number,
): boolean {
  if (openMin === closeMin) return false;
  if (openMin < closeMin) {
    return nowMin >= openMin && nowMin < closeMin;
  }
  return nowMin >= openMin || nowMin < closeMin;
}

export function parseKitchenHoursPayload(
  raw: string | null | undefined,
): KitchenHoursPayload | null {
  if (raw == null) return null;
  const trimmed = String(raw).replace(/^\uFEFF/, '').trim();
  if (!trimmed) return null;
  try {
    let v: unknown = JSON.parse(trimmed);
    if (typeof v === 'string') {
      const inner = String(v).trim();
      v = inner ? JSON.parse(inner) : null;
    }
    if (!v || typeof v !== 'object' || Array.isArray(v)) return null;
    return v as KitchenHoursPayload;
  } catch {
    return null;
  }
}

/** Há ao menos um intervalo salvo (horário da cozinha configurado). */
export function kitchenHoursDefinesSchedule(
  kitchenHoursJson: string | null | undefined,
): boolean {
  const p = parseKitchenHoursPayload(kitchenHoursJson);
  return Array.isArray(p?.intervals) && p!.intervals!.length > 0;
}

/**
 * Sem intervalos configurados (null, JSON inválido ou lista vazia) ⇒ cozinha “sempre aberta” para efeito de cardápio.
 */
export function isKitchenOpenNow(
  kitchenHoursJson: string | null | undefined,
  now: Date = new Date(),
): boolean {
  const payload = parseKitchenHoursPayload(kitchenHoursJson);
  const intervals = payload?.intervals;
  if (!Array.isArray(intervals) || intervals.length === 0) return true;

  const tz = payload?.timezone?.trim() || DEFAULT_KITCHEN_TIMEZONE;
  const { weekday, minutes } = getZonedWeekdayAndMinutes(now, tz);

  for (const it of intervals) {
    const wd = Number(it.weekday);
    if (!Number.isFinite(wd) || wd < 0 || wd > 6 || Math.floor(wd) !== wd) {
      continue;
    }
    if (wd !== weekday) continue;
    const openMin = parseTimeToMinutes(String(it.open ?? ''));
    const closeMin = parseTimeToMinutes(String(it.close ?? ''));
    if (openMin === null || closeMin === null) continue;
    if (isMinuteWithinOpenClose(minutes, openMin, closeMin)) return true;
  }
  return false;
}
