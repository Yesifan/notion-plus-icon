const NAME = 'ResetEntryPlugin';
const VERSION = '1.0.0';

class ResetEntryPlugin {
  constructor(options = {}){
    this.options = options;
    this.version = VERSION;
  }
  apply(compiler){
    compiler.hooks.entryOption.tap(NAME, (context, entry) => {
      if(this.options.transform){
        Object.entries(entry).forEach(([name, value]) => {
          entry[name] = this.options.transform(name, value);
        })
      }
    });
  }
}

module.exports = ResetEntryPlugin;