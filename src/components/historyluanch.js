import React, { useState, useEffect } from 'react';

import { getHistoryLaunch } from '../services/api';

import { Table, Spin } from 'antd';

const columns = [
	{
		title: 'Nazwa misji',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Data startu',
		dataIndex: 'launchdate',
		key: 'launchdate',
	},
	{
		title: 'Miejsce startu',
		dataIndex: 'location',
		key: 'location',
	},
	{
		title: 'Akcja',
		dataIndex: '',
		key: 'x',
		render: () => <a>Delete</a>,
	},
];

export default function HistoryLunch(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState([]);
	const [errorData, setErrorData] = useState();

	useEffect(() => {
		setItem.setItem('item-3')
		fetchData();
	}, []);

  
	const fetchData = async () => {
    setLoading(true);
		const [data, error] = await getHistoryLaunch(10);
		setLaunchData(data?.results);
		processingData(data?.results);
		setErrorData(error);
		setLoading(false);
	};
  
	const processingData = (data) => {
    let tempData = [];
		let tempKey = 0;

		data.forEach((element) => {
			let x = {
				key: `${tempKey}`,
				name: `${element.name}`,
				launchdate: `${element.net.slice(0, 10)}`,
				location: `${element.pad.location.name}`,
				description: `${element.mission.description}`,
			};

			tempKey++;
			tempData.push(x);
      setLaunchData(tempData)
		});
	};

	return (
		<div>
			{loading && <Spin />}
			{!!errorData && (
				<code>
					Error:
					<br />
					{errorData}
				</code>
			)}
			{!loading && !errorData && !launchData && <div>No data</div>}
			{!errorData && !errorData && !!launchData && (
				<>
					<Table
						columns={columns}
						expandable={{
							expandedRowRender: (record) => (
								<p
									style={{
										margin: 0,
									}}>
									{record.description}
								</p>
							),
							rowExpandable: (record) => record.name !== 'Not Expandable',
						}}
						dataSource={launchData}
            />
				</>
			)}
		</div>

	);
}
