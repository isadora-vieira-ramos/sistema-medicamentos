export function salvarNoLocalStorage<T>(chave: string, valor: T[]) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function obterDoLocalStorage<T>(chave: string): T[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(chave);
  return data ? JSON.parse(data) : [];
}