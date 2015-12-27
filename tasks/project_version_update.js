/*
 * grunt-project-version-update
 * https://github.com/mageddo/grunt-project-version-updater
 *
 * Copyright (c) 2015 Elvis de Freitas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('project_version_update', 'Set git, sonar, npm version from only one place', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			punctuation: '.',
			separator: ', '
		});


		var packageJson = grunt.file.readJSON('package.json'),
				sonar = grunt.file.read('sonar-project.properties');
		console.log('aqui é: ', process.cwd());
		console.log('o JSON é: ', packageJson);
		console.log('o sonar é: ', sonar);
		// sonar.projectVersion=0.0.1

		// // Iterate over all specified file groups.
		// this.files.forEach(function(f) {
		// 	// Concat specified files.
		// 	var src = f.src.filter(function(filepath) {
		// 		// Warn on and remove invalid source files (if nonull was set).
		// 		if (!grunt.file.exists(filepath)) {
		// 			grunt.log.warn('Source file "' + filepath + '" not found.');
		// 			return false;
		// 		} else {
		// 			return true;
		// 		}
		// 	}).map(function(filepath) {
		// 		// Read file source.
		// 		return grunt.file.read(filepath);
		// 	}).join(grunt.util.normalizelf(options.separator));

		// 	// Handle options.
		// 	src += options.punctuation;

		// 	// Write the destination file.
		// 	grunt.file.write(f.dest, src);

			// Print a success message.
			// grunt.log.writeln('File "' + f.dest + '" created.');
		// });
	});

};
