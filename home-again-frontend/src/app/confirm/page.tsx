import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp } from '@/services/authService.ts';
import { Button } from "@/components/ui/button"
import { FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const ConfirmUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Confirming account...', confirmationCode);
      await confirmSignUp(email, confirmationCode);
      alert("Account confirmed successfully!\nSign in on next page.");
      navigate('/login');
    } catch (error) {
      alert(`Failed to confirm account: ${error}`);
    }
  };

  return (
    <div className="loginForm">
      <h2>Confirm Account</h2>
      <form onSubmit={handleSubmit}>
        <FormItem>
          <Input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Email"
              required
          />
        </FormItem>
        <FormItem>
          <Input
              type="text"
              value={confirmationCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmationCode(e.target.value)}
              placeholder="Confirmation Code"
              required
          />
        </FormItem>
        <Button type="submit">Confirm Account</Button>
      </form>
    </div>
  );
};

export default ConfirmUserPage;