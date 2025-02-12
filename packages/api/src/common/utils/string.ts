export function decodeFileNameKorean(fileName: string): string {
  return Buffer.from(fileName, 'latin1').toString('utf8');
}
