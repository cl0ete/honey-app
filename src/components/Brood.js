import Button from "./Button";

const Brood = ({ site, onClick }) => {
  return (
    <>
      {site.broods.map((brood) => (
        <Button text={brood[0].number} onClick={onClick} />
      ))}
    </>
  );
};

export default Brood;
