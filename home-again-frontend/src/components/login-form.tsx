import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '@/services/authService';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const session = await signIn(email, password);
      console.log('Sign in successful', session);
      if (session && typeof session.AccessToken !== 'undefined') {
        sessionStorage.setItem('accessToken', session.AccessToken);
        if (sessionStorage.getItem('accessToken')) {
          console.log('navigate to /home');
          navigate('/home');
        } else {
          console.error('Session token was not set properly.');
        }
      } else {
        console.error('SignIn session or AccessToken is undefined.');
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signUp(email, password);
      navigate('/confirm', { state: { email } });
    } catch (error) {
      alert(`Sign up failed: ${error}`);
    }
  };

  return (
      <Card className="mx-auto w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            {isSignUp ? 'Sign up to create an account' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </div>
              {isSignUp && (
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                  </div>
              )}
              <Button type="submit" className="w-full">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </div>
          </form>
          <Button variant="outline" className="w-full mt-4" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </Button>
        </CardContent>
      </Card>
  );
}
