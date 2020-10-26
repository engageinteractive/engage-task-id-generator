module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    // Specify the paths to all of the template files in your project
    content: ['src/**/*.vue'],

    // Whitelist selectors by using regular expression
    whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/, // transitions
        /data-v-.*/, // scoped css
    ],
  },
  theme: {
    fontFamily: {
      sans: ['BA'],
      mono: ['SFMono-Regular', 'Menlo', 'monospace'],
    },
    extend: {
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
      colors: {
        coral: {
          default: '#EE706F',
          light: '#F98383',
          dark: '#E76362',
        },
        gray: {
          '100': '#F0F0F0',
          '200': '#D4D4D4',
          '300': '#DCDCDC',
          '400': '#7E7E7E',
          '600': '#444444',
          '700': '#202020',
          '800': '#171717',
          '900': '#0C0C0C',
        },
      },
      width: {
        'popup': '350px',
      },
      height: {
        '1px': '1px',
        'input': '2.5rem',
        'egg': '350px',
      },
      fill: theme => ({
        gray: {
          100: theme('colors.gray.100'),
          200: theme('colors.gray.200'),
          700: theme('colors.gray.700'),
          800: theme('colors.gray.800'),
        }
      }),
      boxShadow: theme => ({
        'border-t': `0 -1px ${theme('colors.gray.300')}`,
        'border-t-dark': `0 -1px ${theme('colors.gray.700')}`,
        'list': `inset 0 0 0 1px ${theme('colors.gray.300')}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);`,
        'list-dark': `inset 0 0 0 1px ${theme('colors.gray.700')}, 0 1px 2px 0 rgba(0, 0, 0, 0.05);`,
      }),
      borderColor: theme => ({
        input: theme('colors.gray.300'),
        'input-dark': theme('colors.gray.700'),
      }),
      inset: {
        '1/2': '50%',
        '4': '1rem',
      },
    },
  },
  variants: {
    backgroundColor: ['hover', 'focus', 'active', 'responsive'],
    zIndex: ['hover'],
    visibility: ['group-hover', 'hover'],
    textColor: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
