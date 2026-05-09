export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[10px] border border-stone-200 bg-white p-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">{icon}</div>
      <div>
        <p className="text-sm font-medium text-stone-500">{title}</p>
        <p className="text-2xl font-bold text-stone-800">{value}</p>
      </div>
    </div>
  );
}
