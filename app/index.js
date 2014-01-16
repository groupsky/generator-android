'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var androidSDKversions = [
    'API 1',
    'API 2',
    'API 3',
    'API 4',
    'API 5',
    'API 6',
    'API 7',
    'API 8: Android 2.2 (Froyo)', 
    'API 9: Android 2.3 (Gingerbread)', 
    'API 10: Android 2.3.3 (Gingerbread)', 
    'API 11',
    'API 12',
    'API 13',
    'API 14: Android 4.0 (Ice Cream Sandwich)', 
    'API 15: Android 4.0.3 (Ice Cream Sandwich)',
    'API 16: Android 4.1 (Jelly Bean)',
    'API 17: Android 4.2 (Jelly Bean)',
    'API 18: Android 4.3 (Jelly Bean)',
    'API 19: Android 4.4.2 (KitKat'].map(function(name, value) {
      return {name: name, value: value};
    });


var AndroidGenerator = module.exports = function AndroidGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.log("You're all setup. Fire up your favourite IDE and build that great app!");
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AndroidGenerator, yeoman.generators.Base);

AndroidGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
    name: 'applicationName',
    message: 'What is the name of your application?',
    default: 'My Awesome Application'
  },
  {
    name: 'projectName',
    message: 'How do you want to call your project?',
    default: function(props) {
      return props.applicationName.replace(/ /g,'');
    }
  },
  {
    name: 'packageName',
    message: 'What is the package name?',
    default: 'com.awesome.app'
  },
  {
    name: 'minimumApiLevel',
    message: 'Minimum required SDK:',
    type: 'list',
    choices: androidSDKversions,
    default: 8
  },
  {
    name: 'targetApiLevel',
    message: 'Target SDK:',
    type: 'list',
    choices: androidSDKversions,
    default: androidSDKversions.length-1
  },
  {
    name: 'compileApiLevel',
    message: 'Compile with:',
    type: 'list',
    choices: androidSDKversions,
    default: function(props) {
      console.log("props = "+JSON.stringify(props));
      return props.targetApiLevel;
    }
  }];

  this.prompt(prompts, function (props) {
    this.props = props;

    cb();
  }.bind(this));
};

AndroidGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

AndroidGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
