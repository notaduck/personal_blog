---
path: '/add_-disqus-to-gatsby'
title: 'Add disquss to gatsby'
image: '../../images/gatsby-disqus.png/'
date: '2018-08-24'
published: true
---

# Introduction
-------------------------------------------------
Everybody knows that summer vacation means extra time for personal projects, I decided to use mine to move my former WordPress website to a new platform to learn something new.
I've used HTML, CSS and react before I've to admit that I suck at it, so I decided to get my hands dirty... After getting an overview of the different options out there I quickly decided that [Gatsby](https://www.gatsbyjs.org) was the right fit for my needs.  
However, I quickly ran into some trouble regarding adding a comment system, since Gatsby is a static site generator and therefore doesn't allow us to add a simple comment system since we don't have a dynamic backend. This is where [Disqus](https://disqus.com) enters the big picture and allows us to add a commenting system where the backend is taken care of Disqus, it gives me extra time since I don't have to maintain the comment system and reduces my power bill since I don't have to have the server running myself.  


# Installation and configuration
-------------------------------------------------
First of all, you want to head over to [Disqus](https://disqus.com) and create an account and add a site under the *admin* tab. You will need your shortname later on so make sure to copy or remember that.  


### Installation 

React actually has a Disqus [component](https://github.com/disqus/disqus-react) which is super simple and easy to use, so let's install that right away.

#### npm:
```bash
npm install --save disqus-react
```


#### yarn:
```bash
yarn add disqus-react
```

### Configuration

I have added the following lines to my post template, you want to add you shortname to `disqusShortname` and change the `identifier` and `title`to match your values which you are getting from graphql and passes it as a prop to you template component.  
The `title` speaks for itself and the `identifier` is used by Disqus to identify the specific post, and since markdownRemark generates an uniquie id for each of your markdown files it makes sense to pass that id to the `identifier` 
```jsx{3,4-6,12}
export default function Template({data}) {
    const {markdownRemark: post} = data;
    const disqusShortname = '<insert-disqus-shortname-here>';
    const disqusConfig = {
        identifier: post.id,
        title: post.frontmatter.title,
  };
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}
```

And that's it, you should be able to compile your Gatsby prohect now and see Disqus's comments system at the end of your blog posts. 
  
Don't hesitate to ask any questions if needed.
