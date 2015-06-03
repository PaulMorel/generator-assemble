# generator-rigel

Rigel is Yeoman generator for static sites built using Assemble, Grunt and LESS.

Rigel is also the brightest star in the constellation Orion and the seventh brightest star in the night sky.
http://en.wikipedia.org/wiki/Rigel

## Install
If you haven't already, install Yeoman.

	npm install -g yo

Install the generator globally

	npm install -g generator-rigel

## Usage

In your new project folder, initialize the project:

	yo rigel

The build process is handled by `grunt`.

### Grunt Tasks

The generator comes with 3 main `grunt` tasks:

	grunt
	
 The `default` task watches for changes in the `src/` folder. It watches the LESS files, assemble pages & templates, Javascript and images. The files are then processed by their appropriate task and placed in their respective sub-folders. The end results are placed in the `dev/` folder.

	grunt build:dev

 The `build:dev` task goes through every task except for `cssmin` and `uglify`. It compiles and processes every file that requires it. The end results are placed in the `dev/` folder.

	grunt build:dist

 The `build:dist` task goes through every task. It compiles, processes and minifies every file that requires it. The end results are placed in the `dist/` folder and potentially ready to be pushed to production.

#### Included Grunt Tasks

- assemble
- grunt-contrib-less
- grunt-autoprefixer
- grunt-contrib-cssmin
- grunt-contrib-watch
- grunt-contrib-clean
- grunt-contrib-uglify
- grunt-contrib-copy
- grunt-contrib-concat
- grunt-contrib-imagemin
- grunt-newer

## Contributing

I would be more than happy to accept external contributions to the project, whether it be feedback and bug reports or just generally giving me a hand. Anything is appreciated.

## License

MIT
