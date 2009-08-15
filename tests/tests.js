////////////////////////////////////////////////////////////////////////////////
module('compile');
////////////////////////////////////////////////////////////////////////////////

test(
  'single rule tag',

  function() {
    var rules = Delegator.compile('span');
    ok(rules.length == 1, 'got a single rule');
    ok(rules[0].tagName == 'SPAN', 'got expected tag');
    ok(rules[0].id == null, 'got expected id');
    ok(rules[0].className.length == 0, 'got expected number of classes');
  }
);

test(
  'single rule id',

  function() {
    var rules = Delegator.compile('#myId');
    ok(rules.length == 1, 'got a single rule');
    ok(rules[0].tagName == null, 'got expected tag');
    ok(rules[0].id == 'myId', 'got expected id');
    ok(rules[0].className.length == 0, 'got expected number of classes');
  }
);

test(
  'single rule single class',

  function() {
    var rules = Delegator.compile('.myClass');
    ok(rules.length == 1, 'got a single rule');
    ok(rules[0].tagName == null, 'got expected tag');
    ok(rules[0].id == null, 'got expected id');
    ok(rules[0].className.length == 1, 'got expected number of classes');
    ok(rules[0].className[0] == 'myClass', 'got expected class');
  }
);

test(
  'single rule two classes',

  function() {
    var rules = Delegator.compile('.myClass1.myClass2');
    ok(rules.length == 1, 'got a single rule');
    ok(rules[0].tagName == null, 'got expected tag');
    ok(rules[0].id == null, 'got expected id');
    ok(rules[0].className.length == 2, 'got expected number of classes');
    ok(rules[0].className[0] == 'myClass1', 'got expected class');
    ok(rules[0].className[1] == 'myClass2', 'got expected class');
  }
);

test(
  'single rule complext tag',

  function() {
    var rules = Delegator.compile('tag#id.class1.class2');
    ok(rules.length == 1, 'got a single rule');
    ok(rules[0].tagName == 'TAG', 'got expected tag');
    ok(rules[0].id == 'id', 'got expected id');
    ok(rules[0].className.length == 2, 'got expected number of classes');
    ok(rules[0].className[0] == 'class1', 'got expected class');
    ok(rules[0].className[1] == 'class2', 'got expected class');
  }
);

test(
  'two rules complext tag',

  function() {
    var rules = Delegator.compile('tag#id.class1.class2 tag2#id2.class3.class4');
    ok(rules.length == 2, 'got a two rules');
    ok(rules[0].tagName == 'TAG', 'got expected tag');
    ok(rules[0].id == 'id', 'got expected id');
    ok(rules[0].className.length == 2, 'got expected number of classes');
    ok(rules[0].className[0] == 'class1', 'got expected class');
    ok(rules[0].className[1] == 'class2', 'got expected class');
    ok(rules[1].tagName == 'TAG2', 'got expected tag');
    ok(rules[1].id == 'id2', 'got expected id');
    ok(rules[1].className.length == 2, 'got expected number of classes');
    ok(rules[1].className[0] == 'class3', 'got expected class');
    ok(rules[1].className[1] == 'class4', 'got expected class');
  }
);

test(
  'multi class name bug',

  function() {
    var rules = Delegator.compile('#doc .hd .actions .logout');
    ok(rules.length == 4, 'got four rules');
    ok(rules[0].id == 'doc', 'got expected id');
    ok(rules[1].className[0] == 'hd', 'got expected className');
    ok(rules[2].className[0] == 'actions', 'got expected className');
    ok(rules[3].className[0] == 'logout', 'got expected className');
  }
);

////////////////////////////////////////////////////////////////////////////////
module('human');
////////////////////////////////////////////////////////////////////////////////

test(
  'clicks',

  function() {
    // this should get called three times
    Delegator.listen('#top', 'click', function() {
                       ok(true, 'clicked on #top');
                     });

    // this should get called three times
    Delegator.listen('#top .two', 'click', function() {
                       this.className += ' clicked';
                       ok(true, 'clicked on #top .two');
                     });

    Delegator.listen('#top h2.two', 'click', function() {
                       ok(true, 'clicked on #top h2.two');
                     });

    Delegator.listen('.three', 'click', function() {
                       this.className += ' clicked';
                       ok(true, 'clicked on .three');
                     });

    Delegator.listen('#top div.two.three', 'click', function() {
                       this.className += ' clicked';
                       ok(true, 'clicked on #top h2.two');
                       start();
                     });

    expect(9);
    stop();
  }
);

test(
  'focus & blur',

  function() {
    Delegator.listen('#focus-top .one', 'focus', function() {
                       ok(true, "focus on one");
                     });

    Delegator.listen('#focus-top .one', 'blur', function() {
                       ok(true, "blur on one");
                     });

    Delegator.listen('#focus-top .two', 'focus', function() {
                       ok(true, "focus on two");
                       start();
                     });

    expect(3);
    stop();
  }
);
