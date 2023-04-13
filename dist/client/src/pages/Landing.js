import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Introducing this job tracking app - the solution to your
            organization needs. With this app, you can easily manage and track
            the applicant process for a job application. Say goodbye to the
            hassle of keeping track of your job details on paper or
            spreadsheets. This app streamlines the entire process and provides
            you with a user-friendly interface. Let this job tracking app help
            you stay organized, save time, and improve productivity.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
