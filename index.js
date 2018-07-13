var core = require("commander"),
    all  = require("require-all"),
    db   = require("diskdb"),
    
    version = '0.1.0'
    
core.version(version)

var _c= console.log

console.log = function(){}

var list = db.connect(__dirname, ['shattered.json'])

console.log = _c

var api  = all({ dirname: __dirname+"/api",
                 resolve: function(method){
                    return method(core,list)
                  }
               })
    

core.on('command:*',(commands) => console.log('Unknown command:',commands.join(' ')) )

console.log("Shatter",version)

if (process.argv.length > 2)
  core.parse(process.argv) 
else
  core.outputHelp()