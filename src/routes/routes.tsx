import {  Route, Routes as Switch } from 'react-router-dom';
import { Home } from '../pages';
import Auth from './../pages/auth/auth';
import Login from '../pages/auth/login';
// interface RoutesProps {
// 	// search: string;
// 	// lang: string;
// }

const Routes = ( ) => {

	return (
		<Switch>
			<Route path="/" element={<Home.Home  />} />
			<Route path='/login' element={<Login/>}/>
			<Route path='/register' element={<Auth/>}/>
		</Switch>
	);
};

export default Routes;