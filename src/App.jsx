import { useEffect, useState } from 'react' 
import './App.css'
import { getCandidate , getJobs} from './servicios/api';
import List from './componentes/List.jsx';
 
function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = "agustina.flores.mail@gmail.com";
 
  useEffect(() => {
    const fetchData = async () => {
        try {
          const candidatesData = await getCandidate(email);
          const jobsCandidate = await getJobs();

          setCandidate(candidatesData);
          setJobs(jobsCandidate);
        } catch (error) {
          setError(error);
        }finally  {
          setLoading(false);
      }
    }; 
    fetchData(); 
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
     <div className="container">
      <h1 className="title">Available Positions</h1>
      <List jobs={jobs} candidate={candidate} />
    </div>
  );
}

export default App;
