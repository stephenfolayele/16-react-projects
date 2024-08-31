import { useEffect, useState } from "react"
import Suggestions from "./suggestions"

export default function SearchAutocomplete(){

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [searchParam, setSearchParam] = useState('')
    const [showDropDown, setShowDropDown] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([])


    function handleChange(e){
        const query = e.target.value.toLowerCase()
        setSearchParam(query);
        if (query.length > 1){
            const filteredData = 
                users && users.length
                    ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
                    :[];
            setFilteredUsers(filteredData)
            setShowDropDown(true)

        } else {
            setShowDropDown(false)
        }

    }

    function handleClick(e){
      setShowDropDown(false)
      setSearchParam(e.target.innerText)
      setFilteredUsers([])
    }


    
    async function fetchListOfUsers(){

        try {
            setLoading(true)
            const response = await fetch ('https://dummyjson.com/users') 
            const data = await response.json()

            if(data && data.users && data.users.length) {
                setUsers(data.users.map(dataItem=> dataItem.firstName))
                setLoading(false)
                setErrorMessage(null)
            }


        } catch(error){
            setLoading(false)
            console.log(error);
            setErrorMessage(error);
        }

    }


    useEffect(()=>{
        fetchListOfUsers()
    }, [])

    console.log(users, filteredUsers);


    return (<div className="search-autocomplete-container">
      {
        loading ? <h1>Loading Data ! Please wait</h1> : (
        <input 
        value={searchParam} 
        onChange={handleChange} 
        type="text" 
        name='search-users' 
        placeholder="Search Users here..."/>)
      }
      
      {
        showDropDown && <Suggestions handleClick={handleClick} data={filteredUsers}/>
      }
        
    </div>)
}