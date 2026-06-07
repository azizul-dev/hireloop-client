export const serverMutation = async (path, data) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
  
  console.log("baseUrl:", baseUrl);


  const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }); 
    return res.json();
};