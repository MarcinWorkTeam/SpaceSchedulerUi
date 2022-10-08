import React, { useState, useEffect } from 'react';

import { Spin } from 'antd';

import '../assets/styles/lastluanch.css';

import { getLastLaunch } from '../services/api';


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
		setItem.setItem('item-1')
		fetchData();
	}, []);

	return (
		<div>
			{loading && <Spin/>}
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
					<h2>{launchData.name}</h2>
					
					<pre>
						Data:
						<br />
						{JSON.stringify(launchData, null, 2)}
					</pre>
				</>
			)}
		</div>
	);
}
