export function convertToUTCWithoutZ(dateString: string): string {
  return dateString.replace(/\.\d+Z$/, '+00:00');
}
