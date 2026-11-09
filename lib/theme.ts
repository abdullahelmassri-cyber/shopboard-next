export type Theme = "light" | "dark";

const THEME_KEY = "shopboard-theme";
const listeners = new Set<() => void>();
const mediaQuery = "(prefers-color-scheme: dark)";

let sessionTheme: Theme | null = null;

function storedTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function emitChange(): void {
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent): void {
  if (event.key !== THEME_KEY && event.key !== null) return;
  sessionTheme = null;
  emitChange();
}

function handleSystemThemeChange(): void {
  if (sessionTheme === null && storedTheme() === null) emitChange();
}

export function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  if (sessionTheme !== null) return sessionTheme;
  return storedTheme() ?? (window.matchMedia(mediaQuery).matches ? "dark" : "light");
}

export function getServerThemeSnapshot(): Theme {
  return "light";
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
    window.matchMedia(mediaQuery).addEventListener("change", handleSystemThemeChange);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
      window.matchMedia(mediaQuery).removeEventListener("change", handleSystemThemeChange);
    }
  };
}

export function setTheme(theme: Theme): void {
  sessionTheme = theme;
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Keep the selected theme for this session if browser storage is unavailable.
  }
  emitChange();
}
