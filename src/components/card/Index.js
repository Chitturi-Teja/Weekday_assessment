import "./Index.css";
import Img1 from "../../assets/a.jpg";
import Img2 from "../../assets/b.jpg";
export default function Card(props) {
  return (
    <div className="card">
      <div className="posted-ago">&#9203; Posted 3 days ago</div>
      <div className="company-details-logo">
        <img src={props?.logoUrl} className="company-logo" alt='logo'/>
        <div className="company-info">
         {props?.companyName && <span className="company-name">{props?.companyName}</span>}
          {props?.jobRole && <span className="job-role">{props?.jobRole}</span>}
          {props?.location && <span className="job-location">{props?.location}</span>}
        </div>
      </div>
     { (props?.minJdSalary || props.maxJdSalary) &&<div className="estimated-salary">
        Estimated Salary: &#8377;{props.minJdSalary ?? "NA"} -{" "}
        {props.maxJdSalary}LPA &#9989;
      </div>}
      <div className="about-section">
        <span className="about-company">About Company:</span>
        <span className="about-us">About us</span>
        <div className="sidebar-box">
         { props?.jobDetailsFromCompany && <span className="about-details">{props?.jobDetailsFromCompany}</span>}
          <p className="read-more">
            <a href="#" className="view-button">
              View job
            </a>
          </p>
        </div>
      </div>
     {props?.minExp && <div className="min-experience">
        <span className="min-experience-text">Minimum Experience</span>
        <span className="min-experience-number">{props?.minExp}</span>
      </div>}
      <div className="button-container">
        <button className="apply-button">&#9889; Easy Apply</button>
        <button className="referral-button">
          <img src={Img1} className="referral-logos" />
          <img src={Img2} className="referral-logos" />
          Unlock referral asks
        </button>
      </div>
    </div>
  );
}
