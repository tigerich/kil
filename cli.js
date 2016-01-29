#!/usr/bin/env node

var argv = process.argv;
var task = require('./task');

const cmds = ['init', 'dev', 'release', 'test', 'help', 'clean']

if (argv.length === 2) {
    task.help();
} else {
    if (cmds.indexOf(argv[2]) != -1) {
        task[argv[2]]();
    } else {
        task.help();
    }
}
