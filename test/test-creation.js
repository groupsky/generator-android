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
            'build.xml',
            'project.properties',
            'proguard-project.txt',
            'src/doll/ugly/UglyDollApplication.java',
            'custom_rules.xml'            
        ];

        helpers.mockPrompt(this.app, {
            'applicationName': "Ugly Doll",
            'packageName': "doll.ugly",
            'minimumApiLevel': 8,
            'libsToInclude': []
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
            helpers.assertFileContent('src/doll/ugly/UglyDollApplication.java', /mechanoid/i);
            done();
        });
    });

    it('excludes mechanoid when not selected', function (done) {
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
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /mechanoid/i);
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
            helpers.assertFileContent('src/doll/ugly/UglyDollApplication.java', /universalimageloader/i);
            done();
        });
    });

    it('excludes Universal-Image-Loader when not selected', function (done) {
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
            helpers.assertNoFileContent('src/doll/ugly/UglyDollApplication.java', /universalimageloader/i);
            done();
        });
    });
});
