var numAnagrams = 5;
var solutions = [];
var solutionIndex = 0;

function displaySolutions(container){
    solutions[solutionIndex].forEach((solution, index) => {
        const rowLabel = document.createElement("div");
        rowLabel.className = "solution-text-label";
        rowLabel.innerHTML = index + 1;
        const rowData = document.createElement("div");
        rowData.className = "solution-text-data";
        rowData.innerHTML = solution;
        const div = document.createElement("div");
        div.className = "solution-text-row";
        div.appendChild(rowLabel);
        div.appendChild(rowData);
        container.appendChild(div);
    });
}

function nextSolution(){
    if(solutionIndex < solutions.length - 1){
        solutionIndex++;
        const container = document.getElementById("solution-text");
        const title = document.getElementById("solution-title");
        container.innerHTML = "";
        title.innerHTML = `Solution ${solutionIndex + 1} of ${solutions.length}`;
        displaySolutions(container);
    }
}

function previousSolution(){
    if(solutionIndex > 0){
        solutionIndex--;
        const container = document.getElementById("solution-text");
        const title = document.getElementById("solution-title");
        container.innerHTML = "";
        title.innerHTML = `Solution ${solutionIndex + 1} of ${solutions.length}`;
        displaySolutions(container);
    }
}

function updateOnSolve(data){
    solutionIndex = 0;
    const container = document.getElementById("solution-text");
    const title = document.getElementById("solution-title");
    container.innerHTML = "";
    console.log(data);
    solutions = data.solutions;


    if(data.status == "OK"){
        if(data.solutions.length == 0){
            container.innerHTML = "No solutions found";
            return;
        } else if (data.solutions.length > 1){
            title.innerHTML = `Solution ${solutionIndex + 1} of ${solutions.length}`;
            displaySolutions(container);
            Array.from(document.getElementsByClassName("fbnavigator")).forEach((element) => {
                element.style.display = "table-cell";
            });
            return;
        } else {
            title.innerHTML = `Solution`;
            displaySolutions(container);
        }
        
    } else {
        container.innerHTML = data.status;
    }
}

// Function to handle the update
function solve() {
    // Add your code here to update the page
    var anagrams = [];
    for(var i = 1; i <= numAnagrams; i++) {
        anagrams.push(document.getElementById("anagram-"+i).value);
        console.log(anagrams[i]);
    }
    document.getElementById("solution-text").style.display = "none"; // Hide solution
    document.getElementById("solution-title").style.display = "none" // Hide solution title
    document.getElementById("loading-daisy").style.display = "block"; // Show spinner
    Array.from(document.getElementsByClassName("fbnavigator")).forEach((element) => {
        element.style.display = "none";
    });
    console.log("https://daisy-chain.azurewebsites.net/api/solve?anagrams="+anagrams.join(","))
    fetch("https://daisy-chain.azurewebsites.net/api/solve?anagrams="+anagrams.join(","))
        .then(response => {return response.json()})
        .then(data => {updateOnSolve(JSON.parse(JSON.stringify(data)))})
        .catch(err => document.getElementById("solution-text").innerHTML = "Error: " + err)
        .finally(() => {
            document.getElementById("loading-daisy").style.display = "none"; // Hide spinner
            document.getElementById("solution-text").style.display = "table-cell"; // Show solution
            document.getElementById("solution-title").style.display = "block" // Show solution title
        });    
}
