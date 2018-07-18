import React from 'react';
import ReactDOM from 'react-dom'
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
	background: #2F333D;
	margin-bottom: 2.5rem;
	overflow: hidden;
	position: relative;
	height: ${({ isHome }) => (isHome ? '70vh' : '20vh')}
	h1 {
		img {
			height: 80px;
		}
	}
`;

const HeaderContainer = styled.div`
	margin: 0, auto;
	max-width: 960px;
	padding: 1.45rem 1.0875rem;
	position: relative;
	z-index: 2;
	display: flex;
	justify-content: space-between;
`;

const NavBar = styled.nav`
	ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
			overflow: hidden;
			background-color: #ECF0F1;
	}

	li {
			float: left;
	}

	li a {
			display: block;
			color: white;
			text-align: center;
			padding: 10px 16px;
			text-decoration: none;
			color: #2F333D;
	}

	li a:hover:not(.active) {
		border-bottom: 4px solid #2F333D;
	}

	.active {
		background-color: #BC435D;
	}
`;

const navLinks = [
	{	name: 'Home',
		path: '/'
	},{
		name: 'About',
		path: '/about'
	},{
		name: 'Contact',
		path: '/contact'
	},{
		name: 'Projects',
		path: '/projects'
	}
];


class Header extends React.Component {
	// FIXME: There is an issue regarding going from a notHome to a notHome page, it will still make the animation
	componentDidUpdate = (prevProps, prevState ) => {
		console.log('personal_blog' + location.pathname)
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
			} else {
				this.wrapper.animate([
					{	height: "70vh" }, // Animate from
					{ height: "20vh" } // Anite to
				], {
					duration: 450,
					fill: "forwards",
					easing: "cubic-bezier(0.86,0,0.07,1)",
					iterations: 1
				})
			}
		}	
	}

	render() {
		const { siteTitle, background, location, logo} = this.props;
		return (
			<HeaderWrapper
			ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
			isHome={location.pathname === '/'}
			>
				<HeaderContainer>
					<header className='header'>
					<div style={{width:100}}>  
						<h1> 
							<Link exact to='/'> 
								<Img sizes={logo} />
							</Link>
						</h1>
					</div>
						<NavBar>
						<ul>
							{navLinks.map(link => (
								<li key={link.name}>
									<Link exact to={link.path}> {link.name} </Link>
								</li>
							))}
						</ul>
						</NavBar>
					</header>
				</HeaderContainer>
				<Img style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					opacity: 0.8
				}}
				sizes={background} />
			</HeaderWrapper>
		);
	}
}


export default Header;
