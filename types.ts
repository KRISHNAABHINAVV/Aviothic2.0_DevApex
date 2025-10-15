export type Page = 'dashboard' | 'assessment' | 'results';

export interface GameResult {
  game: string;
  score: number;
  metric: string;
}

export interface User {
  email: string;
  // In a real application, this would be a securely stored hash, not a plaintext password.
  password: string;
}
