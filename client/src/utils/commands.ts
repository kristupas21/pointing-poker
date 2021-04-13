export function copyToClipboard(text: string): void {
  const textArea = document.createElement('textarea');

  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '0';
  textArea.style.height = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  document.body.removeChild(textArea);
}
