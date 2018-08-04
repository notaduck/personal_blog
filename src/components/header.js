import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';

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

const NavBar = styled.nav`
		{

			position:absolute;
			right:0.4875rem;
			transition:.4s;
			bottom: 10px;
			z-index:10;
		}
	ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			background-color: #ECF0F1;
	}

	li {
			float: left;
			margin-bottom: 0;
	}

	li a {
			display: block;
			color: white;
			text-align: center;
			padding: 10px 16px;
			text-decoration: none;
			color: #2F333D;
			transition: .5s;		
			border-bottom: 4px solid #ecf0f1;
	}

	li a:hover:not(.active) {
		border-bottom: 4px solid #2F333D;
	}

	.active {
		border-bottom: 4px solid #BC435D;
		background-color: #BC435D;
	}

	// added media query for responsive navbar make li width 100% when window size in small	
	@media (max-width: 636px) {
		width:97%;
		li{
			width:100%;
		}
	  }
`;

const navLinks = [
	{
		name: 'Home',
		path: '/'
	},
	
	{
		name: 'Tech theory ',
		path: '/algo_data'
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
							<li key={link.name}>
								<Link exact to={link.path}> {link.name} </Link>
							</li>
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
									<Img fluid={logo} />
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
				fluid={background} />
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
		fluid: PropTypes.String,
		src: PropTypes.String,
		srcSet: PropTypes.String
	}),

	logo: PropTypes.shape({
		aspectRatio: PropTypes.Number,
		base64: PropTypes.String,
		fluid: PropTypes.String,
		src: PropTypes.String,
		srcSet: PropTypes.String
	})
};

export default Header;
