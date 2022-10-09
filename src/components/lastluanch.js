import React, { useState, useEffect } from 'react';

import { Spin, Image } from 'antd';

import { getLastLaunch } from '../services/api';

import '../assets/styles/lastluanch.css';

export default function LastLuanch(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState();
	const [errorData, setErrorData] = useState();

	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getLastLaunch();
		setLaunchData(data?.results[0]);
		setErrorData(error);
		setLoading(false);
	};

	useEffect(() => {
		setItem.setItem('item-1');
		fetchData();
	}, []);

	return (
		<div className='lastluanch'>
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
				<>
					<h1>{launchData.name}</h1>
					<div className='lastluanch_box'>
						<div className='lastluanch_box_info'>
							
							<h2>Nazwa misji</h2>
							<p>{launchData ? launchData.name : null}</p>
							
							<h2>Data startu</h2>
							<p>{launchData ? launchData.net : null}</p>

							<h2>Rakieta</h2>
							<p>Nazwa: {launchData ? launchData.rocket.configuration.full_name : null}</p>

							<h2>Pad</h2>
							<p>{launchData ? launchData.pad.name : null}</p>
							
							<h2>Pad</h2>
							<p>{launchData ? launchData.pad.name : null}</p>
							
							<h2>Kod kraju</h2>
							<p>{launchData ? launchData.pad.location.country_code : null}</p>
							
							<h2>Typ misji</h2>
							<p>{launchData ? launchData.launch_service_provider.type : null}</p>
							
							<h2>Nazwa firmy?</h2>
							<p>{launchData ? launchData.launch_service_provider.name : null}</p>
							
							<h2>Początek okna startowego</h2>
							<p>{launchData ? launchData.window_start : null}</p>
							
							<h2>Koniec okna startowego</h2>
							<p>{launchData ? launchData.window_end : null }</p>
						</div>
						<div className='lastluanch_box_img'>
							<Image width={200} src={launchData.image} />
						</div>
					</div>
					{console.log(launchData)}
				</>
			)}
		</div>
	);
}
