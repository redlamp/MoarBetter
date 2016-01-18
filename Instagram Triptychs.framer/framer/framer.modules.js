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
    this.name = opt.name != null ? opt.name : opt.name = "img_" + this.imageID;
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
      return this.bg.hueRotate = this.groupID * -63;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL0dyb3VwRm9jdXMuY29mZmVlIiwiL3dvcmtzcGFjZS9Nb2FyQmV0dGVyL0luc3RhZ3JhbSBUcmlwdHljaHMuZnJhbWVyL21vZHVsZXMvSW5zdGFJbWFnZS5jb2ZmZWUiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9Qb2ludGVyLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7OztBQUFNLE1BQU0sQ0FBQzs7O0VBQ0MsaUJBQUMsR0FBRDtBQUNaLFFBQUE7O01BRGEsTUFBSTs7SUFDakIsS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLEtBQUEsR0FBUSxHQUFHLENBQUM7SUFDWix5Q0FBTSxHQUFOO0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxHQUFELEdBQU87SUFDUCxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLGVBQUQsR0FBbUIsR0FBRyxDQUFDO0lBRXZCLElBQUMsQ0FBQSxJQUFELHNCQUFRLEdBQUcsQ0FBQyxPQUFKLEdBQUcsQ0FBQyxPQUFRO0lBQ3BCLElBQUMsQ0FBQSxHQUFELHFCQUFPLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ2xCLElBQUMsQ0FBQSxHQUFELHFCQUFRLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPO0lBQ25CLElBQUMsQ0FBQSxLQUFELHVCQUFTLEdBQUcsQ0FBQyxRQUFKLEdBQUcsQ0FBQyxrREFBaUIsQ0FBQyxZQUFELENBQUMsUUFBUztJQUN4QyxJQUFDLENBQUEsS0FBRCx1QkFBUyxHQUFHLENBQUMsUUFBSixHQUFHLENBQUMsUUFBUyxJQUFDLENBQUE7SUFDdkIsSUFBQyxDQUFBLE1BQUQsd0JBQVUsR0FBRyxDQUFDLFNBQUosR0FBRyxDQUFDLFNBQVU7SUFDeEIsSUFBQyxDQUFBLE9BQUQseUJBQVcsR0FBRyxDQUFDLFVBQUosR0FBRyxDQUFDLFVBQVcsSUFBQyxDQUFBO0lBQzNCLElBQUMsQ0FBQSxPQUFELHlCQUFXLEdBQUcsQ0FBQyxVQUFKLEdBQUcsQ0FBQyxVQUFXLElBQUMsQ0FBQTtJQUUzQixJQUFDLENBQUEsS0FBRCxtQkFBUyxRQUFBLFFBQVMsQ0FBQyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxPQUFYLENBQUEsR0FBc0IsSUFBQyxDQUFBLEdBQXZCLEdBQTZCLElBQUMsQ0FBQTtJQUNoRCxJQUFDLENBQUEsTUFBRCxtQkFBVSxRQUFBLFFBQVMsSUFBQyxDQUFBO0lBRXBCLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxLQUFBLENBQ2Q7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLElBQUEsRUFBTSxLQUROO01BRUEsZUFBQSxFQUFpQixJQUZqQjtNQUdBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FIUjtNQUlBLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFKVDtNQUtBLFVBQUEsRUFBWSxJQUxaO0tBRGM7SUFRZixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSxlQUFaLEVBQTZCLFNBQUE7TUFDNUIsSUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsSUFBQyxDQUFBLE1BQXpCO2VBQ0MsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLElBQUMsQ0FBQSxPQUR2Qjs7SUFENEIsQ0FBN0I7SUFJQSxJQUFDLENBQUEsWUFBRCw4QkFBZ0IsR0FBRyxDQUFDLGVBQUosR0FBRyxDQUFDLGVBQWdCLElBQUMsQ0FBQTtJQUVyQyxJQUFDLENBQUEsSUFBRCxDQUFBO0VBbkNZOztvQkFxQ2IsT0FBQSxHQUFTLFNBQUE7QUFDUixXQUFPLElBQUMsQ0FBQSxJQUFLO0VBREw7O29CQUdULEdBQUEsR0FBSyxTQUFDLElBQUQ7QUFDSixXQUFPLElBQUMsQ0FBQSxNQUFELENBQVEsQ0FBQyxJQUFELENBQVIsRUFBZ0IsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUF0QjtFQURIOztvQkFHTCxNQUFBLEdBQVEsU0FBQyxLQUFELEVBQVEsUUFBUjs7TUFBUSxXQUFXOztJQUMxQixrRUFBNkIsS0FBN0IsSUFBNkI7SUFDN0IsSUFBQyxDQUFBLElBQUQsQ0FBQTtBQUNBLFdBQU87RUFIQTs7b0JBS1IsTUFBQSxHQUFRLFNBQUMsUUFBRCxFQUFXLE1BQVg7QUFDUCxRQUFBOztNQURrQixTQUFTOztJQUMzQixLQUFBLEdBQVEsSUFBQyxDQUFBLElBQUs7SUFDZCx1RkFBbUMsRUFBbkMsSUFBbUM7QUFDbkMsU0FBQSx1Q0FBQTs7TUFDQyxJQUFHLENBQUMsQ0FBQyxVQUFGLEtBQWdCLElBQUMsQ0FBQSxPQUFwQjtRQUNDLENBQUMsQ0FBQyxVQUFGLEdBQWUsS0FEaEI7O0FBREQ7SUFHQSxJQUFDLENBQUEsSUFBRCxDQUFBO0FBQ0EsV0FBTztFQVBBOztvQkFTUixtQkFBQSxHQUFxQixTQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVY7SUFDcEIsQ0FBQyxDQUFDLFVBQUYsR0FBZSxJQUFDLENBQUE7SUFDaEIsQ0FBQyxDQUFDLENBQUYsR0FBTTtXQUNOLENBQUMsQ0FBQyxDQUFGLEdBQU07RUFIYzs7b0JBT3JCLElBQUEsR0FBTSxTQUFBO0FBSUwsUUFBQTtBQUFBO0FBQUEsU0FBQSw2Q0FBQTs7TUFDQyxFQUFBLEdBQUssQ0FBQyxDQUFBLEdBQUksSUFBQyxDQUFBLEdBQU4sQ0FBQSxHQUFhLENBQUMsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsT0FBWDtNQUNsQixFQUFBLEdBQUssSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFBLEdBQUksSUFBQyxDQUFBLEdBQWhCLENBQUEsR0FBdUIsQ0FBQyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxPQUFYO01BQzVCLElBQUMsQ0FBQSxZQUFELENBQWMsQ0FBZCxFQUFpQixFQUFqQixFQUFxQixFQUFyQixFQUF5QixDQUF6QjtBQUhEO1dBSUEsSUFBQyxDQUFBLGlCQUFELENBQUE7RUFSSzs7b0JBWU4saUJBQUEsR0FBbUIsU0FBQTtXQUVsQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0IsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULENBQUEsQ0FBdUIsQ0FBQztFQUZ4Qjs7OztHQTdFUzs7OztBQ0E3QixJQUFBOzs7QUFBTSxNQUFNLENBQUM7OztFQUNDLGlCQUFDLEdBQUQ7O01BQUMsTUFBSTs7RUFBTDs7OztHQURlOzs7O0FDQTdCLElBQUEsNENBQUE7RUFBQTs7O0FBQUEsVUFBQSxHQUFhOztBQUViLGVBQUEsR0FBa0IsSUFBSTs7QUFFdEIsZUFBQSxHQUNDO0VBQUEsYUFBQSxFQUFlLG1CQUFmO0VBQ0EsV0FBQSxFQUFhLE1BRGI7RUFFQSxZQUFBLEVBQWMsT0FGZDtFQUdBLE9BQUEsRUFBUyxTQUhUO0VBSUEsYUFBQSxFQUFlLE1BSmY7RUFLQSxhQUFBLEVBQWUsOEJBTGY7OztBQVFELGVBQUEsR0FDQztFQUFBLGFBQUEsRUFBZSxtQkFBZjtFQUNBLFdBQUEsRUFBYSxNQURiO0VBRUEsT0FBQSxFQUFTLFNBRlQ7RUFHQSxhQUFBLEVBQWUsTUFIZjtFQUlBLGFBQUEsRUFBZSw4QkFKZjs7O0FBTUssTUFBTSxDQUFDOzs7RUFDQyxpQkFBQyxHQUFEO0FBQ1osUUFBQTs7TUFEYSxNQUFJOztJQUNqQixLQUFBLEdBQVEsR0FBRyxDQUFDO0lBQ1osS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLHlDQUFNLEdBQU47SUFFQSxJQUFDLENBQUEsYUFBRCxDQUFBO0lBRUEsSUFBQyxDQUFBLFFBQUQsdUJBQVUsR0FBRyxDQUFDLFVBQUosR0FBRyxDQUFDLFVBQVcsVUFBQSxFQUF6QjtJQUNBLElBQUMsQ0FBQSxXQUFELG1CQUFhLEdBQUcsQ0FBQyxNQUFKLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBekI7SUFDQSxJQUFDLENBQUEsUUFBRCxxQ0FBd0IsQ0FBQyxDQUF6QjtJQUVBLElBQUMsQ0FBQSxJQUFELHNCQUFRLEdBQUcsQ0FBQyxPQUFKLEdBQUcsQ0FBQyxPQUFRLE1BQUEsR0FBTyxJQUFDLENBQUE7SUFFNUIsSUFBQyxDQUFBLEtBQUQsbUJBQVMsUUFBQSxRQUFTO0lBQ2xCLElBQUMsQ0FBQSxNQUFELG1CQUFVLFFBQUEsUUFBUyxJQUFDLENBQUE7SUFDcEIsSUFBQyxDQUFBLElBQUQsc0JBQVEsR0FBRyxDQUFDLE9BQUosR0FBRyxDQUFDLE9BQVE7SUFDcEIsSUFBQyxDQUFBLGVBQUQsR0FBbUIsR0FBRyxDQUFDO0VBaEJYOztvQkFrQmIsUUFBQSxHQUFVLFNBQUMsR0FBRDtJQUNULElBQUMsQ0FBQSxPQUFELGlCQUFXLE1BQUEsTUFBTyxJQUFDLENBQUE7SUFDbkIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLEdBQWlCLElBQUMsQ0FBQTtXQUNsQixJQUFDLENBQUEsUUFBUSxDQUFDLEtBQVYsR0FBa0I7RUFIVDs7b0JBS1YsV0FBQSxHQUFhLFNBQUMsR0FBRDtJQUNaLElBQUMsQ0FBQSxHQUFELGlCQUFPLE1BQUEsTUFBTyxJQUFDLENBQUE7SUFDZixJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsR0FBb0IsSUFBQyxDQUFBLEdBQUQsR0FBTztXQUMzQixJQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsR0FBcUI7RUFIVDs7b0JBS2IsUUFBQSxHQUFVLFNBQUMsR0FBRDtJQUNULElBQUMsQ0FBQSxPQUFELGlCQUFXLE1BQUEsNkJBQU8sSUFBQyxDQUFBLFVBQUQsSUFBQyxDQUFBLFVBQVcsQ0FBQztJQUMvQixJQUFHLElBQUMsQ0FBQSxPQUFELElBQVksQ0FBZjtNQUNDLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixHQUFpQixJQUFDLENBQUEsT0FBRCxHQUFXO01BQzVCLElBQUMsQ0FBQSxRQUFRLENBQUMsS0FBVixHQUFrQjtNQUNsQixJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosR0FBbUI7TUFDbkIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxPQUFWLEdBQW9CLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixHQUFzQjtNQUMxQyxJQUFDLENBQUEsRUFBRSxDQUFDLGVBQUosR0FBc0I7YUFDdEIsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFKLEdBQWdCLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQyxHQU43QjtLQUFBLE1BQUE7TUFRQyxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsR0FBaUI7TUFDakIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLEdBQW1CO01BQ25CLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixHQUFvQixJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosR0FBc0I7YUFDMUMsSUFBQyxDQUFBLEVBQUUsQ0FBQyxlQUFKLEdBQXNCLFVBWHZCOztFQUZTOztvQkFlVixhQUFBLEdBQWUsU0FBQTtJQUNkLElBQUMsQ0FBQSxFQUFELEdBQVUsSUFBQSxLQUFBLENBQ1Q7TUFBQSxVQUFBLEVBQVksSUFBWjtNQUNBLEtBQUEsRUFBTyxHQURQO01BRUEsTUFBQSxFQUFRLEdBRlI7TUFHQSxlQUFBLEVBQWlCLFNBSGpCO0tBRFM7SUFNVixJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLEtBQUEsQ0FDakI7TUFBQSxJQUFBLEVBQU0sWUFBTjtNQUNBLFVBQUEsRUFBWSxJQURaO01BRUEsQ0FBQSxFQUFHLEdBRkg7TUFHQSxDQUFBLEVBQUcsRUFISDtNQUlBLElBQUEsRUFBTSxPQUpOO01BS0EsS0FBQSxFQUFPLGVBTFA7S0FEaUI7SUFRbEIsSUFBQyxDQUFBLFFBQUQsR0FBZ0IsSUFBQSxLQUFBLENBQ2Y7TUFBQSxJQUFBLEVBQU0sVUFBTjtNQUNBLFVBQUEsRUFBWSxJQURaO01BRUEsQ0FBQSxFQUFHLEVBRkg7TUFHQSxDQUFBLEVBQUcsRUFISDtNQUlBLEtBQUEsRUFBTyxFQUpQO01BS0EsSUFBQSxFQUFNLEVBTE47TUFNQSxLQUFBLEVBQU8sZUFOUDtLQURlO0lBU2hCLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsS0FBQSxDQUNwQjtNQUFBLElBQUEsRUFBTSxZQUFOO01BQ0EsVUFBQSxFQUFZLElBRFo7TUFFQSxDQUFBLEVBQUcsR0FGSDtNQUdBLENBQUEsRUFBRyxHQUhIO01BSUEsSUFBQSxFQUFNLFVBSk47TUFLQSxLQUFBLEVBQU8sZUFMUDtLQURvQjtJQVFyQixJQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLEtBQUEsQ0FDbEI7TUFBQSxJQUFBLEVBQU0sYUFBTjtNQUNBLFVBQUEsRUFBWSxJQURaO01BRUEsQ0FBQSxFQUFHLEVBRkg7TUFHQSxDQUFBLEVBQUcsRUFISDtNQUlBLEtBQUEsRUFBTyxFQUpQO01BS0EsSUFBQSxFQUFNLEVBTE47TUFNQSxLQUFBLEVBQU8sZUFOUDtLQURrQjtJQVNuQixJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLEtBQUEsQ0FDakI7TUFBQSxJQUFBLEVBQU0sWUFBTjtNQUNBLFVBQUEsRUFBWSxJQURaO01BRUEsQ0FBQSxFQUFHLEdBRkg7TUFHQSxDQUFBLEVBQUcsR0FISDtNQUlBLElBQUEsRUFBTSxPQUpOO01BS0EsS0FBQSxFQUFPLGVBTFA7S0FEaUI7SUFRbEIsSUFBQyxDQUFBLFFBQUQsR0FBZ0IsSUFBQSxLQUFBLENBQ2Y7TUFBQSxJQUFBLEVBQU0sVUFBTjtNQUNBLFVBQUEsRUFBWSxJQURaO01BRUEsQ0FBQSxFQUFHLEVBRkg7TUFHQSxDQUFBLEVBQUcsR0FISDtNQUlBLEtBQUEsRUFBTyxFQUpQO01BS0EsSUFBQSxFQUFNLEVBTE47TUFNQSxLQUFBLEVBQU8sZUFOUDtLQURlO0lBU2hCLElBQUMsQ0FBQSxNQUFNLENBQUMsZ0JBQVIsR0FDQztNQUFBLEtBQUEsRUFBTyxvQkFBUDs7V0FFRCxJQUFDLENBQUEsTUFBTSxDQUFDLEdBQVIsQ0FDQztNQUFBLFNBQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxDQUFQO1FBQ0EsT0FBQSxFQUFTLENBRFQ7T0FERDtNQUdBLFFBQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxDQUFQO09BSkQ7TUFLQSxVQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sRUFBUDtPQU5EO01BT0EsVUFBQSxFQUNDO1FBQUEsU0FBQSxFQUFXLEdBQVg7T0FSRDtLQUREO0VBN0RjOzs7O0dBNUNhOzs7O0FDQXZCLE9BQU8sQ0FBQztBQUtiLE1BQUE7Ozs7RUFBQSxPQUFDLENBQUEsTUFBRCxHQUFVLFNBQUMsS0FBRCxFQUFRLEtBQVI7QUFDVCxRQUFBO0lBQUEsSUFBQSxDQUFBLENBQTZCLGVBQUEsSUFBVyxlQUF4QyxDQUFBO01BQUEsbUJBQUEsQ0FBQSxFQUFBOztJQUNBLENBQUEsR0FBSSxZQUFBLENBQWEsS0FBYjtJQUNKLElBQUcsQ0FBQyxDQUFDLENBQUYsSUFBUSxDQUFDLENBQUMsQ0FBYjtNQUVDLFlBQUEsR0FBZSxLQUFLLENBQUM7TUFDckIsQ0FBQyxDQUFDLENBQUYsSUFBTyxZQUFZLENBQUM7TUFDcEIsQ0FBQyxDQUFDLENBQUYsSUFBTyxZQUFZLENBQUMsRUFKckI7S0FBQSxNQUFBO01BT0MsQ0FBQSxHQUFJLFlBQUEsQ0FBYSxLQUFiLEVBUEw7O0FBUUEsV0FBTztFQVhFOztFQWFWLE9BQUMsQ0FBQSxNQUFELEdBQVUsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUNULFFBQUE7SUFBQSxJQUFBLENBQUEsQ0FBNkIsZUFBQSxJQUFXLGVBQXhDLENBQUE7TUFBQSxtQkFBQSxDQUFBLEVBQUE7O0lBQ0EsQ0FBQSxHQUFJLFlBQUEsQ0FBYSxLQUFiO0lBQ0osSUFBQSxDQUFBLENBQU8sYUFBQSxJQUFTLGFBQWhCLENBQUE7TUFFQyxDQUFBLEdBQUksWUFBQSxDQUFhLEtBQWI7TUFDSixrQkFBQSxHQUFxQixLQUFLLENBQUM7TUFDM0IsQ0FBQyxDQUFDLENBQUYsSUFBTyxrQkFBa0IsQ0FBQztNQUMxQixDQUFDLENBQUMsQ0FBRixJQUFPLGtCQUFrQixDQUFDLEVBTDNCOztBQU1BLFdBQU87RUFURTs7RUFjVixZQUFBLEdBQWUsU0FBQyxFQUFEO0FBQVMsUUFBQTtJQUFBLENBQUEsR0FBSSxNQUFNLENBQUMsVUFBUCxDQUFrQixFQUFsQjtBQUFzQixXQUFPLE1BQUEsQ0FBTyxDQUFDLENBQUMsT0FBVCxFQUFrQixDQUFDLENBQUMsT0FBcEI7RUFBMUM7O0VBQ2YsWUFBQSxHQUFlLFNBQUMsRUFBRDtBQUFTLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDLFVBQVAsQ0FBa0IsRUFBbEI7QUFBc0IsV0FBTyxNQUFBLENBQU8sQ0FBQyxDQUFDLE9BQVQsRUFBa0IsQ0FBQyxDQUFDLE9BQXBCO0VBQTFDOztFQUNmLE1BQUEsR0FBZSxTQUFDLENBQUQsRUFBRyxDQUFIO0FBQVMsV0FBTztNQUFBLENBQUEsRUFBRSxDQUFGO01BQUssQ0FBQSxFQUFFLENBQVA7O0VBQWhCOztFQUtmLG1CQUFBLEdBQXNCLFNBQUE7SUFDckIsS0FBQSxDQUFNLElBQU47V0FDQSxPQUFPLENBQUMsS0FBUixDQUFjLHNKQUFkO0VBRnFCOztFQU10QixtQkFBQSxHQUFzQixTQUFBO0lBQ3JCLEtBQUEsQ0FBTSxJQUFOO1dBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxzSkFBZDtFQUZxQjs7Ozs7Ozs7QUM3RHZCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCOztBQUVoQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFBO1NBQ3BCLEtBQUEsQ0FBTSx1QkFBTjtBQURvQjs7QUFHckIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgbW9kdWxlLmV4cG9ydHMgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdD17fSkgLT5cblx0XHRpbml0VyA9IG9wdC53aWR0aFxuXHRcdGluaXRIID0gb3B0LmhlaWdodFxuXHRcdHN1cGVyKG9wdClcblx0XHRAbmFtZSA9IFwiR3JpZE1vZHVsZVwiXG5cdFx0QHJlZiA9IHRoaXNcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGJhY2tncm91bmRDb2xvciA9IG9wdC5iYWNrZ3JvdW5kQ29sb3Jcblx0XG5cdFx0QGRhdGEgPSBvcHQuZGF0YSA/PSBbXVxuXHRcdEByb3cgPSBvcHQucm93ID89IDNcblx0XHRAY29sID0gIG9wdC5yb3cgPz0gdW5kZWZpbmVkXG5cdFx0QGNlbGxXID0gb3B0LmNlbGxXID89IEBkYXRhWzBdLndpZHRoID89IDEwMFxuXHRcdEBjZWxsSCA9IG9wdC5jZWxsSCA/PSBAY2VsbFdcblx0XHRAbWFyZ2luID0gb3B0Lm1hcmdpbiA/PSAwXG5cdFx0QG1hcmdpblggPSBvcHQubWFyZ2luWCA/PSBAbWFyZ2luXG5cdFx0QG1hcmdpblkgPSBvcHQubWFyZ2luWSA/PSBAbWFyZ2luWFxuXHRcdFx0XG5cdFx0QHdpZHRoID0gaW5pdFcgPz0gKEBjZWxsVyArIEBtYXJnaW5YKSAqIEByb3cgLSBAbWFyZ2luWFxuXHRcdEBoZWlnaHQgPSBpbml0SCA/PSBAY2VsbEhcblx0XHRcblx0XHRAY29udGVudCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJjb250ZW50XCJcblx0XHRcdGNsaXA6IGZhbHNlXHRcdFx0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFxuXHRcdEBjb250ZW50Lm9uIFwiY2hhbmdlOmhlaWdodFwiLCAtPlxuXHRcdFx0aWYgQHN1cGVyTGF5ZXIuaGVpZ2h0IDwgQGhlaWdodFxuXHRcdFx0XHRAc3VwZXJMYXllci5oZWlnaHQgPSBAaGVpZ2h0XG5cdFx0XG5cdFx0QGRyYXdCZWhhdmlvciA9IG9wdC5kcmF3QmVoYXZpb3IgPz0gQGRlZmF1bHREcmF3QmVoYXZpb3JcblxuXHRcdEBkcmF3KClcblx0XHRcblx0Z2V0RGF0YTogLT5cblx0XHRyZXR1cm4gQGRhdGFbLi5dXG5cdFxuXHRhZGQ6IChjZWxsKSAtPlxuXHRcdHJldHVybiBAaW5zZXJ0KFtjZWxsXSwgQGRhdGEubGVuZ3RoKVxuXHRcblx0aW5zZXJ0OiAoY2VsbHMsIHBvc2l0aW9uID0gMCkgLT5cblx0XHRAZGF0YVtwb3NpdGlvbi4uLnBvc2l0aW9uXSA9IGNlbGxzXG5cdFx0QGRyYXcoKVxuXHRcdHJldHVybiBjZWxsc1xuXHRcblx0cmVtb3ZlOiAocG9zaXRpb24sIGxlbmd0aCA9IDEpIC0+XG5cdFx0Y2VsbHMgPSBAZGF0YVtwb3NpdGlvbi4ucG9zaXRpb24rbGVuZ3RoXVxuXHRcdEBkYXRhW3Bvc2l0aW9uLi5wb3NpdGlvbitsZW5ndGhdID0gW11cblx0XHRmb3IgYyBpbiBjZWxsc1xuXHRcdFx0aWYgYy5zdXBlckxheWVyID09IEBjb250ZW50XG5cdFx0XHRcdGMuc3VwZXJMYXllciA9IG51bGxcblx0XHRAZHJhdygpXG5cdFx0cmV0dXJuIGNlbGxzXG5cdFxuXHRkZWZhdWx0RHJhd0JlaGF2aW9yOiAoYywgeCwgeSwgaSkgLT5cblx0XHRjLnN1cGVyTGF5ZXIgPSBAY29udGVudFxuXHRcdGMueCA9IHhcblx0XHRjLnkgPSB5XG5cdFx0XG4jXHRkcmF3OiBVdGlscy50aHJvdHRsZSAwLjEsIF9kcmF3LCB7dGVzdFNjb3BlOiB0aGlzfVxuI1x0X2RyYXc6IC0+XG5cdGRyYXc6IC0+XG4jXHRcdHByaW50IFwiR3JpZE1vZHVsZS5kcmF3KClcIlxuI1x0XHRwcmludCBcInJlZjogIFwiK0ByZWZcbiNcdFx0cHJpbnQgXCJ0aGlzOiBcIit0aGlzXG5cdFx0Zm9yIGMsIGkgaW4gQGRhdGFcblx0XHRcdGNYID0gKGkgJSBAcm93KSAqIChAY2VsbFcgKyBAbWFyZ2luWClcblx0XHRcdGNZID0gTWF0aC5mbG9vcihpIC8gQHJvdykgKiAoQGNlbGxIICsgQG1hcmdpblkpXG5cdFx0XHRAZHJhd0JlaGF2aW9yKGMsIGNYLCBjWSwgaSlcblx0XHRAdXBkYXRlQ29udGVudFNpemUoKVxuXHRcdFxuI1x0dXBkYXRlQ29udGVudFNpemUgPSBVdGlscy50aHJvdHRsZSAuMSwgX3VwZGF0ZUNvbnRlbnRTaXplXG4jXHRfdXBkYXRlQ29udGVudFNpemU6IC0+XG5cdHVwZGF0ZUNvbnRlbnRTaXplOiAtPlxuI1x0XHRwcmludCBcIkdyaWRNb2R1bGUudXBkYXRlQ29udGVudFNpemUoKVwiXG5cdFx0QGNvbnRlbnQuaGVpZ2h0ID0gQGNvbnRlbnQuY29udGVudEZyYW1lKCkuaGVpZ2h0IiwiY2xhc3MgbW9kdWxlLmV4cG9ydHMgZXh0ZW5kcyBMYXllclx0XG5cdGNvbnN0cnVjdG9yOiAob3B0PXt9KSAtPiIsImltYWdlQ291bnQgPSAwXG5cbmltYWdlVmFsdWVTdHlsZSA9IG5ldyBMYXllclxuXG5pbWFnZVZhbHVlU3R5bGUgPVxuXHRcImZvbnQtZmFtaWx5XCI6IFwiU0ZVSURpc3BsYXktTGlnaHRcIlxuXHRcImZvbnQtc2l6ZVwiOiBcIjQ4cHhcIlxuXHRcInRleHQtYWxpZ25cIjogXCJyaWdodFwiXG5cdFwiY29sb3JcIjogXCIjZmZmZmZmXCJcblx0XCJsaW5lLWhlaWdodFwiOiBcIjU4cHhcIlxuXHRcInRleHQtc2hhZG93XCI6IFwiMXB4IDJweCAwcHggcmdiYSgwLDAsMCwwLjUwKVwiXG4jXHRcImJhY2tncm91bmQtY29sb3JcIjogXCJzYWxtb25cIlxuXG5pbWFnZUxhYmVsU3R5bGUgPSBcblx0XCJmb250LWZhbWlseVwiOiBcIlNGVUlEaXNwbGF5LUJsYWNrXCJcblx0XCJmb250LXNpemVcIjogXCIxOHB4XCJcblx0XCJjb2xvclwiOiBcIiNGRkZGRkZcIlxuXHRcImxpbmUtaGVpZ2h0XCI6IFwiMjFweFwiXG5cdFwidGV4dC1zaGFkb3dcIjogXCIxcHggMnB4IDBweCByZ2JhKDAsMCwwLDAuNTApXCJcblxuY2xhc3MgbW9kdWxlLmV4cG9ydHMgZXh0ZW5kcyBMYXllclx0XG5cdGNvbnN0cnVjdG9yOiAob3B0PXt9KSAtPlxuXHRcdGluaXRXID0gb3B0LndpZHRoXG5cdFx0aW5pdEggPSBvcHQuaGVpZ2h0XG5cdFx0c3VwZXIob3B0KVxuXHRcdFxuXHRcdEBjb25maWdEaXNwbGF5KClcblx0XHRcblx0XHRAc2V0SW1hZ2Uob3B0LmltYWdlSUQgPz0gaW1hZ2VDb3VudCsrKVxuXHRcdEBzZXRQb3NpdGlvbihvcHQucG9zID89IC0xKVxuXHRcdEBzZXRHcm91cChvcHQuZ3JvdXBJRCA/IC0xKVxuXHRcdFxuXHRcdEBuYW1lID0gb3B0Lm5hbWUgPz0gXCJpbWdfXCIrQGltYWdlSURcblx0XG5cdFx0QHdpZHRoID0gaW5pdFcgPz0gMjQ4XG5cdFx0QGhlaWdodCA9IGluaXRIID89IEB3aWR0aFxuXHRcdEBjbGlwID0gb3B0LmNsaXAgPz0gZmFsc2Vcblx0XHRAYmFja2dyb3VuZENvbG9yID0gb3B0LmJhY2tncm91bmRDb2xvclxuXHRcblx0c2V0SW1hZ2U6ICh2YWwpIC0+XG5cdFx0QGltYWdlSUQgPSB2YWwgPz0gQGltYWdlSURcblx0XHRAaW1hZ2VWYWwuaHRtbCA9IEBpbWFnZUlEIyArIDFcblx0XHRAaW1hZ2VWYWwuc3R5bGUgPSBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0c2V0UG9zaXRpb246ICh2YWwpIC0+XG5cdFx0QHBvcyA9IHZhbCA/PSBAcG9zXG5cdFx0QHBvc2l0aW9uVmFsLmh0bWwgPSBAcG9zICsgMVxuXHRcdEBwb3NpdGlvblZhbC5zdHlsZSA9IGltYWdlVmFsdWVTdHlsZVxuXHRcdFxuXHRzZXRHcm91cDogKHZhbCkgLT5cblx0XHRAZ3JvdXBJRCA9IHZhbCA/PSBAZ3JvdXBJRCA/PSAtMVxuXHRcdGlmIEBncm91cElEID49IDBcblx0XHRcdEBncm91cFZhbC5odG1sID0gQGdyb3VwSUQgKyAxXG5cdFx0XHRAZ3JvdXBWYWwuc3R5bGUgPSBpbWFnZVZhbHVlU3R5bGVcblx0XHRcdEBncm91cExhYmVsLmh0bWwgPSBcIkdST1VQXCJcblx0XHRcdEBncm91cFZhbC5vcGFjaXR5ID0gQGdyb3VwTGFiZWwub3BhY2l0eSA9IDFcblx0XHRcdEBiZy5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNEMDAyMUJcIlxuXHRcdFx0QGJnLmh1ZVJvdGF0ZSA9IEBncm91cElEICogLTYzXG5cdFx0ZWxzZVxuXHRcdFx0QGdyb3VwVmFsLmh0bWwgPSBcIlwiXG5cdFx0XHRAZ3JvdXBMYWJlbC5odG1sID0gXCJOTyBHUk9VUFwiXG5cdFx0XHRAZ3JvdXBWYWwub3BhY2l0eSA9IEBncm91cExhYmVsLm9wYWNpdHkgPSAuNVxuXHRcdFx0QGJnLmJhY2tncm91bmRDb2xvciA9IFwiI0Q4RDhEOFwiXG5cdFxuXHRjb25maWdEaXNwbGF5OiAtPlxuXHRcdEBiZyA9IG5ldyBMYXllclxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0d2lkdGg6IDI0OFxuXHRcdFx0aGVpZ2h0OiAyNDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjYmJiYmJiXCJcblxuXHRcdEBpbWFnZUxhYmVsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImltYWdlTGFiZWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMTI4XG5cdFx0XHR5OiA1OVxuXHRcdFx0aHRtbDogXCJJTUFHRVwiXG5cdFx0XHRzdHlsZTogaW1hZ2VMYWJlbFN0eWxlXG5cdFx0XG5cdFx0QGltYWdlVmFsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImltYWdlVmFsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDMyXG5cdFx0XHR5OiAyOVxuXHRcdFx0d2lkdGg6IDg2XG5cdFx0XHRodG1sOiBcIlwiXG5cdFx0XHRzdHlsZTogaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdFx0QHBvc2l0aW9uTGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiaW1hZ2VMYWJlbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAxMjhcblx0XHRcdHk6IDExN1xuXHRcdFx0aHRtbDogXCJQT1NJVElPTlwiXG5cdFx0XHRzdHlsZTogaW1hZ2VMYWJlbFN0eWxlXG5cdFx0XHRcblx0XHRAcG9zaXRpb25WYWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwicG9zaXRpb25WYWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMzJcblx0XHRcdHk6IDg4XG5cdFx0XHR3aWR0aDogODVcblx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdHN0eWxlOiBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0XHRAZ3JvdXBMYWJlbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJncm91cExhYmVsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDEyOFxuXHRcdFx0eTogMTc1XG5cdFx0XHRodG1sOiBcIkdST1VQXCJcblx0XHRcdHN0eWxlOiBpbWFnZUxhYmVsU3R5bGVcblx0XHRcblx0XHRAZ3JvdXBWYWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiZ3JvdXBWYWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMzJcblx0XHRcdHk6IDE0NlxuXHRcdFx0d2lkdGg6IDg2XG5cdFx0XHRodG1sOiBcIlwiXG5cdFx0XHRzdHlsZTogaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdFx0QHN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdGN1cnZlOiBcInNwcmluZyg1MDAsIDI1LCAwKVwiXG5cdFx0XG5cdFx0QHN0YXRlcy5hZGRcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHNjYWxlOiAxXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdHNlbGVjdGVkOlxuXHRcdFx0XHRzY2FsZTogMVxuXHRcdFx0ZGVzZWxlY3RlZDpcblx0XHRcdFx0c2NhbGU6IC45XG5cdFx0XHR1bnNlbGVjdGVkOlxuXHRcdFx0XHRncmF5c2NhbGU6IDEwMCIsIiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuIyBDcmVhdGVkIGJ5IEpvcmRhbiBSb2JlcnQgRG9ic29uIG9uIDE0IEF1Z3VzdCAyMDE1XG4jIFxuIyBVc2UgdG8gbm9ybWFsaXplIHNjcmVlbiAmIG9mZnNldCB4LHkgdmFsdWVzIGZyb20gY2xpY2sgb3IgdG91Y2ggZXZlbnRzLlxuI1xuIyBUbyBHZXQgU3RhcnRlZC4uLlxuI1xuIyAxLiBQbGFjZSB0aGlzIGZpbGUgaW4gRnJhbWVyIFN0dWRpbyBtb2R1bGVzIGRpcmVjdG9yeVxuI1xuIyAyLiBJbiB5b3VyIHByb2plY3QgaW5jbHVkZTpcbiMgICAgIHtQb2ludGVyfSA9IHJlcXVpcmUgXCJQb2ludGVyXCJcbiNcbiMgMy4gRm9yIHNjcmVlbiBjb29yZGluYXRlczogXG4jICAgICBidG4ub24gRXZlbnRzLkNsaWNrLCAoZXZlbnQsIGxheWVyKSAtPiBwcmludCBQb2ludGVyLnNjcmVlbihldmVudCwgbGF5ZXIpXG4jIFxuIyA0LiBGb3IgbGF5ZXIgb2Zmc2V0IGNvb3JkaW5hdGVzOiBcbiMgICAgIGJ0bi5vbiBFdmVudHMuQ2xpY2ssIChldmVudCwgbGF5ZXIpIC0+IHByaW50IFBvaW50ZXIub2Zmc2V0KGV2ZW50LCBsYXllcilcbiNcbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5jbGFzcyBleHBvcnRzLlBvaW50ZXJcblxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBQdWJsaWMgTWV0aG9kcyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cblx0QHNjcmVlbiA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0c2NyZWVuQXJndW1lbnRFcnJvcigpIHVubGVzcyBldmVudD8gYW5kIGxheWVyP1xuXHRcdGUgPSBvZmZzZXRDb29yZHMgZXZlbnRcblx0XHRpZiBlLnggYW5kIGUueVxuXHRcdFx0IyBNb3VzZSBFdmVudFxuXHRcdFx0c2NyZWVuQ29vcmRzID0gbGF5ZXIuc2NyZWVuRnJhbWVcblx0XHRcdGUueCArPSBzY3JlZW5Db29yZHMueFxuXHRcdFx0ZS55ICs9IHNjcmVlbkNvb3Jkcy55XG5cdFx0ZWxzZVxuXHRcdFx0IyBUb3VjaCBFdmVudFxuXHRcdFx0ZSA9IGNsaWVudENvb3JkcyBldmVudFxuXHRcdHJldHVybiBlXG5cdFx0XHRcblx0QG9mZnNldCA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0b2Zmc2V0QXJndW1lbnRFcnJvcigpIHVubGVzcyBldmVudD8gYW5kIGxheWVyP1xuXHRcdGUgPSBvZmZzZXRDb29yZHMgZXZlbnRcblx0XHR1bmxlc3MgZS54PyBhbmQgZS55P1xuXHRcdFx0IyBUb3VjaCBFdmVudFxuXHRcdFx0ZSA9IGNsaWVudENvb3JkcyBldmVudFxuXHRcdFx0dGFyZ2V0U2NyZWVuQ29vcmRzID0gbGF5ZXIuc2NyZWVuRnJhbWVcblx0XHRcdGUueCAtPSB0YXJnZXRTY3JlZW5Db29yZHMueFxuXHRcdFx0ZS55IC09IHRhcmdldFNjcmVlbkNvb3Jkcy55XG5cdFx0cmV0dXJuIGVcblx0XG5cdCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXHQjIFByaXZhdGUgSGVscGVyIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0XG5cdG9mZnNldENvb3JkcyA9IChldikgIC0+IGUgPSBFdmVudHMudG91Y2hFdmVudCBldjsgcmV0dXJuIGNvb3JkcyBlLm9mZnNldFgsIGUub2Zmc2V0WVxuXHRjbGllbnRDb29yZHMgPSAoZXYpICAtPiBlID0gRXZlbnRzLnRvdWNoRXZlbnQgZXY7IHJldHVybiBjb29yZHMgZS5jbGllbnRYLCBlLmNsaWVudFlcblx0Y29vcmRzICAgICAgID0gKHgseSkgLT4gcmV0dXJuIHg6eCwgeTp5XG5cdFxuXHQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblx0IyBFcnJvciBIYW5kbGVyIE1ldGhvZHMgIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cdFxuXHRzY3JlZW5Bcmd1bWVudEVycm9yID0gLT5cblx0XHRlcnJvciBudWxsXG5cdFx0Y29uc29sZS5lcnJvciBcIlwiXCJcblx0XHRcdFBvaW50ZXIuc2NyZWVuKCkgRXJyb3I6IFlvdSBtdXN0IHBhc3MgZXZlbnQgJiBsYXllciBhcmd1bWVudHMuIFxcblxuXHRcdFx0RXhhbXBsZTogbGF5ZXIub24gRXZlbnRzLlRvdWNoU3RhcnQsKGV2ZW50LGxheWVyKSAtPiBQb2ludGVyLnNjcmVlbihldmVudCwgbGF5ZXIpXCJcIlwiXG5cdFx0XHRcblx0b2Zmc2V0QXJndW1lbnRFcnJvciA9IC0+XG5cdFx0ZXJyb3IgbnVsbFxuXHRcdGNvbnNvbGUuZXJyb3IgXCJcIlwiXG5cdFx0XHRQb2ludGVyLm9mZnNldCgpIEVycm9yOiBZb3UgbXVzdCBwYXNzIGV2ZW50ICYgbGF5ZXIgYXJndW1lbnRzLiBcXG5cblx0XHRcdEV4YW1wbGU6IGxheWVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LChldmVudCxsYXllcikgLT4gUG9pbnRlci5vZmZzZXQoZXZlbnQsIGxheWVyKVwiXCJcIiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
