/**
 * Utilitários de máscara e formatação para CPF, CNPJ e Número de Processo
 */

/**
 * Remove todos os caracteres não numéricos de uma string
 */
export const onlyNumbers = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Aplica máscara de CPF (000.000.000-00)
 */
export const maskCPF = (value: string): string => {
  const numbers = onlyNumbers(value);
  return numbers
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

/**
 * Aplica máscara de CNPJ (00.000.000/0000-00)
 */
export const maskCNPJ = (value: string): string => {
  const numbers = onlyNumbers(value);
  return numbers
    .slice(0, 14)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};

/**
 * Aplica máscara de CPF ou CNPJ dinamicamente baseado no tamanho
 * CPF: 11 dígitos | CNPJ: 14 dígitos
 */
export const maskCPFCNPJ = (value: string): string => {
  const numbers = onlyNumbers(value);

  if (numbers.length <= 11) {
    return maskCPF(value);
  }

  return maskCNPJ(value);
};

/**
 * Aplica máscara de Número de Processo CNJ (0000000-00.0000.0.00.0000)
 * Formato: NNNNNNN-DD.AAAA.J.TR.OOOO
 * - NNNNNNN: Número sequencial (7 dígitos)
 * - DD: Dígito verificador (2 dígitos)
 * - AAAA: Ano do ajuizamento (4 dígitos)
 * - J: Segmento do poder judiciário (1 dígito)
 * - TR: Tribunal (2 dígitos)
 * - OOOO: Origem (4 dígitos)
 */
export const maskProcessNumber = (value: string): string => {
  const numbers = onlyNumbers(value);

  return numbers
    .slice(0, 20)
    .replace(/(\d{7})(\d)/, '$1-$2')
    .replace(/(\d{7}-\d{2})(\d)/, '$1.$2')
    .replace(/(\d{7}-\d{2}\.\d{4})(\d)/, '$1.$2')
    .replace(/(\d{7}-\d{2}\.\d{4}\.\d{1})(\d)/, '$1.$2')
    .replace(/(\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2})(\d)/, '$1.$2');
};

/**
 * Formata CPF/CNPJ para exibição (já formatado)
 */
export const formatCPFCNPJ = (value: string): string => {
  if (!value) return '';
  const numbers = onlyNumbers(value);

  if (numbers.length <= 11) {
    return maskCPF(numbers);
  }

  return maskCNPJ(numbers);
};

/**
 * Formata Número de Processo para exibição
 */
export const formatProcessNumber = (value: string): string => {
  if (!value) return '';
  return maskProcessNumber(onlyNumbers(value));
};
