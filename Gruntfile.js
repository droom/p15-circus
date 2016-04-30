module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: ['src/sass/*.sass'],
        tasks: ['sass'],
      },
      // uglify: {
      //   files: ['js/src/money.js'],
      //   tasks: ['uglify']
      // },
      jade: {
        files: ['src/jade/index.jade'],
        tasks: ['jade'],
      },
      postcss: {
        files: ['src/sass/*.sass'],
        tasks: ['postcss'],
      }
    },

    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'js/src/money.js',
    //     dest: 'js/build/money.min.js'
    //   }
    // },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/style.css': 'src/sass/style.sass',
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
          ]
        },
        dist: {
          src: 'dist/css/style.css'
        }
      },




      jade: {
        compile: {
          options: {
            data: {
              debug: false
            }
          },
          files: {
            "dist/index.html": ["src/jade/index.jade"]
          }
        }
      }

    });


grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jade');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'postcss','jade']);

};
