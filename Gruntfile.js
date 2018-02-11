const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {                              // Task 
            dist: {                            // Target 
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets/foodmaniac/scss',
                    src: ['*.scss'],
                    dest: 'public/stylesheets/foodmaniac/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    // makes all src relative to cwd 
                    {expand: true, cwd: 'views/app', src: ['**'], dest: 'views/'},
                ],
            },
        },
        hashres: {
            // Global options 
            options: {
                // Optional. Encoding used to read/write files. Default value 'utf8' 
                encoding: 'utf8',
                // Optional. Format used to name the files specified in 'files' property. 
                // Default value: '${hash}.${name}.cache.${ext}' 
                fileNameFormat: '${name}.${hash}.${ext}',
                // Optional. Should files be renamed or only alter the references to the files 
                // Use it with '${name}.${ext}?${hash} to get perfect caching without renaming your files 
                // Default value: true 
                renameFiles: false
            },
            // hashres is a multitask. Here 'prod' is the name of the subtask. You can have as many as you want. 
            prod: {
                // Specific options, override the global ones 
                options: {
                  // You can override encoding, fileNameFormat or renameFiles 
                },
                // Files to hash 
                src: [
                    // WARNING: These files will be renamed! 
                    'public/javascripts/*.js',
                    'public/stylesheets/foodmaniac/css/*.css'],
                    // File that refers to above files and needs to be updated with the hashed name 
                    dest: ['views/layout.jade', 'views/index.jade'],
            }
        },
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.registerTask('prod', ['sass:dist', 'webpack:prod', 'copy', 'hashres:prod']);
};