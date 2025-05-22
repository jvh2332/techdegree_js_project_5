/******************************************
Treehouse FSJS Techdegree:
project 5 - Public API Requests
******************************************/

let employees = [];
const container = document.querySelector('.gallery');

loadEmployees();

//If a card is clicked, show modal window with extra info about the employee
container.addEventListener('click', (e) => {
    const employeeCard = e.target.closest('.card');
    if (!employeeCard) return;

    const employeeName = employeeCard.dataset.name;
    const employee = employees.find(
        (employee) => `${employee.name.first} ${employee.name.last}` === employeeName
    );
    displayModalWindow(employee);

});

//Send API request to get employees information
async function loadEmployees() {
    try {
      const response = await fetch('https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob');
      if (!response.ok) {
        throw new Error(`Something went wrong`);
      }
  
      const data = await response.json();
      employees = data.results;

      displayEmployees(employees);
    } catch (error) {
      console.error(error.message);
    }
  }

//Loop through the response array and append the card html of each employee to the gallery div
function displayEmployees(employees) {
    employees.forEach((employee) => {

        const employeeHtml= `
        <div class="card" data-name="${employee.name.first} ${employee.name.last}">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`;
    
        document.querySelector('.gallery').insertAdjacentHTML("beforeend", employeeHtml);

    });
}

//Displays the modal window of the details of an employee
function displayModalWindow(employee){
    const birthDate = new Date (employee.dob.date);
    const prettyBirthDate = `${birthDate.getMonth()+1}-${birthDate.getDate()}-${birthDate.getFullYear()}`;
    const modalHtml= `
        <div class="modal-container">
             <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}, ${employee.location.state}</p>
                    <hr>
                    <p class="modal-text">${employee.phone}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state}</p>
                    <p class="modal-text">Birthday: ${prettyBirthDate} </p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    //If the close button is clicked, the modal window should disappear
    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', (e) => {
        document.querySelector('.modal-container').remove();
    });
}
