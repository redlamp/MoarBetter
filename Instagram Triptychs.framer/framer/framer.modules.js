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
    this.ref = this;
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

  exports.prototype.getData = function() {
    return this.data.slice(0);
  };

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

  exports.prototype.defaultDrawBehavior = function(c, x, y, i) {
    c.superLayer = this.content;
    c.x = x;
    return c.y = y;
  };

  exports.prototype.draw = function() {
    var c, cX, cY, i, j, len, ref;
    ref = this.data;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      c = ref[i];
      cX = (i % this.row) * (this.cellW + this.marginX);
      cY = Math.floor(i / this.row) * (this.cellH + this.marginY);
      this.drawBehavior(c, cX, cY, i);
    }
    return this.updateContentSize();
  };

  exports.prototype.updateContentSize = function() {
    return this.content.height = this.content.contentFrame().height;
  };

  return exports;

})(Layer);


},{}],"GroupFocus":[function(require,module,exports){


},{}],"InstaImage":[function(require,module,exports){
var imageCount, imageLabelStyle, imageValueStyle,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

imageCount = 0;

imageValueStyle = new Layer;

imageValueStyle = {
  "font-family": "SFUIDisplay-Light",
  "font-size": "48px",
  "text-align": "right",
  "color": "#ffffff",
  "line-height": "58px",
  "text-shadow": "1px 2px 0px rgba(0,0,0,0.50)"
};

imageLabelStyle = {
  "font-family": "SFUIDisplay-Black",
  "font-size": "18px",
  "color": "#FFFFFF",
  "line-height": "21px",
  "text-shadow": "1px 2px 0px rgba(0,0,0,0.50)"
};

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(opt) {
    var initH, initW, ref;
    if (opt == null) {
      opt = {};
    }
    initW = opt.width;
    initH = opt.height;
    exports.__super__.constructor.call(this, opt);
    this.configDisplay();
    this.setImage(opt.imageID != null ? opt.imageID : opt.imageID = imageCount++);
    this.setPosition(opt.pos != null ? opt.pos : opt.pos = -1);
    this.setGroup((ref = opt.groupID) != null ? ref : -1);
    this.name = opt.name != null ? opt.name : opt.name = "InstaImage_" + this.imageID;
    this.width = initW != null ? initW : initW = 248;
    this.height = initH != null ? initH : initH = this.width;
    this.clip = opt.clip != null ? opt.clip : opt.clip = false;
    this.backgroundColor = opt.backgroundColor;
  }

  exports.prototype.setImage = function(val) {
    this.imageID = val != null ? val : val = this.imageID;
    this.imageVal.html = this.imageID + 1;
    return this.imageVal.style = imageValueStyle;
  };

  exports.prototype.setPosition = function(val) {
    this.pos = val != null ? val : val = this.pos;
    this.positionVal.html = this.pos + 1;
    return this.positionVal.style = imageValueStyle;
  };

  exports.prototype.setGroup = function(val) {
    this.groupID = val != null ? val : val = this.groupID != null ? this.groupID : this.groupID = -1;
    if (this.groupID >= 0) {
      this.groupVal.html = this.groupID + 1;
      this.groupVal.style = imageValueStyle;
      this.groupLabel.html = "GROUP";
      this.groupVal.opacity = this.groupLabel.opacity = 1;
      this.bg.backgroundColor = "#D0021B";
      return this.bg.hueRotate = this.groupID * 66;
    } else {
      this.groupVal.html = "";
      this.groupLabel.html = "NO GROUP";
      return this.groupVal.opacity = this.groupLabel.opacity = .5;
    }
  };

  exports.prototype.configDisplay = function() {
    this.bg = new Layer({
      superLayer: this,
      width: 248,
      height: 248,
      backgroundColor: "#bbbbbb"
    });
    this.imageLabel = new Layer({
      name: "imageLabel",
      superLayer: this,
      x: 128,
      y: 59,
      html: "IMAGE",
      style: imageLabelStyle
    });
    this.imageVal = new Layer({
      name: "imageVal",
      superLayer: this,
      x: 32,
      y: 29,
      width: 86,
      html: "",
      style: imageValueStyle
    });
    this.positionLabel = new Layer({
      name: "imageLabel",
      superLayer: this,
      x: 128,
      y: 117,
      html: "POSITION",
      style: imageLabelStyle
    });
    this.positionVal = new Layer({
      name: "positionVal",
      superLayer: this,
      x: 32,
      y: 88,
      width: 85,
      html: "",
      style: imageValueStyle
    });
    this.groupLabel = new Layer({
      name: "groupLabel",
      superLayer: this,
      x: 128,
      y: 175,
      html: "GROUP",
      style: imageLabelStyle
    });
    this.groupVal = new Layer({
      name: "groupVal",
      superLayer: this,
      x: 32,
      y: 146,
      width: 86,
      html: "",
      style: imageValueStyle
    });
    this.states.animationOptions = {
      curve: "spring(500, 25, 0)"
    };
    return this.states.add({
      "default": {
        scale: 1,
        opacity: 1
      },
      selected: {
        scale: .9
      },
      unselected: {
        grayscale: 100
      }
    });
  };

  return exports;

})(Layer);


},{}],"Pointer":[function(require,module,exports){
exports.Pointer = (function() {
  var clientCoords, coords, offsetArgumentError, offsetCoords, screenArgumentError;

  function Pointer() {}

  Pointer.screen = function(event, layer) {
    var e, screenCoords;
    if (!((event != null) && (layer != null))) {
      screenArgumentError();
    }
    e = offsetCoords(event);
    if (e.x && e.y) {
      screenCoords = layer.screenFrame;
      e.x += screenCoords.x;
      e.y += screenCoords.y;
    } else {
      e = clientCoords(event);
    }
    return e;
  };

  Pointer.offset = function(event, layer) {
    var e, targetScreenCoords;
    if (!((event != null) && (layer != null))) {
      offsetArgumentError();
    }
    e = offsetCoords(event);
    if (!((e.x != null) && (e.y != null))) {
      e = clientCoords(event);
      targetScreenCoords = layer.screenFrame;
      e.x -= targetScreenCoords.x;
      e.y -= targetScreenCoords.y;
    }
    return e;
  };

  offsetCoords = function(ev) {
    var e;
    e = Events.touchEvent(ev);
    return coords(e.offsetX, e.offsetY);
  };

  clientCoords = function(ev) {
    var e;
    e = Events.touchEvent(ev);
    return coords(e.clientX, e.clientY);
  };

  coords = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  screenArgumentError = function() {
    error(null);
    return console.error("Pointer.screen() Error: You must pass event & layer arguments. \n\nExample: layer.on Events.TouchStart,(event,layer) -> Pointer.screen(event, layer)");
  };

  offsetArgumentError = function() {
    error(null);
    return console.error("Pointer.offset() Error: You must pass event & layer arguments. \n\nExample: layer.on Events.TouchStart,(event,layer) -> Pointer.offset(event, layer)");
  };

  return Pointer;

})();


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL3dvcmtzcGFjZS9Nb2FyQmV0dGVyL0luc3RhZ3JhbSBUcmlwdHljaHMuZnJhbWVyL21vZHVsZXMvR3JvdXBGb2N1cy5jb2ZmZWUiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9JbnN0YUltYWdlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL1BvaW50ZXIuY29mZmVlIiwiL3dvcmtzcGFjZS9Nb2FyQmV0dGVyL0luc3RhZ3JhbSBUcmlwdHljaHMuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7O0FBQU0sTUFBTSxDQUFDOzs7RUFDQyxpQkFBQyxHQUFEO0FBQ1osUUFBQTs7TUFEYSxNQUFJOztJQUNqQixLQUFBLEdBQVEsR0FBRyxDQUFDO0lBQ1osS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLHlDQUFNLEdBQU47SUFDQSxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLEdBQUQsR0FBTztJQUNQLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsZUFBRCxHQUFtQixHQUFHLENBQUM7SUFFdkIsSUFBQyxDQUFBLElBQUQsc0JBQVEsR0FBRyxDQUFDLE9BQUosR0FBRyxDQUFDLE9BQVE7SUFDcEIsSUFBQyxDQUFBLEdBQUQscUJBQU8sR0FBRyxDQUFDLE1BQUosR0FBRyxDQUFDLE1BQU87SUFDbEIsSUFBQyxDQUFBLEdBQUQscUJBQVEsR0FB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QWtCLEVBQWxCO0FBQXNCLFdBQU8sTUFBQSxDQUFPLENBQUMsQ0FBQyxPQUFULEVBQWtCLENBQUMsQ0FBQyxPQUFwQjtFQUExQzs7RUFDZixZQUFBLEdBQWUsU0FBQyxFQUFEO0FBQVMsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUMsVUFBUCxDQUFrQixFQUFsQjtBQUFzQixXQUFPLE1BQUEsQ0FBTyxDQUFDLENBQUMsT0FBVCxFQUFrQixDQUFDLENBQUMsT0FBcEI7RUFBMUM7O0VBQ2YsTUFBQSxHQUFlLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFBUyxXQUFPO01BQUEsQ0FBQSxFQUFFLENBQUY7TUFBSyxDQUFBLEVBQUUsQ0FBUDs7RUFBaEI7O0VBS2YsbUJBQUEsR0FBc0IsU0FBQTtJQUNyQixLQUFBLENBQU0sSUFBTjtXQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsc0pBQWQ7RUFGcUI7O0VBTXRCLG1CQUFBLEdBQXNCLFNBQUE7SUFDckIsS0FBQSxDQUFNLElBQU47V0FDQSxPQUFPLENBQUMsS0FBUixDQUFjLHNKQUFkO0VBRnFCOzs7Ozs7OztBQzdEdkIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0PXt9KSAtPlxuXHRcdGluaXRXID0gb3B0LndpZHRoXG5cdFx0aW5pdEggPSBvcHQuaGVpZ2h0XG5cdFx0c3VwZXIob3B0KVxuXHRcdEBuYW1lID0gXCJHcmlkTW9kdWxlXCJcblx0XHRAcmVmID0gdGhpc1xuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAYmFja2dyb3VuZENvbG9yID0gb3B0LmJhY2tncm91bmRDb2xvclxuXHRcblx0XHRAZGF0YSA9IG9wdC5kYXRhID89IFtdXG5cdFx0QHJvdyA9IG9wdC5yb3cgPz0gM1xuXHRcdEBjb2wgPSAgb3B0LnJvdyA/PSB1bmRlZmluZWRcblx0XHRAY2VsbFcgPSBvcHQuY2VsbFcgPz0gQGRhdGFbMF0ud2lkdGggPz0gMTAwXG5cdFx0QGNlbGxIID0gb3B0LmNlbGxIID89IEBjZWxsV1xuXHRcdEBtYXJnaW4gPSBvcHQubWFyZ2luID89IDBcblx0XHRAbWFyZ2luWCA9IG9wdC5tYXJnaW5YID89IEBtYXJnaW5cblx0XHRAbWFyZ2luWSA9IG9wdC5tYXJnaW5ZID89IEBtYXJnaW5YXG5cdFx0XHRcblx0XHRAd2lkdGggPSBpbml0VyA/PSAoQGNlbGxXICsgQG1hcmdpblgpICogQHJvdyAtIEBtYXJnaW5YXG5cdFx0QGhlaWdodCA9IGluaXRIID89IEBjZWxsSFxuXHRcdFxuXHRcdEBjb250ZW50ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImNvbnRlbnRcIlxuXHRcdFx0Y2xpcDogZmFsc2VcdFx0XHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6aGVpZ2h0XCIsIC0+XG5cdFx0XHRpZiBAc3VwZXJMYXllci5oZWlnaHQgPCBAaGVpZ2h0XG5cdFx0XHRcdEBzdXBlckxheWVyLmhlaWdodCA9IEBoZWlnaHRcblx0XHRcblx0XHRAZHJhd0JlaGF2aW9yID0gb3B0LmRyYXdCZWhhdmlvciA/PSBAZGVmYXVsdERyYXdCZWhhdmlvclxuXG5cdFx0QGRyYXcoKVxuXHRcdFxuXHRnZXREYXRhOiAtPlxuXHRcdHJldHVybiBAZGF0YVsuLl1cblx0XG5cdGFkZDogKGNlbGwpIC0+XG5cdFx0cmV0dXJuIEBpbnNlcnQoW2NlbGxdLCBAZGF0YS5sZW5ndGgpXG5cdFxuXHRpbnNlcnQ6IChjZWxscywgcG9zaXRpb24gPSAwKSAtPlxuXHRcdEBkYXRhW3Bvc2l0aW9uLi4ucG9zaXRpb25dID0gY2VsbHNcblx0XHRAZHJhdygpXG5cdFx0cmV0dXJuIGNlbGxzXG5cdFxuXHRyZW1vdmU6IChwb3NpdGlvbiwgbGVuZ3RoID0gMSkgLT5cblx0XHRjZWxscyA9IEBkYXRhW3Bvc2l0aW9uLi5wb3NpdGlvbitsZW5ndGhdXG5cdFx0QGRhdGFbcG9zaXRpb24uLnBvc2l0aW9uK2xlbmd0aF0gPSBbXVxuXHRcdGZvciBjIGluIGNlbGxzXG5cdFx0XHRpZiBjLnN1cGVyTGF5ZXIgPT0gQGNvbnRlbnRcblx0XHRcdFx0Yy5zdXBlckxheWVyID0gbnVsbFxuXHRcdEBkcmF3KClcblx0XHRyZXR1cm4gY2VsbHNcblx0XG5cdGRlZmF1bHREcmF3QmVoYXZpb3I6IChjLCB4LCB5LCBpKSAtPlxuXHRcdGMuc3VwZXJMYXllciA9IEBjb250ZW50XG5cdFx0Yy54ID0geFxuXHRcdGMueSA9IHlcblx0XHRcbiNcdGRyYXc6IFV0aWxzLnRocm90dGxlIDAuMSwgX2RyYXcsIHt0ZXN0U2NvcGU6IHRoaXN9XG4jXHRfZHJhdzogLT5cblx0ZHJhdzogLT5cbiNcdFx0cHJpbnQgXCJHcmlkTW9kdWxlLmRyYXcoKVwiXG4jXHRcdHByaW50IFwicmVmOiAgXCIrQHJlZlxuI1x0XHRwcmludCBcInRoaXM6IFwiK3RoaXNcblx0XHRmb3IgYywgaSBpbiBAZGF0YVxuXHRcdFx0Y1ggPSAoaSAlIEByb3cpICogKEBjZWxsVyArIEBtYXJnaW5YKVxuXHRcdFx0Y1kgPSBNYXRoLmZsb29yKGkgLyBAcm93KSAqIChAY2VsbEggKyBAbWFyZ2luWSlcblx0XHRcdEBkcmF3QmVoYXZpb3IoYywgY1gsIGNZLCBpKVxuXHRcdEB1cGRhdGVDb250ZW50U2l6ZSgpXG5cdFx0XG4jXHR1cGRhdGVDb250ZW50U2l6ZSA9IFV0aWxzLnRocm90dGxlIC4xLCBfdXBkYXRlQ29udGVudFNpemVcbiNcdF91cGRhdGVDb250ZW50U2l6ZTogLT5cblx0dXBkYXRlQ29udGVudFNpemU6IC0+XG4jXHRcdHByaW50IFwiR3JpZE1vZHVsZS51cGRhdGVDb250ZW50U2l6ZSgpXCJcblx0XHRAY29udGVudC5oZWlnaHQgPSBAY29udGVudC5jb250ZW50RnJhbWUoKS5oZWlnaHQiLCJcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pTDNkdmNtdHpjR0ZqWlM5TmIyRnlRbVYwZEdWeUwwbHVjM1JoWjNKaGJTQlVjbWx3ZEhsamFITXVabkpoYldWeUwyMXZaSFZzWlhNdlIzSnZkWEJHYjJOMWN5NWpiMlptWldVaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXZkMjl5YTNOd1lXTmxMMDF2WVhKQ1pYUjBaWEl2U1c1emRHRm5jbUZ0SUZSeWFYQjBlV05vY3k1bWNtRnRaWEl2Ylc5a2RXeGxjeTlIY205MWNFWnZZM1Z6TG1OdlptWmxaU0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSWwxOVxuIiwiaW1hZ2VDb3VudCA9IDBcblxuaW1hZ2VWYWx1ZVN0eWxlID0gbmV3IExheWVyXG5cbmltYWdlVmFsdWVTdHlsZSA9XG5cdFwiZm9udC1mYW1pbHlcIjogXCJTRlVJRGlzcGxheS1MaWdodFwiXG5cdFwiZm9udC1zaXplXCI6IFwiNDhweFwiXG5cdFwidGV4dC1hbGlnblwiOiBcInJpZ2h0XCJcblx0XCJjb2xvclwiOiBcIiNmZmZmZmZcIlxuXHRcImxpbmUtaGVpZ2h0XCI6IFwiNThweFwiXG5cdFwidGV4dC1zaGFkb3dcIjogXCIxcHggMnB4IDBweCByZ2JhKDAsMCwwLDAuNTApXCJcbiNcdFwiYmFja2dyb3VuZC1jb2xvclwiOiBcInNhbG1vblwiXG5cbmltYWdlTGFiZWxTdHlsZSA9IFxuXHRcImZvbnQtZmFtaWx5XCI6IFwiU0ZVSURpc3BsYXktQmxhY2tcIlxuXHRcImZvbnQtc2l6ZVwiOiBcIjE4cHhcIlxuXHRcImNvbG9yXCI6IFwiI0ZGRkZGRlwiXG5cdFwibGluZS1oZWlnaHRcIjogXCIyMXB4XCJcblx0XCJ0ZXh0LXNoYWRvd1wiOiBcIjFweCAycHggMHB4IHJnYmEoMCwwLDAsMC41MClcIlxuXG5jbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXHRcblx0Y29uc3RydWN0b3I6IChvcHQ9e30pIC0+XG5cdFx0aW5pdFcgPSBvcHQud2lkdGhcblx0XHRpbml0SCA9IG9wdC5oZWlnaHRcblx0XHRzdXBlcihvcHQpXG5cdFx0XG5cdFx0QGNvbmZpZ0Rpc3BsYXkoKVxuXHRcdFxuXHRcdEBzZXRJbWFnZShvcHQuaW1hZ2VJRCA/PSBpbWFnZUNvdW50KyspXG5cdFx0QHNldFBvc2l0aW9uKG9wdC5wb3MgPz0gLTEpXG5cdFx0QHNldEdyb3VwKG9wdC5ncm91cElEID8gLTEpXG5cdFx0XG5cdFx0QG5hbWUgPSBvcHQubmFtZSA/PSBcIkluc3RhSW1hZ2VfXCIrQGltYWdlSURcblx0XG5cdFx0QHdpZHRoID0gaW5pdFcgPz0gMjQ4XG5cdFx0QGhlaWdodCA9IGluaXRIID89IEB3aWR0aFxuXHRcdEBjbGlwID0gb3B0LmNsaXAgPz0gZmFsc2Vcblx0XHRAYmFja2dyb3VuZENvbG9yID0gb3B0LmJhY2tncm91bmRDb2xvclxuXHRcblx0c2V0SW1hZ2U6ICh2YWwpIC0+XG5cdFx0QGltYWdlSUQgPSB2YWwgPz0gQGltYWdlSURcblx0XHRAaW1hZ2VWYWwuaHRtbCA9IEBpbWFnZUlEICsgMVxuXHRcdEBpbWFnZVZhbC5zdHlsZSA9IGltYWdlVmFsdWVTdHlsZVxuXHRcdFxuXHRzZXRQb3NpdGlvbjogKHZhbCkgLT5cblx0XHRAcG9zID0gdmFsID89IEBwb3Ncblx0XHRAcG9zaXRpb25WYWwuaHRtbCA9IEBwb3MgKyAxXG5cdFx0QHBvc2l0aW9uVmFsLnN0eWxlID0gaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdHNldEdyb3VwOiAodmFsKSAtPlxuXHRcdEBncm91cElEID0gdmFsID89IEBncm91cElEID89IC0xXG5cdFx0aWYgQGdyb3VwSUQgPj0gMFxuXHRcdFx0QGdyb3VwVmFsLmh0bWwgPSBAZ3JvdXBJRCArIDFcblx0XHRcdEBncm91cFZhbC5zdHlsZSA9IGltYWdlVmFsdWVTdHlsZVxuXHRcdFx0QGdyb3VwTGFiZWwuaHRtbCA9IFwiR1JPVVBcIlxuXHRcdFx0QGdyb3VwVmFsLm9wYWNpdHkgPSBAZ3JvdXBMYWJlbC5vcGFjaXR5ID0gMVxuXHRcdFx0QGJnLmJhY2tncm91bmRDb2xvciA9IFwiI0QwMDIxQlwiXG5cdFx0XHRAYmcuaHVlUm90YXRlID0gQGdyb3VwSUQgKiA2NlxuXHRcdGVsc2Vcblx0XHRcdEBncm91cFZhbC5odG1sID0gXCJcIlxuXHRcdFx0QGdyb3VwTGFiZWwuaHRtbCA9IFwiTk8gR1JPVVBcIlxuXHRcdFx0QGdyb3VwVmFsLm9wYWNpdHkgPSBAZ3JvdXBMYWJlbC5vcGFjaXR5ID0gLjVcblx0XG5cdGNvbmZpZ0Rpc3BsYXk6IC0+XG5cdFx0QGJnID0gbmV3IExheWVyXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR3aWR0aDogMjQ4XG5cdFx0XHRoZWlnaHQ6IDI0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNiYmJiYmJcIlxuXG5cdFx0QGltYWdlTGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiaW1hZ2VMYWJlbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAxMjhcblx0XHRcdHk6IDU5XG5cdFx0XHRodG1sOiBcIklNQUdFXCJcblx0XHRcdHN0eWxlOiBpbWFnZUxhYmVsU3R5bGVcblx0XHRcblx0XHRAaW1hZ2VWYWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiaW1hZ2VWYWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMzJcblx0XHRcdHk6IDI5XG5cdFx0XHR3aWR0aDogODZcblx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdHN0eWxlOiBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0XHRAcG9zaXRpb25MYWJlbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJpbWFnZUxhYmVsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDEyOFxuXHRcdFx0eTogMTE3XG5cdFx0XHRodG1sOiBcIlBPU0lUSU9OXCJcblx0XHRcdHN0eWxlOiBpbWFnZUxhYmVsU3R5bGVcblx0XHRcdFxuXHRcdEBwb3NpdGlvblZhbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJwb3NpdGlvblZhbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAzMlxuXHRcdFx0eTogODhcblx0XHRcdHdpZHRoOiA4NVxuXHRcdFx0aHRtbDogXCJcIlxuXHRcdFx0c3R5bGU6IGltYWdlVmFsdWVTdHlsZVxuXHRcdFxuXHRcdEBncm91cExhYmVsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImdyb3VwTGFiZWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMTI4XG5cdFx0XHR5OiAxNzVcblx0XHRcdGh0bWw6IFwiR1JPVVBcIlxuXHRcdFx0c3R5bGU6IGltYWdlTGFiZWxTdHlsZVxuXHRcdFxuXHRcdEBncm91cFZhbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJncm91cFZhbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAzMlxuXHRcdFx0eTogMTQ2XG5cdFx0XHR3aWR0aDogODZcblx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdHN0eWxlOiBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0XHRAc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0Y3VydmU6IFwic3ByaW5nKDUwMCwgMjUsIDApXCJcblx0XHRcblx0XHRAc3RhdGVzLmFkZFxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0c2NhbGU6IDFcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0c2VsZWN0ZWQ6XG5cdFx0XHRcdHNjYWxlOiAuOVxuXHRcdFx0dW5zZWxlY3RlZDpcblx0XHRcdFx0Z3JheXNjYWxlOiAxMDAiLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQ3JlYXRlZCBieSBKb3JkYW4gUm9iZXJ0IERvYnNvbiBvbiAxNCBBdWd1c3QgMjAxNVxuIyBcbiMgVXNlIHRvIG5vcm1hbGl6ZSBzY3JlZW4gJiBvZmZzZXQgeCx5IHZhbHVlcyBmcm9tIGNsaWNrIG9yIHRvdWNoIGV2ZW50cy5cbiNcbiMgVG8gR2V0IFN0YXJ0ZWQuLi5cbiNcbiMgMS4gUGxhY2UgdGhpcyBmaWxlIGluIEZyYW1lciBTdHVkaW8gbW9kdWxlcyBkaXJlY3RvcnlcbiNcbiMgMi4gSW4geW91ciBwcm9qZWN0IGluY2x1ZGU6XG4jICAgICB7UG9pbnRlcn0gPSByZXF1aXJlIFwiUG9pbnRlclwiXG4jXG4jIDMuIEZvciBzY3JlZW4gY29vcmRpbmF0ZXM6IFxuIyAgICAgYnRuLm9uIEV2ZW50cy5DbGljaywgKGV2ZW50LCBsYXllcikgLT4gcHJpbnQgUG9pbnRlci5zY3JlZW4oZXZlbnQsIGxheWVyKVxuIyBcbiMgNC4gRm9yIGxheWVyIG9mZnNldCBjb29yZGluYXRlczogXG4jICAgICBidG4ub24gRXZlbnRzLkNsaWNrLCAoZXZlbnQsIGxheWVyKSAtPiBwcmludCBQb2ludGVyLm9mZnNldChldmVudCwgbGF5ZXIpXG4jXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuY2xhc3MgZXhwb3J0cy5Qb2ludGVyXG5cblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgUHVibGljIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cdEBzY3JlZW4gPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdHNjcmVlbkFyZ3VtZW50RXJyb3IoKSB1bmxlc3MgZXZlbnQ/IGFuZCBsYXllcj9cblx0XHRlID0gb2Zmc2V0Q29vcmRzIGV2ZW50XG5cdFx0aWYgZS54IGFuZCBlLnlcblx0XHRcdCMgTW91c2UgRXZlbnRcblx0XHRcdHNjcmVlbkNvb3JkcyA9IGxheWVyLnNjcmVlbkZyYW1lXG5cdFx0XHRlLnggKz0gc2NyZWVuQ29vcmRzLnhcblx0XHRcdGUueSArPSBzY3JlZW5Db29yZHMueVxuXHRcdGVsc2Vcblx0XHRcdCMgVG91Y2ggRXZlbnRcblx0XHRcdGUgPSBjbGllbnRDb29yZHMgZXZlbnRcblx0XHRyZXR1cm4gZVxuXHRcdFx0XG5cdEBvZmZzZXQgPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdG9mZnNldEFyZ3VtZW50RXJyb3IoKSB1bmxlc3MgZXZlbnQ/IGFuZCBsYXllcj9cblx0XHRlID0gb2Zmc2V0Q29vcmRzIGV2ZW50XG5cdFx0dW5sZXNzIGUueD8gYW5kIGUueT9cblx0XHRcdCMgVG91Y2ggRXZlbnRcblx0XHRcdGUgPSBjbGllbnRDb29yZHMgZXZlbnRcblx0XHRcdHRhcmdldFNjcmVlbkNvb3JkcyA9IGxheWVyLnNjcmVlbkZyYW1lXG5cdFx0XHRlLnggLT0gdGFyZ2V0U2NyZWVuQ29vcmRzLnhcblx0XHRcdGUueSAtPSB0YXJnZXRTY3JlZW5Db29yZHMueVxuXHRcdHJldHVybiBlXG5cdFxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBQcml2YXRlIEhlbHBlciBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdFxuXHRvZmZzZXRDb29yZHMgPSAoZXYpICAtPiBlID0gRXZlbnRzLnRvdWNoRXZlbnQgZXY7IHJldHVybiBjb29yZHMgZS5vZmZzZXRYLCBlLm9mZnNldFlcblx0Y2xpZW50Q29vcmRzID0gKGV2KSAgLT4gZSA9IEV2ZW50cy50b3VjaEV2ZW50IGV2OyByZXR1cm4gY29vcmRzIGUuY2xpZW50WCwgZS5jbGllbnRZXG5cdGNvb3JkcyAgICAgICA9ICh4LHkpIC0+IHJldHVybiB4OngsIHk6eVxuXHRcblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgRXJyb3IgSGFuZGxlciBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHRcblx0c2NyZWVuQXJndW1lbnRFcnJvciA9IC0+XG5cdFx0ZXJyb3IgbnVsbFxuXHRcdGNvbnNvbGUuZXJyb3IgXCJcIlwiXG5cdFx0XHRQb2ludGVyLnNjcmVlbigpIEVycm9yOiBZb3UgbXVzdCBwYXNzIGV2ZW50ICYgbGF5ZXIgYXJndW1lbnRzLiBcXG5cblx0XHRcdEV4YW1wbGU6IGxheWVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LChldmVudCxsYXllcikgLT4gUG9pbnRlci5zY3JlZW4oZXZlbnQsIGxheWVyKVwiXCJcIlxuXHRcdFx0XG5cdG9mZnNldEFyZ3VtZW50RXJyb3IgPSAtPlxuXHRcdGVycm9yIG51bGxcblx0XHRjb25zb2xlLmVycm9yIFwiXCJcIlxuXHRcdFx0UG9pbnRlci5vZmZzZXQoKSBFcnJvcjogWW91IG11c3QgcGFzcyBldmVudCAmIGxheWVyIGFyZ3VtZW50cy4gXFxuXG5cdFx0XHRFeGFtcGxlOiBsYXllci5vbiBFdmVudHMuVG91Y2hTdGFydCwoZXZlbnQsbGF5ZXIpIC0+IFBvaW50ZXIub2Zmc2V0KGV2ZW50LCBsYXllcilcIlwiXCIiLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
