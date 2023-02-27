"use client";

/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type StartRouterChangeContextValue = () => void;
type RouterEventProviderProps = {
    children: React.ReactNode;
    onStart: () => void;
    onComplete: () => void;
};

const StartRouterChangeContext = createContext<StartRouterChangeContextValue>(() => {});

const RouterEventProvider: React.FC<RouterEventProviderProps> = ({ children, onStart, onComplete }) => {
    const [isChanging, setIsChanging] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => setIsChanging(false), [pathname, searchParams]);

    useEffect(() => {
        if (isChanging) onStart();
        else onComplete();
    }, [isChanging]);

    const startChange = () => {
        setIsChanging(false); // cancel loading when loading not completed
        setIsChanging(true);
    };

    return (
        <StartRouterChangeContext.Provider value={startChange}>
            {children}
        </StartRouterChangeContext.Provider>
    );
};

export const useRouterEvent = () => useContext(StartRouterChangeContext);

export default RouterEventProvider;
