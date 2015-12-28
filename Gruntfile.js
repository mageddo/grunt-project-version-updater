/*
 * grunt-project-version-update
 * https://github.com/mageddo/grunt-project-version-updater
 *
 * Copyright (c) 2015 Elvis de Freitas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Configuration to be run (and then tested).
		projectVersionUpdater: {
			default: {
				options:{
					version: '2.0',
					commitVersion: true, // commit on git after update project version
					overrideTag: true, // delete git tag if it exists
					commitMessage: 'setting version' // message to commit if commitVersion is able
				},
				files: {
					sonar: ['sonar-project.properties'],
					git: ['.'],
					npm: ['.']
				}
			}
		},


	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// By default, lint and run all tests.
	grunt.registerTask('update', ['jshint', 'projectVersionUpdater']);

};

