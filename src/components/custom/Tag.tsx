export default function Tag({ toDisplay }: { toDisplay: string }) {
  return (
    <span className="inline-block rounded-full bg-stone-100 px-3 py-0.5 text-base font-semibold text-stone-800">
      {toDisplay}
    </span>
  );
}
