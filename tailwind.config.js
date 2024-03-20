function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './containers/**/*.tsx',
    './data/**/*.mdx'
  ],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        xsm: '400px',
        '3xl': '1900px'
      },
      fontFamily: {
        body: [
          'Arimo',
          'Inter',
          'Mulish',
          'sans-serif',
          'Open Sans',
          'system-ui'
        ],
        heading: [
          'Arimo',
          'Inter',
          'Mulish',
          'sans-serif',
          'Open Sans',
          'system-ui'
        ]
      },
      colors: {
        light: withOpacity('--color-light'),
        dark: withOpacity('--color-dark'),
        accent: withOpacity('--color-accent'),
        'accent-hover': withOpacity('--color-accent-hover'),
        'accent-300': withOpacity('--color-accent-300'),
        'accent-400': withOpacity('--color-accent-400'),
        'accent-500': withOpacity('--color-accent-500'),
        'accent-600': withOpacity('--color-accent-600'),
        'accent-700': withOpacity('--color-accent-700'),
        'border-50': withOpacity('--color-border-50'),
        'border-100': withOpacity('--color-border-100'),
        'border-200': withOpacity('--color-border-200'),
        'border-base': withOpacity('--color-border-base'),
        'border-400': withOpacity('--color-border-400'),
        'gray-50': withOpacity('--color-gray-50'),
        'gray-100': withOpacity('--color-gray-100'),
        'gray-200': withOpacity('--color-gray-200'),
        'gray-300': withOpacity('--color-gray-300'),
        'gray-400': withOpacity('--color-gray-400'),
        'gray-500': withOpacity('--color-gray-500'),
        'gray-600': withOpacity('--color-gray-600'),
        'gray-700': withOpacity('--color-gray-700'),
        'gray-800': withOpacity('--color-gray-800'),
        'gray-900': withOpacity('--color-gray-900'),
        sidenav: '#020024',
        'sidenav-secondary': '#050321ed',
        'sidenav-color': '#ccc',
        'sidenav-active-color': '#383749cf',
        'sidenav-active-hover-color': '#36326fcf',
        'sidenav-color-secondary': '#cdcdce',
        'sidenav-divider': 'rgba(255,255,255,0.2)',
        'fb-color': '#4267B2',
        social: {
          facebook: '#3b5998',
          'facebook-hover': '#35508a',
          twitter: '#1da1f2',
          instagram: '#e1306c',
          youtube: '#ff0000',
          google: '#4285f4',
          'google-hover': '#3574de'
        }
      },

      textColor: {
        body: withOpacity('--text-base'),
        'body-dark': withOpacity('--text-base-dark'),
        muted: withOpacity('--text-muted'),
        'muted-light': withOpacity('--text-muted-light'),
        heading: withOpacity('--text-heading'),
        'sub-heading': withOpacity('--text-sub-heading'),
        bolder: withOpacity('--text-text-bolder')
      },

      height: {
        13: '3.125rem',
        double: '200%'
      },
      maxWidth: {
        5: '1.25rem'
      },
      maxHeight: {
        5: '1.25rem'
      },
      spacing: {
        22: '5.5rem'
      },

      borderRadius: {
        DEFAULT: '5px'
      },

      boxShadow: {
        base: 'rgba(0, 0, 0, 0.16) 0px 4px 16px'
      },

      gridTemplateColumns: {
        fit: 'repeat(auto-fit, minmax(0, 1fr))'
      },
      animation: {
        'marquee-infinite': 'marquee 1s linear infinite',
        'marquee2-infinite': 'marquee2 1s linear infinite'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(-6px,0,0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(6px,0,0)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: `${theme('colors.blue.600')} !important`
              },
              code: { color: theme('colors.blue.400') }
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900')
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900')
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900')
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900')
            },
            pre: {
              backgroundColor: theme('colors.gray.800')
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem'
            },
            'code::before': {
              content: 'none'
            },
            'code::after': {
              content: 'none'
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem'
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500')
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500')
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200')
            }
          }
        }
      })
    }
  },
  plugins: [require('tailwindcss-rtl'), require('@tailwindcss/typography')]
};
