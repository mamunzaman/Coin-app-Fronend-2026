import { normalizeMedia } from "@/services/normalizers/normalizeMedia";

import FlagAD from "@/assets/flags/Flag_of_Andorra.svg";
import FlagAT from "@/assets/flags/Flag_of_Austria.svg";
import FlagBE from "@/assets/flags/Flag_of_Belgium.svg";
import FlagBG from "@/assets/flags/Flag_of_Bulgaria.svg";
import FlagHR from "@/assets/flags/Flag_of_Croatia.svg";
import FlagCY from "@/assets/flags/Flag_of_Cyprus.svg";
import FlagEE from "@/assets/flags/Flag_of_Estonia.svg";
import FlagFI from "@/assets/flags/Flag_of_Finland.svg";
import FlagFR from "@/assets/flags/Flag_of_France.svg";
import FlagDE from "@/assets/flags/Flag_of_Germany.svg";
import FlagGR from "@/assets/flags/Flag_of_Greece.svg";
import FlagIE from "@/assets/flags/Flag_of_Ireland.svg";
import FlagIT from "@/assets/flags/Flag_of_Italy.svg";
import FlagLV from "@/assets/flags/Flag_of_Latvia.svg";
import FlagLT from "@/assets/flags/Flag_of_Lithuania.svg";
import FlagLU from "@/assets/flags/Flag_of_Luxembourg.svg";
import FlagMT from "@/assets/flags/Flag_of_Malta.svg";
import FlagMC from "@/assets/flags/Flag_of_Monaco.svg";
import FlagNL from "@/assets/flags/Flag_of_Netherlands.svg";
import FlagPT from "@/assets/flags/Flag_of_Portugal.svg";
import FlagSM from "@/assets/flags/Flag_of_San_Marino.svg";
import FlagSK from "@/assets/flags/Flag_of_Slovakia.svg";
import FlagSI from "@/assets/flags/Flag_of_Slovenia.svg";
import FlagES from "@/assets/flags/Flag_of_Spain.svg";
import FlagVA from "@/assets/flags/Flag_of_Vatican_City.svg";

const CODE_TO_FLAG = {
  AD: FlagAD, AT: FlagAT, BE: FlagBE, BG: FlagBG, HR: FlagHR, CY: FlagCY,
  EE: FlagEE, FI: FlagFI, FR: FlagFR, DE: FlagDE, GR: FlagGR, IE: FlagIE,
  IT: FlagIT, LV: FlagLV, LT: FlagLT, LU: FlagLU, MT: FlagMT, MC: FlagMC,
  NL: FlagNL, PT: FlagPT, SM: FlagSM, SK: FlagSK, SI: FlagSI, ES: FlagES, VA: FlagVA,
};

const NAME_TO_CODE = {
  andorra: "AD", austria: "AT", österreich: "AT", belgium: "BE", belgien: "BE",
  bulgaria: "BG", bulgarien: "BG", croatia: "HR", kroatien: "HR", cyprus: "CY",
  zypern: "CY", estonia: "EE", estland: "EE", finland: "FI", finnland: "FI",
  france: "FR", frankreich: "FR", germany: "DE", deutschland: "DE", greece: "GR",
  griechenland: "GR", ireland: "IE", irland: "IE", italy: "IT", italien: "IT",
  latvia: "LV", lettland: "LV", lithuania: "LT", litauen: "LT", luxembourg: "LU",
  luxemburg: "LU", malta: "MT", monaco: "MC", mónaco: "MC", netherlands: "NL",
  niederlande: "NL", holland: "NL", portugal: "PT", "san marino": "SM",
  slovakia: "SK", slowakei: "SK", slovenia: "SI", slowenien: "SI", spain: "ES",
  spanien: "ES", "vatican city": "VA", vatikan: "VA", vatican: "VA",
};

function resolveCountryCode(country) {
  if (!country) return "";
  const direct = (country.code || country.country_code || country.countryCode || "").toUpperCase();
  if (direct && CODE_TO_FLAG[direct]) return direct;

  const nameRaw = country.name;
  const name = typeof nameRaw === "object"
    ? (nameRaw.en || nameRaw.de || "")
    : (nameRaw || country.country_name || country.country || "");
  const key = String(name).trim().toLowerCase();
  return NAME_TO_CODE[key] || direct;
}

export function getCountryFlag(country) {
  const apiUrl = normalizeMedia(country?.country_flag ?? country?.flag_image ?? country?.countryFlagUrl);
  if (apiUrl && (apiUrl.startsWith("http") || apiUrl.startsWith("/") || apiUrl.startsWith("data:"))) {
    return apiUrl;
  }

  const code = resolveCountryCode(country);
  return CODE_TO_FLAG[code] || null;
}

export function getCountryEmoji(country) {
  const flag = country?.flag;
  if (typeof flag === "string" && flag.length <= 4 && !flag.startsWith("http") && !flag.includes("/")) {
    return flag;
  }
  return null;
}
