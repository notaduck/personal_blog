import React from 'react';
import AdSense from 'react-adsense';
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
			<DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />

			<AdSense.Google
				client='ca-pub-2807294246407689'
				slot='2165861051'
				style={{ display: 'block' }}
				layout='in-article'
				format='fluid'
			/>
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
