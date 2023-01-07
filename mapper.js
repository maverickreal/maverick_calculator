const routes=require('./routes.js');

module.exports={
    '/add':{
        'POST':routes.addHandler
    },
    '/subtract':{
        'POST':routes.subtractHandler
    },
    '/divide':{
        'POST':routes.divideHandler
    },
    '/multiply':{
        'POST':routes.multiplyHandler
    },
    '/history':{
        'GET':routes.historyHandler
    }
};