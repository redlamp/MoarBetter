require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"GridModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(opt) {
    var backgroundColor, base;
    if (opt == null) {
      opt = {};
    }
    exports.__super__.constructor.call(this, opt);
    this.name = "GridModule";
    this.clip = false;
    print(opt.backgroundColor);
    this.backgroundColor = opt.backgroundColor != null ? opt.backgroundColor : opt.backgroundColor = "yellow";
    this.content = new Layer({
      superLayer: this,
      name: "content",
      clip: false
    }, backgroundColor = "cyan");
    this.data = opt.data != null ? opt.data : opt.data = [];
    this.row = opt.row != null ? opt.row : opt.row = 3;
    this.col = opt.row != null ? opt.row : opt.row = void 0;
    this.cellW = opt.cellW != null ? opt.cellW : opt.cellW = (base = this.data[0]).width != null ? base.width : base.width = 100;
    this.cellH = opt.cellH != null ? opt.cellH : opt.cellH = this.cellW;
    this.margin = opt.margin != null ? opt.margin : opt.margin = 0;
    this.marginX = opt.marginX != null ? opt.marginX : opt.marginX = this.margin;
    this.marginY = opt.marginY != null ? opt.marginY : opt.marginY = this.marginX;
    if (this.width == null) {
      this.width = opt.width;
    }
    if (this.height == null) {
      this.height = opt.height;
    }
    this.drawBehavior = opt.drawBehavior != null ? opt.drawBehavior : opt.drawBehavior = this.defaultDrawBehavior;
    this.draw();
  }

  exports.prototype.add = function(cell) {
    this.data.push(cell);
    return this.draw();
  };

  exports.prototype.insert = function(cell, position) {
    [].splice.apply(this.data, [position, position - position].concat(cell)), cell;
    return this.draw();
  };

  exports.prototype.draw = function() {
    var c, cX, cY, i, j, len, ref, results;
    ref = this.data;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      c = ref[i];
      cX = (i % this.row) * (this.cellW + this.marginX);
      cY = Math.floor(i / this.row) * (this.cellH + this.marginY);
      results.push(this.drawBehavior(c, cX, cY));
    }
    return results;
  };

  exports.prototype.defaultDrawBehavior = function(c, x, y) {
    c.superLayer = this;
    c.x = x;
    return c.y = y;
  };

  exports.prototype.throttledDraw = Utils.throttle(0.1, exports.draw, {
    scorp: exports
  });

  return exports;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsR0FBRDtBQUNaLFFBQUE7O01BRGEsTUFBSTs7SUFDakIseUNBQU0sR0FBTjtJQUNBLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsS0FBQSxDQUFNLEdBQUcsQ0FBQyxlQUFWO0lBQ0EsSUFBQyxDQUFBLGVBQUQsaUNBQW1CLEdBQUcsQ0FBQyxrQkFBSixHQUFHLENBQUMsa0JBQW1CO0lBRTFDLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxLQUFBLENBQ2Q7TUFBQSxVQUFBLEVBQVksSUFBWjtNQUNBLElBQUEsRUFBTSxTQUROO01BRUEsSUFBQSxFQUFNLEtBRk47S0FEYyxFQUlkLGVBQUEsR0FBa0IsTUFKSjtJQU1mLElBQUMsQ0FBQSxJQUFELHNCQUFRLEdBQUcsQ0FBQyxPQUFKLEdBQUcsQ0FBQyxPQUFRO0lBQ3BCLElBQUMsQ0FBQSxHQUFELHFCQUFPLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ2xCLElBQUMsQ0FBQSxHQUFELHFCQUFRLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ25CLElBQUMsQ0FBQSxLQUFELHVCQUFTLEdBQUcsQ0FBQyxRQUFKLEdBQUcsQ0FBQyxrREFBaUIsQ0FBQyxZQUFELENBQUMsUUFBUztJQUN4QyxJQUFDLENBQUEsS0FBRCx1QkFBUyxHQUFHLENBQUMsUUFBSixHQUFHLENBQUMsUUFBUyxJQUFDLENBQUE7SUFDdkIsSUFBQyxDQUFBLE1BQUQsd0JBQVUsR0FBRyxDQUFDLFNBQUosR0FBRyxDQUFDLFNBQVU7SUFDeEIsSUFBQyxDQUFBLE9BQUQseUJBQVcsR0FBRyxDQUFDLFVBQUosR0FBRyxDQUFDLFVBQVcsSUFBQyxDQUFBO0lBQzNCLElBQUMsQ0FBQSxPQUFELHlCQUFXLEdBQUcsQ0FBQyxVQUFKLEdBQUcsQ0FBQyxVQUFXLElBQUMsQ0FBQTs7TUFFM0IsSUFBQyxDQUFBLFFBQVMsR0FBRyxDQUFDOzs7TUFDZCxJQUFDLENBQUEsU0FBVSxHQUFHLENBQUM7O0lBRWYsSUFBQyxDQUFBLFlBQUQsOEJBQWdCLEdBQUcsQ0FBQyxlQUFKLEdBQUcsQ0FBQyxlQUFnQixJQUFDLENBQUE7SUFJckMsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQTdCWTs7b0JBK0JiLEdBQUEsR0FBSyxTQUFDLElBQUQ7SUFDSixJQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBVyxJQUFYO1dBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQUZJOztvQkFJTCxNQUFBLEdBQVEsU0FBQyxJQUFELEVBQU8sUUFBUDtJQUNQLGtFQUE2QixJQUE3QixJQUE2QjtXQUM3QixJQUFDLENBQUEsSUFBRCxDQUFBO0VBRk87O29CQUlSLElBQUEsR0FBTSxTQUFBO0FBQ0wsUUFBQTtBQUFBO0FBQUE7U0FBQSw2Q0FBQTs7TUFDQyxFQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUksSUFBQyxDQUFBLEdBQU4sQ0FBQSxHQUFhLENBQUMsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsT0FBWDtNQUNsQixFQUFBLEdBQUssSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFBLEdBQUksSUFBQyxDQUFBLEdBQWhCLENBQUEsR0FBdUIsQ0FBQyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxPQUFYO21CQUM1QixJQUFDLENBQUEsWUFBRCxDQUFjLENBQWQsRUFBaUIsRUFBakIsRUFBcUIsRUFBckI7QUFIRDs7RUFESzs7b0JBT04sbUJBQUEsR0FBcUIsU0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7SUFDcEIsQ0FBQyxDQUFDLFVBQUYsR0FBZTtJQUNmLENBQUMsQ0FBQyxDQUFGLEdBQU07V0FDTixDQUFDLENBQUMsQ0FBRixHQUFNO0VBSGM7O29CQUtyQixhQUFBLEdBQWUsS0FBSyxDQUFDLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLE9BQUMsQ0FBQSxJQUFyQixFQUEyQjtJQUFDLEtBQUEsRUFBTyxPQUFSO0dBQTNCOzs7O0dBcERhOzs7O0FDSTdCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgbW9kdWxlLmV4cG9ydHMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdD17fSkgLT5cblx0XHRzdXBlcihvcHQpXG5cdFx0QG5hbWUgPSBcIkdyaWRNb2R1bGVcIlxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRwcmludCBvcHQuYmFja2dyb3VuZENvbG9yXG5cdFx0QGJhY2tncm91bmRDb2xvciA9IG9wdC5iYWNrZ3JvdW5kQ29sb3IgPz0gXCJ5ZWxsb3dcIlxuXHRcdFx0XHRcblx0XHRAY29udGVudCA9IG5ldyBMYXllclxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0bmFtZTogXCJjb250ZW50XCJcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBcImN5YW5cIlxuXHRcdFxuXHRcdEBkYXRhID0gb3B0LmRhdGEgPz0gW11cblx0XHRAcm93ID0gb3B0LnJvdyA/PSAzXG5cdFx0QGNvbCA9ICBvcHQucm93ID89IHVuZGVmaW5lZFxuXHRcdEBjZWxsVyA9IG9wdC5jZWxsVyA/PSBAZGF0YVswXS53aWR0aCA/PSAxMDBcblx0XHRAY2VsbEggPSBvcHQuY2VsbEggPz0gQGNlbGxXXG5cdFx0QG1hcmdpbiA9IG9wdC5tYXJnaW4gPz0gMFxuXHRcdEBtYXJnaW5YID0gb3B0Lm1hcmdpblggPz0gQG1hcmdpblxuXHRcdEBtYXJnaW5ZID0gb3B0Lm1hcmdpblkgPz0gQG1hcmdpblhcblx0XHRcdFxuXHRcdEB3aWR0aCA/PSBvcHQud2lkdGhcblx0XHRAaGVpZ2h0ID89IG9wdC5oZWlnaHRcblx0XHRcblx0XHRAZHJhd0JlaGF2aW9yID0gb3B0LmRyYXdCZWhhdmlvciA/PSBAZGVmYXVsdERyYXdCZWhhdmlvclxuXHRcdFxuI1x0XHRAZGVzdHJveVJlbWFpbmluZ1x0PSBvcHQuZGVzdG9yeVJlbWFpbmluZyA/IG9wdC5kZXN0cm95UmVtYWluaW5nIDogdHJ1ZVxuXG5cdFx0QGRyYXcoKVxuXHRcblx0YWRkOiAoY2VsbCkgLT5cblx0XHRAZGF0YS5wdXNoKGNlbGwpXG5cdFx0QGRyYXcoKVxuXHRcblx0aW5zZXJ0OiAoY2VsbCwgcG9zaXRpb24pIC0+XG5cdFx0QGRhdGFbcG9zaXRpb24uLi5wb3NpdGlvbl0gPSBjZWxsXG5cdFx0QGRyYXcoKVxuXHRcdFxuXHRkcmF3OiAtPlxuXHRcdGZvciBjLCBpIGluIEBkYXRhXG5cdFx0XHRjWCA9IChpICUgQHJvdykgKiAoQGNlbGxXICsgQG1hcmdpblgpXG5cdFx0XHRjWSA9IE1hdGguZmxvb3IoaSAvIEByb3cpICogKEBjZWxsSCArIEBtYXJnaW5ZKVxuXHRcdFx0QGRyYXdCZWhhdmlvcihjLCBjWCwgY1kpXG5cdFx0XG5cdFx0XHRcblx0ZGVmYXVsdERyYXdCZWhhdmlvcjogKGMsIHgsIHkpIC0+XG5cdFx0Yy5zdXBlckxheWVyID0gdGhpc1xuXHRcdGMueCA9IHhcblx0XHRjLnkgPSB5XG5cdFx0XHRcblx0dGhyb3R0bGVkRHJhdzogVXRpbHMudGhyb3R0bGUgMC4xLCBAZHJhdywge3Njb3JwOiB0aGlzfSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
