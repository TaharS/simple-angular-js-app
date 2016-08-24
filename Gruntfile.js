module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Launch bower install command
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './app/libs',
                    cleanTargetDir: true
                }
            }
        },

        // Verify javascript code quality
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js']
        },

        // Unit testing
        // karma:unit launch test cases on time
        // karma:continuous launch test cases on any file change
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },

        // Compiles all html templates
        html2js: {
            options: {
                module: 'htmlTemplate',
                base: 'app'
            },
            dist: {
                src: ['app/views/**/*.html'],
                dest: 'app/services/templates.js'
            }
        },

        // Uses concat/uglify from the html file
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },

        // 
        usemin: {
            html: 'dist/index.html'
        },

        // copying HTML file into dist folder
        copy: {
            index: {
                expand: true,
                cwd: 'app',
                src: 'index.html',
                dest: 'dist/'
            },
            project: {
                expand: true,
                cwd: 'app',
                src: '**',
                dest: 'dist/'
            }
        },

        // 
        filerev: {
            options: {
                algorithm: 'md5',
                length: 16,
            },
            assets: {
                src: ['dist/**/*.{jpg,jpeg,gif,png,webp}', 'dist/app.css', 'dist/app.js']
            },
            html: {
                src: 'dist/index.html'
            }
        },

        // cleans temporary folder
        clean: {
            temp: {
                src: ['.tmp']
            },
            dist: {
                src: ['dist']
            },
            generated: {
                src: ['.tmp', 'app/services/templates.js']
            }
        },

        // Allows developers to rebuild automaticaly
        // After any changes
        // Put karma:unit when test configured
        watch: {
            min: {
                files: ['Gruntfile.js', 'app/**/*.js', 'app/**/*.html'],
                tasks: ['clean:dist', 'jshint', 'karma:unit', 'build', 'clean:temp'],
                options: {
                    atBegin: true
                }
            },
            dev: {
                files: ['Gruntfile.js', 'app/**/*.js', 'app/**/*.html'],
                tasks: ['clean:dist', 'jshint', 'html2js', 'karma:unit', 'copy:project'],
                options: {
                    atBegin: true
                }
            }
        },

        // Uses webserver to run the app.
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    base: 'dist'
                }
            }
        },

        // Creates tar file
        compress: {
            dist: {
                options: {
                    archive: 'release/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{ expand: true, cwd: "dist", src: ['**'], dest: '<%= pkg.name %>-<%= pkg.version %>' }]
            }
        },

        // Update project version
        bump: {
            options: {
                files: ['package.json'],
                pushTo: 'origin',
            }
        }
    });

    // Loading of tasks and registering tasks will be written here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bump');

    // Main build order
    // - Use main index
    // - Transform html to js files
    // - Use useminPrepare to hanlde concat/cssmin/uglify
    // - Make file unique with filerev (md5 16 chars)
    grunt.registerTask('build', [
        'copy:index',
        'html2js',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'filerev:assets',
        'usemin'
    ]);

    // Used for developpment with original files
    grunt.registerTask('dev', ['bower', 'connect:server', 'watch:dev']);
    // Used for dev, using min files
    grunt.registerTask('dev:minified', ['bower', 'connect:server', 'watch:min']);
    // Lanching test batch
    grunt.registerTask('test', ['bower', 'jshint', 'html2js', 'karma:continuous']);

    // Use grunt-bump to handle versioning
    // patch : 0.0.X
    // minor : 0.X.0
    // major : X.0.0
    grunt.registerTask('release:patch', ['bower', 'jshint', 'html2js', 'karma:unit', 'bump:patch', 'build', 'clean:generated', 'compress:dist']);
    grunt.registerTask('release:minor', ['bower', 'jshint', 'html2js', 'karma:unit', 'bump:minor', 'build', 'clean:generated', 'compress:dist']);
    grunt.registerTask('release:major', ['bower', 'jshint', 'html2js', 'karma:unit', 'bump:major', 'build', 'clean:generated', 'compress:dist']);

};