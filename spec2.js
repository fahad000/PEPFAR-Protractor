describe('PEPFAR testing', function() 
{

var MechanismsTab = element(by.xpath('//*[@id="u_0_k"]'));
var MechanismSearchTab = element(by.xpath('//*[@id="u_0_m"]'));
 var MechanismSearchButton = element(by.xpath('//*[@id="u_0_p"]'));
// var MechanismsIDColumn = element(by.id(''));
// var VerifyMechanismIDNumber = element(by.xpath('')); 
// var VerifyMechanismName = element(by.xpath('')); 
// var DUNSNumber = element(by.xpath('')); 
// var MechanismClearButton = element(by.xpath('));

    beforeEach(function(){
    browser.waitForAngularEnabled(false);
    browser.get('https://www.facebook.com/r.php?locale=en_US&display=page');
    browser.driver.manage().window().maximize();
});


    it('should navigate to Mechanisms page', function() {
        browser.driver.sleep(1000);
        // MechanismsTab.click();
        element(by.xpath('//*[@id="u_0_k"]')).sendKeys('abcda');
        MechanismSearchTab.sendKeys('nbmnbnm');
        element(by.xpath('//*[@id="u_0_p"]')).sendKeys('1234');
        element(by.xpath('//*[@id="u_0_12"]')).click();
        browser.driver.sleep(2000);
        // MechanismSearchTab.click();
    });

    // it('should click on Mechanism Search tab', function() {
    //     MechanismSearchTab.sendKeys('nbmnbnm');
    //     browser.driver.sleep(1000);

    // });

    // it('should click on Mechanism Search button', function() {
    //   //  MechanismSearchButton.sendKeys('1234567');
    //     element(by.xpath('//*[@id="u_0_p"]')).sendKeys('1234');
    //     browser.driver.sleep(1000);
        

    // });

    // it('should enter Mechanism ID number', function() {
    //    MechanismsIDColumn.sendKeys('12342');
    // });

    // it('should click Mechanism Search button', function() {
    //     MechanismSearchButton.click();

    // });

    // it('should verify Mechanism ID number in the grid', function() {
    //     expect(element(by.xpath('/html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[1]')).getText()).toEqual('12342');

    // });
        
    // it('should click on clear button to clear the Mechanism ID number from the Mechanism ID column ', function() {
    //     MechanismClearButton.click();
 
    // });


     
    });