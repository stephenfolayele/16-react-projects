import { useEffect } from "react";
import { useState } from "react";


export default function RandomColorGen() {
    const [typeOfColor, setTypeOfColor] = useState("hex")
    const [color, setColor] = useState("#000000")

    function RandomColorUtility(length){
        return Math.floor(Math.random() * length)
    }

    function handleGenerateRandomColor(){
        const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

        let hexcolor = "#"

        for(let i=0; i<6; i++){
            hexcolor += hex[RandomColorUtility(hex.length)]
        }

        setColor(hexcolor)
    }

    function handleGenerateRandomRGBcolor(){
        const r = RandomColorUtility(256);
        const g = RandomColorUtility(256);
        const b = RandomColorUtility(256);

        setColor(`rgb(${r},${g},${b})`)
    }

    useEffect(()=> {
        if (typeOfColor === "rgb") handleGenerateRandomRGBcolor()
        else handleGenerateRandomColor()
    }, [typeOfColor])
    return (
        <div style={
            {
                width: "100vw",
                height: "100vh",
                background: color,
            }
        }>
            <button onClick={()=> setTypeOfColor("hex")}>Create HEX color</button>
            <button onClick={()=> setTypeOfColor("rgb")}>Create RGB color</button>
            <button onClick={typeOfColor === 'hex' 
            ? handleGenerateRandomColor 
            : handleGenerateRandomRGBcolor}>Generate Random Color</button>

                <div style={
                {
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "60px",
                    flexDirection:'column',
                    marginTop: "40px",
                    gap: '5px'
                }
            }>
                <h3>{typeOfColor === 'rgb' ? "RBG Color" : "HEX Color"}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    )
}