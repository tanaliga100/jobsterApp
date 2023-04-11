import logo from "../assets/images/logo.svg";

const Logo = () => {
  return (
    <img
      src={logo}
      alt="jobster logo"
      className="logo"
      style={{ color: "#2E7D32" }}
    />
  );
};
export default Logo;
