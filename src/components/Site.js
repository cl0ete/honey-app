import { Link } from "react-router-dom";

const Site = ({ site }) => {
  return (
    <div>
      <Link to={`update/site/${site._id}`}>{site.name}</Link>
    </div>
  );
};

export default Site;
