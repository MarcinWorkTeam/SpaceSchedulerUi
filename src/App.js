import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './assets/styles/app.css';
import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, DatePicker, Space } from 'antd';

import LastLuanch from './components/lastluanch';
import NextLuanch from './components/nextluanch';
import HistoryLuanch from './components/historyluanch';
import StartPage from './components/startpage.js';

const { Header, Content, Footer, Sider } = Layout;

const { RangePicker } = DatePicker;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
	(icon, index) => {
		const key = String(index + 1);
		return {
			key: `sub${key}`,
			icon: React.createElement(icon),
			label: `subnav ${key}`,
			children: new Array(4).fill(null).map((_, j) => {
				const subKey = index * 4 + j + 1;
				return {
					key: subKey,
					label: `option${subKey}`,
				};
			}),
		};
	}
);

function App() {
	const [selectItem, setSelectItem] = useState('');

	function setItem(item) {
		setSelectItem(item);
		if (item === 'item-1') {
			document.title = 'SpaceScheduler | Ostatni lot';
		} else if (item === 'item-2') {
			document.title = 'SpaceScheduler | Następny lot';
		} else if (item === 'item-3') {
			document.title = 'SpaceScheduler | Historia lotów';
		} else if (item === '') {
			document.title = 'SpaceScheduler | Home';
		}
	}

	return (
		<Layout>
			<Header className='header'>
				<div className='logo'>
					<Link to='/'>SpaceScheduler</Link>
				</div>
				<Menu
					theme='dark'
					mode='horizontal'
					selectedKeys={selectItem}
					items={[
						{
							label: <Link to='/last'>Ostatni lot</Link>,
							key: 'item-1',
						},
						{
							label: <Link to='/next'>Następny lot</Link>,
							key: 'item-2',
						},
						{
							label: <Link to='/history'>Historia lotów</Link>,
							key: 'item-3',
						},
					]}
				/>
				;
			</Header>
			<Content
				style={{
					padding: '0 50px',
				}}>
				<Breadcrumb
					style={{
						margin: '16px 0',
					}}></Breadcrumb>
				<Layout
					className='site-layout-background'
					style={{
						padding: '24px 0',
					}}>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 280,
						}}>
						<Routes>
							<Route exact path='/' element={<StartPage setItem={setItem} />} />
							<Route path='/last' element={<LastLuanch setItem={setItem} />} />
							<Route path='/next' element={<NextLuanch setItem={setItem} />} />
							<Route
								path='/history'
								element={<HistoryLuanch setItem={setItem} />}
							/>
						</Routes>
					</Content>
				</Layout>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}>
				SpaceScheduler ©2022 Created by Radosław Brzeziński
			</Footer>
		</Layout>
	);
}

export default App;
