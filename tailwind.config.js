module.exports = {
	purge: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {}
	},
	variants: {
		extend: {
			backgroundColor: [ 'responsive', 'hover', 'focus', 'active', 'disabled' ],
			textColor: [ 'responsive', 'hover', 'focus', 'active', 'disabled' ],
			opacity: [ 'disabled' ],
			cursor: [ 'disabled' ]
		}
	},
	plugins: []
};
