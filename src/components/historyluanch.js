import React, { useState, useEffect } from 'react';

import { getHistoryLaunch } from '../services/api';

import { Table, Spin, Drawer, DatePicker, Space, Layout } from 'antd';

const { Sider } = Layout;

export default function HistoryLunch(setItem) {
	const [loading, setLoading] = useState(true);
	const [launchData, setLaunchData] = useState([]);
	const [launchData1, setLaunchData1] = useState([]);
	const [launchData2, setLaunchData2] = useState();
	const [errorData, setErrorData] = useState();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setItem.setItem('item-3');
		fetchData();
	}, []);

	const { RangePicker } = DatePicker;

	const showDrawer = (e) => {
		setLaunchData2(launchData1[e.key]);
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const fetchData = async () => {
		setLoading(true);
		const [data, error] = await getHistoryLaunch(11);
		setLaunchData(data?.results);
		setLaunchData1(data?.results);
		processingData(data?.results);
		setErrorData(error);
		setLoading(false);
	};

	const columns = [
		{
			title: 'Akcja',
			dataIndex: '',
			key: 'x',
			render: (e) => (
				<a
					onClick={() => {
						showDrawer(e);
					}}>
					Szczegóły
				</a>
			),
		},
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
	];

	const processingData = (data) => {
		let tempData = [];
		let tempKey = 0;

		data.forEach((element) => {
			let x = {
				key: `${tempKey}`,
				name: `${element.mission.name}`,
				launchdate: `${element.net.slice(0, 10)}`,
				location: `${element.pad.location.name}`,
				description: `${element.mission.description}`,
			};

			tempKey++;
			tempData.push(x);
			setLaunchData(tempData);
		});
	};

	return (
		<div
			style={{
				margin: '20px 0',
				marginBottom: '20px',
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
			{!loading && !errorData && !!launchData && (
				<>
					<Sider className='site-layout-background' width={200}>
						<p>Wyszukaj po zakresie dat</p>
						<Space direction='vertical' size={12}>
							<RangePicker />
						</Space>
					</Sider>

					<Table columns={columns} dataSource={launchData} />
				</>
			)}

			<Drawer
				title='Szczególy misji'
				placement='right'
				onClose={onClose}
				open={open}>
				<h2>Nazwa misji</h2>
				<p>{launchData2 ? launchData2.mission.name : null}</p>
				<h2>Data startu</h2>
				<p>{launchData2 ? launchData2.net : null}</p>
				<h2>Rakieta</h2>
				<p>{launchData2 ? launchData2.rocket.configuration.full_name : null}</p>
				<h2>Pad</h2>
				<p>{launchData2 ? launchData2.pad.name : null}</p>
				<h2>Status</h2>
				<p>{launchData2 ? launchData2.status.name : null}</p>
			</Drawer>
		</div>
	);
}
