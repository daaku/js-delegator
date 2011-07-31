Delegator
=========

Delegator is a mini library (1.3k minified & gzip) that provides Event
Delegation. This works with click, mousedown, mouseup, mousemove, mouseover,
mouseout, keydown, keypress, keyup, blur, focus, submit (does not work with
"change" or "reset").  A CSS like selector with limited features is used to
target nodes. It supports tag, id and class name based rules using the CSS
syntax. Multiple rules may be provided by using the comma separator. There some
[examples](/nshah/js-delegator/blob/master/examples/) with also serve as unit
tests. It tries to be small, dumb and fast.

Use:

```javascript
Delegator.listen('#main .user', 'click', function(ev) {
  // do something with 'this'
});
Delegator.listen('#id .className', 'click', fn);
Delegator.listen(root, '.className', 'click', fn);
Delegator.listen(root, 'click', fn);
```
