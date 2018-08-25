import styled from 'styled-components';

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
			background-color: ${props => props.theme.white};
	}

	// added media query for responsive navbar make li width 100% when window size in small	
	@media (max-width: 636px) {
		width:97%;
	}
`;

const NavItem = styled.li`
	
	float: left;
	margin-bottom: 0;

	a {
			display: block;
			color: white;
			text-align: center;
			padding: 10px 16px;
			text-decoration: none;
			color: ${props => props.theme.black};
			transition: .5s;		
			border-bottom: 4px solid #ecf0f1;
	}

	a:hover:not(.active) {
		border-bottom: 4px solid ${props => props.theme.black};
	}

	.active {
		border-bottom: 4px solid ${props => props.theme.red};
		background-color: ${props => props.theme.red};
	}

	// added media query for responsive navbar make li width 100% when window size in small	
	@media (max-width: 636px) {
			width:100%;
	}
`

export { NavBar, NavItem }
