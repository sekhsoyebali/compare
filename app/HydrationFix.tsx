"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        (function() {
          var html = document.documentElement;
          html.classList.add('hydrated');
        })();
      `,
    }} />
  );
}