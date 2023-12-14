// Duomenis pasiimsime iš: https://polar-chartreuse-silverfish.glitch.me/

// 1. Naudojant tik JS, sukurkite lentelę ir į ją įrašykite duomenis (id, name, city, fav_color).
// 2. Naudojant JS metodus, padalinkite vardą į dvi dalis: vardą ir pavardę (lentelėje).
// 3. Pridėkite prie lentelės (tarp id ir name) nuotrauką.
// 4.Sukurkite checkbox virš lentelės su JS. Jį paspaudus, rodys tik tuos žmones, kurie yra VIP.
// 5. Sukurkite virš lentelės ir search laukelį (forma su input type search ir mygtukas). Suvedus duomenis, lentelėje turi prasifiltruoti pagal vardą arba pavardę (fullname contains search string). Capitalizacija turėtų būti nesvarbi.

// pirma uzduotis!!!!!

// const API_URL = 'https://polar-chartreuse-silverfish.glitch.me/';
// const tbody = document.querySelector("tbody");

// const loadData = () => {
//   return fetch(API_URL).then(resp => resp.json());
// };

// const printData = (data) => {
//   document.querySelector("p").style.display = "none";
//   data.map(x => {
//     const row = document.createElement("tr");
//     row.innerHTML =
//       `
//         <td>${x.id}</td>
//         <td>${x.name}</td>
//         <td>${x.city}</td>
//         <td>${x.fav_color}</td>
//       `;
//     tbody.append(row);
//   });

//   console.log(data);
// };

// loadData()
//   .then(printData)
//   .catch(error => console.log(error.message));



// 2uzduotis!!!


//   const API_URL = 'https://polar-chartreuse-silverfish.glitch.me/';
//   const tbody = document.querySelector("tbody");
//   const vipCheckbox = document.getElementById("vipCheckbox");
  
//   const loadData = () => {
//     return fetch(API_URL).then(resp => resp.json());
//   };
  
//   const printData = (data) => {
   
//     tbody.innerHTML = ' '; 
  
//     data.forEach(x => {
//       const row = document.createElement("tr");
  
      
//       const nameParts = x.name.split(' ');
//       const firstName = nameParts[0];
//       const lastName = nameParts.slice(-1).join(' ');
  
//       row.innerHTML =
//         `
//           <td>${x.id}</td>
//            <td><img src="${x.image}" alt="User Image" style="width: 50px; height: 50px;"></td>
//           <td>${firstName}</td>

//           <td>${lastName}</td>
//           <td>${x.city}</td>
//           <td>${x.fav_color}</td>
//         `;
//       tbody.append(row);
//     });
  
//     console.log(data);
//   };
  
//   loadData()
//     .then(printData)
//     .catch(error => console.log(error.message));
  
// KETVIRTA UZDUOTIS!!!

const API_URL = 'https://polar-chartreuse-silverfish.glitch.me/';
const tbody = document.querySelector("tbody");
const vipCheckbox = document.getElementById("vipCheckbox");
const loadingMessage = document.getElementById("loadingMessage");
const searchInput = document.getElementById("searchInput");

const loadData = () => {
  return fetch(API_URL).then(resp => resp.json());
};

const printData = (data, showVipOnly) => {
  loadingMessage.style.display = "none";
  tbody.innerHTML = '';

  data.forEach(x => {
    const fullName = (x.name + ' ' + x.last_name).toLowerCase(); // Pridėjau skliaustus ir "()" funkcijos iškvietimui
    if (!showVipOnly || (showVipOnly && x.vip)) { // Pridėjau skliaustus ir taisau sąlygos pabaigą
      const row = document.createElement("tr");

      const nameParts = x.name.split(' '); // Taisau kintamojo pavadinimą
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');

      row.innerHTML =
        `
          <td>${x.id}</td>
          <td><img src="${x.image}" alt="User Image" style="width: 50px; height: 50px;"></td>
          <td>${firstName}</td>
          <td>${lastName}</td>
          <td>${x.city}</td>
          <td>${x.fav_color}</td>
        `;
      tbody.append(row);
    }
  });

  console.log(data);
};

const handleCheckboxChange = () => {
  loadingMessage.style.display = "block"; 
  loadData()
    .then(data => printData(data, vipCheckbox.checked))
    .catch(error => console.log(error.message));
};

vipCheckbox.addEventListener('change', handleCheckboxChange);

loadData()
  .then(data => printData(data, vipCheckbox.checked))
  .catch(error => console.log(error.message));
