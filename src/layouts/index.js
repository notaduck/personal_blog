import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faClock} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/header';
import Footer from '../components/footer';
import 'normalize.css';
import './index.scss';
import "prismjs/themes/prism.css"

import icon32 from '../images/favicon-32x32.png'

library.add(faEnvelope, faKey, faClock); // Add icons to the internal fontawesome libary

const Layout = ({ children, data, location}) => (
	<div>
		<Helmet
			title={data.site.siteMetadata.title}
			meta={[
				{ name: 'description', content: 'Sample' },
				{ name: 'keywords',	content: 'sample, something' },
			]}
			// link={[
			// 	{ rel: 'shortcut icon', type: 'image/png', href: `${icon32}` }
			// ]}
		/>
		<Header  
			background={data.background.sizes} 
			logo={data.logo.sizes}
			location={location}/>
		<div
			style={{
				margin: '0 auto',
				maxWidth: 1040,
				padding: '0px 1.0875rem 1.45rem',
				paddingTop: 0,
				minHeight: 'calc(100vh - 225px)' // added minimum height for content so that footer will be at bottom always
			}}
		>
			{children()}
		</div>
		<Footer />
	</div>
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
