/**
 * @description The task will generate the plato complexity analyses againts the built code
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-plato');

  grunt.config('plato', {
    all: {
      options : {
        jshint : grunt.file.readJSON('.jshintrc'),
        complexity : {
          /**
           * Whether operator || should be considered a source of cyclomatic complexity
           * @type {Boolean}
           */
          logicalor : true,
          /**
           * Whether switch statements should be considered a source of cyclomatic complexity
           * @type {Boolean}
           */
          switchcase : true,
          /**
           * Whether for...in loops should be considered a source of cyclomatic complexity
           * @type {Boolean}
           */
          forin : true,
          /**
           * Whether catch clauses should be considered a source of cyclomatic complexity
           * @type {Boolean}
           */
          trycatch : true,
          /**
           * Whether the maintainability index should be rebased on a scale from 0 to 100
           * @type {Boolean}
           */
          newmi : true,
          /**
           * Only valid for when ast is an array of files Boolean indicating if we should skip
           * processing of certain values, such as the adjacency and visibility matrixes, core
           * sizes, and average values loc, etc.
           * @type {Boolean}
           */
          skipCalculation : false,
          /**
           * Skips creating the visibility matrix and calculating the coreSize, which can be very
           * expensive for large projects
           * @type {Boolean}
           */
          noCoreSize: false

        }
      },
      files: {
        '../dist/release-<%= grunt.option("pkg").version %>/reports/plato' : [
          '../dist/release-<%= grunt.option("pkg").version %>/**/*.js',
          '!../dist/release-<%= grunt.option("pkg").version %>/vendor/**/*',
          '!../dist/release-<%= grunt.option("pkg").version %>/docs/**/*',
          '!../dist/release-<%= grunt.option("pkg").version %>/reports/**/*'
        ]
      }
    }
  });

};

