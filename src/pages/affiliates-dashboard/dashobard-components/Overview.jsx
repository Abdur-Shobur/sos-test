import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PieLoader from '../../../components/loader/PieLoader';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Overview({ dashboard, isLoading }) {
	const data = {
		labels: [
			'Active Orders',
			'Active Product',
			'Requested Product',
			'Today Earning',
		],

		datasets: [
			{
				label: '# of total',
				data: [
					dashboard?.active_orders,
					dashboard?.active_product,
					dashboard?.requested_product,
					dashboard?.today_earning,
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
				],
				borderWidth: 1,
			},
		],
	};
	return (
		<div className="card card-default">
			<div className="card-header justify-content-center">
				<h2>Orders Overview</h2>
			</div>
			<div className="card-body">
				{isLoading ? <PieLoader /> : <Doughnut data={data} />}
			</div>

			<div className="card-footer d-flex flex-wrap bg-white p-0">
				<div className="col-6">
					<div className="p-20">
						<ul className="d-flex flex-column justify-content-between">
							<li className="mb-2">
								<i
									className="mdi mdi-checkbox-blank-circle-outline mr-2"
									style={{ color: 'rgba(255, 99, 132, 1)' }}
								></i>
								Active Orders
							</li>
							<li className="mb-2">
								<i
									className="mdi mdi-checkbox-blank-circle-outline mr-2"
									style={{ color: 'rgba(54, 162, 235, 1)' }}
								></i>
								Active Product
							</li>
						</ul>
					</div>
				</div>
				<div className="col-6 border-left">
					<div className="p-20">
						<ul className="d-flex flex-column justify-content-between">
							<li className="mb-2">
								<i
									className="mdi mdi-checkbox-blank-circle-outline mr-2"
									style={{ color: 'rgba(255, 206, 86, 1)' }}
								></i>
								Requested Product
							</li>
							<li className="mb-2">
								<i
									className="mdi mdi-checkbox-blank-circle-outline mr-2"
									style={{ color: 'rgba(75, 192, 192, 1)' }}
								></i>
								Today Earning
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
