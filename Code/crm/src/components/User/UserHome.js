///////////////////////////////
// Author(s): Terry, Zakarya Butt, Rebecca Ye
// Date Made: 09/09/2021
///////////////////////////////

import React, { useState ,useEffect} from 'react';
import Topbar from '../MainPageComponents/Topbar';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import 'reactjs-popup/dist/index.css';
import Sort from '@material-ui/icons/Sort';
import Popup from 'reactjs-popup';
import { IconButton } from '@material-ui/core';

function UserHome() {
	const config = require('../Configuration/config.json');
	const link =  config.API_URL; 
	const [customers, setCustomers] = useState();
	// For search
	const [search, setSearch] = useState(false);  
	const [words, setSearchWord] = useState();
	// For progress
	const [newCustomer, setNew] = useState(false);
	const [invite, setInvite] = useState(false);
	const [met, setMet] = useState(false);
	const [negotiation, setNegotiation] = useState(false);
	const [conclude, setConclude] = useState(false);
	// For priority
	const [high, setHigh] = useState(false);
	const [medium, setMedium] = useState(false);
	const [low, setLow] = useState(false);

	// If we detect a change in the search property then this is run.
	useEffect(() => {
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low; 
		if (!search && !filter) {
			getCustomers();
		}
	}, [search]); 

	const getSearchAndFilter = (w) => {
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low;
		const filters = {"new":newCustomer, "invite": invite, "met": met, "negotiation":negotiation, "conclude":conclude, "high":high, "medium":medium, "low":low};  
		const req = {"words":w, "filters": filters, "search": search, "filter": filter}; 
		axios.post(link + 'user/searchFilter', req).then(res => {
			var data = res.data.customers; 
			var cust = data; 
			setCustomers(cust);
		})
	}

	// If we detect a change in the filter then this is run.
	useEffect(()=> { 
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low;  
		if (!filter && !search) {
				getCustomers(); 
		}
		else if (filter && search) {
			getSearchAndFilter(words); 
		}
		else if (search) {
			const req = {"words":words}; 
			axios.post('http://localhost:5000/user/search', req).then(res => {
			var data = res.data.customers; 
			setSearch(true);
			var cust = data; 
			setCustomers(cust);
		  })
		}
		else {
			const filters = {"new":newCustomer, "invite": invite, "met": met, "negotiation":negotiation, "conclude":conclude, "high":high, "medium":medium, "low":low}; 
			const req = {"filters": filters}; 
			axios.post('http://localhost:5000/user/filter', req).then(res => {
			var data = res.data.customers;
			setCustomers(data);
			}) 
		}

	}, [newCustomer, invite, met, negotiation, conclude, high, medium, low]); 

	const getCustomers = () => {
	  // Sends a request to the backend to get all customers
	  axios.get(link + 'user/customers').then(res => {
		  var data = res.data.customers; 
		  setCustomers(data); 
	  }) 
	}
	
	const searchWord = (e) => {
		// Search will be true here.
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low; 
		if (e == "") {
			setSearch(false); 
			// Check if filters are on otherwise get all custoemrs.
		}
		else if (filter) {
			setSearchWord(e);
			getSearchAndFilter(e); 
		}
		else {
			// Its a name
			setSearchWord(e); 
			const req = {"words":e}; 
			axios.post('http://localhost:5000/user/search', req).then(res => {
			var data = res.data.customers; 
			setSearch(true);
			var cust = data; 
			setCustomers(cust);
		  })
		}
	}


	const doSearch = async (e) => {
		// e.preventDefault(); 
		setSearchWord(e);
		var filter = newCustomer || invite || met || negotiation || conclude || high || medium || low;
		const filters = {"new":newCustomer, "invite": invite, "met": met, "negotiation":negotiation, "conclude":conclude, "high":high, "medium":medium, "low":low};  
		const req = {"words":e, "filters": filters, "filter": filter}; 
		axios.post(link + 'user/search', req).then(res => {
			var data = res.data.customers; 
			setSearch(true);
			var cust = data; 
			setCustomers(cust);
		}) 
	}


	return (
	  <div className="App">
		  <Topbar/>
		  <br/>
		  <div className="content">
			<div className = "searchbar">
				<form onSubmit={doSearch}>        
					{/* can handle searches */}
					<Box
					style = {{position: "relative", left: "20%"}}
					>
						<SearchBar
						value=""
						onChange={e => searchWord(e)}
						placeholder={"Search for contacts"}
						style={{maxWidth: "70%", maxHeight:"25%"}}
						/>
					</Box>
				</form>
			</div>
			<div className ='line3'>
				<section class="createContact"></section>
				<div className="titles" style ={{fontWeight: 'bold'}}>
				
					<p className="n">Name</p> 
					<p className="s">Progress</p>  
					<p className="pro">Priority</p>
				
		
					<Popup trigger={<IconButton style = {{position: "absolute",left: "87%", top: "13%"}}><Sort /></IconButton>} position="bottom center">
								<div>
									<div className= "p" style ={{textAlign: "left"}}>
										Progress
									</div>
									<div style ={{paddingLeft: "10px"}}>
									<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
									<FormControlLabel
										label="New"
										control={<Checkbox checked={newCustomer} onChange={() => setNew(!newCustomer)} />}
									/>
									<FormControlLabel
										label="Invited"
										control={<Checkbox checked={invite} onChange={() => setInvite(!invite)} />}
									/>
									<FormControlLabel
										label="Met"
										control={<Checkbox checked={met} onChange={() => setMet(!met)} />}
									/>
									<FormControlLabel
										label="Negotiation"
										control={<Checkbox checked={negotiation} onChange={() => setNegotiation(!negotiation)} />}
									/>
									<FormControlLabel
										label="Conclude"
										control={<Checkbox checked={conclude} onChange={() => setConclude(!conclude)} />}
									/>
									</Box>
								</div>
								<div className= "p" style ={{textAlign: "left"}}>
									Priority
								</div>
								<div style ={{paddingLeft: "10px"}}>
									{/* {childrenPriority} */}
									<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
									<FormControlLabel
										label="High"
										control={<Checkbox checked={high} onChange={() => setHigh(!high)} />}
									/>
									<FormControlLabel
										label="Medium"
										control={<Checkbox checked={medium} onChange={() => setMedium(!medium)} />}
									/>
									<FormControlLabel
										label="Low"
										control={<Checkbox checked={low} onChange={() => setLow(!low)} />}
									/>
									</Box>
								</div>

								</div>
					</Popup>
				</div>
				
		
			</div>
			<hr width="70%" align="center" style = {{position: "relative", left: "5%"}}/>
			<br/>
			<div className = "lowerpart">
					<div className = "sidebar"></div>
					<div className = "clients" >
						<Box
						borderRadius={16}
						width="70%"
						height="100%"
						boxShadow={6}
						style = {{position: "relative", left: "20%"}}
						>
						{customers && customers.map(d => (
							<>
								{/* A loop to handle customers directly from the database  */}
								<button className = "client" onClick={()=> window.location.href='/user/profile/' + d._id}>
								<p className = "name">{d.firstName} {d.familyName}</p>
								<p className = "status">{d.progress}</p>
								<p className = "progress" style ={{fontWeight: 'bold', color: d.priority === 'High' ? "Red" : d.priority === 'Medium' ? "Orange" : d.priority === "Low" ? "Green": "Yellow"}}>{d.priority}</p>
								</button>
								<hr width="95%" align="center"/>
							</>
						))}
							
						{/* total number of contacts */}
						<div className="total">
							<p>{customers && customers.length} contact(s).</p>
						</div>
						<br/>
						</Box>   
					</div>
				</div>
			</div>
	  </div>
	);
  }
  
  export default UserHome;