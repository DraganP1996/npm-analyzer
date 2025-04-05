export const getPercentualDifference = (curr: number, prev: number): number => {
  if (prev === 0 && curr > 0) return 100;
  if (prev === 0 && curr === 0) return 0;

  const diff = curr - prev;
  const percentage = (diff / prev) * 100;

  return percentage;
};
