export function formatAsCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency,
  }).format(value);
}
