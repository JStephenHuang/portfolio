# A clear article title

Lead with a short introduction that tells readers **what you made**, why it matters, and what they will learn. Inline values such as `maxDepth` stay easy to scan.

Keep this file as the overview. Add journal entries beside it using ISO dates, such as `2023-02-12.md`; dated entries appear newest-first and collapsed by default.

## What I was exploring

Markdown supports the usual writing tools plus GitHub-flavored additions:

- Nested lists and ordered steps
- [External links](https://example.com)
- ~~Ideas that changed~~ and **important decisions**
- Task lists

- [x] A finished piece of work
- [ ] Something still worth exploring

> Use a blockquote to pull out a decision, lesson, or useful bit of context without breaking the reading flow.

## Code

Add a language after the opening fence to get accurate syntax highlighting and a language label.

```ts
type Result<T> =
  | { data: T; error: null }
  | { data: null; error: Error };

const double = (value: number): number => value * 2;
```

## Images

Images in `public` use root-relative paths. The optional quoted title becomes a caption.

```md
![A useful description of the image](/project/image.png "A short caption")
```

## Comparisons

| Approach | Strength | Tradeoff |
| --- | --- | --- |
| First option | Quick to understand | Less flexible |
| Second option | Easier to extend | More moving parts |
