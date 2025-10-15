import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../data/contacts';

export type CallStatus = 'idle' | 'connecting' | 'ongoing' | 'ended' | 'incoming';

type CallState = {
  status: CallStatus;
  contact?: Contact | null;
  duration: number;
};

type CallContextType = {
  state: CallState;
  startOutgoingCall: (contact: Contact) => void;
  endCall: () => void;
  acceptIncoming: () => void;
  rejectIncoming: () => void;
  triggerIncoming: (contact: Contact) => void;
};

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CallState>({ status: 'idle', contact: null, duration: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const persistLog = async (entry: any) => {
    try {
      const raw = await AsyncStorage.getItem('@call_logs');
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(entry);
      await AsyncStorage.setItem('@call_logs', JSON.stringify(arr.slice(0, 50)));
    } catch {}
  };

  const startOutgoingCall = (contact: Contact) => {
    setState({ status: 'connecting', contact, duration: 0 });
    setTimeout(() => {
      setState(prev => ({ ...prev, status: 'ongoing' }));
      timerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    }, 1200);
  };

  const endCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState(prev => {
      persistLog({ id: Date.now(), contact: prev.contact, duration: prev.duration, endedAt: Date.now() });
      return { status: 'ended', contact: prev.contact, duration: prev.duration };
    });
    setTimeout(() => setState({ status: 'idle', contact: null, duration: 0 }), 1000);
  };

  const triggerIncoming = (contact: Contact) => setState({ status: 'incoming', contact, duration: 0 });
  const acceptIncoming = () => {
    setState(prev => ({ ...prev, status: 'ongoing' }));
    timerRef.current = setInterval(() => {
      setState(prev => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);
  };
  const rejectIncoming = () => setState({ status: 'idle', contact: null, duration: 0 });

  return (
    <CallContext.Provider value={{ state, startOutgoingCall, endCall, acceptIncoming, rejectIncoming, triggerIncoming }}>
      {children}
    </CallContext.Provider>
  );
};

export function useCall() {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCall must be used inside CallProvider');
  return ctx;
}
