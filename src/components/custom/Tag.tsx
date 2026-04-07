export default function Tag({ toDisplay }: { toDisplay: string }) {
  return (
    <span className="inline-block rounded-full bg-stone-100 px-2 py-1 text-sm font-semibold text-stone-800">
      {toDisplay}
    </span>
  );
}
