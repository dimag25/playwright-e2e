const fs = require("fs");


let suites = ['Newsletter', 'Regression', 'UserRegistration', 'Login'];

// let suites = ['UserRegistration'];


suites.forEach(suite => {
    fs.readFile('src/template/suite.spec.ts', function (err, data) {
        console.log("Reading from file...");
        if (err) {
            return console.error(err);
        }
        let testSuite = data.toString().replace('Regression.json', suite + '.json');
        testSuite = testSuite.replace('Suite: SuiteName', 'Suite: '+suite)
        fs.writeFile("src/tests/"+suite+".suite.spec.ts", testSuite, function (err) {
            console.log("Writing to file...");    
            if (err) {
                return console.log("error");
            }
        });
    });    
});