// const mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! TRPZ 05 - Anna Vedenskaya <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: './js/*.js',
        dest: './build2/js/script.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      uses_defaults: ['./js/script.js'],
      ignore_warning: {
        options: {
          '-W015': true,
        },
        src: ['./js/script.js'],
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './css/',
          src: ['*.css', '!*.min.css'],
          dest: './build2/css/',
          ext: '.min.css'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: './img/',
          src: ['**/*.{jpg,jpeg}'],
          dest: './build2/img/'
        }]
      }
    },
    sprite: {
      all: {
        src: './build2/img/*.jpg',
        dest: './build2/img/spritesheet.jpg',
        destCss: './build2/css/sprites.css'
      }
    },
    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          },
          {
            removeUselessStrokeAndFill: false
          },
          {
            removeAttrs: {
              attrs: [
                'xmlns'
              ]
            }
          }
        ]
      },
      dist: {
        files: {
          './build2/img/bootstrap-logo.svg': './img/bootstrap-logo.svg'
        }
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          './build2/index.min.html': './index.html',     // 'destination': 'source'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "JSHint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Load the plugin that provides the "imagemin" task.
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // Load the plugin that provides the "grunt-spritesmith" task.
  grunt.loadNpmTasks('grunt-spritesmith');
  // Load the plugin that provides the "grunt-svgmin" task.
  grunt.loadNpmTasks('grunt-svgmin');
  // Load the plugin that provides the "htmlmin" task.
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Load the plugin that provides the "grunt-newer" task.
  grunt.loadNpmTasks('grunt-newer');


  // Default task(s).
  grunt.registerTask('default', [
    'newer:jshint', 
    'newer:uglify', 
    'newer:cssmin', 
    'newer:imagemin', 
    'newer:sprite', 
    'newer:svgmin', 
    'newer:htmlmin'
  ]);
};