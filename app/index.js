'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
//var genUtils = require('../../util.js');
//var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({

    promptUser: function() {
    	var done = this.async();

    	// have Yeoman greet the user
    	console.log(this.yeoman);

    	var prompts = [{
    		name: 'projectName',
    		message: 'What is your projects\'s name ?'
    	}];

    	this.prompt(prompts, function(props) {
    		this.projectName = props.projectName;

    		done();
    	}.bind(this));
    },

    generateFolders: function(){
        this.sourceRoot(path.join(__dirname, 'templates'));

        util.processDirectory(this, 'src', 'src');

    },

    generateFiles: function() {
        this.template('_package.json', 'package.json');
    },

    end: function() {
      this.installDependencies({
        skipInstall: this.options['skip-install']
      });
    }
});
