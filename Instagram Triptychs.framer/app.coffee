# This imports all the layers for "Instagram Triptychs" into instagramTriptychsLayers1
sketch = Framer.Importer.load "imported/Instagram Triptychs"

page = sketch.Page
page.y = sketch.TopNav.height

profile = sketch.Profile

grid = sketch.PhotoGrid
grid.superLayer = page
grid.y = profile.height
grid.visible = true

scroll = ScrollComponent.wrap(page)
scroll.scrollHorizontal = false
scroll.backgroundColor = "white"
scroll.y = sketch.TopNav.height
scroll.height = Canvas.height - sketch.TopNav.height - sketch.BotNav.height


