export async function fetchData(offset) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const body = JSON.stringify({
      "limit": 10,
      "offset": offset
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };
  
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fetch error:", error);
      return null; 
    }
  }
