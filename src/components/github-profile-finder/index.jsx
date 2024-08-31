import { useEffect, useState } from "react"
import User from "./card"
import './styles.css'



export default function GithubProfileFinder(){
    const [userName, setuserName] = useState('stephenfolayele')
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    async function fetchGithubUseData(){
        setLoading(true)
        const res = await fetch(`https://api.github.com/users/${userName}`)
        const data = await res.json();
        if(data) {
            setUserData(data)
            setLoading(false)
            setuserName('')
        }
        console.log(data)
    }

    function handleSubmit(){
        fetchGithubUseData();
    }

    useEffect(()=>{
        fetchGithubUseData()
    }, [])

    if (loading){
        return <h1>Loading Data ! Please wait.</h1>
    }

    return (
        <div className="github-profile-finder">
            <div className="input-wrapper">
                <input type="text" 
                name="search-by-username"  
                placeholder="Search Github Username..."
                value={userName}
                onChange={(e)=>{setuserName(e.target.value)}}
                id="" />

                <button onClick={handleSubmit}>Search</button>
            </div>
            {
                userData !== null ? <User user={userData}/>:null
            }
        </div>
    )
}