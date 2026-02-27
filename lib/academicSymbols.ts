export type AcademicSymbolCategory = 'math' | 'chemistry' | 'logic' | 'language';

export interface AcademicSymbol {
  id: string;
  symbol: string;
  label?: string;
  category: AcademicSymbolCategory;
}

export const academicSymbols: AcademicSymbol[] = [
  { id: 'sum', symbol: '∑', label: 'Summation', category: 'math' },
  { id: 'integral', symbol: '∫', label: 'Integral', category: 'math' },
  { id: 'sqrt', symbol: '√', label: 'Square root', category: 'math' },
  { id: 'pm', symbol: '±', label: 'Plus-minus', category: 'math' },
  { id: 'infty', symbol: '∞', label: 'Infinity', category: 'math' },
  { id: 'neq', symbol: '≠', label: 'Not equal', category: 'math' },
  { id: 'approx', symbol: '≈', label: 'Approximately', category: 'math' },
  { id: 'le', symbol: '≤', label: 'Less than or equal', category: 'math' },
  { id: 'ge', symbol: '≥', label: 'Greater than or equal', category: 'math' },
  { id: 'times', symbol: '×', label: 'Multiplication', category: 'math' },
  { id: 'div', symbol: '÷', label: 'Division', category: 'math' },
  { id: 'alpha', symbol: 'α', label: 'Alpha', category: 'math' },
  { id: 'beta', symbol: 'β', label: 'Beta', category: 'math' },
  { id: 'gamma', symbol: 'γ', label: 'Gamma', category: 'math' },
  { id: 'delta', symbol: 'δ', label: 'Delta', category: 'math' },
  { id: 'epsilon', symbol: 'ε', label: 'Epsilon', category: 'math' },
  { id: 'theta', symbol: 'θ', label: 'Theta', category: 'math' },
  { id: 'lambda', symbol: 'λ', label: 'Lambda', category: 'math' },
  { id: 'mu', symbol: 'μ', label: 'Mu', category: 'math' },
  { id: 'pi', symbol: 'π', label: 'Pi', category: 'math' },
  { id: 'sigma', symbol: 'σ', label: 'Sigma', category: 'math' },
  { id: 'phi', symbol: 'φ', label: 'Phi', category: 'math' },
  { id: 'omega', symbol: 'ω', label: 'Omega', category: 'math' },
  { id: 'sub2', symbol: '₂', label: 'Subscript 2', category: 'chemistry' },
  { id: 'sub3', symbol: '₃', label: 'Subscript 3', category: 'chemistry' },
  { id: 'sup4', symbol: '⁴', label: 'Superscript 4', category: 'chemistry' },
  { id: 'sup5', symbol: '⁵', label: 'Superscript 5', category: 'chemistry' },
  { id: 'arrow-r', symbol: '→', label: 'Right arrow', category: 'chemistry' },
  { id: 'arrow-l', symbol: '←', label: 'Left arrow', category: 'chemistry' },
  { id: 'equilibrium', symbol: '⇌', label: 'Equilibrium', category: 'chemistry' },
  { id: 'delta-h', symbol: 'Δ', label: 'Delta (enthalpy)', category: 'chemistry' },
  { id: 'deg', symbol: '°', label: 'Degree', category: 'chemistry' },
  { id: 'bullet', symbol: '•', label: 'Bullet', category: 'chemistry' },
  { id: 'not', symbol: '¬', label: 'Logical not', category: 'logic' },
  { id: 'and', symbol: '∧', label: 'Logical and', category: 'logic' },
  { id: 'or', symbol: '∨', label: 'Logical or', category: 'logic' },
  { id: 'implies', symbol: '⇒', label: 'Implies', category: 'logic' },
  { id: 'iff', symbol: '⇔', label: 'If and only if', category: 'logic' },
  { id: 'forall', symbol: '∀', label: 'For all', category: 'logic' },
  { id: 'exists', symbol: '∃', label: 'There exists', category: 'logic' },
  { id: 'in', symbol: '∈', label: 'Element of', category: 'logic' },
  { id: 'notin', symbol: '∉', label: 'Not element of', category: 'logic' },
  { id: 'subset', symbol: '⊂', label: 'Subset', category: 'logic' },
  { id: 'a-acute', symbol: 'á', label: 'a acute', category: 'language' },
  { id: 'e-acute', symbol: 'é', label: 'e acute', category: 'language' },
  { id: 'i-acute', symbol: 'í', label: 'i acute', category: 'language' },
  { id: 'o-acute', symbol: 'ó', label: 'o acute', category: 'language' },
  { id: 'u-acute', symbol: 'ú', label: 'u acute', category: 'language' },
  { id: 'n-tilde', symbol: 'ñ', label: 'n tilde', category: 'language' },
  { id: 'u-umlaut', symbol: 'ü', label: 'u umlaut', category: 'language' },
  { id: 'a-grave', symbol: 'à', label: 'a grave', category: 'language' },
  { id: 'e-grave', symbol: 'è', label: 'e grave', category: 'language' },
  { id: 'c-cedilla', symbol: 'ç', label: 'c cedilla', category: 'language' },
  { id: 'a-umlaut', symbol: 'ä', label: 'a umlaut', category: 'language' },
  { id: 'o-umlaut', symbol: 'ö', label: 'o umlaut', category: 'language' },
];

const categories: AcademicSymbolCategory[] = ['math', 'chemistry', 'logic', 'language'];

export function getSymbolsByCategory(): Record<AcademicSymbolCategory, AcademicSymbol[]> {
  const grouped = {} as Record<AcademicSymbolCategory, AcademicSymbol[]>;
  for (const cat of categories) {
    grouped[cat] = academicSymbols.filter((s) => s.category === cat);
  }
  return grouped;
}
