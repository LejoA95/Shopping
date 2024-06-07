"use client"
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            // light: '#34536B',
            light: '#123652',
            main: '#022946',
            dark: '#011C31',
            contrastText: '#E6E6E8'
        },
        primaryOscruro: {
            // light: '#34536B',
            light: '#123652',
            main: '#011C31',
            dark: '#011C31',
            contrastText: '#E6E6E8'
        },
        secondary: {
            light: '#dbf833',
            main: '#d2f700',
            dark: '#b8d704',
            contrastText: '#011C31'
        },
        terciario: {
            main: '#5adce8',
        },
        secondarySimple: {
            light: '#dbf833',
            main: '#c5e70241',
            dark: '#99b40157',
            contrastText: '#011C31',
        },
        cristal: {
            main: '#f6f6f675'
        },
        active: {
            main: '#bebeb'
        },
        select: {
            main: '#E6E6E8',
        },
        info: {
            main: '#5adce8',
        },
    },
    typography: {
        h1: {
            lineHeight: 1.2,
            fontSize: 60,
            fontWeight: 600
        },
        h2: {
            lineHeight: 1.2,
            fontSize: 44,
            fontWeight: 600
        },
        h3: {
            lineHeight: 1.2,
            fontSize: 38,
            fontWeight: 600
        },
        h4: {
            lineHeight: 1.2,
            fontSize: 32,
            fontWeight: 600
        },
        h5: {
            lineHeight: 1.2,
            fontSize: 26,
            fontWeight: 600
        },
        h6: {
            lineHeight: 1.2,
            fontSize: 20,
            fontWeight: 600
        },
        h6Small: {
            lineHeight: 1.2,
            fontSize: 16,
            fontWeight: 600
        },
        h6p: {
            lineHeight: 1.2,
            fontSize: 14,
            fontWeight: 600
        },
        pSelect: {
            fontSize: 15
        },
        pTitleGrey: {
            fontSize: 14,
            color: '#707070'
        },
        p: {
            fontSize: 14
        },
        span: {
            fontSize: 12
        },
        fontFamily: "'Inter', sans-serif"
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    '@media (min-width:800px)': {
                        paddingLeft: '1em',
                        paddingRight: '1em',
                    },
                },
            }
        },
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    paddingLeft:'0',
                    paddingRight:'0'
                },
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1',
                    h2: 'h2',
                    h3: 'h3',
                    h4: 'h4',
                    h5: 'h5',
                    h6: 'h6',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    p: 'p',
                    body1: 'p',
                    span: 'span',
                }
            }
        },
        MuiFocused: {
            borderWidth: '1px'
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused fieldset': {
                        borderColor: '#808080',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // color: '#022946',
                    fontSize: 14
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    height: '0',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: '#022946',
                    fontSize: 14,
                    ':disabled': {
                        backgroundColor: '#00000013'
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    '::after': {
                        borderTop: 'thin solid #E6E6E8'
                    },
                    '::before': {
                        borderTop: 'thin solid #E6E6E8'
                    },
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 10
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '35px',
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: '.5em'
                }
            }
        },
        MuiFormControlLabel: {
            label: {
                fontSize: 14
            }
        }

    },
    breakpoints: {
        values: {
            xs: 0,
            xm: 500,
            sm: 800,
            md: 1032,
            lg: 1200,
            xl: 1400,
        }
    }

});

const responsiveTheme = responsiveFontSizes(theme, {
    breakpoints: ['sm', 'md', 'lg', 'xl'],
    factor: 1.5,
    variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
});

export default responsiveTheme;

