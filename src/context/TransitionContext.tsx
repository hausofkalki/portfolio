import { createContext, useContext, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface TransitionContextType {
  clickPosition: Position;
  setClickPosition: (position: Position) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [clickPosition, setClickPosition] = useState<Position>({ x: 0, y: 0 });
  
  return (
    <TransitionContext.Provider value={{ clickPosition, setClickPosition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransition must be used within TransitionProvider');
  }
  return context;
};