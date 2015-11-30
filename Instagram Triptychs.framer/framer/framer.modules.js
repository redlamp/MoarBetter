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
      backgroundColor: null,
      width: this.width,
      height: this.height,
      superLayer: this
    });
    this.content.on("change:height", function() {
      if (this.superLayer.height < this.height) {
        return this.superLayer.height = this.height;
      }
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
    print("GridModule.draw()");
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
    print("GridModule.updateContentSize()");
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsR0FBRDtBQUNaLFFBQUE7O01BRGEsTUFBSTs7SUFDakIsS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLEtBQUEsR0FBUSxHQUFHLENBQUM7SUFDWix5Q0FBTSxHQUFOO0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsZUFBRCxHQUFtQixHQUFHLENBQUM7SUFFdkIsSUFBQyxDQUFBLElBQUQsc0JBQVEsR0FBRyxDQUFDLE9BQUosR0FBRyxDQUFDLE9BQVE7SUFDcEIsSUFBQyxDQUFBLEdBQUQscUJBQU8sR0FBRyxDQUFDLE1BQUosR0FBRyxDQUFDLE1BQU87SUFDbEIsSUFBQyxDQUFBLEdBQUQscUJBQVEsR0FBRyxDQUFDLE1BQUosR0FBRyxDQUFDLE1BQU87SUFDbkIsSUFBQyxDQUFBLEtBQUQsdUJBQVMsR0FBRyxDQUFDLFFBQUosR0FBRyxDQUFDLGtEQUFpQixDQUFDLFlBQUQsQ0FBQyxRQUFTO0lBQ3hDLElBQUMsQ0FBQSxLQUFELHVCQUFTLEdBQUcsQ0FBQyxRQUFKLEdBQUcsQ0FBQyxRQUFTLElBQUMsQ0FBQTtJQUN2QixJQUFDLENBQUEsTUFBRCx3QkFBVSxHQUFHLENBQUMsU0FBSixHQUFHLENBQUMsU0FBVTtJQUN4QixJQUFDLENBQUEsT0FBRCx5QkFBVyxHQUFHLENBQUMsVUFBSixHQUFHLENBQUMsVUFBVyxJQUFDLENBQUE7SUFDM0IsSUFBQyxDQUFBLE9BQUQseUJBQVcsR0FBRyxDQUFDLFVBQUosR0FBRyxDQUFDLFVBQVcsSUFBQyxDQUFBO0lBRTNCLElBQUMsQ0FBQSxLQUFELG1CQUFTLFFBQUEsUUFBUyxDQUFDLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLE9BQVgsQ0FBQSxHQUFzQixJQUFDLENBQUEsR0FBdkIsR0FBNkIsSUFBQyxDQUFBO0lBQ2hELElBQUMsQ0FBQSxNQUFELG1CQUFVLFFBQUEsUUFBUyxJQUFDLENBQUE7SUFFcEIsSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLEtBQUEsQ0FDZDtNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsSUFBQSxFQUFNLEtBRE47TUFFQSxlQUFBLEVBQWlCLElBRmpCO01BR0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUhSO01BSUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUpUO01BS0EsVUFBQSxFQUFZLElBTFo7S0FEYztJQVFmLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLGVBQVosRUFBNkIsU0FBQTtNQUM1QixJQUFHLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFxQixJQUFDLENBQUEsTUFBekI7ZUFDQyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsSUFBQyxDQUFBLE9BRHZCOztJQUQ0QixDQUE3QjtJQUlBLElBQUMsQ0FBQSxZQUFELDhCQUFnQixHQUFHLENBQUMsZUFBSixHQUFHLENBQUMsZUFBZ0IsSUFBQyxDQUFBO0lBSXJDLElBQUMsQ0FBQSxJQUFELENBQUE7RUFwQ1k7O29CQXNDYixHQUFBLEdBQUssU0FBQyxJQUFEO0FBQ0osV0FBTyxJQUFDLENBQUEsTUFBRCxDQUFRLENBQUMsSUFBRCxDQUFSLEVBQWdCLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBdEI7RUFESDs7b0JBR0wsTUFBQSxHQUFRLFNBQUMsS0FBRCxFQUFRLFFBQVI7O01BQVEsV0FBVzs7SUFDMUIsa0VBQTZCLEtBQTdCLElBQTZCO0lBQzdCLElBQUMsQ0FBQSxJQUFELENBQUE7QUFDQSxXQUFPO0VBSEE7O29CQUtSLE1BQUEsR0FBUSxTQUFDLFFBQUQsRUFBVyxNQUFYO0FBQ1AsUUFBQTs7TUFEa0IsU0FBUzs7SUFDM0IsS0FBQSxHQUFRLElBQUMsQ0FBQSxJQUFLO0lBQ2QsdUZBQW1DLEVBQW5DLElBQW1DO0FBQ25DLFNBQUEsdUNBQUE7O01BQ0MsSUFBRyxDQUFDLENBQUMsVUFBRixLQUFnQixJQUFDLENBQUEsT0FBcEI7UUFDQyxDQUFDLENBQUMsVUFBRixHQUFlLEtBRGhCOztBQUREO0lBR0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtBQUNBLFdBQU87RUFQQTs7b0JBVVIsSUFBQSxHQUFNLFNBQUE7QUFDTCxRQUFBO0lBQUEsS0FBQSxDQUFNLG1CQUFOO0FBQ0E7QUFBQSxTQUFBLDZDQUFBOztNQUNDLEVBQUEsR0FBSyxDQUFDLENBQUEsR0FBSSxJQUFDLENBQUEsR0FBTixDQUFBLEdBQWEsQ0FBQyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxPQUFYO01BQ2xCLEVBQUEsR0FBSyxJQUFJLENBQUMsS0FBTCxDQUFXLENBQUEsR0FBSSxJQUFDLENBQUEsR0FBaEIsQ0FBQSxHQUF1QixDQUFDLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLE9BQVg7TUFDNUIsSUFBQyxDQUFBLFlBQUQsQ0FBYyxDQUFkLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCO0FBSEQ7V0FJQSxJQUFDLENBQUEsaUJBQUQsQ0FBQTtFQU5LOztvQkFVTixtQkFBQSxHQUFxQixTQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUDtJQUNwQixDQUFDLENBQUMsVUFBRixHQUFlLElBQUMsQ0FBQTtJQUNoQixDQUFDLENBQUMsQ0FBRixHQUFNO1dBQ04sQ0FBQyxDQUFDLENBQUYsR0FBTTtFQUhjOztvQkFRckIsaUJBQUEsR0FBbUIsU0FBQTtJQUNsQixLQUFBLENBQU0sZ0NBQU47V0FDQSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQUEsQ0FBdUIsQ0FBQztFQUZ4Qjs7OztHQTNFUzs7OztBQ0k3QixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHQ9e30pIC0+XG5cdFx0aW5pdFcgPSBvcHQud2lkdGhcblx0XHRpbml0SCA9IG9wdC5oZWlnaHRcblx0XHRzdXBlcihvcHQpXG5cdFx0QG5hbWUgPSBcIkdyaWRNb2R1bGVcIlxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAYmFja2dyb3VuZENvbG9yID0gb3B0LmJhY2tncm91bmRDb2xvclxuXHRcblx0XHRAZGF0YSA9IG9wdC5kYXRhID89IFtdXG5cdFx0QHJvdyA9IG9wdC5yb3cgPz0gM1xuXHRcdEBjb2wgPSAgb3B0LnJvdyA/PSB1bmRlZmluZWRcblx0XHRAY2VsbFcgPSBvcHQuY2VsbFcgPz0gQGRhdGFbMF0ud2lkdGggPz0gMTAwXG5cdFx0QGNlbGxIID0gb3B0LmNlbGxIID89IEBjZWxsV1xuXHRcdEBtYXJnaW4gPSBvcHQubWFyZ2luID89IDBcblx0XHRAbWFyZ2luWCA9IG9wdC5tYXJnaW5YID89IEBtYXJnaW5cblx0XHRAbWFyZ2luWSA9IG9wdC5tYXJnaW5ZID89IEBtYXJnaW5YXG5cdFx0XHRcblx0XHRAd2lkdGggPSBpbml0VyA/PSAoQGNlbGxXICsgQG1hcmdpblgpICogQHJvdyAtIEBtYXJnaW5YXG5cdFx0QGhlaWdodCA9IGluaXRIID89IEBjZWxsSFxuXHRcdFxuXHRcdEBjb250ZW50ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImNvbnRlbnRcIlxuXHRcdFx0Y2xpcDogZmFsc2VcdFx0XHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6aGVpZ2h0XCIsIC0+XG5cdFx0XHRpZiBAc3VwZXJMYXllci5oZWlnaHQgPCBAaGVpZ2h0XG5cdFx0XHRcdEBzdXBlckxheWVyLmhlaWdodCA9IEBoZWlnaHRcblx0XHRcblx0XHRAZHJhd0JlaGF2aW9yID0gb3B0LmRyYXdCZWhhdmlvciA/PSBAZGVmYXVsdERyYXdCZWhhdmlvclxuXHRcdFxuI1x0XHRAZGVzdHJveVJlbWFpbmluZ1x0PSBvcHQuZGVzdG9yeVJlbWFpbmluZyA/IG9wdC5kZXN0cm95UmVtYWluaW5nIDogdHJ1ZVxuXG5cdFx0QGRyYXcoKVxuXHRcblx0YWRkOiAoY2VsbCkgLT5cblx0XHRyZXR1cm4gQGluc2VydChbY2VsbF0sIEBkYXRhLmxlbmd0aClcblx0XG5cdGluc2VydDogKGNlbGxzLCBwb3NpdGlvbiA9IDApIC0+XG5cdFx0QGRhdGFbcG9zaXRpb24uLi5wb3NpdGlvbl0gPSBjZWxsc1xuXHRcdEBkcmF3KClcblx0XHRyZXR1cm4gY2VsbHNcblx0XG5cdHJlbW92ZTogKHBvc2l0aW9uLCBsZW5ndGggPSAxKSAtPlxuXHRcdGNlbGxzID0gQGRhdGFbcG9zaXRpb24uLnBvc2l0aW9uK2xlbmd0aF1cblx0XHRAZGF0YVtwb3NpdGlvbi4ucG9zaXRpb24rbGVuZ3RoXSA9IFtdXG5cdFx0Zm9yIGMgaW4gY2VsbHNcblx0XHRcdGlmIGMuc3VwZXJMYXllciA9PSBAY29udGVudFxuXHRcdFx0XHRjLnN1cGVyTGF5ZXIgPSBudWxsXG5cdFx0QGRyYXcoKVxuXHRcdHJldHVybiBjZWxsc1xuXHRcbiNcdF9kcmF3OiAtPlxuXHRkcmF3OiAtPlxuXHRcdHByaW50IFwiR3JpZE1vZHVsZS5kcmF3KClcIlxuXHRcdGZvciBjLCBpIGluIEBkYXRhXG5cdFx0XHRjWCA9IChpICUgQHJvdykgKiAoQGNlbGxXICsgQG1hcmdpblgpXG5cdFx0XHRjWSA9IE1hdGguZmxvb3IoaSAvIEByb3cpICogKEBjZWxsSCArIEBtYXJnaW5ZKVxuXHRcdFx0QGRyYXdCZWhhdmlvcihjLCBjWCwgY1kpXG5cdFx0QHVwZGF0ZUNvbnRlbnRTaXplKClcblx0XG4jXHRkcmF3OiBVdGlscy50aHJvdHRsZSAwLjEsIEBfZHJhdywge3Rlc3RTY29wZTogdGhpc31cblx0XG5cdGRlZmF1bHREcmF3QmVoYXZpb3I6IChjLCB4LCB5KSAtPlxuXHRcdGMuc3VwZXJMYXllciA9IEBjb250ZW50XG5cdFx0Yy54ID0geFxuXHRcdGMueSA9IHlcblx0XG4jXHR1cGRhdGVDb250ZW50U2l6ZSA9IFV0aWxzLnRocm90dGxlIC4xLCBAX3VwZGF0ZUNvbnRlbnRTaXplXG5cdFxuI1x0X3VwZGF0ZUNvbnRlbnRTaXplOiAtPlxuXHR1cGRhdGVDb250ZW50U2l6ZTogLT5cblx0XHRwcmludCBcIkdyaWRNb2R1bGUudXBkYXRlQ29udGVudFNpemUoKVwiXG5cdFx0QGNvbnRlbnQuaGVpZ2h0ID0gQGNvbnRlbnQuY29udGVudEZyYW1lKCkuaGVpZ2h0IiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
