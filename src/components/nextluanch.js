import { useState, useEffect } from 'react';

import { getNextLaunch } from '../services/api';

import { Descriptions, Typography, Image, Spin } from 'antd';


const { Title } = Typography;

export default function NextLuanch(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState();
	const [errorData, setErrorData] = useState();

	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getNextLaunch();
		setLaunchData(data?.results[0]);
		setErrorData(error);
		setLoading(false);
	};

	useEffect(() => {
		setItem.setItem('item-2')
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
				<div>
					<Title>ok</Title>
					<Image
						width={200}
						src={launchData.image}
					/>
					<Descriptions title='Szczegóły misji'>
						<Descriptions.Item label='Data startu'>
							{launchData.net.slice(0, 10)}
						</Descriptions.Item>
						<Descriptions.Item label='Rakieta'>
							{launchData.rocket.configuration.name}
						</Descriptions.Item>
						<Descriptions.Item label='Miejsce startu'>
							{launchData.pad.location.name}
						</Descriptions.Item>
					</Descriptions>
				</div>
			)}
		</div>
	);
}
