import SubCategoryTable from '../../../../components/subCategoryTable/SubCategoryTable';
import AddNewSubCategory from './AddNewSubCategory';
import Aos from 'aos';
import { useState } from 'react';
import Search from '../../../../components/formComponent/Search';
import { useDebounce } from '../../../../components/action/useDebounce';
import { GetSubCategory } from '../../../../api/admin/categoryAPI';
import { useEffect } from 'react';

function SubCategory() {
	const [page, setPage] = useState(null);
	const [search, setSearch] = useState(' ');

	const { searchHandler } = useDebounce(setSearch, setPage);

	const { isLoading, refetch, subcategory } = GetSubCategory(page, search);

	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div data-aos="fade" className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2 breadcrumb-contacts">
					<h1>Sub Category</h1>
					<div className="d-flex" style={{ gap: '5px' }}>
						<Search searchHandler={searchHandler} />
					</div>
					<p className="breadcrumbs">
						<span>
							<a href="index.html">Home</a>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Sub Category
					</p>
				</div>
				<div className="row">
					<AddNewSubCategory refetch={refetch} isLoading={isLoading} />
					<SubCategoryTable
						page={page}
						setPage={setPage}
						refetch={refetch}
						isLoading={isLoading}
						subcategory={subcategory}
					/>
				</div>
			</div>
		</div>
	);
}

export default SubCategory;
