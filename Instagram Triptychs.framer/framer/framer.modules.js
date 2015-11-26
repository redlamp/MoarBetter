require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"GridModule":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(opt) {
    var base;
    if (opt == null) {
      opt = {};
    }
    exports.__super__.constructor.call(this, opt);
    this.name = "GridModule";
    this.clip = false;
    this.backgroundColor = opt.backgroundColor != null ? opt.backgroundColor : opt.backgroundColor = null;
    print("opt.backgroundColor: " + opt.backgroundColor);
    this.content = new Layer({
      superLayer: this,
      name: "content"
    }, this.backgroundColor = null, {
      clip: false
    });
    this.content.on("change:subLayers", this.updateSize);
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
    print("w: " + this.width + "\th: " + this.height);
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
    var cell, i, j, len, ref, results;
    print("draw");
    ref = this.data;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      cell = ref[i];
      cell.superLayer = this.content;
      cell.x = (i % this.row) * (this.cellW + this.marginX);
      results.push(cell.y = Math.floor(i / this.row) * (this.cellH + this.marginY));
    }
    return results;
  };

  exports.prototype.throttledDraw = Utils.throttle(0.1, exports.draw, {
    scorp: exports
  });

  exports.prototype.updateSize = function() {
    print("updateSize");
    this.width = this.contentFrame().width;
    return this.height = this.contentFrame().height;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsR0FBRDtBQUNaLFFBQUE7O01BRGEsTUFBSTs7SUFDakIseUNBQU0sR0FBTjtJQUNBLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLGVBQUQsaUNBQW1CLEdBQUcsQ0FBQyxrQkFBSixHQUFHLENBQUMsa0JBQW1CO0lBQzFDLEtBQUEsQ0FBTSx1QkFBQSxHQUF3QixHQUFHLENBQUMsZUFBbEM7SUFFQSxJQUFDLENBQUEsT0FBRCxHQUFlLElBQUEsS0FBQSxDQUNkO01BQUEsVUFBQSxFQUFZLElBQVo7TUFDQSxJQUFBLEVBQU0sU0FETjtLQURjLEVBR2QsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFITCxFQUlkO01BQUEsSUFBQSxFQUFNLEtBQU47S0FKYztJQU9mLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLGtCQUFaLEVBQWdDLElBQUMsQ0FBQSxVQUFqQztJQUdBLElBQUMsQ0FBQSxJQUFELHNCQUFRLEdBQUcsQ0FBQyxPQUFKLEdBQUcsQ0FBQyxPQUFRO0lBQ3BCLElBQUMsQ0FBQSxHQUFELHFCQUFPLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ2xCLElBQUMsQ0FBQSxHQUFELHFCQUFRLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ25CLElBQUMsQ0FBQSxLQUFELHVCQUFTLEdBQUcsQ0FBQyxRQUFKLEdBQUcsQ0FBQyxrREFBaUIsQ0FBQyxZQUFELENBQUMsUUFBUztJQUN4QyxJQUFDLENBQUEsS0FBRCx1QkFBUyxHQUFHLENBQUMsUUFBSixHQUFHLENBQUMsUUFBUyxJQUFDLENBQUE7SUFDdkIsSUFBQyxDQUFBLE1BQUQsd0JBQVUsR0FBRyxDQUFDLFNBQUosR0FBRyxDQUFDLFNBQVU7SUFDeEIsSUFBQyxDQUFBLE9BQUQseUJBQVcsR0FBRyxDQUFDLFVBQUosR0FBRyxDQUFDLFVBQVcsSUFBQyxDQUFBO0lBQzNCLElBQUMsQ0FBQSxPQUFELHlCQUFXLEdBQUcsQ0FBQyxVQUFKLEdBQUcsQ0FBQyxVQUFXLElBQUMsQ0FBQTs7TUFFM0IsSUFBQyxDQUFBLFFBQVMsR0FBRyxDQUFDOzs7TUFDZCxJQUFDLENBQUEsU0FBVSxHQUFHLENBQUM7O0lBRWYsS0FBQSxDQUFNLEtBQUEsR0FBUSxJQUFDLENBQUEsS0FBVCxHQUFpQixPQUFqQixHQUEyQixJQUFDLENBQUEsTUFBbEM7SUFHQSxJQUFDLENBQUEsSUFBRCxDQUFBO0VBaENZOztvQkFrQ2IsR0FBQSxHQUFLLFNBQUMsSUFBRDtJQUVKLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixDQUFXLElBQVg7V0FDQSxJQUFDLENBQUEsSUFBRCxDQUFBO0VBSEk7O29CQUtMLE1BQUEsR0FBUSxTQUFDLElBQUQsRUFBTyxRQUFQO0lBQ1Asa0VBQTZCLElBQTdCLElBQTZCO1dBQzdCLElBQUMsQ0FBQSxJQUFELENBQUE7RUFGTzs7b0JBSVIsSUFBQSxHQUFNLFNBQUE7QUFDTCxRQUFBO0lBQUEsS0FBQSxDQUFNLE1BQU47QUFDQTtBQUFBO1NBQUEsNkNBQUE7O01BQ0MsSUFBSSxDQUFDLFVBQUwsR0FBa0IsSUFBQyxDQUFBO01BQ25CLElBQUksQ0FBQyxDQUFMLEdBQVMsQ0FBQyxDQUFBLEdBQUksSUFBQyxDQUFBLEdBQU4sQ0FBQSxHQUFhLENBQUMsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsT0FBWDttQkFDdEIsSUFBSSxDQUFDLENBQUwsR0FBUyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUEsR0FBSSxJQUFDLENBQUEsR0FBaEIsQ0FBQSxHQUF1QixDQUFDLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLE9BQVg7QUFIakM7O0VBRks7O29CQVVOLGFBQUEsR0FBZSxLQUFLLENBQUMsUUFBTixDQUFlLEdBQWYsRUFBb0IsT0FBQyxDQUFBLElBQXJCLEVBQTJCO0lBQUMsS0FBQSxFQUFPLE9BQVI7R0FBM0I7O29CQUVmLFVBQUEsR0FBWSxTQUFBO0lBQ1gsS0FBQSxDQUFNLFlBQU47SUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxZQUFELENBQUEsQ0FBZSxDQUFDO1dBQ3pCLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUFlLENBQUM7RUFIZjs7OztHQXhEZ0I7Ozs7QUNJN0IsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0PXt9KSAtPlxuXHRcdHN1cGVyKG9wdClcblx0XHRAbmFtZSA9IFwiR3JpZE1vZHVsZVwiXG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBvcHQuYmFja2dyb3VuZENvbG9yID89IG51bGxcblx0XHRwcmludCBcIm9wdC5iYWNrZ3JvdW5kQ29sb3I6IFwiK29wdC5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcblx0XHRAY29udGVudCA9IG5ldyBMYXllclxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0bmFtZTogXCJjb250ZW50XCJcblx0XHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0XHRjbGlwOiBmYWxzZVxuXHRcdFx0XG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIEB1cGRhdGVTaXplXG5cdFx0XHQjIFRPRE86IGFkanVzdCBHcmlkIGFuZCBjb250ZW50IHNpemUgd2hlbiBhc3NldHMgYXJlIGFkZGVkXG5cdFx0XG5cdFx0QGRhdGEgPSBvcHQuZGF0YSA/PSBbXVxuXHRcdEByb3cgPSBvcHQucm93ID89IDNcblx0XHRAY29sID0gIG9wdC5yb3cgPz0gdW5kZWZpbmVkXG5cdFx0QGNlbGxXID0gb3B0LmNlbGxXID89IEBkYXRhWzBdLndpZHRoID89IDEwMFxuXHRcdEBjZWxsSCA9IG9wdC5jZWxsSCA/PSBAY2VsbFdcblx0XHRAbWFyZ2luID0gb3B0Lm1hcmdpbiA/PSAwXG5cdFx0QG1hcmdpblggPSBvcHQubWFyZ2luWCA/PSBAbWFyZ2luXG5cdFx0QG1hcmdpblkgPSBvcHQubWFyZ2luWSA/PSBAbWFyZ2luWFxuXHRcdFx0XG5cdFx0QHdpZHRoID89IG9wdC53aWR0aFxuXHRcdEBoZWlnaHQgPz0gb3B0LmhlaWdodFxuXHRcdFxuXHRcdHByaW50IFwidzogXCIgKyBAd2lkdGggKyBcIlxcdGg6IFwiICsgQGhlaWdodFxuI1x0XHRAZGVzdHJveVJlbWFpbmluZ1x0PSBvcHQuZGVzdG9yeVJlbWFpbmluZyA/IG9wdC5kZXN0cm95UmVtYWluaW5nIDogdHJ1ZVxuXG5cdFx0QGRyYXcoKVxuXHRcblx0YWRkOiAoY2VsbCkgLT5cbiNcdFx0cHJpbnQgXCJhZGQ6ICBcIiArIGNlbGxcblx0XHRAZGF0YS5wdXNoKGNlbGwpXG5cdFx0QGRyYXcoKVxuXHRcblx0aW5zZXJ0OiAoY2VsbCwgcG9zaXRpb24pIC0+XG5cdFx0QGRhdGFbcG9zaXRpb24uLi5wb3NpdGlvbl0gPSBjZWxsXG5cdFx0QGRyYXcoKVxuXHRcblx0ZHJhdzogLT5cblx0XHRwcmludCBcImRyYXdcIlxuXHRcdGZvciBjZWxsLCBpIGluIEBkYXRhXG5cdFx0XHRjZWxsLnN1cGVyTGF5ZXIgPSBAY29udGVudFxuXHRcdFx0Y2VsbC54ID0gKGkgJSBAcm93KSAqIChAY2VsbFcgKyBAbWFyZ2luWClcblx0XHRcdGNlbGwueSA9IE1hdGguZmxvb3IoaSAvIEByb3cpICogKEBjZWxsSCArIEBtYXJnaW5ZKVxuI1x0XHRcdHByaW50IFwiY2VsbDogXCIraVxuI1x0XHRcdHByaW50IFwiXFx0eDogKFwiK2krXCIlXCIrQHJvdytcIikqKFwiK0BjZWxsVytcIitcIitAbWFyZ2luWCtcIilcXHR4OiBcIitjZWxsLnhcbiNcdFx0XHRwcmludCBcIlxcdHk6IChcIitpK1wiL1wiK0Byb3crXCIpKihcIitAY2VsbEgrXCIrXCIrQG1hcmdpblkrXCIpXFx0eTogXCIrY2VsbC55XG5cdFx0XHRcblx0dGhyb3R0bGVkRHJhdzogVXRpbHMudGhyb3R0bGUgMC4xLCBAZHJhdywge3Njb3JwOiB0aGlzfVxuXHRcblx0dXBkYXRlU2l6ZTogLT5cblx0XHRwcmludCBcInVwZGF0ZVNpemVcIlxuXHRcdEB3aWR0aCA9IEBjb250ZW50RnJhbWUoKS53aWR0aFxuXHRcdEBoZWlnaHQgPSBAY29udGVudEZyYW1lKCkuaGVpZ2h0IiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
