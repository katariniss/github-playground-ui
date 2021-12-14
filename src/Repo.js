import axios from 'axios';
import { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function Repo() {
  const {
    orgName,
    repoName
  } = useParams();
  const [repo, setRepo] = useState({});

  useEffect(() => {
    axios.get(`https://api.github.com/repos/${orgName}/${repoName}`)
      .then(({ data }) => {
        setRepo(data);
        console.log(data);
      })
  }, [orgName, repoName]);
  return (
    <div>
      Hello repo!!! {repo.default_branch} {repo.description}
      <Link to={`/repos/${orgName}`}>Back to repos</Link>
    </div>
  );
}

export default Repo;
