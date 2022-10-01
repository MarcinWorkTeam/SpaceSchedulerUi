import React from 'react';
import { Link } from 'react-router-dom';



import './nav.css';

export default function Nav() {
	return (
		<div>
			<nav>
				<li><Link to='/last-luanch'>Ostatni startów</Link></li>
				<li><Link to='/next-luanch'>Następny startów</Link></li>
				<li><Link to='/history-luanch'>Historia startów</Link></li>
				<li><Link to='/search-luanch'>Wyszukiwarka lotów</Link></li>
			</nav>


		</div>
	);
}
	