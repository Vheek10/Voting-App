'use client';

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const saved = localStorage.getItem('theme');
            if (saved) {
              document.documentElement.setAttribute('data-theme', saved);
            }
          } catch {}
        `,
      }}
    />
  );
}
