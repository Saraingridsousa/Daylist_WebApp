'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

type AuthShellProps = {
  title: string;
  children: ReactNode;
  error?: string;
  footer?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  classname?: string;
  styleImage?: string;
};

export default function AuthShell({
  title,
  children,
  error,
  footer,
  imageSrc = '',
  imageAlt = 'Daylist Logo',
  classname = '',
  styleImage = '',
}: AuthShellProps) {
  return (
    <div className="bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] min-h-screen flex items-center justify-center p-4">
      <div className={`relative min-w-screen flex justify-center ${classname}`}>
        {imageSrc && (
          <Image
            alt={imageAlt}
            src={imageSrc}
            width={150}
            height={150}
            className={`absolute -top-24 left-1/2 -translate-x-1/2 z-0 ${styleImage}`}
          />
        )}
        <div className="relative z-10 bg-white h-full rounded-lg shadow-lg p-8 pt-10 w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">{title}</h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {children}

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
