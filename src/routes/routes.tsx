/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Route, Routes as Switch } from 'react-router-dom';
import { Home } from '../pages';
import Auth from './../pages/auth/auth';
import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';
// interface RoutesProps {
// 	// search: string;
// 	// lang: string;
// }

const Routes = ( ) => {

	return (
		<Switch>
			<Route path="/" element={<Home.Home  />} />
			<Route path='/login' element={<Login username={''} errors={undefined}/>}/>
			<Route path='/register' element={<Auth/>}/>
			<Route path='/forgotpassword' element={<ForgotPassword/>} />
		</Switch>
	);
};

export default Routes;