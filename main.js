

async function start(){

    let url = document.getElementById("URL").value
    await axios.post(`http://localhost:3001/`, {
        URL: url
    })
    .then(res => {
        addR(res.data)
    })
   
        
}

var numRows = 0;
var numCols = 0;

function addR(data) {
    grid = document.getElementById("grid");
    table_r = document.createElement("TR");
    table_d = document.createElement("TD");

    table_r.className = "row";
    table_d.className = "content";
    table_d.innerHTML = data;

    console.log(data)


    removeR()
    

    table_r.appendChild(table_d)
    grid.appendChild(table_r) 
    numRows++;
}

function removeR() {
    grid = document.getElementById("grid");
    if(numRows > 0)
    {
        for(let i = 0; i < numRows; i++){
            grid.removeChild(grid.lastChild);
            numRows--;
        }
    }
}