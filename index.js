var htmlTag = require('hexo-util').htmlTag,
    colors = require('colors'),
    packageInfo = require('./package.json'),
    emojiCommands = require('./emojiCommands')(hexo),
    rootPath = hexo.config.root,
    emojiConfig = hexo.config.emojis || false,
    emojiImageDir = emojiConfig.image_dir || false,
    emojiCDN = emojiConfig.cdn || false,
    emojiPrefix = emojiCDN ? emojiCDN : rootPath+emojiImageDir,
    defaultEmojiSize = 20;

var emojiCOmmandOptions = {
  desc: packageInfo.description,
  usage: '<argument>',
  arguments: [
    {name: 'install', desc: 'Copies all emoji assets into your blog\'s public directory.'},
    {name: 'remove', desc: 'Removes all emoji assets previously installed.'},
    {name: 'info', desc: 'Displays useful info, like plugin version, author or GitHub links'}
  ]
};
    
/**
 * Emoji commands for Hexo.
 * Use `install` option to copy emoji assets on your Hexo blog.
 * Use `remove` option to remove emoji assets from your Hexo blog.
 * 
 * Syntax:
 *   $ hexo emojis [install|remove]
 */
hexo.extend.console.register('emojis', packageInfo.description, emojiCOmmandOptions, function(args, callback){
    // Ascii art, for the console geeks :)
    console.log('\n   _   _                  _____                _ _     '.yellow);
    console.log('  | | | |                |  ___|              (_|_)    '.yellow);
    console.log('  | |_| | _____  _____   | |__ _ __ ___   ___  _ _ ___ '.yellow);
    console.log('  |  _  |/ _ \\ \\/ / _ \\  |  __| \'_ ` _ \\ / _ \\| | / __|'.yellow);
    console.log('  | | | |  __/>  < (_) | | |__| | | | | | (_) | | \\__ \\'.yellow);
    console.log('  \\_| |_/\\___/_/\\_\\___/  \\____/_| |_| |_|\\___/| |_|___/'.yellow);
    console.log('                                             _/ |      '.yellow);
    console.log('                                            |__/       \n'.yellow);
    console.log('                              Emojify the planet!'.yellow);
    console.log('\n');

    var opt = args._[0] || null; // Option

    switch (opt) {
        case 'install':
            emojiCommands.install(callback); // install emojis
            break;
        case 'remove':
            emojiCommands.remove(callback); // remove emojis
            break;
        case 'info':
            emojiCommands.showInfo(callback);
            break;
        default:
            hexo.call('help', {_: ['emojis']}, callback);
    }
});

/**
 * Emoji tag renders a single emoji.
 *
 * Syntax:
 *   {% emoji [emojiNameWithoutColons] [emojiSize] [class1,class2,class3] %}
 */
hexo.extend.tag.register('emoji', function(args, content){
    var emojiName = args[0]; // emojiNameWithoutColons argument
    var emojiSize = args[1] || defaultEmojiSize;
    var classes = args[2] || "";
    var imgAttr = {};

    if (!emojiConfig || !emojiPrefix) {
        throw new Error('Emoji configuration was not found.');
    }

    classes = classes.split(',');
    classes.push('emoji');
    classes.push('nofancybox');

    imgAttr.src = emojiPrefix +'/'+emojiName+'.png';
    imgAttr.width = emojiSize;
    imgAttr.height = emojiSize;
    imgAttr.class = classes.join(' ');
    imgAttr.title = emojiName;

    return htmlTag('img', imgAttr);
});

/**
 * Emoji block tag process a string block and replaces all emoji occurences.
 *
 * Syntax:
 *   {% emoji_block [emojiSize] [class1,class2,class3] %}
 *       Lorem ipsum dolor sit amet :emojiName:
 *       consectetur  adipisicing elit :anotherEmojiName:
 *   {% endemoji_block %}
 */
hexo.extend.tag.register('emoji_block', function(args, content) {
    var emojiSize = args[0] || defaultEmojiSize;
    var classes = args[1] || "";
    var imgAttr = {};

    if (!emojiConfig || !emojiPrefix) {
        throw new Error('Emoji configuration was not found.');
    }

    classes = classes.split(',');
    classes.push('emoji');
    classes.push('nofancybox');

    imgAttr.width = emojiSize;
    imgAttr.height = emojiSize;
    imgAttr.class = classes.join(' ');

    // find :something: pattern
    var emojifiedContent = content.replace(/:([a-z0-9\+\-_]+):/g, function(match) {
        match = match.replace(/:/g, ''); // :something: => something
        imgAttr.title = match;
        imgAttr.src = emojiPrefix +'/'+match+'.png';

        return htmlTag('img', imgAttr);
    });

    return emojifiedContent;
}, true);
