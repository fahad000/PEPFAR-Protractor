// var HTMLReporter = require('protractor-beautiful-reporter');
exports.config={
    seleniumAddress:'http://localhost:4444/wd/hub',
    specs:['spec.js'],
// capabilities: {
//     browserName: 'chrome',
//     chromeOptions: {
//         args: ["--headless"]
//     }
// },


   
     } // onPrepare: function(){
    //     jasmine.getEnv().addReporter(new HTMLReporter(
    //         {
    //             baseDirectory: 'Reports/screenshots'
    //         }).getJasmine2Reporter());
        
    // capabilities: { 
    //     'browserName': 'chrome', 
    //      chromeOnly:true , 
    //      directConnect: true } 
 