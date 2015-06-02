'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');

module.exports = yeoman.generators.Base.extend({

    promptUser: function() {
    	var done = this.async();

    	// have Yeoman greet the user
    	console.log(this.yeoman);

    	var prompts = [{
    		name: 'projectName',
    		message: 'What is your project\'s name?'
    	}, {
            name: 'author',
            message: 'What is your name?'
        }];

    	this.prompt(prompts, function(props) {
    		this.projectName = props.projectName;
            this.author = props.author;

    		done();
    	}.bind(this));
    },

    generateFolders: function(){
      this.mkdir('src');

      this.mkdir('src/assets');
      this.mkdir('src/assets/less');
      this.mkdir('src/assets/js');
      this.mkdir('src/assets/js/lib');
      this.mkdir('src/assets/img');
      this.mkdir('src/assets/type');

      this.mkdir('src/pages');

      this.mkdir('src/templates');
      this.mkdir('src/templates/layouts');
      this.mkdir('src/templates/partials');
    },

    generateFiles: function() {
        this.template('_package.json', 'package.json');
        this.template('_README.md', 'README.md');
        this.template('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_gitignore', '.gitignore');
        this.copy('_editorconfig', '.editorconfig');

        this.copy('_less/normalize.less', 'src/assets/less/normalize.less');
        this.template('_less/styles.less', 'src/assets/less/styles.less');

        this.template('_pages/index.md', 'src/pages/index.md');
        this.template('_layouts/default.hbs', 'src/templates/layouts/default.hbs');
    },

    end: function() {
      this.npmInstall();
      this.config.save();
    }
});
