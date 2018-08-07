import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const FooterWrapper = styled.ul`
  background: #2f333d;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  justify-content: center;
  text-align: center;

  a {
    color: #ecf0f1;
    text-decoration: none;
  }

  a:hover { 
      color: #BC435D;
  }

  li {
    margin: 0;
  }
`
const socialLinks = [
	{
		name: 'Facebook',
		link: 'https://www.facebook.com/daniel.guldberg.aaes',
		icon: ['fab', 'facebook'],
	},
	{
		name: 'Github',
		link: 'https://github.com/notaduck',
		icon: ['fab', 'github'],
	},
	{
		name: 'Mail',
		link: 'mailto:guldberg72@gmail.com?Subject=Hello%20again',
		icon: 'envelope',
	},
]

const Footer = () => (
	<FooterWrapper>
		{socialLinks.map(link => (
			<li key={link.name} style={{ padding: '14px 16px' }}>
				<a className={link.name} href={link.link}>
					{' '}
					<FontAwesomeIcon icon={link.icon} /> {link.name}
				</a>
			</li>
		))}
	</FooterWrapper>
)

export default Footer
