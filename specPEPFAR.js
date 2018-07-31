describe('navigate to PEPFAR', function() {
var MechanismsTab   = element(by.xpath('/html/body/app-root/mat-toolbar/a[3]/span/span'));
var MechanismSearchTab = element(by.xpath('/html/body/app-root/app-mechanisms/mat-toolbar/a[2]'));
var searchButton = element(by.xpath('//*[@id="footer"]/button[2]'));
var mechanismIDSearch = element(by.id('mechanismID'));
var mechanismNameSearch = element(by.id('mechanismName'));
var ClearSearchButton = element(by.xpath('//*[@id="footer"]/button[1]/span/mat-icon'));
var dunsSearch = element(by.id('duns'));

beforeEach(function(){
    browser.get('https://pepfar.z14.web.core.windows.net/index.html');
    browser.driver.manage().window().maximize();
});


it('should click on Mechanisms sub-tab', function(){
    
browser.driver.sleep(1000);
    MechanismsTab.click();
    browser.driver.sleep(1000);
    
    MechanismSearchTab.click();
    browser.driver.sleep(1000);
   
    searchButton.click();
    browser.driver.sleep(1000);
    
    
    mechanismIDSearch.sendKeys('12342');
    searchButton.click();
    browser.driver.sleep(1000);
    expect(element(by.xpath('/html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[1]')).getText()).toEqual('12342');
    browser.driver.sleep(1000);
    ClearSearchButton.click();
    searchButton.click();
    browser.driver.sleep(1000);
    
    
    mechanismNameSearch.sendKeys('Daniel');
    browser.driver.sleep(1000);
    searchButton.click();
    browser.driver.sleep(1000);
    expect(element(by.xpath('/html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr/td[2]')).getText()).toEqual('Daniel');
    ClearSearchButton.click();
    searchButton.click();
    
    
    dunsSearch.sendKeys('12222');
    searchButton.click();
    expect(element(by.xpath('/html/body/app-root/app-mechanisms/app-mechanism-search/app-mechanism-search-results/div/div[2]/table/tbody/tr[1]/td[4]')).getText()).toEqual('12222');
    ClearSearchButton.click();
    searchButton.click();
 

});




// it('should click on search button', function(){
//    searchButton.click();

// });



});


// describe('navigate to PEPFAR', function() {
//     it('should login as an PEPFAR User', function() {
//       browser.get('https://pepfar.z14.web.core.windows.net/index.html');


// browser.driver.manage().window().maximize();
// element(by.xpath('/html/body/app-root/mat-toolbar/a[3]/span/span')).click();


// browser.driver.sleep(3000);
// element(by.xpath('/html/body/app-root/app-mechanisms/mat-toolbar/a[2]')).click();
// browser.driver.sleep(3000);

// element(by.xpath('//*[@id="footer"]/button[2]/span/mat-icon')).click();

  
// element(by.id('chkTerms')).click();
// element(by.id('loginName')).sendKeys('System_admin_automation@test.state.gov');
// element(by.id('Password')).sendKeys('FactsInfo01!');

// browser.driver.sleep(3000);
// element(by.id('btnLogin')).click();
//  browser.driver.sleep(5000);
// element(by.xpath('//small[.="PPR"]')).click
// browser.driver.sleep(5000);



//     });

//   });