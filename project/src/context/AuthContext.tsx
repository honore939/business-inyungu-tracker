import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginData, RegisterData } from '../types/auth';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  kwinjira: (data: LoginData) => Promise<boolean>;
  guhangaKonti: (data: RegisterData) => Promise<boolean>;
  gusohoka: () => void;
  kuvugururaMakuru: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'GUTANGIRA_GUKORA' }
  | { type: 'KWINJIRA_BYAGENZE_NEZA'; payload: { user: User; token: string } }
  | { type: 'KWINJIRA_BYANZE' }
  | { type: 'GUSOHOKA' }
  | { type: 'KUVUGURURA_UMUKORESHA'; payload: User };

const initialState: AuthState = {
  user: null,
  token: null,
  birakora: false,
  byinjiye: false
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'GUTANGIRA_GUKORA':
      return { ...state, birakora: true };
    case 'KWINJIRA_BYAGENZE_NEZA':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        birakora: false,
        byinjiye: true
      };
    case 'KWINJIRA_BYANZE':
      return { ...state, birakora: false };
    case 'GUSOHOKA':
      return initialState;
    case 'KUVUGURURA_UMUKORESHA':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Gusuzuma niba umukoresha yinjiye mbere
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'KWINJIRA_BYAGENZE_NEZA', payload: { user, token } });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const kwinjira = async (data: LoginData): Promise<boolean> => {
    dispatch({ type: 'GUTANGIRA_GUKORA' });
    
    try {
      // Simulation ya API call - mu buzima bwite uzakoresha API nyayo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo account
      if (data.email === 'honore@tradeflow.rw' && data.ijambobanga === '123456') {
        const user: User = {
          id: '1',
          amazina: 'ARASUBIZWA Honore',
          email: 'honore@tradeflow.rw',
          telefoni: '+250790251138',
          urwego: 'umuyobozi',
          ubucuruzi: {
            izina: 'Ubucuruzi bwa ARASUBIZWA',
            ubwoko: 'Ubucuruzi',
            ifaranga: 'RWF',
            aderesi: 'Kigali, Rwanda',
            numeroYumusanzu: 'RW123456789'
          },
          byemejwe: true,
          byaremwe: '2024-01-01'
        };
        
        const token = 'demo-jwt-token-' + Date.now();
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch({ type: 'KWINJIRA_BYAGENZE_NEZA', payload: { user, token } });
        toast.success('Murakaza neza!');
        return true;
      } else {
        throw new Error('Email cyangwa ijambobanga sibyo');
      }
    } catch (error) {
      dispatch({ type: 'KWINJIRA_BYANZE' });
      toast.error(error instanceof Error ? error.message : 'Ikosa ryabaye mu kwinjira');
      return false;
    }
  };

  const guhangaKonti = async (data: RegisterData): Promise<boolean> => {
    dispatch({ type: 'GUTANGIRA_GUKORA' });
    
    try {
      // Simulation ya API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: Date.now().toString(),
        amazina: data.amazina,
        email: data.email,
        telefoni: data.telefoni,
        urwego: data.urwego,
        ubucuruzi: data.ubucuruzi,
        byemejwe: true,
        byaremwe: new Date().toISOString()
      };
      
      const token = 'jwt-token-' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({ type: 'KWINJIRA_BYAGENZE_NEZA', payload: { user, token } });
      toast.success('Konti yawe yaremwe neza!');
      
      // Kohereza notification ku bayobozi
      if (data.urwego !== 'umuyobozi') {
        toast.info('Umuyobozi azakira ubutumwa bw\'uko waremye konti');
      }
      
      return true;
    } catch (error) {
      dispatch({ type: 'KWINJIRA_BYANZE' });
      toast.error('Ikosa ryabaye mu guhanga konti');
      return false;
    }
  };

  const gusohoka = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'GUSOHOKA' });
    toast.success('Wasohokye neza');
  };

  const kuvugururaMakuru = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'KUVUGURURA_UMUKORESHA', payload: updatedUser });
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      kwinjira,
      guhangaKonti,
      gusohoka,
      kuvugururaMakuru
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth igomba gukoreshwa imbere ya AuthProvider');
  }
  return context;
};