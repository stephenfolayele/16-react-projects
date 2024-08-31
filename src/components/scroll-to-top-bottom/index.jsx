import { useRef } from 'react';
import useFetchData from './useFetchcode'

export default function ScrollTopAndBottom(){

    const {data, error, pending} = useFetchData(
        'https://dummyjson.com/products?limit=100', {}
    );   

    const bottomRef = useRef(null)


    function scrollToBotttom(){
       bottomRef.current.scrollIntoView({behavior: 'smooth'})
    }

    function scrollToTop(){
        window.scrollTo(
            {
                top: 0,
                left: 0,
                behavior: 'smooth'
            }
        )
    }

    
    if (error){
        return <h1>Error occured ! Please try again</h1>
    }

    if (pending) {
        return <h1>Loading ! Please wait</h1>
    }

    return (<div>
        <h1>Scroll To Top And Buttom Feature</h1>
        <h3>This is the top</h3>
        <button onClick={scrollToBotttom}>Scroll To Buttom</button>
        <ul style={{listStyle: 'none'}}>
            {
                data && data.products && data.products.length?
                data.products.map((item)=> (<li>{item.title}</li>) ) : null
            }
        </ul>
        <button onClick={scrollToTop}>Scroll To Top</button>
        <div ref={bottomRef}></div>
        <h3>This is the top of the page</h3>
    </div>)
}