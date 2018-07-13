var fs        = require("fs"),
    writefile = fs.writeFileSync,
    readfile  = fs.readFileSync
    
function actionFactory(container){
  var db        = container.shattered,
      cwd       = process.cwd()
      
  return function action(name, options){
    if (!name)
      return console.log("Error: please provide a valid name")
    
    var shatter = db.findOne({name})
    if (shatter)
    {
      writefile(shatter.filename,readfile(shatter.fullpath))
      console.log("Imported",name,"to",cwd)
    }
    else 
      console.log("Unknown shatter:", name)
  
  }
}

module.exports = function(program,container)
{
  program
  .command('import [name]')
  .description('Import a file from your shatter list')
  .action(actionFactory(container))
}
