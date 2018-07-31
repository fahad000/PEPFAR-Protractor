var HTMLReporter = require('protractor-beautiful-reporter');
exports.config={
    seleniumAddress:'http://localhost:4444/wd/hub',
    specs:['specPEPFAR.js'],
capabilities: {
    browserName: 'chrome',
    chromeOptions: {
        args: ["--headless"]
    }
},
jasmineNodeOpts:{
    defaultTimeOutInterval: 360000
}

    // onPrepare: function(){
    //     jasmine.getEnv().addReporter(new HTMLReporter(
    //         {
    //             baseDirectory: 'Reports/screenshots'
    //         }).getJasmine2Reporter());
        
    //   }
    // capabilities: { 
    //     'browserName': 'chrome', 
    //      chromeOnly:true , 
    //      directConnect: true } 
 };