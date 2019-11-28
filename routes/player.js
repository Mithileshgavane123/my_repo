var express =  require("express");
var router =  express();
var mysql = require("mysql");
var joi = require("joi");
var config = require("config");

var connection =  mysql.createConnection({
    host: config.get("host"),
    database:config.get("database"),
    user : config.get("user"),
    password:config.get("password")
});
connection.connect();
router.use(express.json());

router.get("/",(request, response)=>{
    var queryText = "select * from CricStatTB";
    
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

router.get("/:id",(request, response)=>{
    var queryText = `select * from CricStatTB where id = ${request.params.id}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


router.post("/",(request, response)=>{

    //console.log(validationResult.error);
    if(request!=null)
    {
        var Country = request.body.Country;
        var Year = request.body.Year;
        var NoofTeam=request.body.NoofTeam;
        var Venue=request.body.Venue;
        console.log(Year);
           
            var queryText = `insert into CricStatTB(Country,Year,NoofTeam,Venue) values('${Country}', ${Year},${NoofTeam},'${Venue}')`;
            connection.query(queryText,(err, result)=>{
            if(err==null)
                {
                    response.send(JSON.stringify(result));
                }
                else{
                    response.send(JSON.stringify(err));
                }
        });
    }
    else{
        response.send(JSON.stringify(validationResult.error));
    }
});

/*
function Validate(request)
{
    var validationschema = 
    {
        Country:joi.string().required(),
        Year:joi.number().required(),   
        NoofTeam:joi.number().required(),
        Venue:joi.string().required(), 
    };
   return joi.validate(request.body, validationschema)
}
*/

router.delete("/:id",(request, response)=>{
    var id = request.params.id;
    var queryText = `delete from CricStatTB where id = ${id}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


router.put("/:id",(req,resp)=>
{
    var id=req.params.id;
     var Country=req.body.Country;
     var  Year=req.body.Year;
     var NoofTeam=req.body.NoofTeam;
     var Venue=req.body.Venue;

  var queryText=`update CricStatTB set Country='${Country}',Year=${Year},NoofTeam=${NoofTeam},Venue='${Venue}' where id=${id}`;     

          connection.query(queryText,(err,res)=>
          {
  if(err==null)
    
      {   
       resp.send(JSON.stringify(res));
     }
  else
     {
       resp.send(JSON.stringify(err));
      }
          })
             
})


module.exports=router;
