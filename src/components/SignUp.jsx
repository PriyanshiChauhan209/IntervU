// src/components/SignUp.jsx
import React from 'react';
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <SignUp />
    </div>
  );
};

export default SignUpPage;

