import React, { useEffect, useState,useRef } from "react";
import "./App.css";
import AutoComplete from "./components/autocomplete/Index";
import { fetchData } from "./api/Api";
import { options } from "./constants/OptionsData";
import Card from "./components/card/Index";
import { filterData } from "./constants/Constants";

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
  const [offset, setOffset] = useState(0);
  const [filteredData,setFilteredData]=useState([]);
  const containerRef = useRef(null);
  const prevOffset = useRef(-1);

  useEffect(() => {
    fetchDataWithOffset();
  }, [offset]);

  const fetchDataWithOffset = async () => {
    if (offset !== prevOffset.current) {
    prevOffset.current = offset;
      setIsLoading(true);
      try {
        const result = await fetchData(offset);
        setData((prevData) => [...prevData, ...result?.jdList]);
        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(()=>{
    const processedData=filterData(data,roles,noOfEmployees,experience,location,techStack,minBasePay,companyName)
    setFilteredData(processedData)
    if(filteredData?.length<8 && data?.length!==0){
      setOffset((prevOffset) => prevOffset + 1);
      fetchDataWithOffset()
    }
  },[data,roles,noOfEmployees,experience,location,techStack,minBasePay,companyName, offset])

  const handleScroll = () => {
    const current = containerRef.current;
    if (current) {
      const { scrollTop, clientHeight, scrollHeight } = current;
      const computedHeight = Math.round(scrollTop) + clientHeight;
      if (scrollHeight >= computedHeight - 1 && scrollHeight <= computedHeight + 1) {
        setOffset((prevOffset) => prevOffset + 1);
      }
    }
  };

  return(
    <div className="main"  ref={containerRef} onScroll={handleScroll}>
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
        {filteredData?.map((value, index) => (
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

