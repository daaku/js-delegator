require 'test/unit'
require 'slowwatir'


class Delegator < Test::Unit::TestCase

  def test_qunit
    browser = Watir::Browser.new
    browser.goto('http://dev.streamdiff.com/delegator/tests/index.html')
    browser.await.link(:id, 'click-one').click
    browser.await.link(:id, 'click-two').click
    browser.await.link(:id, 'click-three').click
    browser.await.text_field(:id, 'focus-four').focus
    browser.await.text_field(:id, 'focus-five').focus

    assert(browser.await.h2(:class, 'pass').exists?)
  end

end
