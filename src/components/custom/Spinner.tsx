import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  fullScreen?: boolean;
}

export default function Spinner({ fullScreen = false }: SpinnerProps) {
  let className;

  if (fullScreen) {
    className = 'flex h-screen items-center justify-center';
  } else {
    className = 'flex h-full min-h-12 items-center justify-center';
  }

  return (
    <div className={className}>
      <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
    </div>
  );
}
