import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string, currency = "ETH"): string {
  const numericPrice = Number.parseFloat(price);

  if (currency === "ETH") {
    return `${numericPrice.toFixed(2)} ETH`;
  }

  // For fiat currencies
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(numericPrice);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
