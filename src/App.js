import {useEffect} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import LastLuanch from './lastluanch';
import NextLuanch from './nextluanch';
import HistoryLuanch from './historyluanch';
import SearchLuanch from './searchluanch';
import Nav from './nav';

function App() {

	useEffect(() => {

		if(localStorage.getItem('userTheam')) {
			changeThemeColor(localStorage.getItem('userTheam'))
		} else {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				changeThemeColor('dark')
			} else {
				changeThemeColor('light')
			}
		}
		
	}, []);

	function changeThemeColor(theme) {

		const htmlTag = document.querySelector('html')

		if (theme === 'dark') {
			htmlTag.setAttribute("data-theme", "dark")
			localStorage.setItem('userTheam', 'dark');
		} else if (theme === 'light') {
			htmlTag.setAttribute("data-theme", "light")
			localStorage.setItem('userTheam', 'light');
		} else if (theme === "click") {
			htmlTag.setAttribute("data-theme", htmlTag.getAttribute("data-theme") === 'light' ? 'dark' : 'light' )
			localStorage.setItem('userTheam', htmlTag.getAttribute("data-theme"));
		}

		if(localStorage.getItem('userTheam') === 'dark') {
			document.querySelector('.ball').classList.add('ball-move')
		}else {
			document.querySelector('.ball').classList.remove('ball-move')
		}
	}

	return (
		<div className='app'>
			<div className='logo'>SpaceScheduler</div>
			<div className='photo'>
				<img
					src='https://download.logo.wine/logo/SpaceX/SpaceX-Logo.wine.png'
					alt='Logo SpaceX'
				/>
			</div>
			<div>
				{' '}
				<Nav />{' '}
			</div>
			<div className='content'>
				<Routes>
					<Route path='/last-luanch' element={<LastLuanch />} />
					<Route path='/next-luanch' element={<NextLuanch />} />
					<Route path='/history-luanch' element={<HistoryLuanch />} />
					<Route path='/search-luanch' element={<SearchLuanch />} />
				</Routes>
			</div>
			<div className='switch'>
				<p>Wybierz motyw kolorów</p>
				<div
					className='box'
					onClick={() => changeThemeColor('click')}>
					<div className='ball'></div>
				</div>
			</div>
			<div className='footer'>SpaceScheduler by Radosław Brzeziński | 2022</div>
		</div>
	);
}

export default App;

