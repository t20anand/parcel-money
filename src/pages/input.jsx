import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Input(){
    const navigate = useNavigate();
    const [repo, setRepo] = useState({
        username:'',
        repo:''
    });

    const handleOnChange = (e) => {
        setRepo((state)=> {
            return {...state, [e.target.name]:e.target.value}
        });
    }

    const handleClick = (e) => {
        navigate(`/repo/${repo.username}/${repo.repo}`);
    }

    return(
        <div>
            <br></br>
            <label>Enter username: </label><input type="text" name="username" onChange={handleOnChange}/>
            <label>Enter repo: </label><input type="text" name="repo" onChange={handleOnChange}/>
            <button onClick={handleClick}>Submit</button>
        </div>
    );
}

export default Input;