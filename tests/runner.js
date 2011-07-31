var soda = require('soda')
  , assert = require('assert')

var makeTest = function(name, test) {
  exports[name] = function(beforeExit) {
    var passed = false
    test(createSodaClient(name).chain.session().setTimeout(5000))
      .testComplete()
      .end(function(er) {
        if (er) throw er
        passed = true
      })
    beforeExit(function() {
      assert.ok(passed, name + ' passed')
    })
  }
}

function createSodaClient(name) {
  if (process.env.SAUCE) {
    return soda.createSauceClient({
      'url': 'http://w.daaku.org/',
      'username': process.env.SAUCE_USER,
      'access-key': process.env.SAUCE_KEY,
      'os': process.env.SAUCE_OS || 'Windows 2003',
      'browser': process.env.SAUCE_BROWSER || 'firefox',
      'browser-version': process.env.SAUCE_BROWSER_VERSION || '3.6',
      'max-duration': 90,
      'name': name,
    })
  } else {
    return soda.createClient({
      url: 'http://w.daaku.org/',
      host: '127.0.0.1',
      port: 4444,
    })
  }
}

var waitAssertTextPresent = function(text) {
  return function(browser) {
    browser
      .waitForTextPresent(text)
      .assertTextPresent(text)
  }
}

makeTest('clicks', function(browser) {
  return browser
    .open('/js-delegator/examples/clicks.html')
    .waitForPageToLoad(2000)
    .click('css=#click-one')
    .and(waitAssertTextPresent('1) #top was clicked.'))
    .and(waitAssertTextPresent('2) #top .two was clicked.'))
    .click('css=#click-two')
    .and(waitAssertTextPresent('3) #top was clicked.'))
    .and(waitAssertTextPresent('4) #top .two was clicked.'))
    .and(waitAssertTextPresent('5) #top h2.two was clicked.'))
    .click('css=#click-three')
    .and(waitAssertTextPresent('6) .three was clicked.'))
    .and(waitAssertTextPresent('7) #top was clicked.'))
    .and(waitAssertTextPresent('8) #top .two was clicked.'))
    .and(waitAssertTextPresent('9) #top div.two.three was clicked.'))
})

makeTest('focus and blur on text input', function(browser) {
  return browser
    .open('/js-delegator/examples/focus-and-blur-on-text-input.html')
    .waitForPageToLoad(2000)
    .fireEvent('css=#my-text-one', 'focus')
    .and(waitAssertTextPresent('1) focus #my-context .one'))
    .fireEvent('css=#my-text-one', 'blur')
    .and(waitAssertTextPresent('2) blur #my-context .one'))
    .fireEvent('css=#my-text-two', 'focus')
    .and(waitAssertTextPresent('3) focus #my-context .two'))
})

makeTest('listen on element reference', function(browser) {
  return browser
    .open('/js-delegator/examples/listen-on-element-reference.html')
    .waitForPageToLoad(2000)
    .click('css=#my-button')
    .and(waitAssertTextPresent('Click event was captured.'))
})

makeTest('listen with selector and context element', function(browser) {
  return browser
    .open('/js-delegator/examples/listen-with-selector-and-context-element.html')
    .waitForPageToLoad(2000)
    .click('css=#my-outside-button')
    .click('css=#my-inside-button')
    .and(waitAssertTextPresent('1) Click event was captured'))
    .click('css=#my-outside-button')
    .click('css=#my-inside-button')
    .and(waitAssertTextPresent('2) Click event was captured'))
})

makeTest('submit using submit button', function(browser) {
  return browser
    .open('/js-delegator/examples/submit.html')
    .waitForPageToLoad(2000)
    .click('css=#my-submit')
    .and(waitAssertTextPresent('Submit event was captured.'))
})

makeTest('submit by pressing enter in text input', function(browser) {
  var textInputLocator = 'css=#my-text'
  return browser
    .open('/js-delegator/examples/submit.html')
    .waitForPageToLoad(2000)
    .focus(textInputLocator)
    .keyPress(textInputLocator, 13)
    .and(waitAssertTextPresent('Submit event was captured.'))
})
