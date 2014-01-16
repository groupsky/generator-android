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

var LibraryGenerator = module.exports = function LibraryGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.log("You're all setup. Fire up your favourite IDE and build that great library!");
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LibraryGenerator, yeoman.generators.Base);

LibraryGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
  	name: 'applicationName',
  	message: 'What is the name of your library?',
  	default: 'My Awesomeness Library'
  },
  {
  	name: 'packageName',
  	message: 'What is the package name?',
  	default: 'com.awesomeness.lib'
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
  	this.packagePath = props.packageName.replace(/\./g, '/');
  	this.className = this._.classify(this._.slugify(this._.humanize(props.applicationName.replace(/ /g, ''))));
  	this.projectName = this._.camelize(this.className);

  	cb();
  }.bind(this));
};

LibraryGenerator.prototype.configTemplate = function configTemplate() {
	this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
};

LibraryGenerator.prototype.app = function app() {
	this.mkdir(this.projectName);
	this.mkdir(this.projectName+'/src/'+this.packagePath);

	this.mkdir(this.projectName+'/libs');
	this.mkdir(this.projectName+'/libs-src');

	this.directory('lib/res', this.projectName+'/res');

	this.template('lib/AndroidManifest.xml', this.projectName+'/AndroidManifest.xml');
	this.template('../../templates/common/proguard-project.txt', this.projectName+'/proguard-project.txt');
	this.template('lib/project.properties', this.projectName+'/project.properties');
};

LibraryGenerator.prototype.androidsupportv4 = function androidsupportv4() {
	this.copy('../../templates/common/libs/android-support-v4.jar', this.projectName+'/libs/android-support-v4.jar');
	this.copy('../../templates/common/libs/android-support-v4.jar.properties', this.projectName+'/libs/android-support-v4.jar.properties');
	this.directory('../../templates/common/libs-src/android-support-v4', this.projectName+'/libs-src/android-support-v4');
}

LibraryGenerator.prototype.antprojectfiles = function antprojectfiles() {
	this.template('lib/build.xml', this.projectName+'/build.xml');
};

LibraryGenerator.prototype.eclipseprojectfiles = function eclipseprojectfiles() {
	this.template('lib/.classpath', this.projectName+'/.classpath');
	this.template('lib/.project', this.projectName+'/.project');
	this.directory('../../templates/common/.settings', this.projectName+'/.settings');
}

LibraryGenerator.prototype.gradlefiles = function gradlefiles() {
	this.template('settings.gradle', 'settings.gradle');
	this.template('lib/build.gradle', this.projectName+'/build.gradle');
}