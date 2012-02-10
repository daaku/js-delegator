var soda = require('soda')
  , path = require('path')
  , http = require('http')
  , paperboy = require('paperboy')
  , seleniumLauncher = require('selenium-launcher')

var selenium = null
  , server = null
  , port = 3333

// TODO: before/after assume starting selenium is slower than starting the
// webserver. this is probably not ideal.
exports['before'] = function(done) {
  server = http.createServer(function(req, res) {
    paperboy.deliver(path.join(path.dirname(__filename), '..'), req, res)
  })
  server.listen(port)
  seleniumLauncher(function(er, s) {
    if (er) throw er
    selenium = s
    done()
  })
}

exports['after'] = function(done) {
  server.close()
  selenium.kill()
  selenium.on('exit', function() { done() })
}

var makeTest = function(name, test) {
  exports[name] = function(done) {
    var passed = false
    test(createSodaClient(name).chain.session().setTimeout(5000))
      .testComplete()
      .end(done)
  }
}

function createSodaClient(name) {
  if (process.env.SAUCE) {
    return soda.createSauceClient({
      'url': process.env.SAUCE_URL,
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
      url: 'http://127.0.0.1:' + port + '/',
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
    .open('/examples/clicks.html')
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
    .open('/examples/focus-and-blur-on-text-input.html')
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
    .open('/examples/listen-on-element-reference.html')
    .waitForPageToLoad(2000)
    .click('css=#my-button')
    .and(waitAssertTextPresent('Click event was captured.'))
})

makeTest('listen with selector and context element', function(browser) {
  return browser
    .open('/examples/listen-with-selector-and-context-element.html')
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
    .open('/examples/submit.html')
    .waitForPageToLoad(2000)
    .click('css=#my-submit')
    .and(waitAssertTextPresent('Submit event was captured.'))
})

makeTest('submit by pressing enter in text input', function(browser) {
  var textInputLocator = 'css=#my-text'
  return browser
    .open('/examples/submit.html')
    .waitForPageToLoad(2000)
    .focus(textInputLocator)
    .keyPress(textInputLocator, 13)
    .and(waitAssertTextPresent('Submit event was captured.'))
})

makeTest('submit by pressing enter without submit elements', function(browser) {
  var textInputLocator = 'css=#my-text'
  return browser
    .open('/examples/submit-without-sumbits.html')
    .waitForPageToLoad(2000)
    .focus(textInputLocator)
    .keyPress(textInputLocator, 13)
    .and(waitAssertTextPresent('Submit event was captured.'))
})
