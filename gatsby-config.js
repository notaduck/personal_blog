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
		}
	],

	siteMetadata: {
		author: 'Daniel Guldberg Aaes',
		title: 'Site title'
	},
	pathPrefix: '/gatsby'
};
