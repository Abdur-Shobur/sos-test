import AddNewCategory from './AddNewCategory';
import MainCategoryTable from '../../../../components/mainCategoryTable/MainCategoryTable';
import { Helmet } from 'react-helmet';
import Aos from 'aos';
import { useEffect } from 'react';
import { useState } from 'react';
import { GetCategory } from '../../../../api/admin/categoryAPI';

function MainCategory() {
	const [page, setPage] = useState(null);
	const { category_data, isLoading, refetch } = GetCategory(page);

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div data-aos="fade" className="ec-content-wrapper">
			<Helmet>
				<title>Category-SOS</title>
			</Helmet>
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
					<h1>Main Category</h1>
					<p className="breadcrumbs">
						<span>
							<a href="index.html">Home</a>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Main Category
					</p>
				</div>
				<div className="row">
					<AddNewCategory refetch={refetch} isLoading={isLoading} />
					<MainCategoryTable
						page={page}
						refetch={refetch}
						setPage={setPage}
						isLoading={isLoading}
						category_data={category_data}
					/>
				</div>
			</div>
		</div>
	);
}

export default MainCategory;
