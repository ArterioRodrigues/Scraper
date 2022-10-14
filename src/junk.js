async function Start1(){
    request("https://www.hunter.cuny.edu/studentservices/cds/students/CareerLinks", async function (error, response, body) {
        
        if(!(error || response.statusCode > 400)){
            // data = [];

            // data = await getPageLinks(response.body);
            // data = await checkLinks(data);

            // console.log(data)

            data = getPageLinks(response.body)

            await checkLinks(data)
            console.log(data)
        }

        return data;
    })
}


function checkLinks2(data){

    return new Promise ((resolve, reject) =>{

        error_links = [];
        fix_links = [];
        counter = 0

        for(let i = 0; i < data.length; i++){

            request(data[i], function(error, response, body) {
                try{
                    if(error || response.statusCode > 400){
                        counter++;
                        fix_links.push(data[i])
                        console.log(data[i])
                    }
                }
                catch(err) {
                    error_links.push(data[i])
                }

                
            })
        }

        
        return_data = [];
        return_data.push(error_links);
        return_data.push(fix_links);
        resolve(return_data)

       

    });

    
}

const myAsyncLoopFunction = async (array) => {
    const allAsyncResults = [];
  
    for (const item of array) {
      const asyncResult = await asyncFunction(item);
      allAsyncResults.push(asyncResult);
    }
  
    return allAsyncResults;
  };

  function getPageLinks(data){
    
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


    return data1;
}