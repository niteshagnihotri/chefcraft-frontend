import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  const concatenatedClassNames = clsx(inputs);
  return twMerge(concatenatedClassNames);
}

export function formartDate(toFormat: string) {
  const date = new Date(toFormat);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  // @ts-ignore
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
