import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';

function BackNavigation() {
	const navigate = useNavigate();

	return (
		<button
			style={{
				padding: '8px 20px',
				borderRadius: '6px',
				marginBottom: '15px',
				border: ' 1px solid #222',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '3px',
			}}
			onClick={() => navigate(-1)}
		>
			<AiOutlineLeft /> Go back
		</button>
	);
}

export default BackNavigation;

// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { AiOutlineLeft } from 'react-icons/ai';

// function BackNavigation() {
//   const history = useHistory();

//   const handleGoBack = () => {
//     history.goBack();
//   };

//   return (
//     <button
//       style={{
//         padding: '8px 20px',
//         borderRadius: '6px',
//         marginBottom: '15px',
//         border: ' 1px solid #222',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: '3px',
//       }}
//       onClick={handleGoBack}
//     >
//       <AiOutlineLeft /> Go back
//     </button>
//   );
// }

// export default BackNavigation;
