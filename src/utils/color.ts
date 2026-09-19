// Mixes a hex color with white to produce a light tint (used for badges/icon chips
// themed off a deck's chosen accent color).
export const tintFromHex = (hex: string, amount = 0.85) => {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean.split("").map(c => c + c).join("")
      : clean;

  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);

  const mix = (channel: number) => Math.round(channel + (255 - channel) * amount);

  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
};
