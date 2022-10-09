import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { getNextLaunch } from '../services/api';

import '../assets/styles/startpage.css';

export default function StartPage(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState();
	const [errorData, setErrorData] = useState();

	useEffect(() => {
		setItem.setItem('');
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getNextLaunch();
		setLaunchData(data?.results[0]);
		setErrorData(error);
		setLoading(false);
	};


	let time

    

	return (
		<div>
			{!errorData && !!launchData && (
				<div className='startpage'>
					<div className='startpage_info'>
						<h2>Nastęny lot za:</h2>
						<p>123</p>
						<Link to='/next'>Zobacz szczegóły</Link>
					</div>
					<div className='startpage_img'></div>
				</div>
			)}
		</div>
	);
}
