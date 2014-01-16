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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('build', ['sass', 'jshint', 'requirejs', 'concurrent']);

    grunt.registerTask('launch', ['concurrent']);
};