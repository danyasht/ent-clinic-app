import { useUser } from '@/features/authentication/useUser';
import Spinner from './Spinner';
import { Avatar, AvatarFallback } from './avatar';

export default function Header() {
  const { isGettingUser, user, isAuthenticated, userError } = useUser();

  if (isGettingUser) return <Spinner />;

  const { profileId, role, email, fullName } = user;

  const userInitials = fullName
    ? fullName
        .split(' ')
        .map((word: string) => word[0])
        .join('')
    : 'U';

  // console.log(userInitials);

  return (
    <header className="bg-white border-b border-stone-200 p-4 flex justify-end items-center gap-4 h-16 sticky top-0 z-10">
      <div className="flex items-center justify-center gap-3">
        <p className="text-md font-medium text-stone-600">Hello, {fullName}</p>
        <span>
          <Avatar>
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </span>
      </div>
    </header>
  );
}
