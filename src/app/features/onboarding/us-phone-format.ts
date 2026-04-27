/** US NANP: national 10 digits, display `+1 (XXX) XXX-XXXX`. */

export function nationalDigitsFromStored(phone: string): string {
  let d = (phone ?? '').replace(/\D/g, '');
  if (d.length >= 11 && d.startsWith('1')) {
    d = d.slice(1);
  }
  return d.slice(0, 10);
}

export function nationalDigitsFromRawInput(raw: string): string {
  return nationalDigitsFromStored(raw);
}

export function formatNanpNationalDisplay(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 10);
  if (!d.length) {
    return '';
  }
  if (d.length <= 3) {
    return `+1 (${d}`;
  }
  if (d.length <= 6) {
    return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`;
  }
  return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
