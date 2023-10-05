import { Theme } from '@emotion/react';
import { createTheme } from '@mui/material';

export const DarkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});