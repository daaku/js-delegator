require 'test/unit'
require 'watir'


class Delegator < Test::Unit::TestCase

  def test_qunit
    browser = Watir::Browser.new
    browser.goto('http://dev.streamdiff.com/delegator/tests/index.html')
    browser.link(:id, 'click-one').click
    browser.link(:id, 'click-two').click
    browser.link(:id, 'click-three').click
    sleep 1
    browser.text_field(:id, 'focus-four').focus
    browser.text_field(:id, 'focus-five').focus
    sleep 0.2
    assert('pass' == browser.h2(:id, 'banner').attribute_value('className'))
  end

end
