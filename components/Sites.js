import Site from "./Site";
const Sites = ({ sites }) => {
  return (
    <>
      {sites.map((site) => (
        <Site site={site} />
      ))}
    </>
  );
};

export default Sites;
