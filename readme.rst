=========
Delegator
=========

Delegator is a mini library (~1k minified & gzip) that provides Event
Delegation. It supports most of the common event types (except "submit"
and "change"). A CSS like selector with limited features is used to
target nodes. It supports tag, id and class name based rules using the
CSS syntax. Multiple rules may be provided by using the comman
separator. There is a suite of unit tests, which also serve as examples:
html_, js_. It tries to be small, dumb and fast.

.. _html: master/index.html
.. _js: master/tests.js

Use::

    Delegator.listen('#main .user', 'click', function(ev) {
        // do something with 'this'
    });

