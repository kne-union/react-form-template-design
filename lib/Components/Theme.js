import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { green, blue, grey, deepOrange,red } from '@material-ui/core/colors';

const themedef = {
	primary: blue[500],
	secondaryPrimary: blue[200],
	radius: '4px',
	space: '8px',
	defaultGrey: grey[400],
	simpleOrange: deepOrange[300],
	simpleRed: red[500],
	simpleGreen: green.A400
	
}
const theme = createMuiTheme( {
	palette: {
		primary: {
			main: themedef.primary
		},
		// secondary: {
		// 	main: themedef.simpleRed
		// },
		secondary: {
			main: themedef.simpleGreen
		}
	},
	...themedef
} );

export default ( { children } ) => <ThemeProvider theme={ theme }>{ children }</ThemeProvider>;
