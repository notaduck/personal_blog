import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import '../styles/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'

const Title = styled.h3`
	color: black;
`
const LinkWrapper = styled(Link)`
	text-decoration: none;
`

const IndexPage = ({data}) => (
	<div>
		<h1> Posts </h1>
		{data.allMarkdownRemark.edges.map(post => (	
			<div key={post.node.id}className='container'>
				<div className='thumbnail'>
					<div style={{width:200}}>  
						<Img sizes={post.node.frontmatter.image.childImageSharp.sizes} /> 
					</div>
				</div>
				<div className='details'> 
					<LinkWrapper 
						key={post.node.id} 
						to={post.node.frontmatter.path}>
						<Title>{post.node.frontmatter.title}</Title>
					</LinkWrapper>
					<div className='date_details'>        
						<p> {post.node.frontmatter.date} <FontAwesomeIcon icon='clock' /> {post.node.timeToRead} min read</p>
					</div>
					<p>{post.node.excerpt}</p>
				</div>
			</div>

		))}
	</div>
);


export const query = graphql`
query indexQuery {
	allMarkdownRemark(
		sort: { fields: [frontmatter___date], order: DESC }
		filter: { frontmatter: { published: {eq: true}, type: {eq: "blogpost"} } }
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



export default IndexPage;