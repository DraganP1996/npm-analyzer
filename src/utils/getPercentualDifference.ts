export const getPercentualDifference = (curr: number, prev: number): number => {
  const diff = curr - prev;
  const percentage = (diff / prev) * 100;

  return percentage;
};
