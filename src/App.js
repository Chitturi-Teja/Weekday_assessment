import React, { useEffect, useState } from "react";
import "./App.css";
import AutoComplete from "./components/autocomplete/Index";
import { fetchData } from "./api/Api";
import { options } from "./constants/OptionsData";

function App() {
  const [roles, setRoles] = useState([]);
  const [noOfEmployees, setNoOfEmployees] = useState([]);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [minBasePay, setMinBasePay] = useState("");
  const [companyName, setCompanyName] = useState("");

  const fetchDataWithOffset = async () => {
    try {
      const result = await fetchData(1);
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchDataWithOffset()
  },[])


  return (
      <div className="autocomplete-container">
        <AutoComplete
          width="150px"
          selectedItems={roles}
          setItems={setRoles}
          placeholder="Roles"
          multiple
          options={options.roles}
          groupBy
        />
        <AutoComplete
          width="200px"
          multiple
          selectedItems={noOfEmployees}
          setItems={setNoOfEmployees}
          placeholder="Number of Employees"
          options={options.employeeCount}
        />
        <AutoComplete
          width="130px"
          selectedItems={experience}
          setItems={setExperience}
          placeholder="Experience"
          options={options.experience}
        />
        <AutoComplete
          width="110px"
          selectedItems={location}
          setItems={setLocation}
          placeholder="Remote"
          multiple
          options={options.location}
        />
        <AutoComplete
          width="130px"
          selectedItems={techStack}
          setItems={setTechStack}
          placeholder="Tech Stack"
          multiple
          options={options.techStack}
        />
        <AutoComplete
          width="250px"
          selectedItems={minBasePay}
          setItems={setMinBasePay}
          placeholder="Minimum Base Pay Salary"
          options={options.minBaseSalary}
        />
        <div className="input-container">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Search Company Name"
            className="companyname-input"
          />
        </div>
      </div>
  );
}

export default App;

