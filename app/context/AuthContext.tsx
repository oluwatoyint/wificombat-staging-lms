// SignupContext.tsx
"use client"
import React, { createContext, useContext, useState } from 'react';

interface AuthData {
  name: string;
  pass: string;
  mail: string;
  account_type: string;
  age: string;
  career_pathway: string;
  country: string;
  learning_stage: string;
  name_in_full: string;
  state: string;
  dvid: string;
}

interface AuthContextProps {
  signupData: AuthData | null;
  saveSignupData: (data: AuthData) => void;
  clearSignupData: () => void;
  mail: string;
  pass: string;
  setMail: React.Dispatch<React.SetStateAction<string>>;
  setPass: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signupData, setSignupData] = useState<AuthData | null>(null);
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const saveSignupData = (data: AuthData) => {
    setSignupData(data);
  };

  const clearSignupData = () => {
    setSignupData(null);
  };

  return (
    <AuthContext.Provider value={{ signupData, saveSignupData, clearSignupData, mail, setMail, pass, setPass }}>
      {children}
    </AuthContext.Provider>
  );
};