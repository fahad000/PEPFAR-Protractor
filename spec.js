//  describe('navigate to PEPFAR',function(){


//     it('should login as an PEPFAR User'), Function()
//     {

//          browser.get('https://ngtest.dfafacts.gov');
        // element(by.xpath("//*[@id='chkTerms']")).click();
       
        // element(by.id('chkTerms')).click();
    //    element(by.id('chkTerms')).click();

//         var elementToClick = $('chkTerms');
// browser.wait(protractor.ExpectedConditions.elementToBeClickable(elementToClick), 10000)
// .then ( function () {
//     elementToClick.click();
//  }
        
       //element(by.xpath("//div[@id='partSelection']/button[@value='0']")).click();

        // element(by.xpath("//*[@id='loginName']")).sendkeys('fahad@seleniumtester.gov');
    //     element(by.id('loginName')).sendkeys('fahad@seleniumtester.gov');
        
    //   })
//  });

// describe('launch the nextgen', function() {
//     it('should login as an pepfar', function() {
//       browser.get('https://ngtest.dfafacts.gov');
  
//      element(by.id('chkTerms')).click();
     
    //   element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    //   element(by.css('[value="add"]')).click();
  
    //   var todoList = element.all(by.repeater('todo in todoList.todos'));
    //   expect(todoList.count()).toEqual(3);
    //   expect(todoList.get(2).getText()).toEqual('write first protractor test');
  
    //   // You wrote your first test, cross it off the list
    //   todoList.get(2).element(by.css('input')).click();
    //   var completedAmount = element.all(by.css('.done-true'));
    //   expect(completedAmount.count()).toEqual(2);
//     });
//   });


// describe('angularjs homepage todo list', function() {
//     it('should add a todo', function() {
//       browser.get('https://angularjs.org');
  
//       element(by.model('todoList.todoText')).sendKeys('write first protractor test');
//       element(by.css('[value="add"]')).click();
  
//       var todoList = element.all(by.repeater('todo in todoList.todos'));
//       expect(todoList.count()).toEqual(3);
//       expect(todoList.get(2).getText()).toEqual('write first protractor test');
  
//       // You wrote your first test, cross it off the list
//       todoList.get(2).element(by.css('input')).click();
//       var completedAmount = element.all(by.css('.done-true'));
//       expect(completedAmount.count()).toEqual(2);
//     });
//   });

//   describe('navigate to PEPFAR', function() {
//     it('should login as an PEPFAR User', function() {
//      // browser.get('https://ngtest.dfafacts.gov');


//       browser.waitForAngularEnabled(false);
// browser.get('https://ngtest.dfafacts.gov');
// browser.driver.manage().window().maximize();
  
// element(by.id('chkTerms')).click();
// element(by.id('loginName')).sendKeys('System_admin_automation@test.state.gov');
// element(by.id('Password')).sendKeys('FactsInfo01!');

// // browser.driver.sleep(3000);
// element(by.id('btnLogin')).click();
// element(by.xpath('//small[.="PPR"]')).click
// browser.driver.sleep(6000);

//     });
//   });

describe('navigate to PEPFAR', function() 
{
    it('should login as an PEPFAR User', function() 
    {
        browser.waitForAngularEnabled(false);
      browser.get('http://juliemr.github.io/protractor-demo/');


     
browser.driver.manage().window().maximize();
  

// element(by.modle('first')).sendKeys(3);
// element(by.modle('second')).sendKeys(4);
// element(by.modle('first')).sendKeys(3);
element(by.xpath('/html/body/div/div/form/input[1]')).sendKeys('3');

element(by.xpath('/html/body/div/div/form/input[2]')).sendKeys('6')


// browser.driver.sleep(3000);
// element(by.id('gobutton')).click();

browser.driver.sleep(3000);

expect(element(by.className('ng-binding')).getText()).toEqual('9');

// expect(element(by.className('')))
// element(by.xpath('//small[.="PPR"]')).click
// browser.driver.sleep(6000);

    });
  });

