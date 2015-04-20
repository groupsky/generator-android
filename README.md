THIS REPO IS NOT MAINTAINED ANY MORE. USE AT YOUR OWN RISK!

# generator-android 

[Yeoman](http://yeoman.io) generator for Android.

* [![Build Status](https://secure.travis-ci.org/groupsky/generator-android.png?branch=master)](https://travis-ci.org/groupsky/generator-android)
* [![Dependency Status](https://david-dm.org/groupsky/generator-android.png)](https://david-dm.org/groupsky/generator-android)
* [![devDependency Status](https://david-dm.org/groupsky/generator-android/dev-status.png)](https://david-dm.org/groupsky/generator-android#info=devDependencies)
* [![Stories in Ready](https://badge.waffle.io/groupsky/generator-android.png?label=ready)](https://waffle.io/groupsky/generator-android)

## Getting Started

### Invite Yeoman

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Android Generator

Install `generator-android`:

```
npm install -g generator-android
```

Make a new directory and `cd` into it:

```
mkdir my-shiny-project && cd $_
```

Finally, initiate the generator:

```
$ yo android
```


## Generators

Available generators:

* [android](#app) (aka [android:app](#app))
* [android:library](#library)

**Note: Generators are to be run from the root directory of your project.**

### App

Sets up a new Android application project in the current directory. Project is configured to build with Eclipse and ant, soon it will include gradle (#2).
The following libraries are included by default:
* android-support-v4
* [Mechanoid](http://robotoworks.com/mechanoid/doc)
* [Universal Image Loader](https://github.com/nostra13/Android-Universal-Image-Loader)
* and more (just ask [for](https://github.com/groupsky/generator-android/issues/new))

By default an optimization proguard configuration is enabled with rules for common libraries and issues.

**Note: this will change in future version to create several subdirectories where the Android application and test project will be created**

### Library

Sets up a new Android library in the current directory. The generator creates a subdirectory where the library source lives in and another subdirectory for test project.
Build environments that are included:
* Ant
* Eclipse
* Gradle

There are no runtime libraries included, only test libraries:
* [jUnit 4.10](http://junit.org/)
* [Mockito 1.9.5](http://code.google.com/p/mockito/)
* [Robolectric 2.2](http://robolectric.org/)
* [FEST Android 1.0.7](http://square.github.io/fest-android/)

The test project is based on **Robolectric** so it can run without emulator.

By default an optimization proguard configuration is enabled with rules for common libraries and issues.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[![Analytics](https://ga-beacon.appspot.com/UA-47297746-1/generator-android/readme)](https://github.com/igrigorik/ga-beacon)
