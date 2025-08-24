import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
        primary: string;
        primaryHover: string;
        shadow: string;
    }
}
