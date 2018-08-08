import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../components/layout.js'
import '../styles/index.css'

const ComputerScience = ({ data }) => (
	<Layout location={location}>
		<h1> Algorithms and Datastructures </h1>
		{data.allMarkdownRemark.edges.map(post => (
			<div key={post.node.id} className="container">
				<div className="thumbnail">
					<div style={{ width: 200 }}>
						<Img sizes={post.node.frontmatter.image.childImageSharp.sizes} />
					</div>
				</div>
				<div className="details">
					<Link key={post.node.id} to={post.node.frontmatter.path}>
						<h3>{post.node.frontmatter.title}</h3>
					</Link>
					<div className="date_details">
						{/*	<p> {post.node.frontmatter.date} <FontAwesomeIcon icon='clock' /> {post.node.timeToRead} min read</p>	*/}
					</div>
					<p>{post.node.excerpt}</p>
				</div>
			</div>
		))}
	</Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true }, type: { eq: "cs" } } }
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
`

export default ComputerScience 
