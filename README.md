# hex-var-finder
Find closest matching hex colour variable given a style file and an input value.

It will parse the file for less/sass style variables (in the form `@var-name: #ffdd00`) and find the distance between the values, returning the closest match.

Usage

`node hex-var-finder [path to less/sass file] [hex string]`

e.g.

`node hex-var-finder vars.less #ffcc00`
