import {screen, render, act} from '@testing-library/react';
import React from 'react';
import ThemeSwitch from '../ThemeSwitch';

describe('ThemeSwitch', () => {
    it('should render', () => {
        render(<ThemeSwitch/>);
        expect(screen.getByLabelText('theme switch')).toBeInTheDocument();
    });
    it("should have three buttons inside", () => {
        render(<ThemeSwitch/>);
        const button = screen.getByLabelText('theme switch');
        act(()=>button.click());
        const lightTheme = screen.getByLabelText('light theme');
        const darkTheme = screen.getByLabelText('dark theme');
        const systemTheme = screen.getByLabelText('system prefered theme');
    });
});