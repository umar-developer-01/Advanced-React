import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Home =()=>{
    const navigate = useNavigate();

    const navigateToPatterns =()=>{
        //navigate to react pattenrs page 
        navigate('/patterns');
    }
    return (
        <>
           Home Page 
           <Button onClick={navigateToPatterns}>Patterns</Button>
        </>
    )
}

export default Home


//https://github.com/remix-run/react-router