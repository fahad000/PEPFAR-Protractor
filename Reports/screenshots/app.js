var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "should login as an PEPFAR User|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c88909c7c481f3e9dcffd96d341906ee",
        "instanceId": 6072,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1532749898078,
                "type": ""
            }
        ],
        "screenShotFile": "007a0030-00ba-0096-0057-00f500cf00ae.png",
        "timestamp": 1532749896201,
        "duration": 8448
    },
    {
        "description": "should login as an PEPFAR User|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1bd62709fc5c851bf523ef54cf7f111d",
        "instanceId": 12420,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1532749949473,
                "type": ""
            }
        ],
        "screenShotFile": "00f200cc-00ce-001a-0024-00d90097007b.png",
        "timestamp": 1532749947919,
        "duration": 8131
    },
    {
        "description": "should login as an PEPFAR User|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c31390fb97e4cb5c0a9c6eff71f90f16",
        "instanceId": 14428,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1532749985655,
                "type": ""
            }
        ],
        "screenShotFile": "0011001b-0028-0047-00c2-00ed009b00e8.png",
        "timestamp": 1532749984174,
        "duration": 8071
    },
    {
        "description": "Should verify a title|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1a8b4ad84f6d561c57c0b83e90137da",
        "instanceId": 9660,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: browser.getTtile is not a function",
        "trace": "TypeError: browser.getTtile is not a function\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:13:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Should verify a title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:11:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "007800af-001b-00b7-00a8-00b400ec0068.png",
        "timestamp": 1532750168740,
        "duration": 20195
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1a8b4ad84f6d561c57c0b83e90137da",
        "instanceId": 9660,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b700f4-001a-002c-008f-00d600e10073.png",
        "timestamp": 1532750189393,
        "duration": 1034
    },
    {
        "description": "should click on Mechanism Search sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1a8b4ad84f6d561c57c0b83e90137da",
        "instanceId": 9660,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:23:24)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:22:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00b1005a-0069-0061-006d-005c005900ad.png",
        "timestamp": 1532750190778,
        "duration": 1037
    },
    {
        "description": "should click on search button|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e1a8b4ad84f6d561c57c0b83e90137da",
        "instanceId": 9660,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:29:17)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:28:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "001d0089-00d6-004b-0047-00a9006e008b.png",
        "timestamp": 1532750192188,
        "duration": 1018
    },
    {
        "description": "should login as an PEPFAR User|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "bd6132244d6241515178c5b351bbed58",
        "instanceId": 12004,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"chkTerms\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"chkTerms\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:54:28)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should login as an PEPFAR User\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:39:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:38:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "001e009e-00e7-0015-00c8-00db000b001f.png",
        "timestamp": 1532817466205,
        "duration": 15265
    },
    {
        "description": "Should verify a title|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89341f22d92ddb70855850a3d7fa51de",
        "instanceId": 17044,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: browser.getTtile is not a function",
        "trace": "TypeError: browser.getTtile is not a function\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:13:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Should verify a title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:11:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "005200e6-0053-00c6-009b-00f3002100a9.png",
        "timestamp": 1532817515216,
        "duration": 8288
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89341f22d92ddb70855850a3d7fa51de",
        "instanceId": 17044,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d90055-0072-0007-0096-00ed00b40033.png",
        "timestamp": 1532817523915,
        "duration": 1114
    },
    {
        "description": "should click on Mechanism Search sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89341f22d92ddb70855850a3d7fa51de",
        "instanceId": 17044,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:23:24)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:22:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "001400fc-0050-0042-00c3-00f600c300f1.png",
        "timestamp": 1532817525732,
        "duration": 1081
    },
    {
        "description": "should click on search button|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "89341f22d92ddb70855850a3d7fa51de",
        "instanceId": 17044,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:29:17)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:28:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00850068-00d2-005a-0097-009b007b0095.png",
        "timestamp": 1532817527165,
        "duration": 1269
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e608ebeb845f4c9bd414a9ad807a1bf3",
        "instanceId": 6644,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d2006f-00ba-0004-0057-006f009500a0.png",
        "timestamp": 1532817723713,
        "duration": 7798
    },
    {
        "description": "should click on Mechanism Search sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e608ebeb845f4c9bd414a9ad807a1bf3",
        "instanceId": 6644,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:23:24)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:22:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0024005c-00de-0000-0015-004100f300e1.png",
        "timestamp": 1532817731916,
        "duration": 1104
    },
    {
        "description": "should click on search button|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e608ebeb845f4c9bd414a9ad807a1bf3",
        "instanceId": 6644,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:29:17)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:28:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "0025003c-005d-00fa-0008-003f0054004f.png",
        "timestamp": 1532817733341,
        "duration": 937
    },
    {
        "description": "should login as an PEPFAR User|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "25c055335ef5f37e64e177629f00eb1a",
        "instanceId": 13460,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"chkTerms\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"chkTerms\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:54:28)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should login as an PEPFAR User\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:39:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:38:1)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00980075-00e5-00e8-00ec-00a30099006e.png",
        "timestamp": 1532817788906,
        "duration": 15990
    },
    {
        "description": "should login as an PEPFAR User|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c6f372f81e08d57df1ea26e15af23c12",
        "instanceId": 2092,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0030003b-0025-008f-0026-001900150044.png",
        "timestamp": 1532817859776,
        "duration": 13866
    },
    {
        "description": "Should verify a title|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4ab1d9b8074cb976bebaa744431fd171",
        "instanceId": 11572,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: browser.getTtile is not a function",
        "trace": "TypeError: browser.getTtile is not a function\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:13:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Should verify a title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:11:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "009400dd-00cd-000d-008e-009d00f90049.png",
        "timestamp": 1532817996961,
        "duration": 10731
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4ab1d9b8074cb976bebaa744431fd171",
        "instanceId": 11572,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004c0070-008d-00bb-002a-005500f6000e.png",
        "timestamp": 1532818008207,
        "duration": 4130
    },
    {
        "description": "should click on Mechanism Search sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4ab1d9b8074cb976bebaa744431fd171",
        "instanceId": 11572,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:25:24)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:24:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "004500f5-00ee-003d-0050-0079008400e1.png",
        "timestamp": 1532818012687,
        "duration": 954
    },
    {
        "description": "should click on search button|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4ab1d9b8074cb976bebaa744431fd171",
        "instanceId": 11572,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:31:17)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:30:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "005f005f-0075-0068-00e8-00e900270009.png",
        "timestamp": 1532818013945,
        "duration": 1006
    },
    {
        "description": "Should verify a title|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4c3670af96aabbe01599da16f5b6b3bd",
        "instanceId": 12984,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: browser.getTtile is not a function",
        "trace": "TypeError: browser.getTtile is not a function\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:13:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Should verify a title\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:11:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00e40033-002c-00f5-005c-005700850013.png",
        "timestamp": 1532818774269,
        "duration": 10579
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4c3670af96aabbe01599da16f5b6b3bd",
        "instanceId": 12984,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "007e0068-00dc-000a-00aa-00c800750015.png",
        "timestamp": 1532818785420,
        "duration": 4673
    },
    {
        "description": "should click on search button|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4c3670af96aabbe01599da16f5b6b3bd",
        "instanceId": 12984,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:32:17)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:31:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "004000b2-00f1-002e-0019-00a100690071.png",
        "timestamp": 1532818790456,
        "duration": 919
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3274170c0b5bfea147ac413079da0966",
        "instanceId": 1292,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "006a00ce-00d4-0073-0088-0024006400a5.png",
        "timestamp": 1532818863323,
        "duration": 10507
    },
    {
        "description": "should click on search button|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "3274170c0b5bfea147ac413079da0966",
        "instanceId": 1292,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:32:17)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:31:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00ec0014-00b8-0012-0046-004a00d500c9.png",
        "timestamp": 1532818874204,
        "duration": 1094
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f39b5b59adcb4b733d9b54308a3a6c5f",
        "instanceId": 17064,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00210083-00da-0074-00df-009400cf00dc.png",
        "timestamp": 1532819020422,
        "duration": 11513
    },
    {
        "description": "should click on search button|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f39b5b59adcb4b733d9b54308a3a6c5f",
        "instanceId": 17064,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:32:17)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:31:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00b50080-0021-00b3-0073-0092003f0065.png",
        "timestamp": 1532819032311,
        "duration": 1134
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "78a9889cd0a9406d214635a2f97717d3",
        "instanceId": 14720,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008f0000-0041-006f-0067-0050006c000a.png",
        "timestamp": 1532819077836,
        "duration": 11688
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d7d0f4bbbd5820c2fb30caa13160158a",
        "instanceId": 13164,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ec002c-006b-0040-0092-004b00be00b3.png",
        "timestamp": 1532872774341,
        "duration": 13130
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "45e4e89747061b3518ca36fc3cb60823",
        "instanceId": 16512,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003400fe-00bf-0051-0048-00ca00dc00bb.png",
        "timestamp": 1532873262484,
        "duration": 12810
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "601bacd9115b008c85384c5d1e51d2ba",
        "instanceId": 16580,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ff003c-00d5-001c-0079-00870034001a.png",
        "timestamp": 1532873305124,
        "duration": 12527
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "293300c7f385229ed10931ee1c171eb9",
        "instanceId": 8428,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, .class\\=\\\"mat-cell.cdk-column-mechanismID.mat-column-mechanismID.ng-star-inserted)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, .class\\=\\\"mat-cell.cdk-column-mechanismID.mat-column-mechanismID.ng-star-inserted)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:26:116)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanisms sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:18:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00bd0075-0025-009f-00f5-006400aa0028.png",
        "timestamp": 1532873520159,
        "duration": 15422
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ee1b320853925e0c1c24c838cf787917",
        "instanceId": 13324,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected '12342' to equal '12343'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:26:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00560020-0069-0062-0040-008d00d800fa.png",
        "timestamp": 1532873617219,
        "duration": 16855
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4af26f6122100a1b062ae5616982f0af",
        "instanceId": 13760,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected '12342' to equal '12343'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:26:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "0031000d-00c4-0008-00ac-00c1001900c1.png",
        "timestamp": 1532873797847,
        "duration": 14269
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "cb579cb78aa0f16711d290502353b90c",
        "instanceId": 14896,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected '12342' to equal '12343'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:27:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00d6009a-0082-0045-00e2-00550071005f.png",
        "timestamp": 1532874169459,
        "duration": 16107
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "90e10ab070e500009c8fbb91039f0fa2",
        "instanceId": 16112,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: element(...).toEqual is not a function",
        "trace": "TypeError: element(...).toEqual is not a function\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:28:150)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should click on Mechanisms sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:18:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00fa0039-00d7-00f0-001b-006600f5003d.png",
        "timestamp": 1532874401829,
        "duration": 9474
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c24960b6ae27f3a6821dfa761f2cf9b7",
        "instanceId": 16076,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected null to equal '`12342'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:29:173)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00e10035-006b-00b7-007b-00a300430060.png",
        "timestamp": 1532874542437,
        "duration": 14089
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ff6cb28e7fe58d0b94fda80a4ac73a97",
        "instanceId": 13288,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected '12342' to equal '12343'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:27:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "005f00ca-007b-007c-00fd-004c00760043.png",
        "timestamp": 1532884783898,
        "duration": 17992
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "edeb459115a5727d1b8515f76c71fd4b",
        "instanceId": 14684,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected '12342' to equal '12343'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:27:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "001300ee-0091-0095-0012-00cd006600ee.png",
        "timestamp": 1532884945277,
        "duration": 15957
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b5fb6598f5d7637f0722840561934a0f",
        "instanceId": 15496,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00be0030-002b-00ea-008d-00d500830069.png",
        "timestamp": 1532884992102,
        "duration": 18341
    },
    {
        "description": "encountered a declaration exception|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "bab58e852ac2cc00b5ceec0baa48e484",
        "instanceId": 12096,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "ReferenceError: id is not defined",
        "trace": "ReferenceError: id is not defined\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:6:27)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)",
        "browserLogs": [],
        "screenShotFile": "007900ae-00fd-0017-009e-00de00bf007e.png",
        "timestamp": 1532885541015,
        "duration": 5
    },
    {
        "description": "encountered a declaration exception|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6194619f44a096610eebab2af53f8699",
        "instanceId": 15896,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "ReferenceError: className is not defined",
        "trace": "ReferenceError: className is not defined\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:7:25)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)",
        "browserLogs": [],
        "screenShotFile": "00ed00ef-0074-0030-00fc-005a001400a6.png",
        "timestamp": 1532885628349,
        "duration": 5
    },
    {
        "description": "encountered a declaration exception|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fe8d894482d2a061f7da776f285f3374",
        "instanceId": 17364,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "ReferenceError: id is not defined",
        "trace": "ReferenceError: id is not defined\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:6:27)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)",
        "browserLogs": [],
        "screenShotFile": "00be0026-0074-00c2-001a-0074009a00c7.png",
        "timestamp": 1532885849455,
        "duration": 12
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a49ac219eccbb9ad9366636c141a41c7",
        "instanceId": 14172,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006d00bc-0008-0087-006f-00e400ee0018.png",
        "timestamp": 1532885870088,
        "duration": 20151
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "de182531f5950d8527c6fcefacf7ed0a",
        "instanceId": 7532,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00080090-001a-00a2-00e1-00a5001d00c4.png",
        "timestamp": 1532885917113,
        "duration": 20369
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "4a02f1c1f7e9121149d6afcb22a04024",
        "instanceId": 9432,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected 'Daniel' to equal 'Amit'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:32:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00f9008c-00d6-0033-0096-00f8005e00ba.png",
        "timestamp": 1532886030596,
        "duration": 21256
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7147e1a2301d63a59f1be7b59e350c8a",
        "instanceId": 17400,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:33:150)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanisms sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:20:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00260088-005e-0061-00e2-0082009a00e0.png",
        "timestamp": 1532886162778,
        "duration": 18395
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "24cb0318640f1e71e035af179c3acc58",
        "instanceId": 15032,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:33:150)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanisms sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:20:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00ce00e7-0038-0097-009a-009c00020041.png",
        "timestamp": 1532886347263,
        "duration": 16285
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6cdd1376163d0e2366b2e4cdcff8945f",
        "instanceId": 8948,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[2])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[2])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:34:150)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanisms sub-tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:20:1)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "000200a2-0053-007c-0032-003a009400e5.png",
        "timestamp": 1532886433470,
        "duration": 17619
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "0defe1d9cf83dd9823dad2bcec5f3e34",
        "instanceId": 15380,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0083006b-00ad-006a-0059-004f00b00038.png",
        "timestamp": 1532886553046,
        "duration": 17898
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1a99a21b6e4b2afe3ebcbb15ce2c05be",
        "instanceId": 9120,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00aa00db-002f-0073-007a-009e00bc004e.png",
        "timestamp": 1532886613849,
        "duration": 16939
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "a301449df129753455b4b0201498cf46",
        "instanceId": 9148,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fd009e-0039-004e-005b-001e00cb00d8.png",
        "timestamp": 1532886999439,
        "duration": 18408
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "06f1a77cd964832325ec9f986d76c844",
        "instanceId": 14124,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected 'Daniel' to equal 'Daniel123'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:35:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "005700c5-00cf-0010-00b6-00c40063004a.png",
        "timestamp": 1532887053696,
        "duration": 15810
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5d15d7a603e380013a04b9d2d48e7352",
        "instanceId": 17056,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004f0016-0071-00c3-0081-00b100490068.png",
        "timestamp": 1532887131510,
        "duration": 17390
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c4ad5ce02b3f4c935ecb91f226a9be3a",
        "instanceId": 9372,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00550036-001c-0078-0073-00dd008300cf.png",
        "timestamp": 1532887176348,
        "duration": 19147
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "24ec4d44db2eba3b9bf9c6a1ca00aba6",
        "instanceId": 6124,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Expected 'Daniel' to equal 'Daniel123'.",
        "trace": "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\.js:35:161)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
        "browserLogs": [],
        "screenShotFile": "00b90057-000a-008b-0025-003f00f30096.png",
        "timestamp": 1532887272212,
        "duration": 16498
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f8ca79fecf2308009287cfa77f09c73",
        "instanceId": 15076,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000a00c5-0008-0074-003b-00f2006d0029.png",
        "timestamp": 1532887335523,
        "duration": 17308
    },
    {
        "description": "should login as an PEPFAR User|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2c1a9232557f9e062a2be7a8ff3db192",
        "instanceId": 6508,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://juliemr.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1532888357813,
                "type": ""
            }
        ],
        "screenShotFile": "0087004c-00c3-008e-0098-001c00dc00de.png",
        "timestamp": 1532888355966,
        "duration": 8569
    },
    {
        "description": "should add a todo|angularjs homepage todo list",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "234e2d2a826d5713efdd71d7f28a3d1d",
        "instanceId": 4100,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004a00e4-0026-0073-000f-002900c60086.png",
        "timestamp": 1532895508937,
        "duration": 2642
    },
    {
        "description": "should navigate to PEPFAR home page|PEPFAR testing",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "sessionId": "f6f8efbd0f0aa5e69cf4ca54c5457715",
        "instanceId": 3212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "0035009c-00e2-0085-000a-00e70037009c.png",
        "timestamp": 1532896019557,
        "duration": 1
    },
    {
        "description": "should navigate to PEPFAR home page|PEPFAR testing",
        "passed": false,
        "pending": true,
        "os": "Windows NT",
        "sessionId": "e69ac5281b0cdc955c1aaadfbb052885",
        "instanceId": 15224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Pending",
        "browserLogs": [],
        "screenShotFile": "00a40080-00f7-005b-0020-0049004c00a9.png",
        "timestamp": 1532896138969,
        "duration": 2
    },
    {
        "description": "should login as an PEPFAR User|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "79c0cabc8682309b7426563038b36da3",
        "instanceId": 15164,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532896490852,
                "type": ""
            }
        ],
        "screenShotFile": "00eb00f9-0010-009a-00d1-0037002100ba.png",
        "timestamp": 1532896490237,
        "duration": 1814
    },
    {
        "description": "should login as an PEPFAR User|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "19f04caead6737cdbdb77bd818b37bac",
        "instanceId": 15664,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532896502275,
                "type": ""
            }
        ],
        "screenShotFile": "005d00cc-00be-0023-0069-0013009900f5.png",
        "timestamp": 1532896500824,
        "duration": 2641
    },
    {
        "description": "encountered a declaration exception|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "15cbbe7fb0d02e6c8c13b4aa8ef7fe22",
        "instanceId": 17224,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "ReferenceError: Element is not defined",
        "trace": "ReferenceError: Element is not defined\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:4:21)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)",
        "browserLogs": [],
        "screenShotFile": "000700a2-004a-0040-00db-009c0070008d.png",
        "timestamp": 1532897049533,
        "duration": 5
    },
    {
        "description": "encountered a declaration exception|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5a36717a516bcd01af31fa14465696f3",
        "instanceId": 16792,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "ReferenceError: Element is not defined",
        "trace": "ReferenceError: Element is not defined\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:4:21)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)\n    at Function.Module._load (module.js:497:3)",
        "browserLogs": [],
        "screenShotFile": "00de0068-0029-00b8-00e9-00d1002e004a.png",
        "timestamp": 1532897120812,
        "duration": 4
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "12c1a30b2b5ef31b666884836f93294b",
        "instanceId": 9272,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:18:23)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:16:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532897162824,
                "type": ""
            }
        ],
        "screenShotFile": "00b40068-007f-0085-0011-00a800db0058.png",
        "timestamp": 1532897162131,
        "duration": 1952
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f2d3bb4f4e39d1f00688e8d72e295a45",
        "instanceId": 10488,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:18:23)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:16:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00e7000a-00b0-0071-00b2-00f900ba009f.png",
        "timestamp": 1532897199315,
        "duration": 2343
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9aa8a0b382cacdd3166cb9ce780e72cf",
        "instanceId": 10456,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0030006e-00f9-0022-005f-00b600420084.png",
        "timestamp": 1532897239951,
        "duration": 2326
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5df342c3d24eeb4014bb04d5771f0766",
        "instanceId": 1220,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0063006d-003a-00f8-0096-0036008100d1.png",
        "timestamp": 1532897559097,
        "duration": 2143
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5df342c3d24eeb4014bb04d5771f0766",
        "instanceId": 1220,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e40001-00e4-0007-0009-00af006a00f1.png",
        "timestamp": 1532897561617,
        "duration": 188
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "96043e7c0c5ba9d9e311df2bf7437e0d",
        "instanceId": 10148,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005700cf-00ef-001b-00b4-006600d9007f.png",
        "timestamp": 1532897627197,
        "duration": 3144
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "96043e7c0c5ba9d9e311df2bf7437e0d",
        "instanceId": 10148,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00820017-00c2-004e-0041-000d004e00f6.png",
        "timestamp": 1532897630742,
        "duration": 211
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9101f56c6115e6f268f6ab84fc1369a4",
        "instanceId": 10324,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0025003f-009c-0006-00e2-00ea006c0040.png",
        "timestamp": 1532897719960,
        "duration": 3235
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9101f56c6115e6f268f6ab84fc1369a4",
        "instanceId": 10324,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"btnK\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"btnK\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:25:22)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"do bhg\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:24:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00ad001f-00c5-0059-008c-0059000a0038.png",
        "timestamp": 1532897723597,
        "duration": 218
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c6af62b6b6a434662ec472e8ffb5c2",
        "instanceId": 3212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: abc is not defined",
        "trace": "ReferenceError: abc is not defined\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:19:28)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:18:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532897875001,
                "type": ""
            }
        ],
        "screenShotFile": "00da002e-00a6-000c-00e8-0097004f0044.png",
        "timestamp": 1532897874137,
        "duration": 3484
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c6af62b6b6a434662ec472e8ffb5c2",
        "instanceId": 3212,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532897878337,
                "type": ""
            }
        ],
        "screenShotFile": "00de0044-0073-00ba-00b9-00c10076005c.png",
        "timestamp": 1532897877993,
        "duration": 959
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c390481a6e931ba23fec888128d9c227",
        "instanceId": 7976,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: vdfc is not defined",
        "trace": "ReferenceError: vdfc is not defined\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:19:28)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:18:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532897943390,
                "type": ""
            }
        ],
        "screenShotFile": "00df00ab-0070-0011-0076-00dc001a0095.png",
        "timestamp": 1532897942604,
        "duration": 3390
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c390481a6e931ba23fec888128d9c227",
        "instanceId": 7976,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532897946679,
                "type": ""
            }
        ],
        "screenShotFile": "00c200c6-0040-0083-00df-00eb004d00e4.png",
        "timestamp": 1532897946358,
        "duration": 983
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5fe931ff2533e5085e7e5dc2ca967e94",
        "instanceId": 16056,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532898007100,
                "type": ""
            }
        ],
        "screenShotFile": "008d00b8-00f2-00f8-00d2-00ec009500d4.png",
        "timestamp": 1532898006310,
        "duration": 3500
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5fe931ff2533e5085e7e5dc2ca967e94",
        "instanceId": 16056,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532898010460,
                "type": ""
            }
        ],
        "screenShotFile": "00780008-0017-003b-000e-0068007600a3.png",
        "timestamp": 1532898010197,
        "duration": 922
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b9533e82770ef1f529fec336e0241602",
        "instanceId": 7040,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532898049755,
                "type": ""
            }
        ],
        "screenShotFile": "001f002c-008e-00c1-007b-0031001500f7.png",
        "timestamp": 1532898049090,
        "duration": 3364
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b9533e82770ef1f529fec336e0241602",
        "instanceId": 7040,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.facebook.com/r.php?locale=en_US&display=page - [DOM] Found 2 elements with non-unique id #locale: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1532898053414,
                "type": ""
            }
        ],
        "screenShotFile": "00a20060-00c8-00e9-00d3-00ee005600d8.png",
        "timestamp": 1532898053113,
        "duration": 1074
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "68c2c444a1dd4fa25eacee71fbe385fc",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:21:23)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:18:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532898173182,
                "type": ""
            }
        ],
        "screenShotFile": "0082004c-00fc-0018-00cc-00a600b6009e.png",
        "timestamp": 1532898172789,
        "duration": 2656
    },
    {
        "description": "do bhg|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "68c2c444a1dd4fa25eacee71fbe385fc",
        "instanceId": 6132,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"u_0_m\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"u_0_m\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:25:22)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"do bhg\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:24:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532898175872,
                "type": ""
            }
        ],
        "screenShotFile": "00e60093-0083-005d-00e6-009100590056.png",
        "timestamp": 1532898175819,
        "duration": 87
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae0d30cff12662d0d6ca39a1d5bf7632",
        "instanceId": 7624,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:22:23)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:20:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900351246,
                "type": ""
            }
        ],
        "screenShotFile": "00050064-0026-0012-007e-00ce0037003c.png",
        "timestamp": 1532900349755,
        "duration": 3753
    },
    {
        "description": "should click on Mechanism Search tab|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae0d30cff12662d0d6ca39a1d5bf7632",
        "instanceId": 7624,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2]/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2]/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:26:28)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:25:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900354079,
                "type": ""
            }
        ],
        "screenShotFile": "00ff00ae-00fd-0039-004f-00ad004d00c1.png",
        "timestamp": 1532900354033,
        "duration": 80
    },
    {
        "description": "should click on Mechanism Search button|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae0d30cff12662d0d6ca39a1d5bf7632",
        "instanceId": 7624,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:31:31)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:30:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900354520,
                "type": ""
            }
        ],
        "screenShotFile": "00c7004c-006b-009b-00eb-009a009000ba.png",
        "timestamp": 1532900354461,
        "duration": 96
    },
    {
        "description": "should enter Mechanism ID number|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae0d30cff12662d0d6ca39a1d5bf7632",
        "instanceId": 7624,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"Mechanisms\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"Mechanisms\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:37:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should enter Mechanism ID number\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:36:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900354944,
                "type": ""
            }
        ],
        "screenShotFile": "0047008a-00a0-0077-00b4-0029003f001e.png",
        "timestamp": 1532900354888,
        "duration": 88
    },
    {
        "description": "should click Mechanism Search button|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae0d30cff12662d0d6ca39a1d5bf7632",
        "instanceId": 7624,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:41:31)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click Mechanism Search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:40:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900355381,
                "type": ""
            }
        ],
        "screenShotFile": "00170064-0005-0026-000d-00c5004d001a.png",
        "timestamp": 1532900355322,
        "duration": 85
    },
    {
        "description": "should verify Mechanism ID number in the grid|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae0d30cff12662d0d6ca39a1d5bf7632",
        "instanceId": 7624,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[1])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[1])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:46:157)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should verify Mechanism ID number in the grid\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:45:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900355800,
                "type": ""
            }
        ],
        "screenShotFile": "00450025-0049-001f-00ab-00a6008e009d.png",
        "timestamp": 1532900355740,
        "duration": 95
    },
    {
        "description": "should click on clear button to clear the Mechanism ID number from the Mechanism ID column |PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ae0d30cff12662d0d6ca39a1d5bf7632",
        "instanceId": 7624,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[1]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[1]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:51:30)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on clear button to clear the Mechanism ID number from the Mechanism ID column \") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:50:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900356202,
                "type": ""
            }
        ],
        "screenShotFile": "004b005e-004f-00b6-009b-00ce00170038.png",
        "timestamp": 1532900356145,
        "duration": 89
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "068ab258c47a2fa8f73bce25c6f7df07",
        "instanceId": 11556,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:22:23)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:20:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900530142,
                "type": ""
            }
        ],
        "screenShotFile": "00c1005f-0092-0034-0029-00cf006a0079.png",
        "timestamp": 1532900529795,
        "duration": 2608
    },
    {
        "description": "should click on Mechanism Search tab|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "068ab258c47a2fa8f73bce25c6f7df07",
        "instanceId": 11556,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2]/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2]/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:26:28)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:25:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900532975,
                "type": ""
            }
        ],
        "screenShotFile": "00ed00c5-007c-0083-0041-005b0090000c.png",
        "timestamp": 1532900532936,
        "duration": 84
    },
    {
        "description": "should click on Mechanism Search button|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "068ab258c47a2fa8f73bce25c6f7df07",
        "instanceId": 11556,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:31:31)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:30:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900533421,
                "type": ""
            }
        ],
        "screenShotFile": "00ad0003-0020-00a8-00db-000e00f80008.png",
        "timestamp": 1532900533376,
        "duration": 92
    },
    {
        "description": "should enter Mechanism ID number|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "068ab258c47a2fa8f73bce25c6f7df07",
        "instanceId": 11556,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"Mechanisms\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"Mechanisms\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:37:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should enter Mechanism ID number\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:36:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900533873,
                "type": ""
            }
        ],
        "screenShotFile": "004800ae-00b4-006d-006c-0034007200d5.png",
        "timestamp": 1532900533815,
        "duration": 134
    },
    {
        "description": "should click Mechanism Search button|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "068ab258c47a2fa8f73bce25c6f7df07",
        "instanceId": 11556,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:41:31)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click Mechanism Search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:40:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900534339,
                "type": ""
            }
        ],
        "screenShotFile": "00770051-008e-0037-004f-001600970074.png",
        "timestamp": 1532900534290,
        "duration": 86
    },
    {
        "description": "should verify Mechanism ID number in the grid|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "068ab258c47a2fa8f73bce25c6f7df07",
        "instanceId": 11556,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[1])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[1])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:46:157)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should verify Mechanism ID number in the grid\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:45:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900534757,
                "type": ""
            }
        ],
        "screenShotFile": "00080061-0054-004f-00fa-00f000350005.png",
        "timestamp": 1532900534699,
        "duration": 112
    },
    {
        "description": "should click on clear button to clear the Mechanism ID number from the Mechanism ID column |PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "068ab258c47a2fa8f73bce25c6f7df07",
        "instanceId": 11556,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[1]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[1]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:51:30)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on clear button to clear the Mechanism ID number from the Mechanism ID column \") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:50:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532900535187,
                "type": ""
            }
        ],
        "screenShotFile": "000200d8-003f-004f-0021-00950021003f.png",
        "timestamp": 1532900535142,
        "duration": 89
    },
    {
        "description": "should navigate to Mechanisms page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f6553462647c5f346bf84fdca4fb7a3",
        "instanceId": 16568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/mat-toolbar/a[3]/span/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:22:23)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should navigate to Mechanisms page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:20:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532901247175,
                "type": ""
            }
        ],
        "screenShotFile": "00d4008f-00b9-00c1-006b-007c00d70060.png",
        "timestamp": 1532901246650,
        "duration": 2840
    },
    {
        "description": "should click on Mechanism Search tab|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f6553462647c5f346bf84fdca4fb7a3",
        "instanceId": 16568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2]/span)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/mat-toolbar/a[2]/span)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:26:28)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:25:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532901249948,
                "type": ""
            }
        ],
        "screenShotFile": "00ec0055-002d-0051-00bc-00a400e300f0.png",
        "timestamp": 1532901249896,
        "duration": 88
    },
    {
        "description": "should click on Mechanism Search button|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f6553462647c5f346bf84fdca4fb7a3",
        "instanceId": 16568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:31:31)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on Mechanism Search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:30:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532901250358,
                "type": ""
            }
        ],
        "screenShotFile": "000c00ef-00ea-00c7-001c-00ad00790062.png",
        "timestamp": 1532901250299,
        "duration": 102
    },
    {
        "description": "should enter Mechanism ID number|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f6553462647c5f346bf84fdca4fb7a3",
        "instanceId": 16568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, *[id=\"Mechanisms\"])",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, *[id=\"Mechanisms\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:37:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should enter Mechanism ID number\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:36:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532901250818,
                "type": ""
            }
        ],
        "screenShotFile": "00c7006b-003c-0077-00c7-004b00e7003a.png",
        "timestamp": 1532901250766,
        "duration": 91
    },
    {
        "description": "should click Mechanism Search button|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f6553462647c5f346bf84fdca4fb7a3",
        "instanceId": 16568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[2]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:41:31)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click Mechanism Search button\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:40:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532901251236,
                "type": ""
            }
        ],
        "screenShotFile": "00dc0020-0065-00a1-0010-000500290075.png",
        "timestamp": 1532901251176,
        "duration": 115
    },
    {
        "description": "should verify Mechanism ID number in the grid|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f6553462647c5f346bf84fdca4fb7a3",
        "instanceId": 16568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[1])",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, /html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[1])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:46:157)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should verify Mechanism ID number in the grid\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:45:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532901251706,
                "type": ""
            }
        ],
        "screenShotFile": "00f30036-00d6-0058-00e3-000100e3005e.png",
        "timestamp": 1532901251657,
        "duration": 86
    },
    {
        "description": "should click on clear button to clear the Mechanism ID number from the Mechanism ID column |PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5f6553462647c5f346bf84fdca4fb7a3",
        "instanceId": 16568,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[1]/span/mat-icon)",
        "trace": "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"footer\"]/button[1]/span/mat-icon)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:51:30)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should click on clear button to clear the Mechanism ID number from the Mechanism ID column \") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:50:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:1:63)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pepfar.z14.web.core.windows.net/home - Failed to load resource: the server responded with a status of 404 (The requested content does not exist.)",
                "timestamp": 1532901252172,
                "type": ""
            }
        ],
        "screenShotFile": "00af00a9-005e-0003-0097-00d7008500f8.png",
        "timestamp": 1532901252097,
        "duration": 140
    },
    {
        "description": "should test Mechanism Search page|PEPFAR testing",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "5204c72f05c99b1703dbad7e3ca54cbb",
        "instanceId": 2480,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Failed: No element found using locator: By(css selector, .mat-form-field-infix)",
        "trace": "NoSuchElementError: No element found using locator: By(css selector, .mat-form-field-infix)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at UserContext.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:96:47)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\nFrom: Task: Run it(\"should test Mechanism Search page\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:83:5)\n    at addSpecsToSuite (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\khanf\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\khanf\\Desktop\\PEPFAR Protractor\\specPEPFAR.js:81:6)\n    at Module._compile (module.js:652:30)\n    at Object.Module._extensions..js (module.js:663:10)\n    at Module.load (module.js:565:32)\n    at tryModuleLoad (module.js:505:12)",
        "browserLogs": [],
        "screenShotFile": "00b8002e-002b-000c-0033-000e004b006b.png",
        "timestamp": 1532969972116,
        "duration": 6934
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fb7a40be1c570d1da8353ab12bcc159d",
        "instanceId": 9320,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00300082-0015-00cf-0041-00b4009400a7.png",
        "timestamp": 1532974022357,
        "duration": 15023
    },
    {
        "description": "should click on Mechanisms sub-tab|navigate to PEPFAR",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2ad4c094e405925770e4c5b41552c9fd",
        "instanceId": 8868,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.75"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000b00f3-0084-00c3-00dc-0008007200ac.png",
        "timestamp": 1532974070923,
        "duration": 14465
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};