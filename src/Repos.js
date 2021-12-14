import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";


function Repos() {
  const {
    orgName: orgNameFromUrl = ''
  } = useParams();

  const [orgName, setOrgName] = useState(orgNameFromUrl);
  const [lastRequestFailed, setLastRequestFailed] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    setLastRequestFailed(false);
    axios.get(`https://api.github.com/orgs/${orgName}/repos`)
      .then(({ data }) => {
        setRepos(data);
        console.log(data);
      })
      .catch((error) => {
        setLastRequestFailed(true)
      })
  }, [orgName]);


  return (
    <>
        <input type="text" defaultValue={orgNameFromUrl} onChange={(e) => { setOrgName(e.target.value) }} />
        {
          lastRequestFailed && (
            <div>Incoreect name</div>
          )
        }
        {
          !lastRequestFailed && (
            <ul>
              {
                repos.map(({ id, full_name }) => (
                  <li key={id}><Link to={`/repos/${full_name}`}>{full_name}</Link></li>
                ))
              }
            </ul>
          )
        }
       
     </>
  );
}

export default Repos;
