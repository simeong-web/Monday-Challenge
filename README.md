# Gulp Assets Minifier
This is a Gulp based Asset minifier, that is used for basic project setup. The function of this repo is to produce clean CSS/JS files, optimised image files, record any linting issues within SASS/SCSS and update the local project when a change has been made to the master html file.

## Install
Installation is very straightforward, with Node and npm being prerequisites.
After repo is cloned on your machine, run the following commands:

`npm install` - Installs all of the dependencies used in this project.

`gulp sass` - Compiles the SASS file to CSS and produces a .map file for easy browser access to stylesheets. 

`gulp css` - Minifies the CSS file after being compiled with SASS.

`gulp sass-lint` - Sets up linting for the master.scss file.

`gulp js` - Compiles JavaScript files and bundles them together in one file in ES5 format.

`gulp img` - Minifies images and provides support for JPEG, JPG, GIF, PNG and SVG file formats.

`gulp clean` - Removes all of the minified files and the dist folder.

`gulp build` - Initiates all of the minifiying tasks and creates the dist folder.

`gulp watch` - Initiates BrowserSync and watches for changes in the master files.
"# Gulp-Script" 
# Monday-Challenge
# Monday-Challenge
