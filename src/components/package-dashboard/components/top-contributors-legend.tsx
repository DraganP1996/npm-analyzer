export const TopContributorsLegend = ({ data }: { data: { label: string; fill: string }[] }) => {
  const legendItems = data.map((item) => (
    <div
      key={item.label}
      className="flex flex-col items-center justify-center gap-2 w-[70px] line-clamp-2"
    >
      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.fill }} />
      <span className="text-xs break-all">{item.label}</span>
    </div>
  ));

  return <div className="flex flex-row mt-2 gap-2 items-start">{legendItems}</div>;
};
