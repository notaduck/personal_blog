import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Link from 'gatsby-link'
import { DiscussionEmbed } from "disqus-react";

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Template({data}) {
  const {markdownRemark: post} = data;
  // const post = data.markdownRemark;
	const disqusShortname = "guldberglab";
  const disqusConfig = {
		identifier: post.id,
		title: post.frontmatter.title,
  };
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
			<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
			<Button>
			<Link to='/' 
				style={{
					backgroundColor: '#2F333D',
					color: '#ECF0F1',
					padding: '14px 35px',
					textAlign: 'center',
				}}>
		Home </Link>
			</Button>

    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path} }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`