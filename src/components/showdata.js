import { Image } from 'antd';

import '../assets/styles/showdata.css';

export default function ShowData(props) {

	const time = (props) => {
		const date = new Date(props);
		return date.toLocaleString();
	};

	return (

				<div className='showdata_box'> 
					<div className='showdata_box_info'>
				<h1 style={{ fontSize: '35px' }}>{props.launchData.mission.name}</h1>
						<h2>Data startu</h2>
						<p>{props.launchData ? time(props.launchData.net) : null}</p>

						<h2>Rakieta</h2>
						<p>
							{props.launchData
								? props.launchData.rocket.configuration.full_name
								: null}
						</p>

						<h2>Pad</h2>
						<p>{props.launchData ? props.launchData.pad.name : null}</p>

						<h2>Kod kraju</h2>
						<p>
							{props.launchData
								? props.launchData.pad.location.country_code
								: null}
						</p>

						<h2>Typ misji</h2>
						<p>
							{props.launchData
								? props.launchData.launch_service_provider.type
								: null}
						</p>

						<h2>Nazwa firmy?</h2>
						<p>
							{props.launchData
								? props.launchData.launch_service_provider.name
								: null}
						</p>

						<h2>Początek okna startowego</h2>
						<p>{props.launchData ? time(props.launchData.window_start) : null}</p>

						<h2>Koniec okna startowego</h2>
						<p>{props.launchData ? time(props.launchData.window_end) : null}</p>
					</div>
					<div className='showdata_box_img'>
						<Image width={500} src={props.launchData.image} />
						<Image width={500} src={props.launchData.pad.map_image} />
						
					</div>
				</div>

	);
}
