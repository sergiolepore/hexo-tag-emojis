## Introduction

This is a [hexo](https://github.com/tommy351/hexo) tag plugin which allows you to insert [emojis](http://www.emoji-cheat-sheet.com/) on your blog posts.

## Plugin installation

Run the following command in the root directory of hexo:

```
npm install hexo-tag-emojis --save
```

And enable the plugin in your `_config.yml`.

```
plugins:
  - hexo-tag-emojis
```

## Assets installation

This plugin comes with all emoji images from [emoji-cheat-sheet.com repository](https://github.com/arvida/emoji-cheat-sheet.com). Before use them, you need to deploy the emoji images on your Hexo blog.

First, open your `_config.yml` file and paste the following lines:

```
# hexo-tag-emojis plugin configuration
emojis:
  image_dir: images/emojis
```

Then run this command:

```
hexo emojis install
```

## Usage

#### Method 1 - Inline emoji

```
{% emoji [emojiNameWithoutColons] %}
```

Example:

```
{% emoji heart %}
```

Will generate the following HTML:

```
<img width="20" height="20" class="emoji nofancybox" title="heart" src="/images/emojis/heart.png">
```

#### Method 2 - Emoji block

This is the recommended choice if you want to process a whole paragraph.

```
{% emoji-block %}
    Lorem ipsum dolor sit amet :emojiName:
    consectetur  adipisicing elit :anotherEmojiName:
{% endemoji-block %}
```

Example:

```
{% emoji-block %}
    Lorem ipsum dolor sit amet :smiley:
    consectetur  adipisicing elit :boom:
{% endemoji-block %}
```

## Remove assets

To remove all emoji images, run:

```
hexo emojis remove
```