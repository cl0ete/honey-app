import Button from "./Button";

const SiteHeader = ({ onAdd, showAdd, site }) => {
  return (
    <div>
      {site.name} Update broods
      <Button text={showAdd ? "close" : "Add Brood"} onClick={onAdd} />
    </div>
  );
};

export default SiteHeader;
