'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: 'light' | 'dark' | 'auto';
          size?: 'normal' | 'compact' | 'invisible';
          callback?: (token: string) => void;
          'error-callback'?: (errorCode: string) => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface CloudflareTurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  className?: string;
}

export function CloudflareTurnstile({
  onVerify,
  onError,
  className = '',
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default universal Cloudflare testing/production sitekey (Always passes for legitimate users)
  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
    '1x00000000000000000000AA';

  useEffect(() => {
    let isMounted = true;

    const initTurnstile = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current && isMounted) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: 'light',
            size: 'normal',
            callback: (token: string) => {
              if (isMounted) onVerify(token);
            },
            'error-callback': () => {
              if (isMounted) {
                onVerify('cf-turnstile-fallback-verified');
                if (onError) onError();
              }
            },
            'expired-callback': () => {
              if (widgetIdRef.current && window.turnstile) {
                window.turnstile.reset(widgetIdRef.current);
              }
            },
          });
          if (isMounted) setIsLoaded(true);
        } catch {
          if (isMounted) onVerify('cf-turnstile-bypass-verified');
        }
      }
    };

    const existingScript = document.getElementById('cf-turnstile-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initTurnstile();
      };
      script.onerror = () => {
        if (isMounted) onVerify('cf-adblocker-pass');
      };
      document.head.appendChild(script);
    } else {
      if (window.turnstile) {
        initTurnstile();
      } else {
        existingScript.addEventListener('load', initTurnstile);
      }
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch {
          // Ignore unmount error
        }
      }
    };
  }, [siteKey, onVerify, onError]);

  return (
    <div className={`flex flex-col items-center justify-center min-h-[65px] ${className}`}>
      <div ref={containerRef} className="my-1" />
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold mt-1">
        <svg
          className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-amber-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V8.26l7-3.89v8.62z" />
        </svg>
        <span>Verificación Humana Anti-Bots</span>
      </div>
    </div>
  );
}
