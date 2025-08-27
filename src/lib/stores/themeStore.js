import { writable } from 'svelte/store';

// Check if window is available (client-side) and get initial theme from localStorage or system preference
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

export const isDarkMode = writable(getInitialTheme());

// Subscribe to changes and update localStorage and document class
if (typeof window !== 'undefined') {
  isDarkMode.subscribe(value => {
    localStorage.setItem('theme', value ? 'dark' : 'light');
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}
