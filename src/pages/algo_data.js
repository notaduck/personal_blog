import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import '../styles/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { graphql } from 'gatsby' 
import Layout from '../components/layout.js'
const AlgoPage = ({data}) => (
	<Layout>
		<h1> Algorithms and Datastructures </h1>
		{data.allMarkdownRemark.edges.map(post => (	
			<div key={post.node.id}className='container'>
				<div className='thumbnail'>
					<div style={{width:200}}>  
						<Img sizes={post.node.frontmatter.image.childImageSharp.sizes} /> 
					</div>
				</div>
				<div className='details'> 
					<Link 
						key={post.node.id} 
						to={post.node.frontmatter.path}>
						<h3>{post.node.frontmatter.title}</h3>
					</Link>
					<div className='date_details'>        
						<p> {post.node.frontmatter.date} <FontAwesomeIcon icon='clock' /> {post.node.timeToRead} min read</p>
					</div>
					<p>{post.node.excerpt}</p>
				</div>
			</div>

		))}
	</Layout>
);


export const query = graphql`
query indexQueryX {
	allMarkdownRemark(
		sort: { fields: [frontmatter___date], order: DESC }
		filter: { frontmatter: { published: {eq: true}, type: {eq: "algo"} } }
	) {
			edges {
				node {
					id
					excerpt(pruneLength: 250)
					timeToRead
					frontmatter {
							title
							path 
							image {
								publicURL
								childImageSharp {
								sizes(maxWidth: 200) {
								...GatsbyImageSharpSizes
								}
							}
						}
					date(formatString: "MMMM DD, YYYY")
				}
			}
		}
	}
}
`;



export default AlgoPage;
