// Function to parse CSV file
let datapoint;
let csvData;

function parseCSV(csv) {
    const data = Papa.parse(csv, { header: true }).data;
    return data;
  }
  
  // Fetch CSV file
  fetch('pray_i_didnt_fuck_up.csv')
    .then(response => response.text())
    .then(csv => {
        csvData = parseCSV(csv);
        displayAllEntries(csvData);
        datapoint = csvData[100]
        console.log(datapoint)
        //processData(csvData);
    })
    .catch(error => console.error('Error:', error));
  //console.log(datapoint)
  // Function to display all entries on the main page
  /*function displayAllEntries(data) {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";
  
    data.forEach((entry, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("entry");
      entryDiv.innerHTML = `<a href="#" onclick="showEntry(${index})">${entry.Name} - ${entry.Position}</a>`;
      mainContainer.appendChild(entryDiv);
    });
  } */
//console.log(csvData)
//let newData = []
/*function processData(csvData) {
    // Perform operations using csvData here
    console.log(csvData[100]);
    newData = csvData;
    console.log(newData)
  } */
  //console.log(newData)
  function displayAllEntries(data) {
    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";
  
    data.forEach((entry, index) => {
        //console.log(entry)
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `<a href="entry.html?index=${index}">${entry.Name} - ${entry.Position}</a>`;
        mainContainer.appendChild(entryDiv);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    console.log("hi");
    
    
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.has('index') ? parseInt(urlParams.get('index')) : 0;
    
    if (index > 7) {
        const scrollPosition = window.scrollY;
        console.log(scrollPosition);
        localStorage.setItem('scrollPosition', scrollPosition);
    }
    //const data = csv;
    fetch('pray_i_didnt_fuck_up.csv')
    .then(response => response.text())
    .then(csv => {
        csvData = parseCSV(csv);
        //displayAllEntries(csvData);
        datapoint = csvData[100]
        console.log(datapoint)
        const selectedEntry = csvData[index];
        console.log("selected entry");
        console.log(selectedEntry);
  
      const entryContainer = document.getElementById("entry-container");
      entryContainer.innerHTML = `
      <h2>${selectedEntry.Name}</h2>
      <p><strong>Location:</strong> ${selectedEntry.Location}</p>
      <p><strong>Position:</strong> ${selectedEntry.Position}</p>
      <p><strong>Link:</strong> <a href="${selectedEntry.Link}" target="_blank">${selectedEntry.Link}</a></p>
      <p><strong>About:</strong> ${selectedEntry.About}</p>
      <p><strong>Prompt:</strong><br> ${selectedEntry.Message}</p>
      `;
      const backButton = document.createElement("button");
            backButton.textContent = "Back";
            backButton.addEventListener("click", goBack);
            entryContainer.appendChild(backButton);
        })
        .catch(error => console.error('Error:', error));

    function goBack() {
        // Restore the scroll position on the main page
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            localStorage.removeItem('scrollPosition');
        }
        window.history.back();
    }
});
    /*
    const selectedEntry = csvData[index];
  
    const entryContainer = document.getElementById("entry-container");
    entryContainer.innerHTML = `
      <h2>${selectedEntry.Name}</h2>
      <p><strong>Location:</strong> ${selectedEntry.Location}</p>
      <p><strong>Position:</strong> ${selectedEntry.Position}</p>
      <p><strong>Link:</strong> <a href="${selectedEntry.Link}" target="_blank">${selectedEntry.Link}</a></p>
      <p><strong>About:</strong> ${selectedEntry.About}</p>
      <p><strong>Prompt:</strong> ${selectedEntry.Prompt}</p>
    `; */
  //});
  

/*
  // Function to show an individual entry on a separate page
  function showEntry(index) {
    const scrollPosition = window.scrollY;
    localStorage.setItem('scrollPosition', scrollPosition);
    
    const data = Papa.parse(csv, { header: true }).data;
    console.log("this is data");
    console.log(data);
    localStorage.setItem('selectedEntry', JSON.stringify(data[index]));
  
    window.location.href = `entry.html?index=${index}`;;
  }
  */
  
  // Function to go back to the main page
  function goBack() {
    const scrollPosition = localStorage.getItem('scrollPosition');
    localStorage.removeItem('scrollPosition');

    if (scrollPosition) {
        $('#main-container').scrollTop(Number(scrollPosition));
    }

    window.history.back();
  }
  function displayAllFilteredEntries(data, position) {
    const filteredData = data.filter(entry => String(entry.Position).includes(position));

    const mainContainer = document.getElementById("main-container");
    mainContainer.innerHTML = "";
  
    filteredData.forEach((entry, index) => {
        //console.log(entry)
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `<a href="entry.html?index=${index}">${entry.Name} - ${entry.Position}</a>`;
        mainContainer.appendChild(entryDiv);
    });
  }

  // Function to filter entries based on position
  function filterEntries(position) {
    const mainContainer = document.getElementById("main-container");
    fetch('pray_i_didnt_fuck_up.csv')
    .then(response => response.text())
    .then(csv => {
        csvData = parseCSV(csv);
        //displayAllEntries(csvData);
        //filtered = filterthedata(csvData, position)
        //print(filtered)
        displayAllFilteredEntries(csvData,position);
        datapoint = csvData[100]
        console.log(datapoint)
        //processData(csvData);
    })
    .catch(error => console.error('Error:', error));
    //const data = Papa.parse(csv, { header: true }).data;
    //console.log(data)
    //const filteredData = data.filter(entry => entry.Position.includes(position));
  
    //displayAllEntries(filteredData);
  }

  
  