import { useState } from "react";
import { applyJobs } from "../servicios/api";

const Item = ({ job, candidate }) => {

    const [repoUrl, setRepoUrl] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
       setLoading(true);
       setError(null);
       setSuccess(false);

       console.log("success" , success);
       console.log("error" , error);
        try {
            const data = {
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            applicationId: candidate.applicationId,
            repoUrl: repoUrl,
            };
            console.log("data" , data);

            const result = await applyJobs(data);
            console.log("resultado" , result);

            if (result.ok) { 
            setSuccess(true); 
            console.log("resultado exitoso");
            }
        } catch (err) {
          setError(err.message); 
        }finally {
          setLoading(false);
        }
    } 
   return (
    <div className="job-card">
        <h3 className="job-title">{job.title}</h3>

        <div className="form-row">
            <input
            type="text"
            placeholder="GitHub repository URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="input"
            />

            <button
            onClick={handleSubmit}
            disabled={loading || !repoUrl}
            className="button"
            >
            {loading ? "Submitting..." : "Submit"}
            </button>
        </div>

        {success && (
            <p className="success">
            Application submitted successfully
            </p>
        )}

        {error && <p className="error">{error}</p>}
    </div>
   );
};

export default Item;