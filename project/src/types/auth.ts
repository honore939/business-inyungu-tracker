export interface User {
  id: string;
  amazina: string;
  email: string;
  telefoni: string;
  urwego: 'umuyobozi' | 'umukozi' | 'umukoresha';
  ubucuruzi?: {
    izina: string;
    ubwoko: string;
    ifaranga: string;
    aderesi: string;
    numeroYumusanzu?: string;
  };
  byemejwe: boolean;
  byaremwe: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  birakora: boolean;
  byinjiye: boolean;
}

export interface LoginData {
  email: string;
  ijambobanga: string;
}

export interface RegisterData {
  amazina: string;
  email: string;
  telefoni: string;
  ijambobanga: string;
  kwemezaIjambobanga: string;
  urwego: 'umuyobozi' | 'umukozi' | 'umukoresha';
  ubucuruzi?: {
    izina: string;
    ubwoko: string;
    ifaranga: string;
    aderesi: string;
    numeroYumusanzu?: string;
  };
}