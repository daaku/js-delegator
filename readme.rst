=========
Delegator
=========

Delegator is a mini library (1373 bytes minified & gzip) that provides Event
Delegation. It supports most of the common event types (except "change"). A CSS
like selector with limited features is used to target nodes. It supports tag,
id and class name based rules using the CSS syntax. Multiple rules may be
provided by using the comma separator. There some examples_ and `unit tests`_.
It tries to be small, dumb and fast.

.. _examples: master/examples.html
.. _unit tests: master/tests.js

Use::

    Delegator.listen('#main .user', 'click', function(ev) {
        // do something with 'this'
    });
