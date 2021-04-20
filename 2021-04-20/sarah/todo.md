TODO

- Include dotted gridlines behind each chart
- Change all gridlines and tick marks to gray color
- On false positives chart, get dots to match labels on X axis (can't see all the dots for some reason, cuts off on right)
  LMD: I looked at things and the issue is on line 45 of your false_positives.js -> The y-scale had [0, 0.1] for the domain, meaning it was only expecting to take data values from 0 to 0.1. Based on your data, the biggest value is closer to 1, so I just switched 0.1 with 1 and it all shows up now.
- Give each chart better axis labels
- Put in a good image of the false accuracy rate yankee stadium diagram
  LMD: This is pretty good rn; I would focus on the other things
- Put in better image of the facial scan, center
- Put in better image of facial comparison
  LMD: Were these made in Illustrator? Can you export them bigger?
- Learn how to do a choropleth map in d3
- Make the layout more dynamic on large screens too(better for mobile right now, everything is in a single column)
  LMD: Here I would mainly focus on getting your charts to be centered on the page.
- Data callout for a specific data point on the scatterplot
  LMD: Check out this specific link https://www.d3-graph-gallery.com/graph/scatter_tooltip.html
- Labels on top of the bar charts
- Turn the stacked bar chart horizontal (or at least try to see how it looks)
  LMD: Making your bar charts horizontal would totally help with labels being so long.
- Add light purple dividing separators to the page with CSS
- Lessen left margins for the charts
- wrap text labels on x axis
  LMD this is sadly really hard/annoying because SVG on the web is bad with text
- Make it more elegant... this is all the little stuff I'm not thinking of right now...
- [LMD] Good idea to make the charts wider and center them. This would make labels easier to read if long and things would be a bit more readable for the scatterplot.
