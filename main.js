const { link } = require('fs');
const { type } = require('os');
var request = require('request');
var express = require('express');

var app = express()

async function checkLinks(data){  

    return new Promise ((res, req) => {
            
            request(data, function(error, response) {
                re = true
                data_tran = []
                try{
                    if(error || response.statusCode > 400){
                        re = false
                    }
                    data_tran = [re, response.statusCode]
                }
                catch(err){
                    re = false;  
                    data_tran = [re, "None"]
                }

                res(data_tran)
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
    let response = await getPage("https://en.wikipedia.org/wiki/Hilter");

    console.log("#of links \t", response.length)
    

    Promise.all(response.map(foo => checkLinks(foo)
        .then((results) => {
            if(!results[0]){
                counter += 1;
                console.log(counter, '\t',results[1], "\t URL:", foo)
            }
        })
    ))

        
    
}

start()


// app.get('/', function (req, res) {
//     console.log(start())
// })

// app.listen(3000)