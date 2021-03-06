/*
 * grunt-project-version-update
 * https://github.com/mageddo/grunt-project-version-updater
 *
 * Copyright (c) 2015 Elvis de Freitas
 * Licensed under the MIT license.
 */

var exec = require('child_process'),
	util = require('util'),
	lpath = require('path');

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('projectVersionUpdater', 'Set git, sonar, npm version from only one place', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var done = this.async(),
		fwk = {
			'sonar': function(path, version){
				if (grunt.file.exists(path)) {
					grunt.log.writeln('\t', path);
					var sonar = grunt.file.read(path);
					sonar = sonar.replace(/(sonar\.projectVersion[\t ]*)=.*$/gm, '$1=' + version);
					grunt.file.write(path, sonar);
					return true;
				}else{
					grunt.log.warn('sonar file "' + path + '" not found.');
					return false;
				}
			},
			'npm': function(path, version){
				path = lpath.join(path, 'package.json');
				if (grunt.file.exists(path)) {
					grunt.log.writeln('\t', path);
					var npm = grunt.file.read(path);
					npm = npm.replace(/("version"\ *: *")[^"]+(")/gm, "$1"+ version +"$2");
					grunt.file.write(path, npm);
					return true;
				}else{
					grunt.log.warn('npm file "' + path + '" not found.');
					return false;
				}
			},
			'git': function(path, version){
				if (grunt.file.exists(path)) {
					grunt.log.writeln('\t', path);
					try{
						if(this.commitVersion){
							try{
								exec.execFileSync('git', ['commit', '-am', this.commitMessage], {cwd: path});
							}catch(e){
								switch(e.status){
									case 1:
										console.log( e.stdout.toString());
										break;
									default:
										grunt.log.warn(e.stderr.toString());
								}
							}
						}
						if(this.overrideTag){
							fwk._deleteTag(path, version);
						}
						exec.execFileSync('git', ['tag', version], {cwd: path});
						return true;
					}catch(err){
						grunt.log.warn('git tag version failed', err.message);
						return false;
					}
				}else{
					grunt.log.warn('npm file "' + path + '" not found.');
					return false;
				}
			},
			'_deleteTag': function(path, version){
				try{
					exec.execFileSync('git', ['tag', '-d', version], {cwd: path});
				}catch(e){}
			}
		};
		// commandline have preference
		var options = this.options({
			version: null, // or --mg-v from commandline. The version of the project 
			commitVersion: true, // commit on git after update project version
			overrideTag: false, // delete git tag if it exists, then create it again for the last commit
			commitMessage: 'setting version' // or --mg-m from commandline. Message to commit if commitVersion is able
		});

		options.version = grunt.option('mg-v') || options.version;
		options.commitMessage = grunt.option('mg-m') || options.commitMessage;

		if(!options.version){
			grunt.log.warn('pass the version on --mg-v line option or option.version task attribute ');
			return done(false);
		}

		var haveRead = false;
		try{
			this.files.forEach(function(f){
				if(f.src.length){
					grunt.log.ok('updating: ' + f.dest + ' ...');
					haveRead = true;
				}
				f.src.forEach(function(path){
					var cmd = fwk[f.dest];
					if(cmd){
						if(cmd.call(options, path, options.version)){
							grunt.log.ok(f.dest + ' updated!');
						}else{
							throw '';
						}
					}else{
						grunt.log.warn(util.format('framework "%s" not exists', f.dest));
						done(false);
					}
				});
			});
		}catch(e){
			return done(false);
		}
		if(haveRead){
			return grunt.log.ok('... all done!');
		}

		grunt.log.warn('No files to read');
		done(false);
	});

};
