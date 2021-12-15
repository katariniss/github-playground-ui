import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { debounce } from "lodash";

function Repos() {
  const {
    orgName: orgNameFromUrl = ''
  } = useParams();

  const [orgName, setOrgName] = useState(orgNameFromUrl);
  const [lastRequestFailed, setLastRequestFailed] = useState(false);
  const [repos, setRepos] = useState([]);

  const memoizedLoadRepos = useCallback(
    debounce(orgNameToLoad => {
      setLastRequestFailed(false);
      axios.get(`https://api.github.com/orgs/${orgNameToLoad}/repos`)
        .then(({ data }) => {
          setRepos(data);
          console.log(data);
        })
        .catch((error) => {
          setLastRequestFailed(true)
        })
    }, 1000),
    []
  );

  useEffect(() => {
    memoizedLoadRepos(orgName)
  }, [])

  return (
    <>
      <input
        type="text"
        value={orgName}
        onChange={(e) => handleOrgNameChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleOrgNameChange('');
          }
        }}
      />
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

  function handleOrgNameChange(newOrgName) {
    setOrgName(newOrgName);
    memoizedLoadRepos(newOrgName);
  }
}

export default Repos;
