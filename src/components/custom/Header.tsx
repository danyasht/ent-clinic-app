import { useUser } from '@/features/authentication/useUser';
import { Avatar, AvatarFallback } from '../ui/avatar';
import ErrorFallback from './ErrorFallback';

export default function Header() {
  const { user, userError } = useUser();

  if (userError) return <ErrorFallback global errorMessage={userError.message} />;

  if (!user) return <ErrorFallback global errorMessage="User not found" />;

  const { fullName } = user;

  const userInitials = fullName
    ? fullName
        .split(' ')
        .map((word: string) => word[0])
        .join('')
    : 'U';

  // console.log(userInitials);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b border-stone-200 bg-white p-4">
      <div className="flex items-center justify-center gap-3">
        <p className="text-md font-medium text-stone-600">Hello, {fullName}</p>

        <Avatar>
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
