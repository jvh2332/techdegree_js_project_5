/******************************************
Treehouse FSJS Techdegree:
project 5 - Public API Requests
******************************************/

async function getUsers() {
    try {
      const response = await fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location');
      if (!response.ok) {
        throw new Error(`Somthing went wrong`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  getUsers()