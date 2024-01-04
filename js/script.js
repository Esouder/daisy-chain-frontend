var sleepSetTimeout_ctrl;

function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

// Function to handle the update
async function solve() {
    // Add your code here to update the page
    var name = document.getElementById("name").value;
    document.getElementById("loading-daisy").style.display = "block"; // Show spinner
    fetch("https://example-csharp-function-20231.azurewebsites.net/api/httpexample?name="+name)
        .then(response => response.json())
        .then(data => document.getElementById("solution").innerHTML = "JSON Recieved: " + JSON.stringify(data))
        .catch(err => document.getElementById("solution").innerHTML = "Error: " + err)
        .finally(() => {
            document.getElementById("loading-daisy").style.display = "none"; // Hide spinner
        });
        

}
