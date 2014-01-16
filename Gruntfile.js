module.exports = function(grunt) {
    console.log(grunt.option('env') || 'development');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            compile: {
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        shell: {
        	'mocha-phantomjs': {
        		command: 'mocha-phantomjs -R dot http://localhost:8000/tests/index.html',
        		options: {
        			stdout: true,
        			stderr: true
        		}
        	}
        },
        requirejs: {
        	// Builds the engine in a single file
        		engine: {
                options: {
                    findNestedDependencies: true,
                    mainConfigFile: 'jage/dev/jage.js',
                    name: '../jage',
                    baseUrl: 'jage/dev/js/',
                    out: 'jage/jage.build.js',
                    optimize: 'uglify2',
                    generateSourceMaps: true,
                    preserveLicenseComments: false
                }
        		}
        },

        jshint: {
        		engine: {
	            options: {
	                curly: true,
	                eqeqeq: true,
	                eqnull: true,
	                browser: true
	            },
	            files: {
	                src: ['jage/dev/js/**/*.js']
	            }
        		},
        		// JShint on sample code for dev
        		samples: {
	            options: {
	                curly: true,
	                eqeqeq: true,
	                eqnull: true,
	                browser: true
	            },
	            files: {
	                src: ['samples/js/**/*.js']
	            }
        		},
        		tests: {
	            options: {
	                curly: true,
	                eqeqeq: true,
	                eqnull: true,
	                browser: true
	            },
	            files: {
	                src: ['tests/js/**/*.js']
	            }
        		}
        },
        concurrent: {
            tasks: ["watch"],
            options: {
                logConcurrentOutput: true
            }
        },
        watch: {
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
            },
            options: {
                livereload: true
            },
            engine: {
            	files: ['jage/dev/js/**/*.js'],
            	tasks: ['jshint:engine', 'requirejs:engine']
            },
            samples: {
                files: ['samples/js/**/*.js'],
                tasks: ['jshint:samples']
            },
            tests: {
            	files: ['tests/js/**/*.js'],
            	tasks: ['jshint:tests', 'shell:mocha-phantomjs'],
            	options: {
            		livereload: {
            			port: 35728
            		}
            	}
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', ['sass', 'jshint', 'requirejs', 'concurrent']);

    grunt.registerTask('launch', ['watch']);
};