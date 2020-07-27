import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[500]
		}
	}
});

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
