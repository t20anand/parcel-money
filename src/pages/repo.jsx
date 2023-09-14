import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Repo(){
    const {username, repo} = useParams();
    const [repoFileList, setRepoFileList] = useState([]);

    const fetchList = async (defaultBranch, path='/') => {
       let response = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents${path}?ref=${defaultBranch}`, {
            headers: {
              Authorization: `Bearer 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`,
            },
        });

        return response.data;
    }

    const listFiles = async (defaultBranch, path='/') => {

        let fileList =  await fetchList(defaultBranch, path);

        for(let i=0; i<fileList.length; i++){
            if ('file' === fileList[i].type) {
                setRepoFileList((state)=>[...state, fileList[i].path]);
            } if ('dir' === fileList[i].type) {
                await listFiles(defaultBranch, `/${fileList[i].path}`)
            }
        }
    }

   
    useEffect(()=>{
        // getting default branch for the repo passed and passing to listfiles function
        axios.get(`https://api.github.com/repos/${username}/${repo}`,{
            headers: {
              Authorization: `Bearer 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`,
            },
        }).then((response)=>{
            listFiles(response.data.default_branch);
        })
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