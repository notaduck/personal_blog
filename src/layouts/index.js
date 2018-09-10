import React from 'react';
import Helmet from 'react-helmet';

import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faClock, faCoffee } from '@fortawesome/free-solid-svg-icons'

import Header from '../components/header';
import Footer from '../components/footer';

import 'normalize.css';
import './index.scss';
import "../styles/prism.css"
import { theme } from '../styles/theme'

library.add(faEnvelope, faClock, faCoffee, fab) // Add icons to the internal fontawesome libary

const Layout = ({ children, data, location}) => (
	<ThemeProvider theme={ theme }>
		<div>
			<Helmet
				title={data.site.siteMetadata.title}
				meta={[
					{ name: 'description', content: 'Sample' },
					{ name: 'keywords',	content: 'sample, something' },
				]}
			/>
			<Header  
				background={data.background.sizes} 
				logo={data.logo.sizes}
				location={location}
			/>
			<div
				style={{
					margin: '0 auto',
					maxWidth: 1040,
					padding: '0px 1.0875rem 1.45rem',
					paddingTop: 0,
					minHeight: 'calc(100vh - 225px)' // added minimum height for content so that footer will be at bottom always
				}}
			>
				<ThemeProvider theme={theme}>{children()}</ThemeProvider>

			</div>
			<Footer />
		</div>
	</ThemeProvider>
);

Layout.propTypes = {
	children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }	
		background: imageSharp(id: { regex: "/desk.jpg/" }) {
			sizes(maxWidth: 1920){
				...GatsbyImageSharpSizes
			}
		}

		logo: imageSharp(id: { regex: "/rev4.png/" }) {
			sizes(maxWidth: 1920){
				...GatsbyImageSharpSizes
			}
		}
		hej: allMarkdownRemark (
		filter: { frontmatter: { published: {eq: true} } }
	){
    edges {
      node {
        frontmatter {
          path
        }
      }
    }
  }
}
`;
