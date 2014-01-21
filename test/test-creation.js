/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var url     = require('url');
var helpers = require('yeoman-generator').test;


describe('android generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('android:app', [
                '../../app'
            ]);

            var app = this.app;
            helpers.stub(this.app, 'fetch', function(u, p, cb) {
                app.write(path.join(p, path.basename(url.parse(u).pathname)), "mocked content");
                cb();
            })

            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            '.classpath',
            '.project',
            'AndroidManifest.xml',
            'UglyDollDB.mechdb',
            'build.xml',
            'project.properties',
            'proguard-project.txt',
            'src/doll/ugly/UglyDollApplication.java',
            'libs/android-support-v4.jar',
            'libs/universal-image-loader-1.9.1.jar',
            'libs/mechanoid.jar',
            'custom_rules.xml'            
        ];

        helpers.mockPrompt(this.app, {
            'applicationName': "Ugly Doll",
            'packageName': "doll.ugly",
            'minimumApiLevel': 8,
            'libsToInclude': ['mechanoid', 'imageLoader']
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('includes mechanoid when selected', function (done) {
        var expected = [
            'UglyDollDB.mechdb',
            'libs/mechanoid.jar'          
        ];

        helpers.mockPrompt(this.app, {
            'applicationName': "Ugly Doll",
            'packageName': "doll.ugly",
            'minimumApiLevel': 8,
            'libsToInclude': ['mechanoid']
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            helpers.assertFileContent('src/doll/ugly/UglyDollApplication.java', /import com\.robotoworks\.mechanoid\.Mechanoid;/);
            helpers.assertFileContent('src/doll/ugly/UglyDollApplication.java', /Mechanoid\.init\(this\);/);
            done();
        });
    });

    it('not includes mechanoid when not selected', function (done) {
        var unexpected = [
            'UglyDollDB.mechdb',
            'libs/mechanoid.jar'          
        ];

        helpers.mockPrompt(this.app, {
            'applicationName': "Ugly Doll",
            'packageName': "doll.ugly",
            'minimumApiLevel': 8,
            'libsToInclude': []
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertNoFile(unexpected);
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /import com\.robotoworks\.mechanoid\.Mechanoid;/);
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /Mechanoid\.init\(this\);/);
            done();
        });
    });

    it('includes Universal-Image-Loader when selected', function (done) {
        var expected = [
            'libs/universal-image-loader-1.9.1.jar'
        ];

        helpers.mockPrompt(this.app, {
            'applicationName': "Ugly Doll",
            'packageName': "doll.ugly",
            'minimumApiLevel': 8,
            'libsToInclude': ['imageLoader']
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    it('not includes Universal-Image-Loader when not selected', function (done) {
        var unexpected = [
            'libs/universal-image-loader-1.9.1.jar'
        ];

        helpers.mockPrompt(this.app, {
            'applicationName': "Ugly Doll",
            'packageName': "doll.ugly",
            'minimumApiLevel': 8,
            'libsToInclude': []
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertNoFile(unexpected);
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /import com\.nostra13\.universalimageloader\.core.DisplayImageOptions;/);
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /import com\.nostra13\.universalimageloader\.core.ImageLoader;/);
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /import com\.nostra13\.universalimageloader\.core.ImageLoaderConfiguration;/);
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /ImageLoader\.getInstance\(\)\.init/);
            done();
        });
    });
});
