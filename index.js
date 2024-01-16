import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var obj = {},flag=0;
app.get("/", (req, res) => {
    if(flag===0){
        res.render("index.ejs");
    }
    else if(flag ===1){
        res.render("index.ejs",{
            obj : obj
        });
    }
    else{
        res.render("index.ejs",{
            error : 'error'
        })
    }
});
const Apikey = "ff0213d5d121cb315b55b5db4fef3628";

app.post("/search", async (req, res) => {
    try{

        const name = req.body.cityName;
        // getting city coordinates
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${Apikey}`);
        const lat = response.data[0].lat, long = response.data[0].lon;
        // console.log(lat + " " + long);
        console.log(response.data);
        
        // getting weather
        const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${Apikey}&units=metric`)
        obj = response1.data;
        flag = 1;
        res.redirect("/");
        console.log(obj);
    }
    catch(err){
        console.log("error");
        flag = 2;
        res.redirect("/");
    }
})




app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
})