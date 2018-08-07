import React from 'react'
import Layout from '../components/layout.js'
// import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { graphql, Link } from 'gatsby'
import '../styles/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IndexPage = ({ data, location }) => (
	<Layout location={location}>
		<h1> Posts </h1>
		{data.allMarkdownRemark.edges.map(post => (
			<div key={post.node.id} className="container">
				<div className="thumbnail">
					<div style={{ width: 200 }}>
						<Img fluid={post.node.frontmatter.image.childImageSharp.fluid} />
					</div>
				</div>
				<div className="details">
					<Link key={post.node.id} to={post.node.frontmatter.path}>
						<h3>{post.node.frontmatter.title}</h3>
					</Link>
					<div className="date_details">
						<p>
							{' '}
							{post.node.frontmatter.date} <FontAwesomeIcon icon="clock" />{' '}
							{post.node.timeToRead} min read
						</p>
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
      filter: {
        frontmatter: { published: { eq: true }, type: { eq: "blogpost" } }
      }
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
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
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

export default IndexPage
