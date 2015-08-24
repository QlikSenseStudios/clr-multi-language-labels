/**
 * @description The task will create a release folder holding the docs/jsdoc and plato subfolders
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-mkdir');

  grunt.config('mkdir', {
    distributionFolder: {
      options: {
        create: [
          '../dist/release-' + grunt.option('pkg').version,
          '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName,
          '../dist/release-' + grunt.option('pkg').version + '/docs',
          '../dist/release-' + grunt.option('pkg').version + '/docs/jsdoc',
          '../dist/release-' + grunt.option('pkg').version + '/reports',
          '../dist/release-' + grunt.option('pkg').version + '/reports/plato'
        ]
      },
    },
  });

};