import Item from "./Item";

const List = ({ jobs, candidate }) => {
  return (
    <div>
      {jobs.map((job) => (
        <Item key={job.id} job={job} candidate={candidate} />
      ))}
    </div>
  );
};

export default List;