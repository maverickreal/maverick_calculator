const db = require('./db.js');

const failure = res => {
    res.writeHead(400, { Connection: 'close', Location: '/', 'Content-Type': 'text/plain' });
    res.end('Bad Request');
}

const addHandler=(req, res)=>{
    try{
        const {num1, num2}=req.params;
        if(isNaN(num1) || isNaN(num2)){
            throw Error('Invalid data types!');
        }
        db.insertOp(num1, num2, '+', parseInt(num1)+parseInt(num2), status=>{
            if(status==='error'){
                failure(res);
            }
        });
        res.writeHead(200, { Connection: 'close', Location: '/', 'Content-Type': 'text/plain' });
        res.end(`The answer is : ${parseInt(num1)+parseInt(num2)}`);
    }
    catch(err){
        console.error(err);
        failure(res);
    }
}

const subtractHandler=(req, res)=>{
    try{
        const {num1, num2}=req.params;
        if(isNaN(num1) || isNaN(num2)){
            throw Error('Invalid data types!');
        }
        db.insertOp(num1, num2, '-', num1-num2, status=>{
            if(status==='error'){
                failure(res);
            }
        });
        res.writeHead(200, { Connection: 'close', Location: '/', 'Content-Type': 'text/plain' });
        res.end(`The answer is : ${num1-num2}`);
    }
    catch(err){
        console.error(err);
        failure(res);
    }
}

const multiplyHandler=(req, res)=>{
    try{
        const {num1, num2}=req.params;
        if(isNaN(num1) || isNaN(num2)){
            throw Error('Invalid data types!');
        }
        db.insertOp(num1, num2, '*', num1*num2, status=>{
            if(status==='error'){
                failure(res);
            }
        });
        res.writeHead(200, { Connection: 'close', Location: '/', 'Content-Type': 'text/plain' });
        res.end(`The answer is : ${num1*num2}`);
    }
    catch(err){
        console.error(err);
        failure(res);
    }
}

const divideHandler=(req, res)=>{
    try{
        const {num1, num2}=req.params;
        if(isNaN(num1) || isNaN(num2)){
            throw Error('Invalid data types!');
        }
        db.insertOp(num1, num2, '/', num1/num2, status=>{
            if(status==='error'){
                failure(res);
            }
        });
        res.writeHead(200, { Connection: 'close', Location: '/', 'Content-Type': 'text/plain' });
        res.end(`The answer is : ${num1/num2}`);
    }
    catch(err){
        console.error(err);
        failure(res);
    }
}

const historyHandler=(req, res)=> db.getLastFive((status, data)=>{
        if(status==='error'){
            return failure(res);
        }
        let ret='The last 5 transactions are : \n';
        for(const item of data){
            ret+=`\n-> ${item}`;
        }
        res.writeHead(200, { Connection: 'close', Location: '/', 'Content-Type': 'text/plain' });
        res.end(ret);
    })

module.exports = { addHandler, subtractHandler, multiplyHandler, divideHandler, historyHandler };