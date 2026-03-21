import { createContext, useContext, useState, type ReactNode } from 'react';

interface FastActionsContextType {
  openId: string | null;
  open(id: string): void;
  close(): void;
}

const FastActionsContext = createContext<FastActionsContextType | null>(null);

export function FastActions({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const open = (id: string) => setOpenId(id);

  const close = () => setOpenId(null);

  return (
    <FastActionsContext.Provider value={{ openId, open, close }}>
      {children}
    </FastActionsContext.Provider>
  );
}

function useFastActions() {
  const context = useContext(FastActionsContext);

  if (context === null)
    throw new Error('Context is being used outside of Provider!');

  return context;
}

function Toggle({ id }: { id: string }) {
  const { openId, open, close } = useFastActions();

  function handleClick() {
    if (openId === id) {
      close();
    } else {
      open(id);
    }
  }

  return <button onClick={handleClick}>Open menu</button>;
}

function List({ id, children }: { id: string; children: ReactNode }) {
  const { openId } = useFastActions();

  if (openId !== id) return null;

  return <div className="z-10">{children}</div>;
}

FastActions.Toggle = Toggle;
FastActions.List = List;
