import React from 'react';
import Helmet from 'react-helmet';

import { StaticQuery, graphql } from "gatsby"
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faClock} from '@fortawesome/free-solid-svg-icons';

import Header from '../components/header';
import Footer from '../components/footer';

import 'normalize.css';
import '../layouts/index.css';
import "prismjs/themes/prism.css"

library.add(faEnvelope, faKey, faClock); // Add icons to the internal fontawesome libary

// export const query = graphql`
//   query SiteTitleQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }	

// 		background: imageSharp(id: { regex: "/desk.jpg/" }) {
// 			fluid(maxWidth: 1920){
// 				...GatsbyImageSharpFluid
// 			}
// 		}

// 		logo: imageSharp(id: { regex: "/rev4.png/" }) {
// 			fluid(maxWidth: 1920){
// 				...GatsbyImageSharpFluid
// 			}
// 		} 
// }
// `

const Layout = ({ children , location, data}) => (
	<StaticQuery 
		query={graphql`
			query SiteTitleQuery {
				site {
					siteMetadata {
						title
					}
				}	

				background: imageSharp(fluid:{originalName : { regex: "/desk.jpg/" }}) {
					fluid(maxWidth: 1920){
						...GatsbyImageSharpFluid
					}
				}

				logo: imageSharp(fluid:{originalName: { regex: "/rev4.png/" }}) {
					fluid(maxWidth: 1920){
						...GatsbyImageSharpFluid
					}
				} 
			}
	   `
		}
		rendey={data => (
			<>
			<div>
				<Helmet
					title={data.site.siteMetadata.title}
					meta={[
						{ name: 'description', content: 'Sample' },
						{ name: 'keywords',	content: 'sample, something' },
					]}
				/>
				<Header  
					background={data.background.fluid} 
					logo={data.logo.fluid}
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
					{children}
				</div>
				<Footer />
			</div>
		</>
		)}
	/>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout;

