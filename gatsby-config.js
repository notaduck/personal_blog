module.exports = {
	plugins: [
		'gatsby-remark-copy-linked-files',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		'gatsby-plugin-styled-components',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 200
						}
					},
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							// Class prefix for <pre> tags containing syntax highlighting;
							// defaults to 'language-' (eg <pre class="language-js">).
							// If your site loads Prism into the browser at runtime,
							// (eg for use with libraries like react-live),
							// you may use this to prevent Prism from re-processing syntax.
							// This is an uncommon use-case though;
							// If you're unsure, it's best to use the default value.
							classPrefix: "language-",
							// This is used to allow setting a language for inline code
							// (i.e. single backticks) by creating a separator.
							// This separator is a string and will do no white-space
							// stripping.
							// A suggested value for English speakers is the non-ascii
							// character '›'.
							inlineCodeMarker: null,
							// This lets you set up language aliases.  For example,
							// setting this to '{ sh: "bash" }' will let you use
							// the language "sh" which will highlight using the
							// bash highlighter.
							aliases: {sh: "bash"},
						}
					}
				]
			}
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages'
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/images`,
				name: 'images'
			}
		},
		{
			resolve: 'gatsby-plugin-eslint',
			options: {
				test: /\.js$|\.jsx$/,
				exclude: /(node_modules|cache|public)/,
				options: {
					emitWarning: true,
					failOnError: false
				}
			}
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-57212445-2",
				// Puts tracking script in the head instead of the body
				head: true,
				// Setting this parameter is optional
				anonymize: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				exclude: ["/preview/**", "/do-not-track/me/too/"],
			},
		},
		{
			resolve: 'gatsby-plugin-sitemap'
		},
	],

	siteMetadata: {
		author: 'Daniel Guldberg Aaes',
		title: 'Guldberg lab',
		name:"google-site-verification",
		content:"Ji_Q-7Puvr2Mzy_ZhNDZ2F-hMubwpz3SujY2WAms9vY",
		siteUrl: "https://guldberglab.info"
	},
	// pathPrefix: '/personal_blog'
};
