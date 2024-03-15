/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Route, Routes as Switch } from 'react-router-dom';
import { Home } from '../pages';
import Auth from './../pages/auth/auth';
import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';
import Register1step from '../pages/auth/components/register';
import Register2steps from '../pages/auth/components/register2step';
// interface RoutesProps {
// 	// search: string;
// 	// lang: string;
// }

const Routes = ( ) => {

	return (
		<Switch>
			<Route path="/" element={<Home.Home  />} />
			<Route path='/login' element={<Login />}/>
			<Route path='/auth' element={<Auth/>}/>
			<Route path='/register' element={<Register1step/>}/>
			<Route path='/register2step' element={<Register2steps phone={''} gender={''} house={''}/>}/>
			<Route path='/forgotpassword' element={<ForgotPassword/>} />
		</Switch>
	);
};

export default Routes;