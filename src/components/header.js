import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';

import { NavBar, NavItem } from "../components/navigation";

const HeaderWrapper = styled.div`
	background: #2F333D;
	margin-bottom: 2.5rem;
	overflow: hidden;
	position: relative;

	// added media query for responsive hight when window size in small
	@media (max-width: 636px) {	 
		height: 70vh !important;
			
	}
	height: ${({ isHome }) => (isHome ? '70vh' : '20vh')}
	h1 {
		img {
			height: 80px;
		}
	}

`;

const HeaderContainer = styled.div`
	margin: 0, auto;
	padding: 1.45rem 1.0875rem;
	position: relative;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	div {
		width: ${({ isHome }) => (isHome ? '300px' : '100px')}
	}

	// added media query for responsive div of image when window size in small	
	@media (max-width: 636px) {
		div {
			width: 100px !important;
		}	
	}
`;


const navLinks = [
	{
		name: 'Home',
		path: '/'
	},
	
	{
		name: 'Computer science ',
		path: '/computer_science'
	},
	{
		name: 'About',
		path: '/about'
	},
	{
		name: 'Contact',
		path: '/contact'
	},
	{
		name: 'Projects',
		path: '/projects'
	}
];


class Header extends React.Component {
	componentDidUpdate = (prevProps) => {
		let breakpoint = window.innerWidth; //get browser window width 
		if(breakpoint > 636){ // if browser window is greater than 636 width than make animation otherwise not
			if(location.pathname !== prevProps.location.pathname){
				if (this.props.location.pathname === '/') {
					this.wrapper.animate([
						{	height: "20vh" }, // Animate from
						{ height: "70vh" } // Anite to
					], {
						duration: 450,
						fill: "forwards",
						easing: "cubic-bezier(0.86,0,0.07,1)",
						iterations: 1
					})
					
					// Animate logo when go to home
					this.wrapper_logo.animate([
						{	width: "100px" }, // Animate from
						{ width: "300px" } // Anite to
					], {
						duration: 450,
						fill: "forwards",
						easing: "cubic-bezier(0.86,0,0.07,1)",
						iterations: 1
					})
				} else if(prevProps.location.pathname==='/') {
					this.wrapper.animate([
						{ height: "70vh" }, // Animate from
						{ height: "20vh" } // Anite to
					], {
						duration: 450,
						fill: "forwards",
						easing: "cubic-bezier(0.86,0,0.07,1)",
						iterations: 1
					})
					
					// Animate logo width when go from home to any route					
					this.wrapper_logo.animate([
						{ height: "300px" }, // Animate from
						{ height: "100px" } // Anite to
					], {
						duration: 450,
						fill: "forwards",
						easing: "cubic-bezier(0.86,0,0.07,1)",
						iterations: 1
					})
				} else {
					return
				}
			}	
		}
	}

	render() {
		const { background, location, logo} = this.props;

		return (
			<HeaderWrapper
				ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
				isHome={location.pathname === '/'}
			>
				<NavBar >
					<ul>
						{navLinks.map(link => (
							<NavItem key={link.name}>
								<Link exact to={link.path}> {link.name} </Link>
							</NavItem>
						))}
					</ul>
				</NavBar>

				{/* Add ref for logo image to animate */}
				<HeaderContainer ref={wrapper_logo => (this.wrapper_logo = ReactDOM.findDOMNode(wrapper_logo))}
					isHome={location.pathname === '/'}>
					<header className='header'>
						<div style={{width:300}}>  
							<h1> 
								<Link exact to='/'> 
									<Img sizes={logo} />
								</Link>
							</h1>
						</div>
					</header>
				</HeaderContainer>
				<Img style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					opacity: 0.5
				}}
				sizes={background} />
			</HeaderWrapper>
		);
	}
}

Header.propTypes = {
	// location: PropTypes.string,
	location: PropTypes.shape({
		hash: PropTypes.String,
		pathname: PropTypes.String,
		search: PropTypes.String 
	}),

	background: PropTypes.shape({
		aspectRatio: PropTypes.Number,
		base64: PropTypes.String,
		sizes: PropTypes.String,
		src: PropTypes.String,
		srcSet: PropTypes.String
	}),

	logo: PropTypes.shape({
		aspectRatio: PropTypes.Number,
		base64: PropTypes.String,
		sizes: PropTypes.String,
		src: PropTypes.String,
		srcSet: PropTypes.String
	})
};

export default Header;
