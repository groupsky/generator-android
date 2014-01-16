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
    default: 'My Awesomeness'
  },
  {
    name: 'packageName',
    message: 'What is the package name?',
    default: 'com.awesomeness.app'
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

AndroidGenerator.prototype.configTemplate = function configTemplate() {
  this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
};

AndroidGenerator.prototype.app = function app() {
  this.mkdir('assets');
  this.mkdir('src/'+this.packagePath+'/ui');
  this.mkdir('src-gen');
  
  this.mkdir('libs');
  this.mkdir('libs-src');

  this.directory('res', 'res');

  this.template('AndroidManifest.xml', 'AndroidManifest.xml');
  this.template('../../templates/common/proguard-project.txt', 'proguard-project.txt');
  this.template('project.properties', 'project.properties');
  this.template('src/_Application.java', 'src/'+this.packagePath+'/'+this.className+'Application.java');
};

AndroidGenerator.prototype.androidsupportv4 = function androidsupportv4() {
  this.copy('../../templates/common/libs/android-support-v4.jar', 'libs/android-support-v4.jar');
  this.copy('../../templates/common/libs/android-support-v4.jar.properties', 'libs/android-support-v4.jar.properties');
  this.directory('../../templates/common/libs-src/android-support-v4', 'libs-src/android-support-v4');
}

AndroidGenerator.prototype.universalimageloader = function universalimageloader() {
  var cblib = this.async();
  this.fetch('https://github.com/nostra13/Android-Universal-Image-Loader/raw/master/downloads/universal-image-loader-1.9.1.jar', 'libs', function (err) {
    cblib(err);
  });
  var cbsrc = this.async();
  this.fetch('https://github.com/nostra13/Android-Universal-Image-Loader/raw/master/downloads/universal-image-loader-1.9.1-sources.jar', 'libs-src', function (err) {
    cbsrc(err);
  });
  this.write('libs/universal-image-loader-1.9.1.jar.properties', 'src=../libs-src/universal-image-loader-1.9.1-sources.jar');
}

AndroidGenerator.prototype.mechanoid = function mechanoid() {
  var cblib = this.async();
  this.fetch('http://www.robotoworks.com/mechanoid/updates/snapshot/mechanoid.jar', 'libs', function(err){
    cblib(err);
  });
  var cbsrc = this.async();
  this.fetch('http://www.robotoworks.com/mechanoid/updates/snapshot/mechanoid-sources.jar', 'libs-src', function(err){
    cbsrc(err);
  });
  this.write('libs/mechanoid.jar.properties', 'src=../libs-src/mechanoid-sources.jar');
}

AndroidGenerator.prototype.mechdb = function mechdb() {
  this.template('_DB.mechdb', this.className+"DB.mechdb");
}

AndroidGenerator.prototype.antprojectfiles = function antprojectfiles() {
  this.template('build.xml', 'build.xml');
  this.template('../../templates/common/custom_rules.xml', 'custom_rules.xml');
};

AndroidGenerator.prototype.eclipseprojectfiles = function eclipseprojectfiles() {
  this.template('.classpath', '.classpath');
  this.template('.project', '.project');
  this.directory('../../templates/common/.settings', '.settings');
}
