import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Repo(){
    const {username, repo} = useParams();

    const [repoFileList, setRepoFileList] = useState([]);

    const fetchList = async (path='/') => {
       let response = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents${path}`, {
            headers: {
              Authorization: `Bearer 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`,
            },
        });

        return response.data;
    }

    const listFiles = async (path='/') => {

        let fileList =  await fetchList(path);

        for(let i=0; i<fileList.length; i++){
            if ('file' === fileList[i].type) {
                setRepoFileList((state)=>[...state, fileList[i].path]);
            } if ('dir' === fileList[i].type) {
                await listFiles(`/${fileList[i].path}`)
            }
        }
    }

    useEffect(()=>{
        listFiles()
    },[]);

    return (
        <div>
            List of Files of {username}/{repo} Repository:-
            <ol>
                {repoFileList.map((val,idx)=>{
                    return (
                        <li key={idx}>{val}</li>
                    );
                })}
            </ol>
        </div>
    );
}

export default Repo;