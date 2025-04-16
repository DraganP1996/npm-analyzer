const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
});

export const compactNumberFormatter = (value: number): string => {
  return formatter.format(value);
};
