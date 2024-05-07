import React, { useEffect, useState } from "react";
import "./App.css";
import AutoComplete from "./components/autocomplete/Index";
import { fetchData } from "./api/Api";
import { options } from "./constants/OptionsData";
import Card from "./components/card/Index";

function App() {
  const [roles, setRoles] = useState([]);
  const [noOfEmployees, setNoOfEmployees] = useState([]);
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [minBasePay, setMinBasePay] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataWithOffset = async () => {
    setIsLoading(true);
    try {
      const result = await fetchData(1);
      setData((prevData) => [...result?.jdList]);
    } catch (error) {
      console.error(error);
    } finally {
     setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchDataWithOffset()
  },[])


  return (
    <div className="main">
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
      <div className="cards-section"  >
        {data?.map((value, index) => (
            <Card {...value} />
         
        ))}
        {isLoading && (
      <div className="loading-overlay">
        <p>Loading...</p>
      </div>
    )}
      </div>
      </div>
  );
}

export default App;

