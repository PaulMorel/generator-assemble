// Grunt Configuration
'use strict';
module.exports = function(grunt) {

	// Task Configuration
	grunt.initConfig({

		// Package info and environment variables
		pkg: grunt.file.readJSON('package.json'),
		env: {
			src: 'src', 	// Source
			dev: 'dev',		// Development
			dist: 'dist' 	// Production / Distribution
		},

		/**
		 * LESS Compiler
		 */
		less: {
			dev: {
				options: {
					strictMath: true,
					sourceMap: true,
					sourceMapURL: 'styles.css.map',
					sourceMapFilename: '<%%= env.dev %>/assets/css/styles.css.map'
				},
				src: '<%%= env.src %>/assets/less/styles.less',
				dest: '<%%= env.dev %>/assets/css/styles.css'
			},
			dist: {
				options: {
					strictMath: true,
					sourceMap: false
				},
				src: '<%%= env.src %>/assets/less/styles.less',
				dest: '<%%= env.dist %>/assets/css/styles.css'
			}
		},

		/**
		 * Autoprefixer
		 */
		autoprefixer: {
			options: {
				browsers: ['last 3 versions', 'ie 8', 'ie 9']
			},
			dev: {
				options: {
					map: true
				},
				src: '<%%= env.dev %>/assets/css/styles.css'
			},
			dist: {
				src: '<%%= env.dist %>/assets/css/styles.css'
			}
		},

		/**
		 * CSS Minimization
		 */
		cssmin: {
			options: {
				shorthandCompacting: true,
				roundingPrecision: -1
			},
			dist: {
				src: '<%%= env.dev %>/assets/css/styles.css',
				dest: '<%%= env.dist %>/assets/css/styles.css'
			}
		},

		/**
		 * Image Compressor
		 */
		imagemin: {
			dev: {
				files: [{
					expand: true,
					cwd: '<%%= env.src %>/assets/img/',
					src: ['{,*/}*.{png,jpg,gif,svg}'],
					dest: '<%%= env.dev %>/assets/img/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%%= env.src %>/assets/img/',
					src: ['{,*/}*.{png,jpg,gif,svg}'],
					dest: '<%%= env.dist %>/assets/img/'
				}]
			}
		},

		/**
		 * HTML Templating
		 */
		assemble: {
			options: {
				layout: 'default.hbs',
				layoutdir: '<%%= env.src %>/templates/layouts/',
				partials: '<%%= env.src %>/templates/partials/*.hbs',
				helpers: 'prettify',
				prettify: {
					condense: true,
					padcomments: true,
					indent_inner_html: false,
					indent: 4,
					wrap_line_length: 0
				}
			},
			dev: {
				options: {
					assets: '<%%= env.dev %>/assets',
					site: { root: '<%%= env.dev %>' }
				},
				expand: true,
				cwd: '<%%= env.src %>/pages/',
				src: '**/*.{hbs,html,md}',
				dest: '<%%= env.dev %>/'
			},
			dist: {
				options: {
					assets: '<%%= env.dist %>/assets',
					site: { root: '<%%= env.dist %>' }
				},
				expand: true,
				cwd: '<%%= env.src %>/pages/',
				src: '**/*.{hbs,html,md}',
				dest: '<%%= env.dist %>/'
			}
		},

		/**
		 * File Copying
		 */
		copy: {
			dev: {
				files: [{
						expand: true,
						cwd: '<%%= env.src %>/assets/',
						src: ['type/*','js/lib/*.js','js/main.js'],
						dest: '<%%= env.dev %>/assets/'
				}]
			},
			dist: {
				files: [{
						expand: true,
						cwd: '<%%= env.src %>/assets/',
						src: ['type/*','js/lib/*.js','js/main.js'],
						dest: '<%%= env.dist %>/assets/'
				}]
			}
		},

		/**
		 * JS Plugin Concatenating
		 */
		concat: {
			options: {
				separator: ';\n',
				nonull: true
			},
			dev: {
				src: ['<%%= env.src %>/assets/js/plugins/*.js'],
				dest: '<%%= env.dev %>/assets/js/plugins.js'
			},
			dist: {
				src: ['<%%= env.src %>/assets/js/plugins/*.js'],
				dest: '<%%= env.dist %>/assets/js/plugins.js'
			}
		},

		/**
		 * JS Minimization
		 */
		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%%= env.dev %>/assets/js',
					src: '{,*/}*.js',
					dest: '<%%= env.dist %>/assets/js'
				}]
			}
		},

		/**
		 * File Monitoring
		 */
		watch: {
			options: {
				spawn: false
			},
			less: {
				files: '<%%= env.src %>/assets/less/{,*/}*.less',
				tasks: ['less:dev','autoprefixer:dev']
			},
			html: {
				files: '<%%= env.src %>/**/*.{hbs,json,yml,html,md}',
				tasks: ['assemble:dev']
			},
			img: {
				files: '<%%= env.src %>/assets/img/{,*/}*.{jpg,gif,png,svg}',
				tasks: 'newer:imagemin:dev'
			},
			js: {
				files: '<%%= env.src %>/assets/js/{,*/}*.js',
				tasks: ['newer:copy:dev','concat:dev']
			},
			config: {
	        	files: ['Gruntfile.js']
	    	}
		}
	});

	// Task Loading
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('assemble');

	// Task Registering
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build:dev', ['less:dev', 'autoprefixer:dev', 'copy:dev', 'imagemin:dev', 'concat:dev', 'assemble:dev']);
	grunt.registerTask('build:dist', ['less:dist', 'autoprefixer:dist', 'cssmin:dist', 'copy:dist', 'concat:dist', 'uglify:dist', 'imagemin:dist', 'assemble:dist']);
};
