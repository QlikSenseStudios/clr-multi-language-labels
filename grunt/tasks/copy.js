/**
 * @description The task allows the copy of all files existing in the source and build folder to the
 *              location specified in the sub tasks.
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.config('copy', {
    buildFolder: {
      cwd: '../source',
      dest: '../build/' + grunt.option('project').extensionName,
      expand: true,
      flatten: false,
      mode: false,
      src: grunt.option('project').copy.build.files,
      timestamp: true
    },

    qlikVMExtensionPathFolder : {
      cwd: '../build/' + grunt.option('project').extensionName,
      dest: grunt.option('project').qlikVMExtensionPath,
      expand: true,
      flatten: false,
      mode: "777",
      src: grunt.option('project').copy.vm.files,
      timestamp: true
    },

    distributionFolder: {
      cwd: '../build/' + grunt.option('project').extensionName,
      dest: '../dist/release-' + grunt.option('pkg').version +'/' + grunt.option('project').extensionName,
      expand: true,
      flatten: false,
      mode: false,
      src: grunt.option('project').copy.dist.files,
      timestamp: true
    },

    currentDistFolder : {
      cwd: '../dist/release-' + grunt.option('pkg').version +'/' + grunt.option('project').extensionName,
      dest: grunt.option('project').qlikVMExtensionPath,
      expand: true,
      flatten: false,
      mode: false,
      src: grunt.option('project').copy.dist.files,
      timestamp: true
    },

    distToDemoFolder : {
      cwd: '../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName,
      dest: '../_demo/' + grunt.option('project').extensionName,
      expand: true,
      flatten: false,
      mode: false,
      src: grunt.option('project').copy.dist.files,
      timestamp: true
    }

  });

};

