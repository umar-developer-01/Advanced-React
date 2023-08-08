
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import PatternListing from "./patternListing";
import ContextModule from "./contextModule";

const ReactPatterns =()=>{
    const [pattern, setPattern] = useState('');
  

    const handlePatternShow =(show)=>{
       setPattern(show)
    }
    return (
        <>

            {!pattern && <PatternListing handlePatternShow={handlePatternShow} />}
            {
                pattern ==="contextModulePattern" && <ContextModule/>
            }
        </>
    )
}



export default ReactPatterns