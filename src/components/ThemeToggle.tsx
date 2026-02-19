'use client';

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon } from './Icons';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        inline-flex items-center justify-center
        w-8 h-8 rounded-lg
        text-[var(--text-muted)]
        hover:text-[var(--text-secondary)]
        hover:bg-[var(--bg-subtle)]
        border border-[var(--border)]
        transition-colors duration-150
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light'
        ? <MoonIcon className="w-[15px] h-[15px]" />
        : <SunIcon className="w-[15px] h-[15px]" />
      }
    </button>
  );
}

