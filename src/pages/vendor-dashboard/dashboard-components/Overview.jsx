import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PieLoader from '../../../components/loader/PieLoader';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Overview({ dashboard, isLoading }) {
	const data = {
		labels: [
			'Active Order',
			'Active Product',
			'Pending Order',
			'Today Order',
			'Today Sell',
		],
		datasets: [
			{
				label: '# of total',
				data: [
					dashboard?.active_order,
					dashboard?.active_product,
					dashboard?.pending_order,
					dashboard?.today_order,
					dashboard?.today_sell,
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(175,92, 92, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(175,92, 92, 1)',
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
								Active Order
							</li>
							<li className="mb-2">
								<i
									className="mdi mdi-checkbox-blank-circle-outline mr-2"
									style={{ color: 'rgba(54, 162, 235, 1)' }}
								></i>
								Active Product
							</li>
							<li className="mb-2">
								<i
									className="mdi mdi-checkbox-blank-circle-outline mr-2"
									style={{ color: 'rgba(175,92, 92, 1)' }}
								></i>
								Today Sell
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
								Pending Order
							</li>
							<li className="mb-2">
								<i
									className="mdi mdi-checkbox-blank-circle-outline mr-2"
									style={{ color: 'rgba(75, 192, 192, 1)' }}
								></i>
								Today Order
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
