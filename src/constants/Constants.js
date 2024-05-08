//function to remove the selected option from the autocomplete popper
export function filteredOptions(arr,options){
    const firstListLabels = arr.map(item => item.label);
    const filteredSecondList = options.filter(item => !firstListLabels.includes(item.label));
    return filteredSecondList
}

export const filterData = (data, roles, noOfEmployees, experience, location, techStack, minBasePay, companyName) => {
    let filteredData = data;
  
    if (roles.length > 0 && data.some(item => item?.jobRole)) {
      const roleLabels = roles.map(role => role?.label?.toLowerCase()).filter(label => label);
      filteredData = filteredData?.filter(item => item?.jobRole && roleLabels?.some(label =>
        item?.jobRole?.toLowerCase() === label
      ));
    }
  
    if (noOfEmployees.length > 0 && data.some(item => item?.noOfEmployees)) {
      const empCount = noOfEmployees.map(emp => emp?.label?.toLowerCase()).filter(label => label);
      filteredData = filteredData?.filter(item => item?.noOfEmployees && empCount?.some(label =>
        item?.noOfEmployees?.toLowerCase() === label
      ));
    }
  
    if (location.length > 0 && data.some(item => item?.location)) {
      const locationData = location.map(loc => loc?.label?.toLowerCase()).filter(label => label);
      filteredData = filteredData?.filter(item => item?.location && locationData?.some(label =>
        item?.location?.toLowerCase() === label
      ));
    }
  
    if (techStack.length > 0 && data.some(item => item?.techStack)) {
      const techStackData = techStack.map(stack => stack?.label?.toLowerCase()).filter(label => label);
      filteredData = filteredData?.filter(item => item?.techStack && techStackData?.some(label =>
        item?.techStack?.toLowerCase() === label
      ));
    }
  
    if (minBasePay !== "" && minBasePay !== null && data.some(item => item?.minJdSalary !== null)) {
      filteredData = filteredData?.filter(item => item?.minJdSalary !== null && item?.minJdSalary >= parseInt(minBasePay?.label));
    }
  
    if (experience !== "" && experience !== null && data.some(item => item?.minExp !== null)) {
      filteredData = filteredData?.filter(item => item?.minExp !== null && item?.minExp <= parseInt(experience?.label));
    }
  
    if (companyName !== "" && data.some(item => item?.companyName)) {
      const regex = new RegExp(companyName, 'i');
      filteredData = filteredData?.filter(item => item?.companyName && regex.test(item?.companyName?.toLowerCase()));
    }
  
    return filteredData;
  };
  