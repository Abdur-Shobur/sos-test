import React, { useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import ChartLoader from '../../../../components/loader/ChartLoader';
// import faker from 'faker';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,

	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: false,
			text: 'Chart.js Line Chart',
		},
	},
};

export function SellsGraph({ chartData, chartIsLoading, is = 'revenue' }) {
 	const [chart, setChart] = useState({
		label: [],
		order: [],
		revenue: [],
	});
 	useEffect(() => {
		setChart({
			label: chartData?.daily.label,
			order: chartData?.daily.order,
			revenue:
				is === 'revenue'
					? chartData?.daily?.revenue?.map((e) => parseInt(e))
					: chartData?.daily?.comission?.map((e) => parseInt(e)),
		});
	}, [chartData, is]);
	// const labels = [
	// 	'January',
	// 	'February',
	// 	'March',
	// 	'April',
	// 	'May',
	// 	'June',
	// 	'July',
	// ];
	const data = {
		labels: chart.label,
		options: {},
		datasets: [
			{
				label: 'Order',
				data: chart?.order?.map((e) => parseInt(e)),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: is,
				// data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
				borderColor: 'rgb(53, 162, 235)',
				// data: [34, 153, 55, 534, 234, 223, 436],
				data: chart?.revenue?.map((e) => parseInt(e)),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<div id="user-acquisition" className="card card-default">
			<div className="card-header">
				<h2>Sales Report</h2>
			</div>
			<div className="card-body">
				<ul
					className="nav nav-tabs nav-style-border justify-content-between justify-content-lg-start border-bottom"
					role="tablist"
				>
					<li className="nav-item">
						<a
							onClick={() =>
								setChart({
									label: chartData?.daily.label,
									order: chartData?.daily.order,
									revenue:
										is === 'revenue'
											? chartData?.daily?.revenue?.map((e) => parseInt(e))
											: chartData?.daily?.comission?.map((e) => parseInt(e)),
								})
							}
							className="nav-link active"
							data-bs-toggle="tab"
							href="#todays"
							role="tab"
							aria-selected="true"
						>
							Today's
						</a>
					</li>
					<li className="nav-item">
						<a
							onClick={() =>
								setChart({
									label: chartData?.weekly.label,
									order: chartData?.weekly.order,
									revenue:
										is === 'revenue'
											? chartData?.weekly?.revenue?.map((e) => parseInt(e))
											: chartData?.weekly?.comission?.map((e) => parseInt(e)),
								})
							}
							className="nav-link"
							data-bs-toggle="tab"
							href="#Weekly"
							role="tab"
							aria-selected="false"
						>
							Weekly
						</a>
					</li>
					<li className="nav-item">
						<a
							onClick={() =>
								setChart({
									label: chartData?.monthly.label,
									order: chartData?.monthly.order,
									revenue:
										is === 'revenue'
											? chartData?.monthly?.revenue?.map((e) => parseInt(e))
											: chartData?.monthly?.comission?.map((e) => parseInt(e)),
								})
							}
							className="nav-link"
							data-bs-toggle="tab"
							href="#Monthly"
							role="tab"
							aria-selected="false"
						>
							Monthly
						</a>
					</li>
				</ul>
				{/* <Chart /> */}
				<div className="tab-content pt-4" id="salesReport">
					<div
						className="tab-pane fade show active"
						id="source-medium"
						role="tabpanel"
					>
						{chartIsLoading ? (
							<div className="d-flex justify-content-center align-items-center h-100 w-100">
								<ChartLoader />
							</div>
						) : (
							<Line options={options} data={data} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
