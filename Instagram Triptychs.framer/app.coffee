# This imports all the layers for "Instagram Triptychs" into instagramTriptychsLayers1
sketch = Framer.Importer.load "imported/Instagram Triptychs"

GridModule = require "GridModule"

# sketch.TopNav.visible = false
# sketch.BotNav.visible = false

Page = ScrollComponent.wrap(sketch.Page)
Page.scrollHorizontal = false
Page.height = Screen.height - sketch.TopNav.height - sketch.BotNav.height

Profile = sketch.Profile
# Profile.visible = false

Grid = new GridModule
	row: 3
	cellW: 248
	margin: 3
	backgroundColor: "white"
	width: Screen.width
	height: Screen.height - sketch.TopNav.height - sketch.BotNav.height
Grid.superLayer = Page.content
Grid.y = Profile.height

add1 = sketch.Add1
add1.on Events.Click, (event, layer) ->
	Grid.insert(sketch.Thumbnail.copy(), 0)
	
add2 = sketch.Add2
add2.on Events.Click, (event, layer) ->
	Grid.insert(sketch.Diptych2.copy(), 0)
	Grid.insert(sketch.Diptych1.copy(), 0)
	
add3 = sketch.Add3
add3.on Events.Click, (event, layer) ->
	Grid.insert(sketch.Triptych3.copy(), 0)
	Grid.insert(sketch.Triptych2.copy(), 0)
	Grid.insert(sketch.Triptych1.copy(), 0)