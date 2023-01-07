const db = require('mysql2').createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

const getLastFive = cb => {
    try{
        db.execute(`SELECT * FROM OPERATIONS ORDER BY ID DESC LIMIT 5;`, [], (err, ret)=>{
            if(err){
                return cb('error', null);
            }
            let obj=[];
            for(const item of ret){
                obj.push(`${item.NUM1} ${item.OP} ${item.NUM2} = ${item.RES}`);
            }
            cb('success', obj);
        });
    }
    catch(error){
        console.error(error);
        cb('error', null);
    }
}

const insertOp = (num1, num2, op, res, cb) => {
    try{
        db.execute(`INSERT INTO OPERATIONS(NUM1, NUM2, OP, RES) VALUES(${num1}, ${num2}, '${op}', ${res});`,
            [], err=>{
                if(err){
                    console.error(err);
                    cb(err);
                }
            });
    }
    catch(error){
        console.error(error);
        cb(error);
    }
}

module.exports = {getLastFive, insertOp};