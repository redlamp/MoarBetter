# Import file "Instagram Triptychs"
sketch = Framer.Importer.load("imported/Instagram Triptychs@1x")

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
selectedStart = null
selectedEnd = null

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
	
GridMoveTracking = new Layer
	name: "GridMoveTracking"
	superLayer: Grid
	width: Grid.width
	height: Grid.height
	visible:  false
	
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
			selectedStart = @pos
			print "selectedStart: "+selectedStart
		Grid.insert(img, 0)

addImages(17)

#########
# FOCUS #
#########
focusCancel = focus.subLayersByName("Cancel")[0]
focusAccept = focus.subLayersByName("Accept")[0]
focusResize = focus.subLayersByName("Resize")[0]
focusSpan = new Layer
	superLayer: focus
	width: focus.width
	height: focus.height
# 	backgroundColor: "magenta"
	borderWidth: 8
	borderColor: "#4A90E2"

focusCancel.on Events.TouchStart, ->
	print "Group Cancel Changes"
	focus.visible = false

focusAccept.on Events.TouchStart, ->
	print "Group Accept Changes"
	focus.visible = false

# REMOVE
# testPosition = new Layer
# 	superLayer: Grid
# 	backgroundColor: "magenta"
# 	visible: false

focusResize.on Events.TouchStart, ->
	print "Group Resize START"
	Page.content.draggable = false

	GridMoveTracking.visible = true
	GridMoveTracking.width = Grid.width
	GridMoveTracking.height = Grid.height
	GridMoveTracking.on Events.TouchMove, resizeMove
	
# 	testPosition.visible = true
# 	testPosition.midX = focusResize.midX
# 	testPosition.midY = focusResize.midY

	Grid.once Events.TouchEnd, ->
		print "Group Resize END"
		Page.content.draggable = true
		GridMoveTracking.visible = false
		GridMoveTracking.off Events.TouchMove, resizeMove
# 		testPosition.visible = false
# 		testPosition.midX = focusResize.midX
# 		testPosition.midY = focusResize.midY
		for i in Grid.content.subLayers
			i.states.switch("default")
		
resizeMove = (event, layer)->
# 	print "Group Resize MOVE"
# 	x =	event.x
# 	y = event.y
	p = Pointer.offset(event, this)
	x = p.x
	y = p.y
# 	testPosition.midX = x
# 	testPosition.midY = y
	for i in Grid.content.subLayers
		if (x > i.minX && x < i.maxX && y > i.minY && y < i.maxY)
			selectedEnd = i.pos
		if(i.pos >= Math.min(selectedStart, selectedEnd) && i.pos <= Math.max(selectedStart, selectedEnd))
			i.states.switch("selected")
		else
			i.states.switch("deselected") 

	first = Grid.data[Math.min(selectedStart, selectedEnd)]
	last = Grid.data[Math.max(selectedStart, selectedEnd)]
			
	focusSpan.width = last.x + last.width - first.x
	focusSpan.height = last.y + last.height - first.y

	focusCancel.x = first.x

	focusAccept.x = focusResize.x = last.x + Grid.cellW - focusResize.width
	focusResize.y = last.y + Grid.cellH - focusResize.height
	
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

