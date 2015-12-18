Framer.Device.deviceType = "iphone-6-spacegray"
Framer.Defaults.Layer.backgroundColor = null
bg = new BackgroundLayer
	backgroundColor: "white"

sketch = Framer.Importer.load "imported/Instagram Triptychs"

{Pointer} = require "Pointer"
GridModule = require "GridModule"
InstaImage = require "InstaImage"
imageCount = 0
groupCount = 0

##########
# SCROLL #
##########
Page = ScrollComponent.wrap(sketch.Page)
Page.scrollHorizontal = false
Page.height = Screen.height - sketch.TopNav.height - sketch.BotNav.height
Page.on Events.Move, ->
	b.ignoreEvents = true for b in Adds
Page.on Events.ScrollAnimationDidEnd, ->
	b.ignoreEvents = false for b in Adds

########
# PAGE #
########
Profile = sketch.Profile
Grid = new GridModule
	row: 3
	cellW: 248
	margin: 3
	width: Screen.width
	drawBehavior: (c,x,y,i) ->
		c.superLayer = @content
		c.setPosition(i)
		c.animate
			properties:
				x: x
				y: y
			time: .25
Grid.superLayer = Page.content
Grid.y = Profile.height

Grid.content.on "change:height", ->
	Page.updateContent()
	
focus = sketch.GroupFocus
focus.superLayer = Grid
focus.visible = false

##########
# IMAGES #
##########
addImages = (count, group) ->
	for i in [0...count]
		img = new InstaImage
			imageID: imageCount++
			groupID: group
		img.on Events.AnimationEnd, ->
			Grid.updateContentSize()
		img.on Events.TouchStart, ->
			@selected = true
			focus.x = @x
			focus.y = @y
			focus.visible = true
		Grid.insert(img, 0)

addImages(17)

#########
# FOCUS #
#########
focusCancel = focus.subLayersByName("Cancel")[0]
focusAccept = focus.subLayersByName("Accept")[0]
focusResize = focus.subLayersByName("Resize")[0]

focusCancel.on Events.TouchStart, ->
	print "Group Cancel Changes"
	focus.visible = false

focusAccept.on Events.TouchStart, ->
	print "Group Accept Changes"
	focus.visible = false

# REMOVE
testPosition = new Layer
	superLayer: Grid.content
	backgroundColor: "magenta"

focusResize.on Events.TouchStart, ->
	print "Group Resize START"
	Page.content.draggable = false
	Grid.content.on Events.TouchMove, resizeMove
	Grid.content.once Events.TouchEnd, ->
		print "Group Resize END"
		Page.content.draggable = true
		Grid.content.off Events.TouchMove, resizeMove
		
resizeMove = (event, layer)->
# 	print "Group Resize MOVE"
	print [].slice.call(arguments)
	x = event.x - focusResize.x - Grid.x
	y = event.y - focusResize.y - Grid.y
	testPosition.x = x
	testPosition.y = y
	for i in Grid.content.subLayers
		if (x > i.minX && x < i.maxX && y > i.minY && y < i.maxY)
			i.states.switch("selected")
	
###########
# BUTTONS #
###########
Add1 = sketch.Add1
Add1.on Events.Click, (event, layer) ->
	addImages(1)

Add2 = sketch.Add2
Add2Back = sketch.Add2Back
Add2.on Events.Click, (event, layer) ->
	addImages(2, groupCount++)

Add3 = sketch.Add3
Add3Mid = sketch.Add3Mid
Add3Back = sketch.Add3Back
Add3.on Events.Click, (event, layer) ->
	addImages(3, groupCount++)

Adds = [Add1, Add2, Add3]

##########
# LAYOUT #
##########
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

