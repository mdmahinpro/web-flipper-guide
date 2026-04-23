# How to Add Your Content

This page explains how to add your markdown content to this documentation site.

## Sidebar is Auto-Generated

The sidebar navigation is **automatically generated from the folder and file structure**. You do not need to edit any configuration file to add new pages — just create the file and restart the dev server.

The sidebar reads the first `# Heading` from each `.md` file to use as the link label.

## Adding a Section to an Existing Chapter

1. Create a new `.md` file in the chapter folder:
   ```
   artifacts/docs/chapter-1/section-3.md
   ```

2. Start the file with a heading — this becomes the sidebar label:
   ```md
   # Section 1.3 — My New Section

   Content goes here...
   ```

3. Restart the dev server. The new page appears automatically in the sidebar.

## Adding a New Chapter

1. Create a new folder under `artifacts/docs/`:
   ```
   artifacts/docs/chapter-4/
   ```

2. Create an `index.md` inside it:
   ```md
   # Chapter 4: Your New Chapter

   Overview content goes here.
   ```

3. Restart the dev server. The chapter appears automatically in the sidebar.

::: tip Folder naming
Folders starting with `introduction` or `getting-started` appear first in the sidebar. Folders starting with `chapter-` are sorted numerically (chapter-1, chapter-2, ...). All other folders appear after, in alphabetical order.
:::

## Markdown Features

VitePress supports all standard Markdown plus these extras:

### Callout Boxes

```md
::: tip Title
This is a tip.
:::

::: warning Title
This is a warning.
:::

::: danger Title
This is a danger notice.
:::

::: info Title
This is informational.
:::
```

Which renders as:

::: tip Tip
Use tips for helpful advice.
:::

::: warning Warning
Use warnings for important caveats.
:::

::: danger Danger
Use danger for critical information.
:::

### Code Blocks with Syntax Highlighting

````md
```python
def hello_world():
    print("Hello, World!")
```
````

```python
def hello_world():
    print("Hello, World!")
```

### Tables

```md
| Column A | Column B | Column C |
|---|---|---|
| Value 1 | Value 2 | Value 3 |
```

## Providing Content in Bulk

If you have a single large `.md` file (4000+ lines), you can provide it and we'll split it into the proper chapter/section structure. Just paste it and describe how you'd like it organized — the sidebar will build itself automatically from the file structure.
