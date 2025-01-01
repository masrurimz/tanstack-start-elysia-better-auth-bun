import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import baseConfig from '@acme/tailwind-config/web'

export default {
	// We need to append the path to the UI package to the content array so that
	// those classes are included correctly.
	content: [...baseConfig.content, './app/**/*.{ts,tsx}'],
	presets: [baseConfig],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', ...fontFamily.sans],
				mono: [...fontFamily.mono],
			},
		},
	},
} satisfies Config
