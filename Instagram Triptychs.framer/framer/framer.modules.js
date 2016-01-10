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
    print("GridModule.draw()");
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
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (function(superClass) {
  extend(exports, superClass);

  function exports(opt) {
    if (opt == null) {
      opt = {};
    }
  }

  return exports;

})(Layer);


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
      this.groupVal.opacity = this.groupLabel.opacity = .5;
      return this.bg.backgroundColor = "#D8D8D8";
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
        scale: 1
      },
      deselected: {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL0dyb3VwRm9jdXMuY29mZmVlIiwiL3dvcmtzcGFjZS9Nb2FyQmV0dGVyL0luc3RhZ3JhbSBUcmlwdHljaHMuZnJhbWVyL21vZHVsZXMvSW5zdGFJbWFnZS5jb2ZmZWUiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9Qb2ludGVyLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsR0FBRDtBQUNaLFFBQUE7O01BRGEsTUFBSTs7SUFDakIsS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLEtBQUEsR0FBUSxHQUFHLENBQUM7SUFDWix5Q0FBTSxHQUFOO0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxHQUFELEdBQU87SUFDUCxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLGVBQUQsR0FBbUIsR0FBRyxDQUFDO0lBRXZCLElBQUMsQ0FBQSxJQUFELHNCQUFRLEdBQUcsQ0FBQyxPQUFKLEdBQUcsQ0FBQyxPQUFRO0lBQ3BCLElBQUMsQ0FBQSxHQUFELHFCQUFPLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ2xCLElBQUMsQ0FBQSxHQUFELHFCQUFRLEdBQUcsQ0FBQyxNQUFKLEdB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QUFrQixDQUFDO01BQzFCLENBQUMsQ0FBQyxDQUFGLElBQU8sa0JBQWtCLENBQUMsRUFMM0I7O0FBTUEsV0FBTztFQVRFOztFQWNWLFlBQUEsR0FBZSxTQUFDLEVBQUQ7QUFBUyxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEVBQWxCO0FBQXNCLFdBQU8sTUFBQSxDQUFPLENBQUMsQ0FBQyxPQUFULEVBQWtCLENBQUMsQ0FBQyxPQUFwQjtFQUExQzs7RUFDZixZQUFBLEdBQWUsU0FBQyxFQUFEO0FBQVMsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUMsVUFBUCxDQUFrQixFQUFsQjtBQUFzQixXQUFPLE1BQUEsQ0FBTyxDQUFDLENBQUMsT0FBVCxFQUFrQixDQUFDLENBQUMsT0FBcEI7RUFBMUM7O0VBQ2YsTUFBQSxHQUFlLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFBUyxXQUFPO01BQUEsQ0FBQSxFQUFFLENBQUY7TUFBSyxDQUFBLEVBQUUsQ0FBUDs7RUFBaEI7O0VBS2YsbUJBQUEsR0FBc0IsU0FBQTtJQUNyQixLQUFBLENBQU0sSUFBTjtXQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsc0pBQWQ7RUFGcUI7O0VBTXRCLG1CQUFBLEdBQXNCLFNBQUE7SUFDckIsS0FBQSxDQUFNLElBQU47V0FDQSxPQUFPLENBQUMsS0FBUixDQUFjLHNKQUFkO0VBRnFCOzs7Ozs7OztBQzdEdkIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBtb2R1bGUuZXhwb3J0cyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0PXt9KSAtPlxuXHRcdGluaXRXID0gb3B0LndpZHRoXG5cdFx0aW5pdEggPSBvcHQuaGVpZ2h0XG5cdFx0c3VwZXIob3B0KVxuXHRcdEBuYW1lID0gXCJHcmlkTW9kdWxlXCJcblx0XHRAcmVmID0gdGhpc1xuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAYmFja2dyb3VuZENvbG9yID0gb3B0LmJhY2tncm91bmRDb2xvclxuXHRcblx0XHRAZGF0YSA9IG9wdC5kYXRhID89IFtdXG5cdFx0QHJvdyA9IG9wdC5yb3cgPz0gM1xuXHRcdEBjb2wgPSAgb3B0LnJvdyA/PSB1bmRlZmluZWRcblx0XHRAY2VsbFcgPSBvcHQuY2VsbFcgPz0gQGRhdGFbMF0ud2lkdGggPz0gMTAwXG5cdFx0QGNlbGxIID0gb3B0LmNlbGxIID89IEBjZWxsV1xuXHRcdEBtYXJnaW4gPSBvcHQubWFyZ2luID89IDBcblx0XHRAbWFyZ2luWCA9IG9wdC5tYXJnaW5YID89IEBtYXJnaW5cblx0XHRAbWFyZ2luWSA9IG9wdC5tYXJnaW5ZID89IEBtYXJnaW5YXG5cdFx0XHRcblx0XHRAd2lkdGggPSBpbml0VyA/PSAoQGNlbGxXICsgQG1hcmdpblgpICogQHJvdyAtIEBtYXJnaW5YXG5cdFx0QGhlaWdodCA9IGluaXRIID89IEBjZWxsSFxuXHRcdFxuXHRcdEBjb250ZW50ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImNvbnRlbnRcIlxuXHRcdFx0Y2xpcDogZmFsc2VcdFx0XHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6aGVpZ2h0XCIsIC0+XG5cdFx0XHRpZiBAc3VwZXJMYXllci5oZWlnaHQgPCBAaGVpZ2h0XG5cdFx0XHRcdEBzdXBlckxheWVyLmhlaWdodCA9IEBoZWlnaHRcblx0XHRcblx0XHRAZHJhd0JlaGF2aW9yID0gb3B0LmRyYXdCZWhhdmlvciA/PSBAZGVmYXVsdERyYXdCZWhhdmlvclxuXG5cdFx0QGRyYXcoKVxuXHRcdFxuXHRnZXREYXRhOiAtPlxuXHRcdHJldHVybiBAZGF0YVsuLl1cblx0XG5cdGFkZDogKGNlbGwpIC0+XG5cdFx0cmV0dXJuIEBpbnNlcnQoW2NlbGxdLCBAZGF0YS5sZW5ndGgpXG5cdFxuXHRpbnNlcnQ6IChjZWxscywgcG9zaXRpb24gPSAwKSAtPlxuXHRcdEBkYXRhW3Bvc2l0aW9uLi4ucG9zaXRpb25dID0gY2VsbHNcblx0XHRAZHJhdygpXG5cdFx0cmV0dXJuIGNlbGxzXG5cdFxuXHRyZW1vdmU6IChwb3NpdGlvbiwgbGVuZ3RoID0gMSkgLT5cblx0XHRjZWxscyA9IEBkYXRhW3Bvc2l0aW9uLi5wb3NpdGlvbitsZW5ndGhdXG5cdFx0QGRhdGFbcG9zaXRpb24uLnBvc2l0aW9uK2xlbmd0aF0gPSBbXVxuXHRcdGZvciBjIGluIGNlbGxzXG5cdFx0XHRpZiBjLnN1cGVyTGF5ZXIgPT0gQGNvbnRlbnRcblx0XHRcdFx0Yy5zdXBlckxheWVyID0gbnVsbFxuXHRcdEBkcmF3KClcblx0XHRyZXR1cm4gY2VsbHNcblx0XG5cdGRlZmF1bHREcmF3QmVoYXZpb3I6IChjLCB4LCB5LCBpKSAtPlxuXHRcdGMuc3VwZXJMYXllciA9IEBjb250ZW50XG5cdFx0Yy54ID0geFxuXHRcdGMueSA9IHlcblx0XHRcbiNcdGRyYXc6IFV0aWxzLnRocm90dGxlIDAuMSwgX2RyYXcsIHt0ZXN0U2NvcGU6IHRoaXN9XG4jXHRfZHJhdzogLT5cblx0ZHJhdzogLT5cblx0XHRwcmludCBcIkdyaWRNb2R1bGUuZHJhdygpXCJcbiNcdFx0cHJpbnQgXCJyZWY6ICBcIitAcmVmXG4jXHRcdHByaW50IFwidGhpczogXCIrdGhpc1xuXHRcdGZvciBjLCBpIGluIEBkYXRhXG5cdFx0XHRjWCA9IChpICUgQHJvdykgKiAoQGNlbGxXICsgQG1hcmdpblgpXG5cdFx0XHRjWSA9IE1hdGguZmxvb3IoaSAvIEByb3cpICogKEBjZWxsSCArIEBtYXJnaW5ZKVxuXHRcdFx0QGRyYXdCZWhhdmlvcihjLCBjWCwgY1ksIGkpXG5cdFx0QHVwZGF0ZUNvbnRlbnRTaXplKClcblx0XHRcbiNcdHVwZGF0ZUNvbnRlbnRTaXplID0gVXRpbHMudGhyb3R0bGUgLjEsIF91cGRhdGVDb250ZW50U2l6ZVxuI1x0X3VwZGF0ZUNvbnRlbnRTaXplOiAtPlxuXHR1cGRhdGVDb250ZW50U2l6ZTogLT5cbiNcdFx0cHJpbnQgXCJHcmlkTW9kdWxlLnVwZGF0ZUNvbnRlbnRTaXplKClcIlxuXHRcdEBjb250ZW50LmhlaWdodCA9IEBjb250ZW50LmNvbnRlbnRGcmFtZSgpLmhlaWdodCIsImNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdD17fSkgLT4iLCJpbWFnZUNvdW50ID0gMFxuXG5pbWFnZVZhbHVlU3R5bGUgPSBuZXcgTGF5ZXJcblxuaW1hZ2VWYWx1ZVN0eWxlID1cblx0XCJmb250LWZhbWlseVwiOiBcIlNGVUlEaXNwbGF5LUxpZ2h0XCJcblx0XCJmb250LXNpemVcIjogXCI0OHB4XCJcblx0XCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIlxuXHRcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG5cdFwibGluZS1oZWlnaHRcIjogXCI1OHB4XCJcblx0XCJ0ZXh0LXNoYWRvd1wiOiBcIjFweCAycHggMHB4IHJnYmEoMCwwLDAsMC41MClcIlxuI1x0XCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwic2FsbW9uXCJcblxuaW1hZ2VMYWJlbFN0eWxlID0gXG5cdFwiZm9udC1mYW1pbHlcIjogXCJTRlVJRGlzcGxheS1CbGFja1wiXG5cdFwiZm9udC1zaXplXCI6IFwiMThweFwiXG5cdFwiY29sb3JcIjogXCIjRkZGRkZGXCJcblx0XCJsaW5lLWhlaWdodFwiOiBcIjIxcHhcIlxuXHRcInRleHQtc2hhZG93XCI6IFwiMXB4IDJweCAwcHggcmdiYSgwLDAsMCwwLjUwKVwiXG5cbmNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdD17fSkgLT5cblx0XHRpbml0VyA9IG9wdC53aWR0aFxuXHRcdGluaXRIID0gb3B0LmhlaWdodFxuXHRcdHN1cGVyKG9wdClcblx0XHRcblx0XHRAY29uZmlnRGlzcGxheSgpXG5cdFx0XG5cdFx0QHNldEltYWdlKG9wdC5pbWFnZUlEID89IGltYWdlQ291bnQrKylcblx0XHRAc2V0UG9zaXRpb24ob3B0LnBvcyA/PSAtMSlcblx0XHRAc2V0R3JvdXAob3B0Lmdyb3VwSUQgPyAtMSlcblx0XHRcblx0XHRAbmFtZSA9IG9wdC5uYW1lID89IFwiSW5zdGFJbWFnZV9cIitAaW1hZ2VJRFxuXHRcblx0XHRAd2lkdGggPSBpbml0VyA/PSAyNDhcblx0XHRAaGVpZ2h0ID0gaW5pdEggPz0gQHdpZHRoXG5cdFx0QGNsaXAgPSBvcHQuY2xpcCA/PSBmYWxzZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBvcHQuYmFja2dyb3VuZENvbG9yXG5cdFxuXHRzZXRJbWFnZTogKHZhbCkgLT5cblx0XHRAaW1hZ2VJRCA9IHZhbCA/PSBAaW1hZ2VJRFxuXHRcdEBpbWFnZVZhbC5odG1sID0gQGltYWdlSUQgKyAxXG5cdFx0QGltYWdlVmFsLnN0eWxlID0gaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdHNldFBvc2l0aW9uOiAodmFsKSAtPlxuXHRcdEBwb3MgPSB2YWwgPz0gQHBvc1xuXHRcdEBwb3NpdGlvblZhbC5odG1sID0gQHBvcyArIDFcblx0XHRAcG9zaXRpb25WYWwuc3R5bGUgPSBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0c2V0R3JvdXA6ICh2YWwpIC0+XG5cdFx0QGdyb3VwSUQgPSB2YWwgPz0gQGdyb3VwSUQgPz0gLTFcblx0XHRpZiBAZ3JvdXBJRCA+PSAwXG5cdFx0XHRAZ3JvdXBWYWwuaHRtbCA9IEBncm91cElEICsgMVxuXHRcdFx0QGdyb3VwVmFsLnN0eWxlID0gaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XHRAZ3JvdXBMYWJlbC5odG1sID0gXCJHUk9VUFwiXG5cdFx0XHRAZ3JvdXBWYWwub3BhY2l0eSA9IEBncm91cExhYmVsLm9wYWNpdHkgPSAxXG5cdFx0XHRAYmcuYmFja2dyb3VuZENvbG9yID0gXCIjRDAwMjFCXCJcblx0XHRcdEBiZy5odWVSb3RhdGUgPSBAZ3JvdXBJRCAqIDY2XG5cdFx0ZWxzZVxuXHRcdFx0QGdyb3VwVmFsLmh0bWwgPSBcIlwiXG5cdFx0XHRAZ3JvdXBMYWJlbC5odG1sID0gXCJOTyBHUk9VUFwiXG5cdFx0XHRAZ3JvdXBWYWwub3BhY2l0eSA9IEBncm91cExhYmVsLm9wYWNpdHkgPSAuNVxuXHRcdFx0QGJnLmJhY2tncm91bmRDb2xvciA9IFwiI0Q4RDhEOFwiXG5cdFxuXHRjb25maWdEaXNwbGF5OiAtPlxuXHRcdEBiZyA9IG5ldyBMYXllclxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0d2lkdGg6IDI0OFxuXHRcdFx0aGVpZ2h0OiAyNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjYmJiYmJiXCJcblxuXHRcdEBpbWFnZUxhYmVsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImltYWdlTGFiZWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMTI4XG5cdFx0XHR5OiA1OVxuXHRcdFx0aHRtbDogXCJJTUFHRVwiXG5cdFx0XHRzdHlsZTogaW1hZ2VMYWJlbFN0eWxlXG5cdFx0XG5cdFx0QGltYWdlVmFsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImltYWdlVmFsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDMyXG5cdFx0XHR5OiAyOVxuXHRcdFx0d2lkdGg6IDg2XG5cdFx0XHRodG1sOiBcIlwiXG5cdFx0XHRzdHlsZTogaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdFx0QHBvc2l0aW9uTGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiaW1hZ2VMYWJlbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAxMjhcblx0XHRcdHk6IDExN1xuXHRcdFx0aHRtbDogXCJQT1NJVElPTlwiXG5cdFx0XHRzdHlsZTogaW1hZ2VMYWJlbFN0eWxlXG5cdFx0XHRcblx0XHRAcG9zaXRpb25WYWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwicG9zaXRpb25WYWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMzJcblx0XHRcdHk6IDg4XG5cdFx0XHR3aWR0aDogODVcblx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdHN0eWxlOiBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0XHRAZ3JvdXBMYWJlbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJncm91cExhYmVsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDEyOFxuXHRcdFx0eTogMTc1XG5cdFx0XHRodG1sOiBcIkdST1VQXCJcblx0XHRcdHN0eWxlOiBpbWFnZUxhYmVsU3R5bGVcblx0XHRcblx0XHRAZ3JvdXBWYWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiZ3JvdXBWYWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMzJcblx0XHRcdHk6IDE0NlxuXHRcdFx0d2lkdGg6IDg2XG5cdFx0XHRodG1sOiBcIlwiXG5cdFx0XHRzdHlsZTogaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdFx0QHN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdGN1cnZlOiBcInNwcmluZyg1MDAsIDI1LCAwKVwiXG5cdFx0XG5cdFx0QHN0YXRlcy5hZGRcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHNjYWxlOiAxXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdHNlbGVjdGVkOlxuXHRcdFx0XHRzY2FsZTogMVxuXHRcdFx0ZGVzZWxlY3RlZDpcblx0XHRcdFx0c2NhbGU6IC45XG5cdFx0XHR1bnNlbGVjdGVkOlxuXHRcdFx0XHRncmF5c2NhbGU6IDEwMCIsIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBDcmVhdGVkIGJ5IEpvcmRhbiBSb2JlcnQgRG9ic29uIG9uIDE0IEF1Z3VzdCAyMDE1XG4jIFxuIyBVc2UgdG8gbm9ybWFsaXplIHNjcmVlbiAmIG9mZnNldCB4LHkgdmFsdWVzIGZyb20gY2xpY2sgb3IgdG91Y2ggZXZlbnRzLlxuI1xuIyBUbyBHZXQgU3RhcnRlZC4uLlxuI1xuIyAxLiBQbGFjZSB0aGlzIGZpbGUgaW4gRnJhbWVyIFN0dWRpbyBtb2R1bGVzIGRpcmVjdG9yeVxuI1xuIyAyLiBJbiB5b3VyIHByb2plY3QgaW5jbHVkZTpcbiMgICAgIHtQb2ludGVyfSA9IHJlcXVpcmUgXCJQb2ludGVyXCJcbiNcbiMgMy4gRm9yIHNjcmVlbiBjb29yZGluYXRlczogXG4jICAgICBidG4ub24gRXZlbnRzLkNsaWNrLCAoZXZlbnQsIGxheWVyKSAtPiBwcmludCBQb2ludGVyLnNjcmVlbihldmVudCwgbGF5ZXIpXG4jIFxuIyA0LiBGb3IgbGF5ZXIgb2Zmc2V0IGNvb3JkaW5hdGVzOiBcbiMgICAgIGJ0bi5vbiBFdmVudHMuQ2xpY2ssIChldmVudCwgbGF5ZXIpIC0+IHByaW50IFBvaW50ZXIub2Zmc2V0KGV2ZW50LCBsYXllcilcbiNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5jbGFzcyBleHBvcnRzLlBvaW50ZXJcblxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBQdWJsaWMgTWV0aG9kcyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cblx0QHNjcmVlbiA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0c2NyZWVuQXJndW1lbnRFcnJvcigpIHVubGVzcyBldmVudD8gYW5kIGxheWVyP1xuXHRcdGUgPSBvZmZzZXRDb29yZHMgZXZlbnRcblx0XHRpZiBlLnggYW5kIGUueVxuXHRcdFx0IyBNb3VzZSBFdmVudFxuXHRcdFx0c2NyZWVuQ29vcmRzID0gbGF5ZXIuc2NyZWVuRnJhbWVcblx0XHRcdGUueCArPSBzY3JlZW5Db29yZHMueFxuXHRcdFx0ZS55ICs9IHNjcmVlbkNvb3Jkcy55XG5cdFx0ZWxzZVxuXHRcdFx0IyBUb3VjaCBFdmVudFxuXHRcdFx0ZSA9IGNsaWVudENvb3JkcyBldmVudFxuXHRcdHJldHVybiBlXG5cdFx0XHRcblx0QG9mZnNldCA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0b2Zmc2V0QXJndW1lbnRFcnJvcigpIHVubGVzcyBldmVudD8gYW5kIGxheWVyP1xuXHRcdGUgPSBvZmZzZXRDb29yZHMgZXZlbnRcblx0XHR1bmxlc3MgZS54PyBhbmQgZS55P1xuXHRcdFx0IyBUb3VjaCBFdmVudFxuXHRcdFx0ZSA9IGNsaWVudENvb3JkcyBldmVudFxuXHRcdFx0dGFyZ2V0U2NyZWVuQ29vcmRzID0gbGF5ZXIuc2NyZWVuRnJhbWVcblx0XHRcdGUueCAtPSB0YXJnZXRTY3JlZW5Db29yZHMueFxuXHRcdFx0ZS55IC09IHRhcmdldFNjcmVlbkNvb3Jkcy55XG5cdFx0cmV0dXJuIGVcblx0XG5cdCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHQjIFByaXZhdGUgSGVscGVyIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0XG5cdG9mZnNldENvb3JkcyA9IChldikgIC0+IGUgPSBFdmVudHMudG91Y2hFdmVudCBldjsgcmV0dXJuIGNvb3JkcyBlLm9mZnNldFgsIGUub2Zmc2V0WVxuXHRjbGllbnRDb29yZHMgPSAoZXYpICAtPiBlID0gRXZlbnRzLnRvdWNoRXZlbnQgZXY7IHJldHVybiBjb29yZHMgZS5jbGllbnRYLCBlLmNsaWVudFlcblx0Y29vcmRzICAgICAgID0gKHgseSkgLT4gcmV0dXJuIHg6eCwgeTp5XG5cdFxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBFcnJvciBIYW5kbGVyIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdFxuXHRzY3JlZW5Bcmd1bWVudEVycm9yID0gLT5cblx0XHRlcnJvciBudWxsXG5cdFx0Y29uc29sZS5lcnJvciBcIlwiXCJcblx0XHRcdFBvaW50ZXIuc2NyZWVuKCkgRXJyb3I6IFlvdSBtdXN0IHBhc3MgZXZlbnQgJiBsYXllciBhcmd1bWVudHMuIFxcblxuXHRcdFx0RXhhbXBsZTogbGF5ZXIub24gRXZlbnRzLlRvdWNoU3RhcnQsKGV2ZW50LGxheWVyKSAtPiBQb2ludGVyLnNjcmVlbihldmVudCwgbGF5ZXIpXCJcIlwiXG5cdFx0XHRcblx0b2Zmc2V0QXJndW1lbnRFcnJvciA9IC0+XG5cdFx0ZXJyb3IgbnVsbFxuXHRcdGNvbnNvbGUuZXJyb3IgXCJcIlwiXG5cdFx0XHRQb2ludGVyLm9mZnNldCgpIEVycm9yOiBZb3UgbXVzdCBwYXNzIGV2ZW50ICYgbGF5ZXIgYXJndW1lbnRzLiBcXG5cblx0XHRcdEV4YW1wbGU6IGxheWVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LChldmVudCxsYXllcikgLT4gUG9pbnRlci5vZmZzZXQoZXZlbnQsIGxheWVyKVwiXCJcIiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
