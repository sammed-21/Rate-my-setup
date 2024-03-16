const { Client } = require("pg")
const { getDatabaseUri } = require("./config")
const { blue } = require("colors")
require("colors")

const db = new Client({ connectionString: getDatabaseUri() })


db.connect((err) => {

  if (err) {
    console.error("connection error", err.stack)
  } else {

    console.log("Successfully connected to postgres database!".blue)
  }
})

db.query(`Select * from users`, (err, res)=>{
    if(!err){
console.log(res.rows,blue)
    }
    else{
      console.log(err.message);
    }
})



module.exports = db
