import React, { useState, useEffect } from 'react';

import './lastluanch.css';

import { getLastLaunch } from './services/api';

export default function LastLuanch() {
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
		fetchData();
	}, []);

	return (
		<div>
			{loading && <pre>loading</pre>}
			{!!errorData && (
				<code>
					Error:
					<br />
					{errorData}
				</code>
			)}
			{!loading && !errorData && !launchData && <div>No data</div>}
			{!errorData && !!launchData && (
				<pre>
					Data:
					<br />
					{JSON.stringify(launchData, null, 2)}
				</pre>
			)}
		</div>
	);
}
