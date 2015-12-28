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

	grunt update -vs 0.0.1

from file 

	projectVersionUpdater: {
		default: {
			options:{
				version: '2.0.x'
			},
			files: {
				sonar: ['sonar-project.properties'], // you need to pass array
				git: ['.'], // if the property is not passed the framework will no be updated
				npm: ['.']
			}
		}
	}
	....
			
# Testing before install

On this project you can test it running

	$ npm install
	$ grunt update --vs 5.0.0
	
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