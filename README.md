# Introduction

Update you project `version` from one place using **grunt**. Pick the project/release version in the **Gruntfile.js** (or pass the version by terminal argument) and this plugin will update: **git**, **sonar** and **npm** hardcoded versions automatically

## Supported frameworks
* git
* sonar
* npm 


# Pre requisites

* grunt cli

		$ sudo npm install -g grunt-cli


# How to use 

from terminal 

	grunt update --mg-v 0.0.1

from `Gruntfile `

```javascript
projectVersionUpdater: {
	default: {
		options:{
			version: '1.0', // or --mg-v from commandline. The version of the project
			commitVersion: true, // commit on git after update project version
			overrideTag: false, // delete git tag if it exists, then create it again for the last commit
			commitMessage: 'setting version' // or --mg-m from commandline. Message to commit if commitVersion is able
		},
		files: {
			sonar: ['sonar-project.properties'], // you need to pass array
			git: ['.'], // if the property is not passed the framework will no be updated
			npm: ['.']
		}
	}
}
....
```

# Testing this project

On this project you can test by running:

```bash
$ npm install
$ grunt update --mg-v 5.0.0

Running "projectVersionUpdater:default" (projectVersionUpdater) task
5.0.0
>> updating: sonar ...
	sonar-project.properties
>> sonar updated!
>> updating: git ...
	.
>> git updated!
>> updating: npm ...
	package.json
>> npm updated!
>> ... all done!
```
or 

```bash
grunt update # to update from Gruntfile.js hardcoded `version` property
```

so check the **git** tag, **npm** `package.json` and **sonar** properties

# Installation

	$ npm install grunt-project-version-updater --save-dev

setting on `Gruntfile.js`

```javascript
projectVersionUpdater: {
	default: {
		options:{
			// version: '2.0'
		},
		files: {
			sonar: ['sonar-project.properties'],
			git: ['.'],
			npm: ['.']
		}
	}
}
...
grunt.registerTask('update', ['projectVersionUpdater']);
```	

# Terminal Options

	--mg-v 
		The version of the project to generate
	--mg-m 
		Message to commit if commitVersion is enabled

If the version is hardcoded on the **Gruntfile.js** and you set the version on terminal, the terminal have preference

# Default options

```javascript
options: {
	version: null, // or --mg-v from commandline. The version of the project
	commitVersion: true, // commit on git after update project version
	overrideTag: false, // delete git tag if it exists, then create it again for the last commit
	commitMessage: 'setting version' // or --mg-m from commandline. Message to commit if commitVersion is able
}
```

# License
[MIT License](https://github.com/mageddo/grunt-project-version-updater/blob/master/LICENSE-MIT)
