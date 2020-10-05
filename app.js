var express = require('express')
var ejs = require('ejs')
//var mongoose = require('mongoose')
const { MongoClient , ObjectId } = require('mongodb')
var bodyParser = require('body-parser')
var path = require('path')
//var IMDB = require('./models/data')
var url = require('url')
var app = express()
//var router = express.Router()

//mongoose.connect('mongodb://127.0.0.1:27017/assignment',{useNewUrlParser: true,useUnifiedTopology: true})


	


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const viewPath = path.join(__dirname,'./view')
app.set('view engine', 'ejs')
app.set('views',viewPath)
app.use(express.static(viewPath))
app.get('/', function(req, res ) {
	const url_parts = url.parse(req.url,true) 
	console.log(url_parts)
   	var perPage = 10
    var page = url_parts.query.page || 1
//ncost=&primaryName=Marlon&birthYear=&deathYear=&primaryProfession=&knownForTitles=
    var birthYear = url_parts.query.birthYear;
    var ncost = url_parts.query.ncost;
    var primaryName = url_parts.query.primaryName;
    var deathYear = url_parts.query.deathYear;
    var primaryProfession = url_parts.query.primaryProfession;
    var knownForTitles = url_parts.query.knownForTitles;
    var objFind = {};
		if(ncost){
			objFind.ncost = ncost; 
		}
		if(birthYear){
			objFind.birthYear = parseInt(birthYear); 
		}
		if(deathYear){
			objFind.deathYear = parseInt(deathYear); 
		}
		if(primaryName){
			objFind.primaryName = primaryName; 
		}
		if(primaryProfession){
			objFind.primaryProfession = primaryProfession; 
		}
		if(knownForTitles){
			objFind.knownForTitles = knownForTitles; 
		}
		


MongoClient.connect('mongodb://127.0.0.1:27017',{useNewUrlParser: true,useUnifiedTopology: true}, (error , client) => {
		const db = client.db('assignment')
		const im = db.collection('imdb').find(objFind).skip((perPage * page) - perPage)
        .limit(perPage).toArray(function(err,result){
				//const count = 100
				console.log("here in query"+objFind)
				console.log(result)
				/*db.collection('imdb').countDocuments(function(err,count){
					console.log(count)	
				})*/
				const count = db.collection('imdb').countDocuments(objFind,{limit : 100},function(err,count){
					console.log(count)	

					res.render('index', {
	                    data: result,
	                    current: page,
	                    pages: Math.ceil(count / perPage),
	                    objFind: objFind,
	                    pageURL : req.url.replace(/&page.*/,'')
	                })
				})
				
				/*res.render('index', {
	                    data: result,
	                    current: page,
	                    pages: Math.ceil(count / perPage)
	                })*/
			}

			)
		//console.log(im)
	})


/*    IMDB
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, data) {
            IMDB.count().exec(function(err, count) {
                //if (err) return next(err)
                res.render('./view/data', {
                    data: data,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
                console.log(count)
            })
            console.log(data)
        })
  */  
  //  console.log("hi")    
})


app.listen(8080, function() {
    console.log('Node.js listening on port ' + 8080)
})


