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
    name: 'packageName',
    message: 'What is the package name?',
    default: 'com.awesome.app'
  },
  {
    name: 'minimumApiLevel',
    message: 'Minimum required SDK:',
    type: 'list',
    choices: androidSDKversions,
    default: 9
  }];

  this.prompt(prompts, function (props) {
    this.applicationName = props.applicationName;
    this.packageName = props.packageName;
    this.minimumApiLevel = props.minimumApiLevel;
    this.projectName = this._.camelize(this._.slugify(this._.humanize(props.applicationName.replace(/ /g, ''))));
    this.packagePath = props.packageName.replace(/\./g, '/');
    this.className = this._.classify(this.projectName);

    cb();
  }.bind(this));
};

AndroidGenerator.prototype.configTemplate = function configTemplate() {
  this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
};

AndroidGenerator.prototype.app = function app() {
  this.mkdir('assets');
  this.mkdir('libs');
  this.mkdir('src/'+this.packagePath+'/ui');
  this.mkdir('src-gen');
  
  this.directory('res', 'res');

  this.template('AndroidManifest.xml', 'AndroidManifest.xml');
  this.template('proguard-project.txt', 'proguard-project.txt');
  this.template('project.properties', 'project.properties');
  this.template('src/_Application.java', 'src/'+this.packagePath+"/"+this.className);
};

AndroidGenerator.prototype.antprojectfiles = function antprojectfiles() {
  this.template('build.xml', 'build.xml');
  this.template('custom_rules.xml', 'custom_rules.xml');
};

AndroidGenerator.prototype.eclipseprojectfiles = function eclipseprojectfiles() {
  this.template('.classpath', '.classpath');
  this.template('.project', '.project');
}
