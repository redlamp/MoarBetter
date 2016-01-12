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
    this.imageVal.html = this.imageID;
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
      return this.bg.hueRotate = this.groupID * 63;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL0dyb3VwRm9jdXMuY29mZmVlIiwiL3dvcmtzcGFjZS9Nb2FyQmV0dGVyL0luc3RhZ3JhbSBUcmlwdHljaHMuZnJhbWVyL21vZHVsZXMvSW5zdGFJbWFnZS5jb2ZmZWUiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9Qb2ludGVyLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsR0FBRDtBQUNaLFFBQUE7O01BRGEsTUFBSTs7SUFDakIsS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLEtBQUEsR0FBUSxHQUFHLENBQUM7SUFDWix5Q0FBTSxHQUFOO0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxHQUFELEdBQU87SUFDUCxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLGVBQUQsR0FBbUIsR0FBRyxDQUFDO0lBRXZCLElBQUMsQ0FBQSxJQUFELHNCQUFRLEdBQUcsQ0FBQyxPQUFKLEdBQUcsQ0FBQyxPQUFRO0lBQ3BCLElBQUMsQ0FBQSxHQUFELHFCQUFPLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ2xCLElBQUMsQ0FBQSxHQUFELHFCQUFRLEdBQUcsQ0FBQyxNQUFKLEdB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SUFBTyxrQkFBa0IsQ0FBQyxFQUwzQjs7QUFNQSxXQUFPO0VBVEU7O0VBY1YsWUFBQSxHQUFlLFNBQUMsRUFBRDtBQUFTLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDLFVBQVAsQ0FBa0IsRUFBbEI7QUFBc0IsV0FBTyxNQUFBLENBQU8sQ0FBQyxDQUFDLE9BQVQsRUFBa0IsQ0FBQyxDQUFDLE9BQXBCO0VBQTFDOztFQUNmLFlBQUEsR0FBZSxTQUFDLEVBQUQ7QUFBUyxRQUFBO0lBQUEsQ0FBQSxHQUFJLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEVBQWxCO0FBQXNCLFdBQU8sTUFBQSxDQUFPLENBQUMsQ0FBQyxPQUFULEVBQWtCLENBQUMsQ0FBQyxPQUFwQjtFQUExQzs7RUFDZixNQUFBLEdBQWUsU0FBQyxDQUFELEVBQUcsQ0FBSDtBQUFTLFdBQU87TUFBQSxDQUFBLEVBQUUsQ0FBRjtNQUFLLENBQUEsRUFBRSxDQUFQOztFQUFoQjs7RUFLZixtQkFBQSxHQUFzQixTQUFBO0lBQ3JCLEtBQUEsQ0FBTSxJQUFOO1dBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxzSkFBZDtFQUZxQjs7RUFNdEIsbUJBQUEsR0FBc0IsU0FBQTtJQUNyQixLQUFBLENBQU0sSUFBTjtXQUNBLE9BQU8sQ0FBQyxLQUFSLENBQWMsc0pBQWQ7RUFGcUI7Ozs7Ozs7O0FDN0R2QixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHQ9e30pIC0+XG5cdFx0aW5pdFcgPSBvcHQud2lkdGhcblx0XHRpbml0SCA9IG9wdC5oZWlnaHRcblx0XHRzdXBlcihvcHQpXG5cdFx0QG5hbWUgPSBcIkdyaWRNb2R1bGVcIlxuXHRcdEByZWYgPSB0aGlzXG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBvcHQuYmFja2dyb3VuZENvbG9yXG5cdFxuXHRcdEBkYXRhID0gb3B0LmRhdGEgPz0gW11cblx0XHRAcm93ID0gb3B0LnJvdyA/PSAzXG5cdFx0QGNvbCA9ICBvcHQucm93ID89IHVuZGVmaW5lZFxuXHRcdEBjZWxsVyA9IG9wdC5jZWxsVyA/PSBAZGF0YVswXS53aWR0aCA/PSAxMDBcblx0XHRAY2VsbEggPSBvcHQuY2VsbEggPz0gQGNlbGxXXG5cdFx0QG1hcmdpbiA9IG9wdC5tYXJnaW4gPz0gMFxuXHRcdEBtYXJnaW5YID0gb3B0Lm1hcmdpblggPz0gQG1hcmdpblxuXHRcdEBtYXJnaW5ZID0gb3B0Lm1hcmdpblkgPz0gQG1hcmdpblhcblx0XHRcdFxuXHRcdEB3aWR0aCA9IGluaXRXID89IChAY2VsbFcgKyBAbWFyZ2luWCkgKiBAcm93IC0gQG1hcmdpblhcblx0XHRAaGVpZ2h0ID0gaW5pdEggPz0gQGNlbGxIXG5cdFx0XG5cdFx0QGNvbnRlbnQgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY29udGVudFwiXG5cdFx0XHRjbGlwOiBmYWxzZVx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcblx0XHRAY29udGVudC5vbiBcImNoYW5nZTpoZWlnaHRcIiwgLT5cblx0XHRcdGlmIEBzdXBlckxheWVyLmhlaWdodCA8IEBoZWlnaHRcblx0XHRcdFx0QHN1cGVyTGF5ZXIuaGVpZ2h0ID0gQGhlaWdodFxuXHRcdFxuXHRcdEBkcmF3QmVoYXZpb3IgPSBvcHQuZHJhd0JlaGF2aW9yID89IEBkZWZhdWx0RHJhd0JlaGF2aW9yXG5cblx0XHRAZHJhdygpXG5cdFx0XG5cdGdldERhdGE6IC0+XG5cdFx0cmV0dXJuIEBkYXRhWy4uXVxuXHRcblx0YWRkOiAoY2VsbCkgLT5cblx0XHRyZXR1cm4gQGluc2VydChbY2VsbF0sIEBkYXRhLmxlbmd0aClcblx0XG5cdGluc2VydDogKGNlbGxzLCBwb3NpdGlvbiA9IDApIC0+XG5cdFx0QGRhdGFbcG9zaXRpb24uLi5wb3NpdGlvbl0gPSBjZWxsc1xuXHRcdEBkcmF3KClcblx0XHRyZXR1cm4gY2VsbHNcblx0XG5cdHJlbW92ZTogKHBvc2l0aW9uLCBsZW5ndGggPSAxKSAtPlxuXHRcdGNlbGxzID0gQGRhdGFbcG9zaXRpb24uLnBvc2l0aW9uK2xlbmd0aF1cblx0XHRAZGF0YVtwb3NpdGlvbi4ucG9zaXRpb24rbGVuZ3RoXSA9IFtdXG5cdFx0Zm9yIGMgaW4gY2VsbHNcblx0XHRcdGlmIGMuc3VwZXJMYXllciA9PSBAY29udGVudFxuXHRcdFx0XHRjLnN1cGVyTGF5ZXIgPSBudWxsXG5cdFx0QGRyYXcoKVxuXHRcdHJldHVybiBjZWxsc1xuXHRcblx0ZGVmYXVsdERyYXdCZWhhdmlvcjogKGMsIHgsIHksIGkpIC0+XG5cdFx0Yy5zdXBlckxheWVyID0gQGNvbnRlbnRcblx0XHRjLnggPSB4XG5cdFx0Yy55ID0geVxuXHRcdFxuI1x0ZHJhdzogVXRpbHMudGhyb3R0bGUgMC4xLCBfZHJhdywge3Rlc3RTY29wZTogdGhpc31cbiNcdF9kcmF3OiAtPlxuXHRkcmF3OiAtPlxuI1x0XHRwcmludCBcIkdyaWRNb2R1bGUuZHJhdygpXCJcbiNcdFx0cHJpbnQgXCJyZWY6ICBcIitAcmVmXG4jXHRcdHByaW50IFwidGhpczogXCIrdGhpc1xuXHRcdGZvciBjLCBpIGluIEBkYXRhXG5cdFx0XHRjWCA9IChpICUgQHJvdykgKiAoQGNlbGxXICsgQG1hcmdpblgpXG5cdFx0XHRjWSA9IE1hdGguZmxvb3IoaSAvIEByb3cpICogKEBjZWxsSCArIEBtYXJnaW5ZKVxuXHRcdFx0QGRyYXdCZWhhdmlvcihjLCBjWCwgY1ksIGkpXG5cdFx0QHVwZGF0ZUNvbnRlbnRTaXplKClcblx0XHRcbiNcdHVwZGF0ZUNvbnRlbnRTaXplID0gVXRpbHMudGhyb3R0bGUgLjEsIF91cGRhdGVDb250ZW50U2l6ZVxuI1x0X3VwZGF0ZUNvbnRlbnRTaXplOiAtPlxuXHR1cGRhdGVDb250ZW50U2l6ZTogLT5cbiNcdFx0cHJpbnQgXCJHcmlkTW9kdWxlLnVwZGF0ZUNvbnRlbnRTaXplKClcIlxuXHRcdEBjb250ZW50LmhlaWdodCA9IEBjb250ZW50LmNvbnRlbnRGcmFtZSgpLmhlaWdodCIsImNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdD17fSkgLT4iLCJpbWFnZUNvdW50ID0gMFxuXG5pbWFnZVZhbHVlU3R5bGUgPSBuZXcgTGF5ZXJcblxuaW1hZ2VWYWx1ZVN0eWxlID1cblx0XCJmb250LWZhbWlseVwiOiBcIlNGVUlEaXNwbGF5LUxpZ2h0XCJcblx0XCJmb250LXNpemVcIjogXCI0OHB4XCJcblx0XCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIlxuXHRcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG5cdFwibGluZS1oZWlnaHRcIjogXCI1OHB4XCJcblx0XCJ0ZXh0LXNoYWRvd1wiOiBcIjFweCAycHggMHB4IHJnYmEoMCwwLDAsMC41MClcIlxuI1x0XCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwic2FsbW9uXCJcblxuaW1hZ2VMYWJlbFN0eWxlID0gXG5cdFwiZm9udC1mYW1pbHlcIjogXCJTRlVJRGlzcGxheS1CbGFja1wiXG5cdFwiZm9udC1zaXplXCI6IFwiMThweFwiXG5cdFwiY29sb3JcIjogXCIjRkZGRkZGXCJcblx0XCJsaW5lLWhlaWdodFwiOiBcIjIxcHhcIlxuXHRcInRleHQtc2hhZG93XCI6IFwiMXB4IDJweCAwcHggcmdiYSgwLDAsMCwwLjUwKVwiXG5cbmNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdD17fSkgLT5cblx0XHRpbml0VyA9IG9wdC53aWR0aFxuXHRcdGluaXRIID0gb3B0LmhlaWdodFxuXHRcdHN1cGVyKG9wdClcblx0XHRcblx0XHRAY29uZmlnRGlzcGxheSgpXG5cdFx0XG5cdFx0QHNldEltYWdlKG9wdC5pbWFnZUlEID89IGltYWdlQ291bnQrKylcblx0XHRAc2V0UG9zaXRpb24ob3B0LnBvcyA/PSAtMSlcblx0XHRAc2V0R3JvdXAob3B0Lmdyb3VwSUQgPyAtMSlcblx0XHRcblx0XHRAbmFtZSA9IG9wdC5uYW1lID89IFwiSW5zdGFJbWFnZV9cIitAaW1hZ2VJRFxuXHRcblx0XHRAd2lkdGggPSBpbml0VyA/PSAyNDhcblx0XHRAaGVpZ2h0ID0gaW5pdEggPz0gQHdpZHRoXG5cdFx0QGNsaXAgPSBvcHQuY2xpcCA/PSBmYWxzZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBvcHQuYmFja2dyb3VuZENvbG9yXG5cdFxuXHRzZXRJbWFnZTogKHZhbCkgLT5cblx0XHRAaW1hZ2VJRCA9IHZhbCA/PSBAaW1hZ2VJRFxuXHRcdEBpbWFnZVZhbC5odG1sID0gQGltYWdlSUQjICsgMVxuXHRcdEBpbWFnZVZhbC5zdHlsZSA9IGltYWdlVmFsdWVTdHlsZVxuXHRcdFxuXHRzZXRQb3NpdGlvbjogKHZhbCkgLT5cblx0XHRAcG9zID0gdmFsID89IEBwb3Ncblx0XHRAcG9zaXRpb25WYWwuaHRtbCA9IEBwb3MgKyAxXG5cdFx0QHBvc2l0aW9uVmFsLnN0eWxlID0gaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdHNldEdyb3VwOiAodmFsKSAtPlxuXHRcdEBncm91cElEID0gdmFsID89IEBncm91cElEID89IC0xXG5cdFx0aWYgQGdyb3VwSUQgPj0gMFxuXHRcdFx0QGdyb3VwVmFsLmh0bWwgPSBAZ3JvdXBJRCArIDFcblx0XHRcdEBncm91cFZhbC5zdHlsZSA9IGltYWdlVmFsdWVTdHlsZVxuXHRcdFx0QGdyb3VwTGFiZWwuaHRtbCA9IFwiR1JPVVBcIlxuXHRcdFx0QGdyb3VwVmFsLm9wYWNpdHkgPSBAZ3JvdXBMYWJlbC5vcGFjaXR5ID0gMVxuXHRcdFx0QGJnLmJhY2tncm91bmRDb2xvciA9IFwiI0QwMDIxQlwiXG5cdFx0XHRAYmcuaHVlUm90YXRlID0gQGdyb3VwSUQgKiA2M1xuXHRcdGVsc2Vcblx0XHRcdEBncm91cFZhbC5odG1sID0gXCJcIlxuXHRcdFx0QGdyb3VwTGFiZWwuaHRtbCA9IFwiTk8gR1JPVVBcIlxuXHRcdFx0QGdyb3VwVmFsLm9wYWNpdHkgPSBAZ3JvdXBMYWJlbC5vcGFjaXR5ID0gLjVcblx0XHRcdEBiZy5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNEOEQ4RDhcIlxuXHRcblx0Y29uZmlnRGlzcGxheTogLT5cblx0XHRAYmcgPSBuZXcgTGF5ZXJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHdpZHRoOiAyNDhcblx0XHRcdGhlaWdodDogMjQ4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2JiYmJiYlwiXG5cblx0XHRAaW1hZ2VMYWJlbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJpbWFnZUxhYmVsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDEyOFxuXHRcdFx0eTogNTlcblx0XHRcdGh0bWw6IFwiSU1BR0VcIlxuXHRcdFx0c3R5bGU6IGltYWdlTGFiZWxTdHlsZVxuXHRcdFxuXHRcdEBpbWFnZVZhbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJpbWFnZVZhbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAzMlxuXHRcdFx0eTogMjlcblx0XHRcdHdpZHRoOiA4NlxuXHRcdFx0aHRtbDogXCJcIlxuXHRcdFx0c3R5bGU6IGltYWdlVmFsdWVTdHlsZVxuXHRcdFxuXHRcdEBwb3NpdGlvbkxhYmVsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImltYWdlTGFiZWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMTI4XG5cdFx0XHR5OiAxMTdcblx0XHRcdGh0bWw6IFwiUE9TSVRJT05cIlxuXHRcdFx0c3R5bGU6IGltYWdlTGFiZWxTdHlsZVxuXHRcdFx0XG5cdFx0QHBvc2l0aW9uVmFsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInBvc2l0aW9uVmFsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDMyXG5cdFx0XHR5OiA4OFxuXHRcdFx0d2lkdGg6IDg1XG5cdFx0XHRodG1sOiBcIlwiXG5cdFx0XHRzdHlsZTogaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdFx0QGdyb3VwTGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiZ3JvdXBMYWJlbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAxMjhcblx0XHRcdHk6IDE3NVxuXHRcdFx0aHRtbDogXCJHUk9VUFwiXG5cdFx0XHRzdHlsZTogaW1hZ2VMYWJlbFN0eWxlXG5cdFx0XG5cdFx0QGdyb3VwVmFsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImdyb3VwVmFsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDMyXG5cdFx0XHR5OiAxNDZcblx0XHRcdHdpZHRoOiA4NlxuXHRcdFx0aHRtbDogXCJcIlxuXHRcdFx0c3R5bGU6IGltYWdlVmFsdWVTdHlsZVxuXHRcdFxuXHRcdEBzdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHRjdXJ2ZTogXCJzcHJpbmcoNTAwLCAyNSwgMClcIlxuXHRcdFxuXHRcdEBzdGF0ZXMuYWRkXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRzY2FsZTogMVxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHRzZWxlY3RlZDpcblx0XHRcdFx0c2NhbGU6IDFcblx0XHRcdGRlc2VsZWN0ZWQ6XG5cdFx0XHRcdHNjYWxlOiAuOVxuXHRcdFx0dW5zZWxlY3RlZDpcblx0XHRcdFx0Z3JheXNjYWxlOiAxMDAiLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQ3JlYXRlZCBieSBKb3JkYW4gUm9iZXJ0IERvYnNvbiBvbiAxNCBBdWd1c3QgMjAxNVxuIyBcbiMgVXNlIHRvIG5vcm1hbGl6ZSBzY3JlZW4gJiBvZmZzZXQgeCx5IHZhbHVlcyBmcm9tIGNsaWNrIG9yIHRvdWNoIGV2ZW50cy5cbiNcbiMgVG8gR2V0IFN0YXJ0ZWQuLi5cbiNcbiMgMS4gUGxhY2UgdGhpcyBmaWxlIGluIEZyYW1lciBTdHVkaW8gbW9kdWxlcyBkaXJlY3RvcnlcbiNcbiMgMi4gSW4geW91ciBwcm9qZWN0IGluY2x1ZGU6XG4jICAgICB7UG9pbnRlcn0gPSByZXF1aXJlIFwiUG9pbnRlclwiXG4jXG4jIDMuIEZvciBzY3JlZW4gY29vcmRpbmF0ZXM6IFxuIyAgICAgYnRuLm9uIEV2ZW50cy5DbGljaywgKGV2ZW50LCBsYXllcikgLT4gcHJpbnQgUG9pbnRlci5zY3JlZW4oZXZlbnQsIGxheWVyKVxuIyBcbiMgNC4gRm9yIGxheWVyIG9mZnNldCBjb29yZGluYXRlczogXG4jICAgICBidG4ub24gRXZlbnRzLkNsaWNrLCAoZXZlbnQsIGxheWVyKSAtPiBwcmludCBQb2ludGVyLm9mZnNldChldmVudCwgbGF5ZXIpXG4jXG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuY2xhc3MgZXhwb3J0cy5Qb2ludGVyXG5cblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgUHVibGljIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5cdEBzY3JlZW4gPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdHNjcmVlbkFyZ3VtZW50RXJyb3IoKSB1bmxlc3MgZXZlbnQ/IGFuZCBsYXllcj9cblx0XHRlID0gb2Zmc2V0Q29vcmRzIGV2ZW50XG5cdFx0aWYgZS54IGFuZCBlLnlcblx0XHRcdCMgTW91c2UgRXZlbnRcblx0XHRcdHNjcmVlbkNvb3JkcyA9IGxheWVyLnNjcmVlbkZyYW1lXG5cdFx0XHRlLnggKz0gc2NyZWVuQ29vcmRzLnhcblx0XHRcdGUueSArPSBzY3JlZW5Db29yZHMueVxuXHRcdGVsc2Vcblx0XHRcdCMgVG91Y2ggRXZlbnRcblx0XHRcdGUgPSBjbGllbnRDb29yZHMgZXZlbnRcblx0XHRyZXR1cm4gZVxuXHRcdFx0XG5cdEBvZmZzZXQgPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdG9mZnNldEFyZ3VtZW50RXJyb3IoKSB1bmxlc3MgZXZlbnQ/IGFuZCBsYXllcj9cblx0XHRlID0gb2Zmc2V0Q29vcmRzIGV2ZW50XG5cdFx0dW5sZXNzIGUueD8gYW5kIGUueT9cblx0XHRcdCMgVG91Y2ggRXZlbnRcblx0XHRcdGUgPSBjbGllbnRDb29yZHMgZXZlbnRcblx0XHRcdHRhcmdldFNjcmVlbkNvb3JkcyA9IGxheWVyLnNjcmVlbkZyYW1lXG5cdFx0XHRlLnggLT0gdGFyZ2V0U2NyZWVuQ29vcmRzLnhcblx0XHRcdGUueSAtPSB0YXJnZXRTY3JlZW5Db29yZHMueVxuXHRcdHJldHVybiBlXG5cdFxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBQcml2YXRlIEhlbHBlciBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdFxuXHRvZmZzZXRDb29yZHMgPSAoZXYpICAtPiBlID0gRXZlbnRzLnRvdWNoRXZlbnQgZXY7IHJldHVybiBjb29yZHMgZS5vZmZzZXRYLCBlLm9mZnNldFlcblx0Y2xpZW50Q29vcmRzID0gKGV2KSAgLT4gZSA9IEV2ZW50cy50b3VjaEV2ZW50IGV2OyByZXR1cm4gY29vcmRzIGUuY2xpZW50WCwgZS5jbGllbnRZXG5cdGNvb3JkcyAgICAgICA9ICh4LHkpIC0+IHJldHVybiB4OngsIHk6eVxuXHRcblx0IyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdCMgRXJyb3IgSGFuZGxlciBNZXRob2RzICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHRcblx0c2NyZWVuQXJndW1lbnRFcnJvciA9IC0+XG5cdFx0ZXJyb3IgbnVsbFxuXHRcdGNvbnNvbGUuZXJyb3IgXCJcIlwiXG5cdFx0XHRQb2ludGVyLnNjcmVlbigpIEVycm9yOiBZb3UgbXVzdCBwYXNzIGV2ZW50ICYgbGF5ZXIgYXJndW1lbnRzLiBcXG5cblx0XHRcdEV4YW1wbGU6IGxheWVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LChldmVudCxsYXllcikgLT4gUG9pbnRlci5zY3JlZW4oZXZlbnQsIGxheWVyKVwiXCJcIlxuXHRcdFx0XG5cdG9mZnNldEFyZ3VtZW50RXJyb3IgPSAtPlxuXHRcdGVycm9yIG51bGxcblx0XHRjb25zb2xlLmVycm9yIFwiXCJcIlxuXHRcdFx0UG9pbnRlci5vZmZzZXQoKSBFcnJvcjogWW91IG11c3QgcGFzcyBldmVudCAmIGxheWVyIGFyZ3VtZW50cy4gXFxuXG5cdFx0XHRFeGFtcGxlOiBsYXllci5vbiBFdmVudHMuVG91Y2hTdGFydCwoZXZlbnQsbGF5ZXIpIC0+IFBvaW50ZXIub2Zmc2V0KGV2ZW50LCBsYXllcilcIlwiXCIiLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
