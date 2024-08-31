import { useEffect } from "react";
import { useState } from "react";
import './styles.css'


export default function ScrollIndicator({ url='https://dummyjson.com/products?limit=100' }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [scrollPercentage, setScrollPercentage] = useState(0)


    async function fetchData(getUrl) {

        try {

            setLoading(true);
            const response = await fetch(getUrl)
            const data = await response.json();

            if (data && data.products && data.products.length > 0) {
                setData(data.products)
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
            setErrorMessage(e.message)
        }

    }

    useEffect(() => {
        fetchData(url);
    }, [url])


    function handleScrollPercentage() {
        console.log(document.body.scrollTop, document.documentElement.scrollTop, document.documentElement.scrollHeight, document.documentElement.clientHeight);
        
        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight


        setScrollPercentage((howMuchScrolled/height) * 100)

    }

    useEffect(
        () => {
            window.addEventListener('scroll', handleScrollPercentage)

            return () => {
                window.removeEventListener('scroll', () => { })
            }
        }, []
    )

    console.log(scrollPercentage)

    if (errorMessage) {
        return <div>Error ! {errorMessage}</div>
    }

    if(loading){
        return <div>Loading data! Please wait </div>
    }


    return (
        <div>
            <div className="top-container">
                <h1>Custom Scroll Indicator</h1>
                    <div className="scroll-progress-tracking-container">
                        <div className="current-progressbar" style={{width: `${scrollPercentage}%`}}>
                        </div>
                    </div>
                </div>
            <div className="data-container">
                {
                    data && data.length > 0 ?
                        data.map(dataItem => <p>{dataItem.title}</p>)
                        : null
                }
            </div>
        </div>
    )
}

