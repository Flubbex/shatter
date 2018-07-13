var fs = require("fs"),
    writefile = fs.writeFileSync,
    readfile  = fs.readFileSync,
    stat      = fs.stat
    
function actionFactory(container){
  var db        = container.shattered,
      cwd       = process.cwd()
      
  return function action(name, path, options){
    if (!name || !path)
      return console.log("Error: please provide a valid name and path")
    
    var validPath = stat(path,function(err,result){
      if (err===null)
      {
        db.update({name},
                  {name, 
                  filename:path.slice(path.lastIndexOf('/')+1), 
                  fullpath:(cwd+'/'+path).replace('/','/')},
                  {upsert:true} )
                  
        console.log("Imported",path,"as",name)
      }
      else 
        console.log("Invalid path:", path)
    })
    
  
  }
}

module.exports = function(program,container)
{
  program
  .command('export [name] [path]')
  .description('Export a file to your shatter list')
  .action(actionFactory(container))
}
