"use client";

// components/Username.tsx
import Image from "next/image";

type Props = {
  username: string;
  isVerified: boolean;
  className?: string;
};

export default function Username({ username, isVerified, className }: Props) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="font-semibold">@{username}</span>
      {isVerified && (
        <Image
          src="/icons/verified.svg"
          alt="Verificado"
          width={16}
          height={16}
          className="ml-1"
        />
      )}
    </div>
  );
}
