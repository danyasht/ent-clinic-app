import { Button } from '../ui/Button';
import ErrorMessage from './ErrorMessage';
import { useNavigate } from 'react-router-dom';

export default function ErrorFallback({
  errorMessage = 'Something went wrong, try again :)',
  global = false,
}: {
  errorMessage?: string;
  global?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={
        global
          ? 'flex min-h-screen w-full flex-col items-center justify-center gap-3'
          : 'flex h-full min-h-[50vh] w-full flex-col items-center justify-center gap-3'
      }
    >
      <h3 className="text-xl font-semibold">Something went wrong, try again :)</h3>
      <ErrorMessage error={errorMessage} />
      <div className="flex items-center gap-4">
        <Button variant="link" onClick={() => window.location.reload()}>
          <p className="text-md flex items-center justify-center gap-2 text-emerald-800">Reload page</p>
        </Button>
        {global && (
          <Button variant="link" onClick={() => navigate('/login')}>
            <p className="text-md flex items-center text-emerald-800">Go to login</p>
          </Button>
        )}
      </div>
    </div>
  );
}
