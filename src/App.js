import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import route from './routes/routes';
import './assets/css/ekka.css';
import './assets/css/extra-css.css';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthContext from './auth/AuthContext';

function App() {
	const queryClient = new QueryClient();

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthContext>
					<ToastContainer />
					<RouterProvider router={route}></RouterProvider>
				</AuthContext>
				<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
			</QueryClientProvider>
		</>
	);
}

export default App;
