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
    print("DrawBehavior(" + arguments.toString() + ")");
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
    return this.groupVal = new Layer({
      name: "groupVal",
      superLayer: this,
      x: 32,
      y: 146,
      width: 86,
      html: "",
      style: imageValueStyle
    });
  };

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

  return exports;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvd29ya3NwYWNlL01vYXJCZXR0ZXIvSW5zdGFncmFtIFRyaXB0eWNocy5mcmFtZXIvbW9kdWxlcy9HcmlkTW9kdWxlLmNvZmZlZSIsIi93b3Jrc3BhY2UvTW9hckJldHRlci9JbnN0YWdyYW0gVHJpcHR5Y2hzLmZyYW1lci9tb2R1bGVzL0luc3RhSW1hZ2UuY29mZmVlIiwiL3dvcmtzcGFjZS9Nb2FyQmV0dGVyL0luc3RhZ3JhbSBUcmlwdHljaHMuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7O0FBQU0sTUFBTSxDQUFDOzs7RUFDQyxpQkFBQyxHQUFEO0FBQ1osUUFBQTs7TUFEYSxNQUFJOztJQUNqQixLQUFBLEdBQVEsR0FBRyxDQUFDO0lBQ1osS0FBQSxHQUFRLEdBQUcsQ0FBQztJQUNaLHlDQUFNLEdBQU47SUFDQSxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLEdBQUQsR0FBTztJQUNQLElBQUMsQ0FBQSxJQUFELEdBQVE7SUFDUixJQUFDLENBQUEsZUFBRCxHQUFtQixHQUFHLENBQUM7SUFFdkIsSUFBQyxDQUFBLElBQUQsc0JBQVEsR0FBRyxDQUFDLE9BQUosR0FBRyxDQUFDLE9BQVE7SUFDcEIsSUFBQyxDQUFBLEdBQUQscUJBQU8sR0FBRyxDQUFDLE1BQUosR0FBRyxDQUFDLE1BQU87SUFDbEIsSUFBQyxDQUFBLEdBQUQscUJBQVEsR0FBRyxDQUFDLE1BQUosR0FBRyxDQUFDLE1BQU87SUFDbkIsSUFBQyxDQUFBLEtBQUQsdUJBQVMsR0FBRyxDQUFDLFFBQUosR0FBRyxDQUFDLGtEQUFpQixDQUFDLFlBQUQsQ0FBQyxRQUFTO0lBQ3hDLElBQUMsQ0FBQSxLQUFELHVCQUFTLEdBQUcsQ0FBQyxRQUFKLEdBQUcsQ0FBQyxRQUFTLElB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QyxHQUFEO0lBQ1QsSUFBQyxDQUFBLE9BQUQsaUJBQVcsTUFBQSw2QkFBTyxJQUFDLENBQUEsVUFBRCxJQUFDLENBQUEsVUFBVyxDQUFDO0lBQy9CLElBQUcsSUFBQyxDQUFBLE9BQUQsSUFBWSxDQUFmO01BQ0MsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLEdBQWlCLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFDNUIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxLQUFWLEdBQWtCO01BQ2xCLElBQUMsQ0FBQSxVQUFVLENBQUMsSUFBWixHQUFtQjtNQUNuQixJQUFDLENBQUEsUUFBUSxDQUFDLE9BQVYsR0FBb0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLEdBQXNCO01BQzFDLElBQUMsQ0FBQSxFQUFFLENBQUMsZUFBSixHQUFzQjthQUN0QixJQUFDLENBQUEsRUFBRSxDQUFDLFNBQUosR0FBZ0IsSUFBQyxDQUFBLE9BQUQsR0FBVyxHQU41QjtLQUFBLE1BQUE7TUFRQyxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsR0FBaUI7TUFDakIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLEdBQW1CO2FBQ25CLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixHQUFvQixJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosR0FBc0IsR0FWM0M7O0VBRlM7Ozs7R0F2RmtCOzs7O0FDaEI3QixPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHQ9e30pIC0+XG5cdFx0aW5pdFcgPSBvcHQud2lkdGhcblx0XHRpbml0SCA9IG9wdC5oZWlnaHRcblx0XHRzdXBlcihvcHQpXG5cdFx0QG5hbWUgPSBcIkdyaWRNb2R1bGVcIlxuXHRcdEByZWYgPSB0aGlzXG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBvcHQuYmFja2dyb3VuZENvbG9yXG5cdFxuXHRcdEBkYXRhID0gb3B0LmRhdGEgPz0gW11cblx0XHRAcm93ID0gb3B0LnJvdyA/PSAzXG5cdFx0QGNvbCA9ICBvcHQucm93ID89IHVuZGVmaW5lZFxuXHRcdEBjZWxsVyA9IG9wdC5jZWxsVyA/PSBAZGF0YVswXS53aWR0aCA/PSAxMDBcblx0XHRAY2VsbEggPSBvcHQuY2VsbEggPz0gQGNlbGxXXG5cdFx0QG1hcmdpbiA9IG9wdC5tYXJnaW4gPz0gMFxuXHRcdEBtYXJnaW5YID0gb3B0Lm1hcmdpblggPz0gQG1hcmdpblxuXHRcdEBtYXJnaW5ZID0gb3B0Lm1hcmdpblkgPz0gQG1hcmdpblhcblx0XHRcdFxuXHRcdEB3aWR0aCA9IGluaXRXID89IChAY2VsbFcgKyBAbWFyZ2luWCkgKiBAcm93IC0gQG1hcmdpblhcblx0XHRAaGVpZ2h0ID0gaW5pdEggPz0gQGNlbGxIXG5cdFx0XG5cdFx0QGNvbnRlbnQgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY29udGVudFwiXG5cdFx0XHRjbGlwOiBmYWxzZVx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcblx0XHRAY29udGVudC5vbiBcImNoYW5nZTpoZWlnaHRcIiwgLT5cblx0XHRcdGlmIEBzdXBlckxheWVyLmhlaWdodCA8IEBoZWlnaHRcblx0XHRcdFx0QHN1cGVyTGF5ZXIuaGVpZ2h0ID0gQGhlaWdodFxuXHRcdFxuXHRcdEBkcmF3QmVoYXZpb3IgPSBvcHQuZHJhd0JlaGF2aW9yID89IEBkZWZhdWx0RHJhd0JlaGF2aW9yXG5cdFx0XG4jXHRcdEBkZXN0cm95UmVtYWluaW5nXHQ9IG9wdC5kZXN0b3J5UmVtYWluaW5nID8gb3B0LmRlc3Ryb3lSZW1haW5pbmcgOiB0cnVlXG5cblx0XHRAZHJhdygpXG5cdFxuXHRhZGQ6IChjZWxsKSAtPlxuXHRcdHJldHVybiBAaW5zZXJ0KFtjZWxsXSwgQGRhdGEubGVuZ3RoKVxuXHRcblx0aW5zZXJ0OiAoY2VsbHMsIHBvc2l0aW9uID0gMCkgLT5cblx0XHRAZGF0YVtwb3NpdGlvbi4uLnBvc2l0aW9uXSA9IGNlbGxzXG5cdFx0QGRyYXcoKVxuXHRcdHJldHVybiBjZWxsc1xuXHRcblx0cmVtb3ZlOiAocG9zaXRpb24sIGxlbmd0aCA9IDEpIC0+XG5cdFx0Y2VsbHMgPSBAZGF0YVtwb3NpdGlvbi4ucG9zaXRpb24rbGVuZ3RoXVxuXHRcdEBkYXRhW3Bvc2l0aW9uLi5wb3NpdGlvbitsZW5ndGhdID0gW11cblx0XHRmb3IgYyBpbiBjZWxsc1xuXHRcdFx0aWYgYy5zdXBlckxheWVyID09IEBjb250ZW50XG5cdFx0XHRcdGMuc3VwZXJMYXllciA9IG51bGxcblx0XHRAZHJhdygpXG5cdFx0cmV0dXJuIGNlbGxzXG5cdFxuXHRkZWZhdWx0RHJhd0JlaGF2aW9yOiAoYywgeCwgeSwgaSkgLT5cblx0XHRwcmludCBcIkRyYXdCZWhhdmlvcihcIithcmd1bWVudHMudG9TdHJpbmcoKStcIilcIlxuXHRcdGMuc3VwZXJMYXllciA9IEBjb250ZW50XG5cdFx0Yy54ID0geFxuXHRcdGMueSA9IHlcblx0XHRcbiNcdGRyYXc6IFV0aWxzLnRocm90dGxlIDAuMSwgX2RyYXcsIHt0ZXN0U2NvcGU6IHRoaXN9XG4jXHRfZHJhdzogLT5cblx0ZHJhdzogLT5cbiNcdFx0cHJpbnQgXCJHcmlkTW9kdWxlLmRyYXcoKVwiXG4jXHRcdHByaW50IFwicmVmOiAgXCIrQHJlZlxuI1x0XHRwcmludCBcInRoaXM6IFwiK3RoaXNcblx0XHRmb3IgYywgaSBpbiBAZGF0YVxuXHRcdFx0Y1ggPSAoaSAlIEByb3cpICogKEBjZWxsVyArIEBtYXJnaW5YKVxuXHRcdFx0Y1kgPSBNYXRoLmZsb29yKGkgLyBAcm93KSAqIChAY2VsbEggKyBAbWFyZ2luWSlcblx0XHRcdEBkcmF3QmVoYXZpb3IoYywgY1gsIGNZLCBpKVxuXHRcdEB1cGRhdGVDb250ZW50U2l6ZSgpXG5cdFx0XG4jXHR1cGRhdGVDb250ZW50U2l6ZSA9IFV0aWxzLnRocm90dGxlIC4xLCBfdXBkYXRlQ29udGVudFNpemVcbiNcdF91cGRhdGVDb250ZW50U2l6ZTogLT5cblx0dXBkYXRlQ29udGVudFNpemU6IC0+XG4jXHRcdHByaW50IFwiR3JpZE1vZHVsZS51cGRhdGVDb250ZW50U2l6ZSgpXCJcblx0XHRAY29udGVudC5oZWlnaHQgPSBAY29udGVudC5jb250ZW50RnJhbWUoKS5oZWlnaHQiLCJpbWFnZUNvdW50ID0gMFxuXG5pbWFnZVZhbHVlU3R5bGUgPSBuZXcgTGF5ZXJcblxuaW1hZ2VWYWx1ZVN0eWxlID1cblx0XCJmb250LWZhbWlseVwiOiBcIlNGVUlEaXNwbGF5LUxpZ2h0XCJcblx0XCJmb250LXNpemVcIjogXCI0OHB4XCJcblx0XCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIlxuXHRcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG5cdFwibGluZS1oZWlnaHRcIjogXCI1OHB4XCJcblx0XCJ0ZXh0LXNoYWRvd1wiOiBcIjFweCAycHggMHB4IHJnYmEoMCwwLDAsMC41MClcIlxuI1x0XCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwic2FsbW9uXCJcblxuaW1hZ2VMYWJlbFN0eWxlID0gXG5cdFwiZm9udC1mYW1pbHlcIjogXCJTRlVJRGlzcGxheS1CbGFja1wiXG5cdFwiZm9udC1zaXplXCI6IFwiMThweFwiXG5cdFwiY29sb3JcIjogXCIjRkZGRkZGXCJcblx0XCJsaW5lLWhlaWdodFwiOiBcIjIxcHhcIlxuXHRcInRleHQtc2hhZG93XCI6IFwiMXB4IDJweCAwcHggcmdiYSgwLDAsMCwwLjUwKVwiXG5cbmNsYXNzIG1vZHVsZS5leHBvcnRzIGV4dGVuZHMgTGF5ZXJcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdD17fSkgLT5cblx0XHRpbml0VyA9IG9wdC53aWR0aFxuXHRcdGluaXRIID0gb3B0LmhlaWdodFxuXHRcdHN1cGVyKG9wdClcblx0XHRcblx0XHRAY29uZmlnRGlzcGxheSgpXG5cdFx0XG5cdFx0QHNldEltYWdlKG9wdC5pbWFnZUlEID89IGltYWdlQ291bnQrKylcblx0XHRAc2V0UG9zaXRpb24ob3B0LnBvcyA/PSAtMSlcblx0XHRAc2V0R3JvdXAob3B0Lmdyb3VwSUQgPyAtMSlcblx0XHRcblx0XHRAbmFtZSA9IG9wdC5uYW1lID89IFwiSW5zdGFJbWFnZV9cIitAaW1hZ2VJRFxuXHRcblx0XHRAd2lkdGggPSBpbml0VyA/PSAyNDhcblx0XHRAaGVpZ2h0ID0gaW5pdEggPz0gQHdpZHRoXG5cdFx0QGNsaXAgPSBvcHQuY2xpcCA/PSBmYWxzZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBvcHQuYmFja2dyb3VuZENvbG9yXG5cdFx0XG5cdGNvbmZpZ0Rpc3BsYXk6IC0+XG5cdFx0QGJnID0gbmV3IExheWVyXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR3aWR0aDogMjQ4XG5cdFx0XHRoZWlnaHQ6IDI0OFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNiYmJiYmJcIlxuXG5cdFx0QGltYWdlTGFiZWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiaW1hZ2VMYWJlbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAxMjhcblx0XHRcdHk6IDU5XG5cdFx0XHRodG1sOiBcIklNQUdFXCJcblx0XHRcdHN0eWxlOiBpbWFnZUxhYmVsU3R5bGVcblx0XHRcblx0XHRAaW1hZ2VWYWwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiaW1hZ2VWYWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMzJcblx0XHRcdHk6IDI5XG5cdFx0XHR3aWR0aDogODZcblx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdHN0eWxlOiBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0XHRAcG9zaXRpb25MYWJlbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJpbWFnZUxhYmVsXCJcblx0XHRcdHN1cGVyTGF5ZXI6IHRoaXNcblx0XHRcdHg6IDEyOFxuXHRcdFx0eTogMTE3XG5cdFx0XHRodG1sOiBcIlBPU0lUSU9OXCJcblx0XHRcdHN0eWxlOiBpbWFnZUxhYmVsU3R5bGVcblx0XHRcdFxuXHRcdEBwb3NpdGlvblZhbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJwb3NpdGlvblZhbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAzMlxuXHRcdFx0eTogODhcblx0XHRcdHdpZHRoOiA4NVxuXHRcdFx0aHRtbDogXCJcIlxuXHRcdFx0c3R5bGU6IGltYWdlVmFsdWVTdHlsZVxuXHRcdFxuXHRcdEBncm91cExhYmVsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImdyb3VwTGFiZWxcIlxuXHRcdFx0c3VwZXJMYXllcjogdGhpc1xuXHRcdFx0eDogMTI4XG5cdFx0XHR5OiAxNzVcblx0XHRcdGh0bWw6IFwiR1JPVVBcIlxuXHRcdFx0c3R5bGU6IGltYWdlTGFiZWxTdHlsZVxuXHRcdFxuXHRcdEBncm91cFZhbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJncm91cFZhbFwiXG5cdFx0XHRzdXBlckxheWVyOiB0aGlzXG5cdFx0XHR4OiAzMlxuXHRcdFx0eTogMTQ2XG5cdFx0XHR3aWR0aDogODZcblx0XHRcdGh0bWw6IFwiXCJcblx0XHRcdHN0eWxlOiBpbWFnZVZhbHVlU3R5bGVcblxuXHRzZXRJbWFnZTogKHZhbCkgLT5cblx0XHRAaW1hZ2VJRCA9IHZhbCA/PSBAaW1hZ2VJRFxuXHRcdEBpbWFnZVZhbC5odG1sID0gQGltYWdlSUQgKyAxXG5cdFx0QGltYWdlVmFsLnN0eWxlID0gaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XG5cdHNldFBvc2l0aW9uOiAodmFsKSAtPlxuXHRcdEBwb3MgPSB2YWwgPz0gQHBvc1xuXHRcdEBwb3NpdGlvblZhbC5odG1sID0gQHBvcyArIDFcblx0XHRAcG9zaXRpb25WYWwuc3R5bGUgPSBpbWFnZVZhbHVlU3R5bGVcblx0XHRcblx0c2V0R3JvdXA6ICh2YWwpIC0+XG5cdFx0QGdyb3VwSUQgPSB2YWwgPz0gQGdyb3VwSUQgPz0gLTFcblx0XHRpZiBAZ3JvdXBJRCA+PSAwXG5cdFx0XHRAZ3JvdXBWYWwuaHRtbCA9IEBncm91cElEICsgMVxuXHRcdFx0QGdyb3VwVmFsLnN0eWxlID0gaW1hZ2VWYWx1ZVN0eWxlXG5cdFx0XHRAZ3JvdXBMYWJlbC5odG1sID0gXCJHUk9VUFwiXG5cdFx0XHRAZ3JvdXBWYWwub3BhY2l0eSA9IEBncm91cExhYmVsLm9wYWNpdHkgPSAxXG5cdFx0XHRAYmcuYmFja2dyb3VuZENvbG9yID0gXCIjRDAwMjFCXCJcblx0XHRcdEBiZy5odWVSb3RhdGUgPSBAZ3JvdXBJRCAqIDY2XG5cdFx0ZWxzZVxuXHRcdFx0QGdyb3VwVmFsLmh0bWwgPSBcIlwiXG5cdFx0XHRAZ3JvdXBMYWJlbC5odG1sID0gXCJOTyBHUk9VUFwiXG5cdFx0XHRAZ3JvdXBWYWwub3BhY2l0eSA9IEBncm91cExhYmVsLm9wYWNpdHkgPSAuNSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iXX0=
