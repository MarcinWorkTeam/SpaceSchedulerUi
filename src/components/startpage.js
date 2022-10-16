import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { getNextLaunch } from '../services/api';

import { Spin, Button } from 'antd';

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

	const time = () => {
		const date = new Date(launchData.net);
		return date.toLocaleString();
	};

	return (
		<div style={{
			margin: '20px 0',
			marginBottom:'20px',
			textAlign: 'center',
			borderRadius: '4px',
		}}>
			{loading && <Spin size='large' />}

			{!!errorData && (
				<code>
					Error:
					<br />
					{errorData}
				</code>
			)}

			{!loading && !errorData && !launchData && <div>No data</div>}

			{!errorData && !!launchData && (
				<div className='startpage'>
					<div className='startpage_shadow'><div className='startpage_info'>
						<h2>Nastęny lot: {launchData.name}</h2>
						<p>{time()}</p>
						<Button size='large' type='primary'>
							<Link to='/next'>Zobacz szczegóły</Link>
						</Button>
					</div></div>
				</div>
			)}
		</div>
	);
}
