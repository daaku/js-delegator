var assert = require('assert')
  , Delegator = require('delegator')

exports['single rule tag'] = function() {
  var rules = Delegator.compile('span');
  assert.equal(rules.length, 1, 'got a single rule');
  assert.equal(rules[0].tagName, 'SPAN', 'got expected tag');
  assert.equal(rules[0].id, null, 'got expected id');
  assert.equal(rules[0].className.length, 0, 'got expected number of classes');
}

exports['single rule id'] = function() {
  var rules = Delegator.compile('#myId');
  assert.equal(rules.length, 1, 'got a single rule');
  assert.equal(rules[0].tagName, null, 'got expected tag');
  assert.equal(rules[0].id, 'myId', 'got expected id');
  assert.equal(rules[0].className.length, 0, 'got expected number of classes');
}

exports['single rule single class'] = function() {
  var rules = Delegator.compile('.myClass');
  assert.equal(rules.length, 1, 'got a single rule');
  assert.equal(rules[0].tagName, null, 'got expected tag');
  assert.equal(rules[0].id, null, 'got expected id');
  assert.equal(rules[0].className.length, 1, 'got expected number of classes');
  assert.equal(rules[0].className[0], 'myClass', 'got expected class');
}

exports['single rule two classes'] = function() {
  var rules = Delegator.compile('.myClass1.myClass2');
  assert.equal(rules.length, 1, 'got a single rule');
  assert.equal(rules[0].tagName, null, 'got expected tag');
  assert.equal(rules[0].id, null, 'got expected id');
  assert.equal(rules[0].className.length, 2, 'got expected number of classes');
  assert.equal(rules[0].className[0], 'myClass1', 'got expected class');
  assert.equal(rules[0].className[1], 'myClass2', 'got expected class');
}

exports['single rule complext tag'] = function() {
  var rules = Delegator.compile('tag#id.class1.class2');
  assert.equal(rules.length, 1, 'got a single rule');
  assert.equal(rules[0].tagName, 'TAG', 'got expected tag');
  assert.equal(rules[0].id, 'id', 'got expected id');
  assert.equal(rules[0].className.length, 2, 'got expected number of classes');
  assert.equal(rules[0].className[0], 'class1', 'got expected class');
  assert.equal(rules[0].className[1], 'class2', 'got expected class');
}

exports['two rules complext tag'] = function() {
  var rules = Delegator.compile('tag#id.class1.class2 tag2#id2.class3.class4');
  assert.equal(rules.length, 2, 'got a two rules');
  assert.equal(rules[0].tagName, 'TAG', 'got expected tag');
  assert.equal(rules[0].id, 'id', 'got expected id');
  assert.equal(rules[0].className.length, 2, 'got expected number of classes');
  assert.equal(rules[0].className[0], 'class1', 'got expected class');
  assert.equal(rules[0].className[1], 'class2', 'got expected class');
  assert.equal(rules[1].tagName, 'TAG2', 'got expected tag');
  assert.equal(rules[1].id, 'id2', 'got expected id');
  assert.equal(rules[1].className.length, 2, 'got expected number of classes');
  assert.equal(rules[1].className[0], 'class3', 'got expected class');
  assert.equal(rules[1].className[1], 'class4', 'got expected class');
}

exports['multi class name bug'] = function() {
  var rules = Delegator.compile('#doc .hd .actions .logout');
  assert.equal(rules.length, 4, 'got four rules');
  assert.equal(rules[0].id, 'doc', 'got expected id');
  assert.equal(rules[1].className[0], 'hd', 'got expected className');
  assert.equal(rules[2].className[0], 'actions', 'got expected className');
  assert.equal(rules[3].className[0], 'logout', 'got expected className');
}
