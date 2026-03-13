declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function isFbqAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq !== 'undefined';
}

export function pageView(): void {
  if (!isFbqAvailable()) return;
  window.fbq('track', 'PageView');
}

export function initiateCheckout(plan: string, value: number): void {
  if (!isFbqAvailable()) return;
  window.fbq('track', 'InitiateCheckout', {
    content_name: plan,
    currency: 'USD',
    value,
  });
}

export function purchase(
  plan: string,
  value: number,
  transactionId: string
): void {
  if (!isFbqAvailable()) return;
  window.fbq('track', 'Purchase', {
    content_name: plan,
    currency: 'USD',
    value,
    transaction_id: transactionId,
  });
}

export function addToCart(plan: string, value: number): void {
  if (!isFbqAvailable()) return;
  window.fbq('track', 'AddToCart', {
    content_name: plan,
    currency: 'USD',
    value,
  });
}

export function viewContent(contentName: string): void {
  if (!isFbqAvailable()) return;
  window.fbq('track', 'ViewContent', {
    content_name: contentName,
  });
}
