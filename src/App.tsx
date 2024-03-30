/* eslint-disable no-mixed-spaces-and-tabs */
import { FunctionComponent, useState } from 'react';
import { Navbar } from './components';
import { Routes } from './routes'; 

interface AppProps {}
const App: FunctionComponent<AppProps> = () => {
	const [search, setSearch] = useState('');
	// const [lang, setLang] = useState("");
	

	const handleSearch = (value: string) => {
		setSearch(value);
	};

	// const handleLanguage = (value: string) => {
	// 	setLang(value);
	// };


	return (
		<>
		{ window.location.pathname.split("/")[1] === "login" || window.location.pathname.split("/")[1] === "/forgotpassword" ?  (
 <Routes search={''}/>
		): (
			<>
				  <Navbar onSearch={handleSearch}/>	
				  <Routes search={search}/>
		 </>
		)
	}
	
		</>
	);
};

export default App;
