/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwind-colors')

const customColors = {
  musto: {
    900: '#E95C00',
    800: '#F96900',
    700: '#FF7617',
    600: '#FF8327',
    500: '#FF9034',
    400: '#FF9D42',
    300: '#FFAB4F',
    200: '#FFB85C',
    100: '#FFC568',
    50: '#FFD375',
    0: '#FFDD95'
  },
  mask: {
    900: '#00000F',
    800: '#10101A',
    700: '#1B1B24',
    600: '#25252F',
    500: '#30303A',
    400: '#3B3B45',
    300: '#464651',
    200: '#52525D',
    100: '#5E5E69',
    50: '#6A6A76',
  },
  dust: {
    900: '#87786F',
    800: '#96867C',
    700: '#A4948A',
    600: '#B3A398',
    500: '#C1B1A6',
    400: '#D0C0B5',
    300: '#DFCEC3',
    200: '#EEDDD2',
    100: '#FEECE1',
    50: '#FFFCF0',
  },
  shadow: {
    900: '#110000',
    800: '#1D1002',
    700: '#261B13',
    600: '#33271F',
    500: '#3F332A',
    400: '#4C3F36',
    300: '#594C43',
    200: '#675950',
    100: '#75665D',
    50: '#83746A',
  },
  ash: {
    900: '#6B6B77',
    800: '#7A7A86',
    700: '#8A8A96',
    600: '#9999A5',
    500: '#AAAAB6',
    400: '#BABAC7',
    300: '#CBCBD7',
    200: '#DBDBE8',
    100: '#ECECF9',
    50: '#FEFEFF',
  },
  leaf: {
    900: '#002000',
    800: '#002E00',
    700: '#004500',
    600: '#006200',
    500: '#007F00',
    400: '#009E00',
    300: '#00BD00',
    200: '#42DD32',
    100: '#6AFD53',
    50: '#8EFF73',
    0: '#E3FFDC',
  },
  sky: {
    900: '#585BDB',
    800: '#6B6AED',
    700: '#7D79FF',
    600: '#9089FF',
    500: '#A298FF',
    400: '#B4A8FF',
    300: '#C7BAFF',
    200: '#D9CAFF',
    100: '#EBDBFF',
    50: '#FEEDFF',
  },
  copper: {
    900: '#000061',
    800: '#00056F',
    700: '#00107C',
    600: '#001A8A',
    500: '#002598',
    400: '#0630A7',
    300: '#283CB6',
    200: '#3D48C5',
    100: '#4F54D3',
    50: '#6061E3',
  },
  mustard: {
    900: '#6C2E00',
    800: '#814100',
    700: '#975300',
    600: '#AD6500',
    500: '#C67900',
    400: '#DE8D00',
    300: '#F6A100',
    200: '#FFB61E',
    100: '#FFCB3A',
    50: '#FFE051',
    0: '#FFF7D3',
  },
  donor: {
    900: '#B40000',
    800: '#CB0000',
    700: '#E30000',
    600: '#FC0000',
    500: '#FF2F16',
    400: '#FF4B2B',
    300: '#FF633D',
    200: '#FF7A4F',
    100: '#FF9162',
    50: '#FFA775',
    0: '#FFEDE3',
  },
}

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screen: {
      'xs': '360px',
      ...defaultTheme.screens,
    },
    colors: {
      ...colors,
      ...customColors,
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      }
    }
  },
  plugins: [],
}
