import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
    </div>
  );
}
