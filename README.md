# Introduction

Update you project `version ` from one place using **grunt**, frameworks supported

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

	projectVersionUpdater: {
		default: {
			options:{
				version: '1.0', // or --mg-v from commandline. The version of the project
				commitVersion: true, // commit on git after update project version, to work git option file have to be on last item of list
				overrideTag: false, // delete git tag if it exists, then create it again for the last commit
				commitMessage: 'setting version' // or --mg-m from commandline. Message to commit if commitVersion is able
			},
			files: {
				sonar: ['sonar-project.properties'], // you need to pass array
				npm: ['.'],
				git: ['.'] // if the property is not passed the framework will no be updated
			}
		}
	}
	....
			
# Testing before install

On this project you can test it running

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

		
or 

	grunt update # to update from Gruntfile.js fixed version 


			
# Installation

	$ npm install grunt-project-version-updater --save-dev

setting on `Gruntfile.js`

	projectVersionUpdater: {
		default: {
			options:{
			},
			files: {
				sonar: ['sonar-project.properties'],
				npm: ['.'],
				git: ['.']
			}
		}
	}
	...
	grunt.registerTask('update', ['projectVersionUpdater']);
	

# Terminal Options

Terminal have preference

	--mg-v 
		The version of the project
	--mg-m 
		Message to commit if commitVersion is able

# Options defaults

	options: {
		version: null,
		commitVersion: true,
		overrideTag: false, 
		commitMessage: 'setting version' 
	}