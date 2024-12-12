---
---
Testing javascript
Welcome to My Home Page. 

{% assign date = '2020-04-13T10:20:00Z' %}

- Original date - {{ date }}
- With timeago filter - {{ date | timeago }}


# Simple JavaScript Button Alert

This is an example of a simple JavaScript button that triggers an alert message. When using Jekyll to render this `README.md`, you can include HTML and JavaScript within the Markdown.

## Example Button

Below is the code for a button with an alert message:

<html>
<head>
    <title>Button Alert Example</title>
</head>
<body>
    <button onclick="alert('Hello! This is a simple alert message.')">Click Me!</button>
</body>
</html>

## How to Use

1. Copy and paste the above HTML code into your Jekyll project, or directly into a Markdown file where HTML is supported.
2. Make sure the Markdown file is processed by Jekyll (e.g., add it to your `_posts` or other appropriate directory).
3. When rendered in a browser, the button will display, and clicking it will trigger the alert message.

### Preview
When rendered, you will see a button like this:

```html
<button onclick="alert('Hello! This is a simple alert message.')">Click Me!</button>
```

Clicking the button displays the alert message.

## Note
Ensure you have enabled HTML rendering in your Jekyll configuration if necessary. For example, add the following in `_config.yml`:

```yaml
markdown: kramdown
kramdown:
  input: GFM
```