export default function ErrorMessage({ error }: { error: string }) {
  return <p className="w-fit rounded-md bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-600">{error}</p>;
}
