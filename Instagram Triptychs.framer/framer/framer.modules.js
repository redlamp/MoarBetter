require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"GridModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(opt) {
    var base, initH, initW;
    if (opt == null) {
      opt = {};
    }
    initW = opt.width;
    initH = opt.height;
    exports.__super__.constructor.call(this, opt);
    this.name = "GridModule";
    this.clip = false;
    this.backgroundColor = opt.backgroundColor;
    this.data = opt.data != null ? opt.data : opt.data = [];
    this.row = opt.row != null ? opt.row : opt.row = 3;
    this.col = opt.row != null ? opt.row : opt.row = void 0;
    this.cellW = opt.cellW != null ? opt.cellW : opt.cellW = (base = this.data[0]).width != null ? base.width : base.width = 100;
    this.cellH = opt.cellH != null ? opt.cellH : opt.cellH = this.cellW;
    this.margin = opt.margin != null ? opt.margin : opt.margin = 0;
    this.marginX = opt.marginX != null ? opt.marginX : opt.marginX = this.margin;
    this.marginY = opt.marginY != null ? opt.marginY : opt.marginY = this.marginX;
    this.width = initW != null ? initW : initW = (this.cellW + this.marginX) * this.row - this.marginX;
    this.height = initH != null ? initH : initH = this.cellH;
    this.content = new Layer({
      name: "content",
      clip: false,
      backgroundColor: "cyan",
      width: this.width,
      height: this.height,
      superLayer: this
    });
    this.drawBehavior = opt.drawBehavior != null ? opt.drawBehavior : opt.drawBehavior = this.defaultDrawBehavior;
    this.draw();
  }

  exports.prototype.add = function(cell) {
    return this.insert([cell], this.data.length);
  };

  exports.prototype.insert = function(cells, position) {
    if (position == null) {
      position = 0;
    }
    [].splice.apply(this.data, [position, position - position].concat(cells)), cells;
    this.draw();
    return cells;
  };

  exports.prototype.remove = function(position, length) {
    var c, cells, j, len, ref;
    if (length == null) {
      length = 1;
    }
    cells = this.data.slice(position, +(position + length) + 1 || 9e9);
    [].splice.apply(this.data, [position, (position + length) - position + 1].concat(ref = [])), ref;
    for (j = 0, len = cells.length; j < len; j++) {
      c = cells[j];
      if (c.superLayer === this.content) {
        c.superLayer = null;
      }
    }
    this.draw();
    return cells;
  };

  exports.prototype.draw = function() {
    var c, cX, cY, i, j, len, ref;
    ref = this.data;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      c = ref[i];
      cX = (i % this.row) * (this.cellW + this.marginX);
      cY = Math.floor(i / this.row) * (this.cellH + this.marginY);
      this.drawBehavior(c, cX, cY);
    }
    return this.updateContentSize();
  };

  exports.prototype.defaultDrawBehavior = function(c, x, y) {
    c.superLayer = this.content;
    c.x = x;
    return c.y = y;
  };

  exports.prototype.updateContentSize = function() {
    print("updateContentSize " + this.name);
    return this.content.height = this.content.contentFrame().height;
  };

  return exports;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsR0FBRDtBQUNaLFFBQUE7O01BRGEsTUFBSTs7SUFDakIsS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLEtBQUEsR0FBUSxHQUFHLENBQUM7SUFDWix5Q0FBTSxHQUFOO0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsZUFBRCxHQUFtQixHQUFHLENBQUM7SUFFdkIsSUFBQyxDQUFBLElBQUQsc0JBQVEsR0FBRyxDQUFDLE9BQUosR0FBRyxDQUFDLE9BQVE7SUFDcEIsSUFBQyxDQUFBLEdBQUQscUJBQU8sR0FBRyxDQUFDLE1BQUosR0FBRyxDQUFDLE1BQU87SUFDbEIsSUFBQyxDQUFBLEdBQUQscUJBQVEsR0FBRyxDQUFDLE1BQUosR0FBRyxDQUFDLE1BQU87SUFDbkIsSUFBQyxDQUFBLEtBQUQsdUJBQVMsR0FBRyxDQUFDLFFBQUosR0FBRyxDQUFDLGtEQUFpQixDQUFDLFlBQUQsQ0FBQyxRQUFTO0lBQ3hDLElBQUMsQ0FBQSxLQUFELHVCQUFTLEdBQUcsQ0FBQyxRQUFKLEdBQUcsQ0FBQyxRQUFTLElBQUMsQ0FBQTtJQUN2QixJQUFDLENBQUEsTUFBRCx3QkFBVSxHQUFHLENBQUMsU0FBSixHQUFHLENBQUMsU0FBVTtJQUN4QixJQUFDLENBQUEsT0FBRCx5QkFBVyxHQUFHLENBQUMs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UixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0PXt9KSAtPlxuXHRcdGluaXRXID0gb3B0LndpZHRoXG5cdFx0aW5pdEggPSBvcHQuaGVpZ2h0XG5cdFx0c3VwZXIob3B0KVxuXHRcdEBuYW1lID0gXCJHcmlkTW9kdWxlXCJcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGJhY2tncm91bmRDb2xvciA9IG9wdC5iYWNrZ3JvdW5kQ29sb3Jcblx0XG5cdFx0QGRhdGEgPSBvcHQuZGF0YSA/PSBbXVxuXHRcdEByb3cgPSBvcHQucm93ID89IDNcblx0XHRAY29sID0gIG9wdC5yb3cgPz0gdW5kZWZpbmVkXG5cdFx0QGNlbGxXID0gb3B0LmNlbGxXID89IEBkYXRhWzBdLndpZHRoID89IDEwMFxuXHRcdEBjZWxsSCA9IG9wdC5jZWxsSCA/PSBAY2VsbFdcblx0XHRAbWFyZ2luID0gb3B0Lm1hcmdpbiA/PSAwXG5cdFx0QG1hcmdpblggPSBvcHQubWFyZ2luWCA/PSBAbWFyZ2luXG5cdFx0QG1hcmdpblkgPSBvcHQubWFyZ2luWSA/PSBAbWFyZ2luWFxuXHRcdFx0XG5cdFx0QHdpZHRoID0gaW5pdFcgPz0gKEBjZWxsVyArIEBtYXJnaW5YKSAqIEByb3cgLSBAbWFyZ2luWFxuXHRcdEBoZWlnaHQgPSBpbml0SCA/PSBAY2VsbEhcblx0XHRcblx0XHRAY29udGVudCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJjb250ZW50XCJcblx0XHRcdGNsaXA6IGZhbHNlXHRcdFx0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY3lhblwiXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcblx0XHRAZHJhd0JlaGF2aW9yID0gb3B0LmRyYXdCZWhhdmlvciA/PSBAZGVmYXVsdERyYXdCZWhhdmlvclxuXHRcdFxuI1x0XHRAZGVzdHJveVJlbWFpbmluZ1x0PSBvcHQuZGVzdG9yeVJlbWFpbmluZyA/IG9wdC5kZXN0cm95UmVtYWluaW5nIDogdHJ1ZVxuXG5cdFx0QGRyYXcoKVxuXHRcblx0YWRkOiAoY2VsbCkgLT5cblx0XHRyZXR1cm4gQGluc2VydChbY2VsbF0sIEBkYXRhLmxlbmd0aClcblx0XG5cdGluc2VydDogKGNlbGxzLCBwb3NpdGlvbiA9IDApIC0+XG5cdFx0QGRhdGFbcG9zaXRpb24uLi5wb3NpdGlvbl0gPSBjZWxsc1xuXHRcdEBkcmF3KClcblx0XHRyZXR1cm4gY2VsbHNcblx0XG5cdHJlbW92ZTogKHBvc2l0aW9uLCBsZW5ndGggPSAxKSAtPlxuXHRcdGNlbGxzID0gQGRhdGFbcG9zaXRpb24uLnBvc2l0aW9uK2xlbmd0aF1cblx0XHRAZGF0YVtwb3NpdGlvbi4ucG9zaXRpb24rbGVuZ3RoXSA9IFtdXG5cdFx0Zm9yIGMgaW4gY2VsbHNcblx0XHRcdGlmIGMuc3VwZXJMYXllciA9PSBAY29udGVudFxuXHRcdFx0XHRjLnN1cGVyTGF5ZXIgPSBudWxsXG5cdFx0QGRyYXcoKVxuXHRcdHJldHVybiBjZWxsc1xuXHRcbiNcdF9kcmF3OiAtPlxuXHRkcmF3OiAtPlxuXHRcdGZvciBjLCBpIGluIEBkYXRhXG5cdFx0XHRjWCA9IChpICUgQHJvdykgKiAoQGNlbGxXICsgQG1hcmdpblgpXG5cdFx0XHRjWSA9IE1hdGguZmxvb3IoaSAvIEByb3cpICogKEBjZWxsSCArIEBtYXJnaW5ZKVxuXHRcdFx0QGRyYXdCZWhhdmlvcihjLCBjWCwgY1kpXG5cdFx0QHVwZGF0ZUNvbnRlbnRTaXplKClcblx0XG4jXHRkcmF3OiBVdGlscy50aHJvdHRsZSAwLjEsIEBfZHJhdywge3Rlc3RTY29wZTogdGhpc31cblx0XG5cdGRlZmF1bHREcmF3QmVoYXZpb3I6IChjLCB4LCB5KSAtPlxuXHRcdGMuc3VwZXJMYXllciA9IEBjb250ZW50XG5cdFx0Yy54ID0geFxuXHRcdGMueSA9IHlcblx0XG4jXHR1cGRhdGVDb250ZW50U2l6ZSA9IFV0aWxzLnRocm90dGxlIC4xLCBAX3VwZGF0ZUNvbnRlbnRTaXplXG5cdFxuI1x0X3VwZGF0ZUNvbnRlbnRTaXplOiAtPlxuXHR1cGRhdGVDb250ZW50U2l6ZTogLT5cblx0XHRwcmludCBcInVwZGF0ZUNvbnRlbnRTaXplIFwiK3RoaXMubmFtZVxuXHRcdEBjb250ZW50LmhlaWdodCA9IEBjb250ZW50LmNvbnRlbnRGcmFtZSgpLmhlaWdodCIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
