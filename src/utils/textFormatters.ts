export function Capitalizar(texto: string): string {

  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();

}