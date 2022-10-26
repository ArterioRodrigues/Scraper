

async function start(){

    let url = document.getElementById("URL").value
    await axios.post(`https://scraper-backend.onrender.com`, {
        URL: url
    })
    .then(res => {
        addR(res.data)
        download_txt(res.data);
    })
   
        
}

var numRows = 0;
var numCols = 0;

function addR(data) {
    removeR()

    grid = document.getElementById("grid");
    table_r = document.createElement("TR");
    

    for(let i = 0; i < data.length; i++){
        table_r = document.createElement("TR");
        table_d = document.createElement("TD");
        table_d.className = "content";
        table_r.className = "row";
        table_d.innerHTML = data[i];
        table_r.appendChild(table_d)
        console.log(data[i])
        numRows++;
        grid.appendChild(table_r) 
    }

    
    
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

function download_txt(data) {

    var hiddenElement = document.createElement('a');
  
    hiddenElement.href = 'data:attachment/text,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'BrokenLinks.txt';
    hiddenElement.click();
  }
  
  