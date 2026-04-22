import { useGoBack } from '@/hooks/useGoBack';
import { Button } from '../ui/Button';

interface DetailsBackNavProps {
  description: string;
  className?: string;
}

export default function DetailBackNav({ description, className }: DetailsBackNavProps) {
  const goBack = useGoBack();

  return (
    <div
      className={`mb-3 flex h-12 max-w-6xl items-center justify-between rounded-xl border-stone-200 bg-white px-4 py-4 shadow-sm ${className}`}
    >
      <h1 className="text-lg font-semibold text-stone-800">{description}</h1>
      <Button variant="default" className="text-md" onClick={goBack}>
        Back
      </Button>
    </div>
  );
}
