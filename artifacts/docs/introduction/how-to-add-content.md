# How to Add Your Content

This page explains how to add your markdown content to this documentation site.

## Option 1: Replace Placeholder Files

The simplest approach — just replace the placeholder `.md` files with your real content:

1. Navigate to the chapter folder (e.g. `artifacts/docs/chapter-1/`)
2. Open the `.md` file you want to update
3. Replace the placeholder text with your content
4. The site will automatically rebuild and show your changes

## Option 2: Add New Sections

To add a new section inside a chapter:

1. Create a new `.md` file in the chapter folder
   ```
   artifacts/docs/chapter-1/section-3.md
   ```

2. Add the section to the sidebar in `.vitepress/config.ts`:
   ```ts
   {
     text: 'Chapter 1: Foundations',
     items: [
       { text: 'Overview', link: '/chapter-1/' },
       { text: 'Section 1.1', link: '/chapter-1/section-1' },
       { text: 'Section 1.2', link: '/chapter-1/section-2' },
       { text: 'Section 1.3', link: '/chapter-1/section-3' }, // ← new
     ],
   }
   ```

## Option 3: Add a New Chapter

To add a completely new chapter:

1. Create a new folder:
   ```
   artifacts/docs/chapter-4/
   ```

2. Create an `index.md` file inside it

3. Add to the sidebar config in `.vitepress/config.ts`:
   ```ts
   {
     text: 'Chapter 4: Your New Chapter',
     collapsed: false,
     items: [
       { text: 'Overview', link: '/chapter-4/' },
     ],
   }
   ```

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

### Code Blocks

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

If you have a single large `.md` file (4000+ lines), you can provide it and we'll split it into the proper chapter/section structure automatically. Just paste it and describe how you'd like it organized.
