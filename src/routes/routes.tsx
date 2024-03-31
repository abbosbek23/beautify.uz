/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Route, Routes as Switch } from 'react-router-dom';
import { Home } from '../pages';
import Auth from './../pages/auth/auth';
import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';
import Register1step from '../pages/auth/components/register';
import Register2steps from '../pages/auth/components/register2step';
import Verificationreset from '../pages/auth/components/verificationreset';
import Profile from '../pages/profile/profie';
import MasterService from '../pages/profile/service/masterservice';
import Mylikes from '../pages/home/mylikes';
import Mysaved from '../pages/home/mysaved';
import MyBooking from '../pages/home/mybooking/mybooking';
interface RoutesProps {
	search: string;
	// lang: string;
}

const Routes = ({ search}:RoutesProps) => {

	return (
		<Switch>
			<Route path="/" element={<Home.Home  search={search}/>} />
			<Route path='/login' element={<Login />}/>
			<Route path='/auth' element={<Auth/>}/>
			<Route path='/register' element={<Register1step/>}/>
			<Route path='/register2step' element={<Register2steps phone={''} gender={''} house={''}/>}/>
			<Route path='/verificationemail' element={<Verificationreset/>}/>
			<Route path='/forgotpassword' element={<ForgotPassword/>} />
			<Route path='/profile' element={<Profile/>}/>
			<Route path='/mylikes' element={<Mylikes/>}/>
			<Route path='/mysaved' element={<Mysaved/>}/>
			<Route path='/mybooking' element={<MyBooking/>}/>
			<Route path='/profile/service' element={<MasterService/>}/>
		</Switch>
	);
};

export default Routes;