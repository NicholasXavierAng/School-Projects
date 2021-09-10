//////////////////////////////
// Author(s): Terry, Zakarya Butt 
// Date Made: 08/09/2021
//////////////////////////////
import React, { useState } from 'react';
// import { MyContext } from './Provider';

const Searchbar = ({keyword}) => {
    const [words, setSearchWord] = useState();

    const search = async (e) => {
        e.preventDefault();
        const credentials = {words};
        console.log(words);
     

        var res = await fetch('http://localhost:5000/user/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }); 



    }

    

    
    return (
        <div className = "searchbar">
            {/* <MyContext.Consumer> */}
                {/* {(context) => {
                    context.setMessage(true); 
                }} */}
                <form onSubmit={search}>
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.6343 24.6639L21.5954 19.6772C25.4195 14.9151 25.0596 7.90682 20.6955 3.54908C18.401 1.2579 15.3867 0 12.1474 0C8.90808 0 5.84874 1.2579 3.55424 3.54908C1.25973 5.84027 0 8.85025 0 12.1298C0 15.4093 1.25973 18.4193 3.55424 20.7105C5.84874 22.9567 8.86309 24.2596 12.1474 24.2596C14.8918 24.2596 17.5912 23.3161 19.7058 21.609L24.6997 26.5957C24.9696 26.8652 25.2846 27 25.6445 27C26.0044 27 26.3643 26.8652 26.5893 26.5957C27.1292 26.0566 27.1292 25.203 26.6343 24.6639ZM21.5954 12.1298C21.5954 14.6456 20.6056 17.0266 18.806 18.7787C17.0063 20.5308 14.6668 21.5641 12.1474 21.5641C9.62793 21.5641 7.24344 20.5757 5.48882 18.7787C3.7342 16.9817 2.69942 14.6456 2.69942 12.1298C2.69942 9.61398 3.68921 7.23295 5.48882 5.48087C7.28843 3.72879 9.58294 2.69551 12.1474 2.69551C14.6668 2.69551 17.0513 3.68386 18.806 5.48087C20.5606 7.27787 21.5954 9.56905 21.5954 12.1298Z" fill="black" fill-opacity="0.5"/>
                    </svg>
            

                    <input 
                    type= "barStyling"
                    key= "random1"
                    value={keyword}
                    onChange={e => setSearchWord(e.target.value)}
                    placeholder={"Search for contacts"}
                    />
                </form>
            {/* </MyContext.Consumer> */}
        </div>
        
    );
}

export default Searchbar
