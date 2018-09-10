import React from 'react';
import PropTypes from 'prop-types';

import Link from 'gatsby-link';
import Img from 'gatsby-image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components'
import {Post, PostTitle, PostDetails, PostThumbnail} from '../components/postList'


const LinkWrapper = styled(Link)`
	text-decoration: none;
`

const AlgoPage = ({data}) => (
	<div>
		<h1> Posts </h1>
		{data.allMarkdownRemark.edges.map(post => (	
			<Post key={post.node.id}>
				<PostThumbnail>
					<div style={{width:200}}>  
						<Img sizes={post.node.frontmatter.image.childImageSharp.sizes} /> 
					</div>
				</PostThumbnail>
				<PostDetails> 
					<LinkWrapper 
						key={post.node.id} 
						to={post.node.frontmatter.path}>
						<PostTitle>{post.node.frontmatter.title}</PostTitle>
					</LinkWrapper>
					<p> {post.node.frontmatter.date} <FontAwesomeIcon icon='coffee' /> {post.node.timeToRead} min read</p>
					<p>{post.node.excerpt}</p>
				</PostDetails>
			</Post>

		))}
	</div>
);

AlgoPage.propTypes = {
	data: PropTypes.shape({
		background: PropTypes.object,
		logo: PropTypes.object,
		site: PropTypes.object
	}),
}

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
