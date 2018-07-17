import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const FooterWrapper = styled.ul`
	background: #2F333D;
	margin: 0;
	padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
	justify-content: flex-start
	padding-right: 10px;
	// justify-content: space-between;
	text-align: center;
	a {
		color: #ECF0F1;
	}
`;

const FooterContent = styled.li`
    display: block;
		justify-content: center;
    color: white;
    text-align: center;
    // padding: 14px 16px;
    text-decoration: none;
`;


const socialLinks = [
	{
		name: 'Facebook',
		link: 'https://www.facebook.com/daniel.guldberg.aaes',
		icon: 'envelope'
	},
	{
		name: 'Github',
		link: 'https://github.com/notaduck',
		icon: 'envelope'
	}
];

const Footer = ({ siteTitle }) => (
	<FooterWrapper>
		{socialLinks.map(link => (
			<li key={link.name} style={{padding: '14px 16px'}}>
				<a className={link.name} href={link.link}> <FontAwesomeIcon icon={link.icon} /> {link.name} </a>
			</li>
		))}
	</FooterWrapper>
);

export default Footer;
