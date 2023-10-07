import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { affiliatesMenu } from './affiliatesMenu';
import { handleSubMenubar, handlerMenubar } from '../action/actions';

function AffiliatesSidebar({ setSidebar }) {
	const [menuID, setMenuID] = useState(false);

	return (
		<div className="ec-left-sidebar ec-bg-sidebar">
			<div id="sidebar" className="sidebar ec-sidebar-footer">
				<div className="ec-brand ml-1 position-relative">
					<Link to={'/affiliates-dashboard'}>
						<svg
							width="70"
							height="40"
							viewBox="0 0 100 65"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M65.8065 16.2954L61.7161 21.3353L59.4333 24.1475L55.3429 29.186L51.2526 24.1475L55.3429 19.1103L57.6258 16.2967L52.5778 10.0784L50.295 12.8906L46.2046 17.9291L38.727 27.1415L43.7736 33.3598L47.8639 38.3983L43.7736 43.4369L37.4448 51.2337L34.4696 54.8998L31.613 58.4191L26.4573 64.7694H0L5.15435 58.4191L8.01368 54.8998L24.2161 34.9383L28.3065 39.9768L16.1944 54.8998L13.3364 58.4191H23.4323L26.2889 54.8998L33.3544 46.1952L39.6832 38.3983L34.6366 32.18L30.5463 27.1415L34.6366 22.1029L42.1143 12.8906L46.2046 7.85206L48.4875 5.03852L52.5778 0L56.6682 5.03986L61.7161 11.2569L65.8065 16.2954Z"
								fill="url(#paint0_linear_236_1486)"
							/>
							<path
								d="M75.3165 28.0129L70.8504 22.5124L66.76 17.4739L62.6697 22.5124L60.3868 25.3246L56.2964 30.3645L48.8174 39.5755L44.7284 44.6154L38.3997 52.4108V52.4122L36.3794 54.8998L33.5228 58.4191L28.3684 64.7694H53.658L57.3739 60.1915L58.8123 58.4191L61.4642 55.1544L61.669 54.8998L68.9405 45.942L73.0309 40.9021L75.3138 38.0899L79.4055 33.0514L75.3165 28.0129ZM68.9419 35.8636L64.8515 40.9035L57.3739 50.1158L53.4896 54.8998L53.2836 55.1544L50.633 58.4191H41.7008L42.4886 57.4494L44.5587 54.8985L48.8174 49.6525L52.9078 44.614L60.3868 35.4016L64.4771 30.3618L66.76 27.5496L71.2248 33.0501L68.9419 35.8636Z"
								fill="url(#paint1_linear_236_1486)"
							/>
							<path
								d="M87.2536 58.4191L92.4079 64.7694H55.813L58.4528 61.5195L60.9687 58.4191L62.5404 56.481L63.8253 54.8998H72.006L69.148 58.4191H79.0715L76.2135 54.8998L74.1098 52.3071L70.0194 47.2686L74.1098 42.2287L76.3927 39.4165L80.483 34.378L84.5733 39.4165L97.1434 54.8998L100 58.4191H91.818L88.9614 54.8998L80.483 44.4564L78.2001 47.2673L84.3969 54.8998L87.2536 58.4191Z"
								fill="url(#paint2_linear_236_1486)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_236_1486"
									x1="3.56633"
									y1="68.3357"
									x2="62.2398"
									y2="9.66216"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#0060EB" />
									<stop offset="0.0561" stopColor="#0066EC" />
									<stop offset="0.6975" stopColor="#00A7F6" />
									<stop offset="1" stopColor="#00C0FA" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_236_1486"
									x1="32.4648"
									y1="68.8662"
									x2="75.3091"
									y2="26.0219"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#0060EB" />
									<stop offset="0.0561" stopColor="#0066EC" />
									<stop offset="0.6975" stopColor="#00A7F6" />
									<stop offset="1" stopColor="#00C0FA" />
								</linearGradient>
								<linearGradient
									id="paint2_linear_236_1486"
									x1="63.8418"
									y1="72.7983"
									x2="91.3728"
									y2="45.2672"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#0060EB" />
									<stop offset="0.0561" stopColor="#0066EC" />
									<stop offset="0.6975" stopColor="#00A7F6" />
									<stop offset="1" stopColor="#00C0FA" />
								</linearGradient>
							</defs>
						</svg>
						<small>Start Own Startup</small>
					</Link>
					<button
						style={{
							position: 'absolute',
							zIndex: '99999',
							right: 0,
							top: '20px',
							width: '65px',
							height: '30px',
						}}
						onClick={() => setSidebar((e) => !e)}
						id="sidebar-toggler"
						className="showSidebarMenuButton"
					>
						<svg
							width="30"
							height="23"
							viewBox="0 0 30 23"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M30 1.15C30 1.7825 29.4375 2.3 28.75 2.3H1.25C0.5625 2.3 0 1.7825 0 1.15C0 0.5175 0.5625 0 1.25 0H28.75C29.4375 0 30 0.5175 30 1.15ZM8.75 20.7H1.25C0.5625 20.7 0 21.2175 0 21.85C0 22.4825 0.5625 23 1.25 23H8.75C9.4375 23 10 22.4825 10 21.85C10 21.2175 9.4375 20.7 8.75 20.7ZM18.75 10.35H1.25C0.5625 10.35 0 10.8675 0 11.5C0 12.1325 0.5625 12.65 1.25 12.65H18.75C19.4375 12.65 20 12.1325 20 11.5C20 10.8675 19.4375 10.35 18.75 10.35Z"
								fill="#3A3A3A"
							/>
						</svg>
					</button>
				</div>

				{/* <!-- begin sidebar scrollbar --> */}
				<div className="ec-navigation" data-simplebar>
					{/* <!-- sidebar menu --> */}
					<ul className="nav sidebar-inner" id="sidebar-menu">
						{/* <!-- Dashboard --> */}
						<li className="">
							<NavLink
								to={'/affiliates-dashboard'}
								className="sidenav-item-link"
								style={({ isActive, isPending }) => {
									return {
										fontWeight: isActive ? '' : '',
										color: isActive ? 'white' : '',
										background: isActive ? '#1a77f2' : '',
									};
								}}
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="mr-3"
								>
									<path
										d="M0 2.47934V9.09091H9.09091V0H2.47934C1.82178 0 1.19115 0.261215 0.726182 0.726182C0.261215 1.19115 0 1.82178 0 2.47934Z"
										fill="#fff"
									/>
									<path
										d="M17.5208 0H10.9092V9.09091H20.0001V2.47934C20.0001 1.82178 19.7389 1.19115 19.2739 0.726182C18.8089 0.261215 18.1783 0 17.5208 0V0Z"
										fill="#fff"
									/>
									<path
										d="M0 17.5207C0 18.1783 0.261215 18.8089 0.726182 19.2738C1.19115 19.7388 1.82178 20 2.47934 20H9.09091V10.9091H0V17.5207Z"
										fill="#fff"
									/>
									<path
										d="M10.9092 20H17.5208C18.1783 20 18.8089 19.7388 19.2739 19.2738C19.7389 18.8089 20.0001 18.1783 20.0001 17.5207V10.9091H10.9092V20Z"
										fill="#fff"
									/>
								</svg>
								<span className="nav-text">Dashboard</span>
							</NavLink>
							<hr />
						</li>
						{affiliatesMenu?.map((menu) => (
							<li
								key={menu.id}
								onClick={(e) => handlerMenubar(menu.id, menuID, setMenuID)}
								className={`has-sub ${
									menuID === menu.id && menu.subMenu.length > 0 && 'expand'
								}`}
							>
								<NavLink
									// style={({ isActive, isPending }) => {
									// 	return {
									// 		fontWeight: isActive ? 'bold' : '',
									// 		color: isActive ? '#0059cf' : '',
									// 	};
									// }}
									className={`${({ isActive }) => (isActive ? 'active' : '')}`}
									to={menu.path && menu.path}
									href="#"
								>
									{menu.icon}
									<span className="nav-text">{menu.name}</span>
									{menu.subMenu.length > 0 && <b className="caret"></b>}
								</NavLink>
								<div
									style={{
										display:
											menuID === menu.id && menu.subMenu.length > 0 && 'block',
									}}
									className="collapse"
								>
									<ul
										className="sub-menu"
										id="categorys"
										data-parent="#sidebar-menu"
									>
										{menu.subMenu?.map((subMenu, i) => (
											<li
												onClick={(e) => handleSubMenubar(e)}
												key={i}
												className=""
											>
												<NavLink
													style={({ isActive, isPending }) => {
														return {
															fontWeight: isActive ? 'bold' : '',
															color: isActive ? '#0059cf' : '',
														};
													}}
													to={subMenu.path}
													className={`sidenav-item-link  `}
												>
													<span className="nav-text">{subMenu.name}</span>
												</NavLink>
											</li>
										))}
									</ul>
								</div>
								{menu.hr && <hr />}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default AffiliatesSidebar;
