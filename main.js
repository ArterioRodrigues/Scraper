const { link } = require('fs');
const { type } = require('os');
var request = require('request');
var express = require('express');

var app = express()

function checkLinks(data){  

    return new Promise ((res, req) => {
            re = true
            request(data, function(error, response) {
                
                try{
                    if(error || response.statusCode > 400){
                        re = false
                    }
                }
                catch(err){
                    re = false;  
                }

                res(re)
            });
           
            
    });    

         
}

function getPage(search){
    return new Promise ((res, req) => {
        request(search, async function (error, response, body) {
        
            if(!(error || response.statusCode > 400)){
                data = response.body
        

                tag = ['<a', '>', 'href="', '"'];
                str = '';
                str2 = ';'
                chk = false
                links = []


                for(let i = 0; i < data.length; i++){
                    str += data[i];
                    if(str.substr(str.length-2) == tag[0])  { str = ''; chk = true;}
                    if (str.substr(str.length-1) == tag[1]  && chk){ 
                        chk = false;
                        
                        for(let j = 0; j < str.length; j++){
                            str2 += str[j];
                            if(str2.substr(str2.length-6) == tag[2]){
                                chk = true;
                                str2 = ''
                            }

                            if(str2.substr(str2.length-1) == tag[3] && chk){
                                links.push(str2.substr(0,str2.length-1));
                                chk = false;
                                str2 = ''
                                break;
                            }
                        }            
                        str = ''; 
                    }
                }

                data1 =[]

                for(let i = 0; i < links.length; i++)   
                {
                    if(!(links[i].substr(0,4) != 'http'))
                        data1.push(links[i]);
                }


                res(data1);
            }
        });
    });
}

async function start(){
    counter = 0;
    search = "https://www.hunter.cuny.edu/studentservices/cds/students/CareerLinks";
    let response = await getPage("https://www.google.com");
    console.log("#of links \t", response.length)


    for(let item = 0;  item < response.length; item++){
        data = await checkLinks(response[item])
        if(!data){
            counter++;
            console.log(item, '\t', counter, '\t', "URL:  ", response[item])
        }
    }
}


app.get('/', function (req, res) {
    console.log(start())
})

app.listen(3000)