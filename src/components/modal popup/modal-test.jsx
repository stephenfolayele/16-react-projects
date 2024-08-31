import { useState } from "react"
import Modal from "./modal"
import './modal.css'


export default function ModalTest(){

    const [showModalPopup, setShowModalPopup] = useState(false)

    function handleTogglleModalPopup(){
        setShowModalPopup(!showModalPopup)
    }

    function onClose(){
        setShowModalPopup(false)
    }


    return (

        <div>

            <button onClick={handleTogglleModalPopup}>Modal Popup</button>
            {
                showModalPopup && <Modal onClose={onClose} 
                id={'custom-id'}
                header={<div>Customized Header</div>}
                body={<div>Customized body</div>}
                footer={<div>Customized Footer</div>}/>
            }

        </div>
    )
}

