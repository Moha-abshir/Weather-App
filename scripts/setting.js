//Opening and closing a module
const addBtn = document.querySelector('.add-btn');
const removeModule = document.querySelector('.refuse');
const xremove = document.querySelector('.x');
const popUp = document.querySelector('.popup')

addBtn.addEventListener('click', ()=>{
     popUp.style.display = 'flex';
     document.querySelector('.overlay').style.display = 'block';
});

removeModule.addEventListener('click', ()=>{
     popUp.style.display = 'none';
     document.querySelector('.overlay').style.display = 'none';
});

xremove.addEventListener('click', ()=>{
     popUp.style.display = 'none';
     document.querySelector('.overlay').style.display = 'none';
})
const addBtnLocation = document.querySelector('.accept');
const searchInput = document.querySelector("#searchLocation");
addBtnLocation.addEventListener('click', getlocation)
searchInput.addEventListener('keydown', (event)=>{
     if(event.key == 'Enter'){getlocation()}
})

function getlocation(){
     const location = searchInput.value.trim();
     const apikey =  "c63a59def19f4c18839111749253009";

     if(location == ""){
          alert('Please Input a city name');
          return;
     }

     async function searchLocation() {
          try{
               const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${location}&days=1&alerts=yes`);
               const data = await res.json();
               console.log(data)
               
               //If there is no error, add the created child div in the parent div on the page
               if(!data.error){
                    const parentDiv = document.querySelector('#parentDiv')
                    const childDiv = document.createElement('div');
                    childDiv.innerHTML = `<div class="added-location">
                                             <p class="city-name">${data.location.name}, ${data.location.country}</p>
                                          </div>
                                          <div class="delete">
                                            <button class="deletebutton">
                                               <img src="images/delete.png" alt="delete">
                                            </button>
                                        </div>`;
                    childDiv.classList.add('added');
                    console.log(parentDiv)
                    console.log(childDiv)
                    parentDiv.appendChild(childDiv);
                    
                    //Saving the location that the user entered in the memory of the computer
                    let savedLocation = JSON.parse(localStorage.getItem('location')) || []
                    savedLocation.push({locationName: data.location.name, countryName: data.location.country})
                    localStorage.setItem('location', JSON.stringify(savedLocation));

                    // Add delete event listener
                    childDiv.querySelector('.deletebutton').addEventListener('click', () => {
                         childDiv.remove();
                         // Remove from localStorage
                         let updatedLocations = JSON.parse(localStorage.getItem('location')) || [];
                         updatedLocations = updatedLocations.filter(loc => !(loc.locationName === data.location.name && loc.countryName === data.location.country));
                         localStorage.setItem('location', JSON.stringify(updatedLocations));
                    });
               }
               else{
                    alert(data.error.message);
               }
          }
          catch (error) {
               console.error("Error Fetching:", error);
                alert("Something went wrong.");
          }
     }
     searchLocation();

}
//When the user entered the location it appears on the page and the entered location is saved on the memory.
//But when the user reloads the page, the added element disappers from the page but stays on the localstorage.
//We access the details from the storage this way:
document.addEventListener('DOMContentLoaded', ()=>{
     const savedLocation = JSON.parse(localStorage.getItem('location')) || [];
     const parentDiv = document.querySelector('#parentDiv')

     savedLocation.forEach(location => {
          const childDiv = document.createElement('div');
          childDiv.innerHTML = `<div class="added-location">
                                    <p class="city-name">${location.locationName}, ${location.countryName}</p>
                                </div>
                                <div class="delete">
                                    <button class="deletebutton">
                                       <img src="images/delete.png" alt="delete">
                                    </button>
                                </div>`;
          childDiv.classList.add('added');
          console.log(parentDiv)
          console.log(childDiv)
          parentDiv.appendChild(childDiv);

          // Add delete event listener
          childDiv.querySelector('.deletebutton').addEventListener('click', () => {
               childDiv.remove();
               // Remove from localStorage
               let updatedLocations = JSON.parse(localStorage.getItem('location')) || [];
               updatedLocations = updatedLocations.filter(loc => !(loc.locationName === location.locationName && loc.countryName === location.countryName));
               localStorage.setItem('location', JSON.stringify(updatedLocations));
          });
          console.log(JSON.parse(localStorage.getItem('location')))
     });
})