import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import Spinner from '@/components/custom/Spinner';
import { useLogin } from '@/features/authentication/useLogin';
import { useSignup } from '@/features/authentication/useSignup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email?: string;
  password?: string;
  fullName?: string;
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
  });

  const navigate = useNavigate();

  const { isLoggingIn, login, loginError } = useLogin();
  const { isSigningUp, signup, signupError } = useSignup();

  const errorMessage = loginError?.message || signupError?.message;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password, fullName } = formData;
    if (!email || !password) return;

    if (isLogin === true) login({ email, password });
    else
      signup(
        { email, password, fullName },
        {
          onSuccess: () => setIsLogin(true),
        },
      );

    setFormData({ email: '', password: '', fullName: '' });
  }

  if (isSigningUp || isLoggingIn) return <Spinner fullScreen />;

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-100">
        <CardHeader>
          <Button
            className="mb-2 -ml-2 w-fit cursor-pointer px-2 text-stone-500 hover:text-stone-800"
            type="button"
            variant="ghost"
            onClick={() => navigate('/')}
          >
            &larr; Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {isLogin ? 'Log in' : 'Register'}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="mb-4 flex flex-col gap-4">
            {errorMessage && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData?.email}
                placeholder="hello@hello.com"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData?.password}
                placeholder="123456"
                onChange={handleChange}
              />
            </div>

            {isLogin ? null : (
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  type="text"
                  id="fullname"
                  name="fullName"
                  value={formData?.fullName}
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full cursor-pointer"
              disabled={isLoggingIn || isSigningUp}
            >
              {isLoggingIn || isSigningUp
                ? 'Wait...'
                : isLogin
                  ? 'Log in'
                  : 'Register'}
            </Button>

            <p className="text-center text-sm text-stone-600">
              {isLogin ? 'No account?' : 'I have an account'}
              <button
                type="button"
                className="ml-1 cursor-pointer font-medium text-emerald-700 hover:underline"
                onClick={() => setIsLogin((isLogin) => !isLogin)}
              >
                {isLogin ? 'Register' : 'Log in'}
              </button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
