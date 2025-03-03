"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreviewContextType {
    preview: boolean;
    setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

interface PreviewProviderProps {
    children: ReactNode;
}

export default function PreviewProvider({ children }: PreviewProviderProps) {
    const [preview, setPreview] = useState<boolean>(false);
    return (
        <PreviewContext.Provider value={{ preview, setPreview }}>
            {children}
        </PreviewContext.Provider>
    );
}

export function usePreviews(): PreviewContextType {
    const context = useContext(PreviewContext);
    if (!context) {
        throw new Error('usePreviews deve ser usado dentro de um PreviewProvider');
    }
    return context;
}