window.onload = function() {
    let links = document.getElementsByTagName("a");
    console.log(links.length)

    for(let i = 0; i < links.length; i++){
        console.log(links[i].href)
    }
}