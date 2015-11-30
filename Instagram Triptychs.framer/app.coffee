GridModule = require "GridModule"

Framer.Defaults.Layer.backgroundColor = "white"

BG = new Layer
	width: Screen.width
	height: Screen.height

sketch = Framer.Importer.load "imported/Instagram Triptychs"

# sketch.TopNav.visible = false
# sketch.BotNav.visible = false

Page = ScrollComponent.wrap(sketch.Page)
Page.scrollHorizontal = false
Page.height = Screen.height - sketch.TopNav.height - sketch.BotNav.height
Page.on Events.Move, ->
	b.ignoreEvents = true for b in Adds
	
Page.on Events.ScrollAnimationDidEnd, ->
		b.ignoreEvents = false for b in Adds

Profile = sketch.Profile
# Profile.visible = false

Grid = new GridModule
	row: 3
	cellW: 248
	margin: 3
	width: Screen.width
	drawBehavior: (c,x,y) ->
		c.superLayer = @content
		c.animate
			properties:
				x: x
				y: y
			time: .5
Grid.superLayer = Page.content
Grid.y = Profile.height

Grid.content.on "change:height", ->
	Page.updateContent()

single_arr = [sketch.Thumbnail]
diptych_arr = [sketch.Diptych2, sketch.Diptych1]
triptych_arr = [sketch.Triptych3, sketch.Triptych2, sketch.Triptych1]
photos_arr = [single_arr, diptych_arr, triptych_arr]

# Test cells
for [0..31]
	layer = new Layer
	layer.width = 248
	layer.height = 248
	layer.backgroundColor= Utils.randomColor()
	Grid.add(layer)
	layer.on Events.AnimationEnd, ->
		Grid.updateContentSize()
	
for arr, a in photos_arr
	b = sketch["Add"+(a+1)]
	b.photos = photos_arr[a]
	b.on Events.Click, (event, layer) ->
		for cell, i in @photos
			cell = cell.copy()
			cell.superLayer = Grid.content
			cell.x = (i+1) * -(Grid.cellW + Grid.marginX)
			cell.y = 0
			Grid.insert(cell, 0)
			cell.on Events.AnimationEnd, ->
				Grid.updateContentSize()

# Button 1
Add1 = sketch.Add1
# Button 2
Add2 = sketch.Add2
Add2Back = sketch.Add2Back
# Button 3
Add3 = sketch.Add3
Add3Mid = sketch.Add3Mid
Add3Back = sketch.Add3Back
Adds = [Add1, Add2, Add3]

# Init Button Layout
Add1.x = Add2.x = Add3.x = 339
Add1.y = Add2.y = Add3.y =1260
Add1.opacity = Add2.opacity = Add3.opacity = 0
Add2Back.x = Add3Mid.x = Add3Back.x = 0

Add2.on Events.AnimationEnd, (ani, layer) ->
	time = .5
	delay = 0
	@animate(properties: {x: 329}, time: time, delay: delay)
	Add2Back.animate(properties: {x: 20}, time: time, delay: delay)
	Add2.on Events.AnimationEnd, null
	
Add3.on Events.AnimationEnd, (ani, layer) ->
	time = .5
	delay = .1
	@animate(properties: {x: 410}, time: time, delay: delay)
	Add3Mid.animate(properties: {x: 20}, time: time, delay: delay)
	Add3Back.animate(properties: {x: 40}, time: time, delay: delay)

Add1.animate(properties: {x: 256, y: 1240, opacity: 1}, time: .5, delay: .0);
Add2.animate(properties: {x: 339, y: 1200, opacity: 1}, time: .5, delay: .1);
Add3.animate(properties: {x: 420, y: 1240, opacity: 1}, time: .5, delay: .2);

