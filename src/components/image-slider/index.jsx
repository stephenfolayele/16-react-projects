import { useState, useEffect } from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs';
import './styles.css';

export default function ImageSlider({url='https://picsum.photos/v2/list', page=1, limit=10}){
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)

    async function fetchImages(getUrl){
        try{

            setLoading(true)

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json()
            console.log(data);

            if(data) {
                setImages(data)
                setLoading(false)
            }

        }catch (e){
            setErrorMsg(e.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(url !== "") fetchImages(url)
    }, [url])

    
    if(loading){
        return <div>Loading data ! Please wait</div>
    }

    if (errorMsg !== null){
        return <div>Error occured ! {errorMsg}</div>
    }

    console.log(images);

    function handleprevious(){
        setCurrentSlide(currentSlide === 0? images.length - 1: currentSlide + 1)
    }
    function handlenext(){
        setCurrentSlide(currentSlide === images.length -1 ? 0: currentSlide + 1)
    }

    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handleprevious} className="arrow arrow-left"/>
            {
                images && images.length ?
                images.map ((imageItem, index)=> (
                    <img 
                    key={imageItem.id}
                    alt={imageItem.download_url}
                    src={imageItem.download_url}
                    className= {currentSlide === index? "current-slide": "current-slide hide-current-image" }
                    />

                )):null
            }
            <BsArrowRightCircleFill onClick={handlenext} className="arrow arrow-right"/>
            <span className="circle-indicators">
                {
                    images && images.length ?
                    images.map((_, index) => (
                        <button key={index} className = {
                            currentSlide === index? "circle-indicator": "circle-indicator update-circle-indicator"
                        }
                        onClick={
                            () => setCurrentSlide(index)
                        }
                        ></button>
                    ))
                    :null
                }
            </span>
    </div>
    )
}