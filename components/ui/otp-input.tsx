"use client";

import React, { useRef, KeyboardEvent } from 'react';
import { Input } from './input';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export function OtpInput({ value, onChange, length = 4 }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (!value[idx] && idx > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[idx - 1]?.focus();
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    const newChar = target.value.slice(-1);
    
    if (newChar && /^\d$/.test(newChar)) {
      const newValue = value.split('');
      newValue[idx] = newChar;
      onChange(newValue.join(''));
      
      // Move to next input
      if (idx < length - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.match(/\d/g)?.slice(0, length);
    if (digits) {
      onChange(digits.join('').padEnd(length, ''));
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[idx] || ''}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          className="w-12 h-12 text-center text-lg"
          onChange={(e) => handleInput(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}