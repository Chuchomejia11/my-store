import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const themeClass = mode === 'dark' ? 'dark' : 'light';
    return <div className={themeClass}>{children}</div>;
};

