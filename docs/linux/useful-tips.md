---
layout: page
title: Useful Tips
parent: Linux
permalink: /linux/tips
---

1. TOC
{:toc}

---

## PDF Manipulation (CLI)

Split out a subset of pages:
```shell
qpdf --pages input.pdf 1-3,5 -- input.pdf out.pdf
```

Concatenate PDFs:
```shell
qpdf --empty --pages in1.pdf in2.pdf -- out.pdf
```

Concatenate PDFs using wildcards:
```shell
qpdf --empty --pages *.pdf -- out.pdf
```

Source: [Ask Ubuntu](https://askubuntu.com/a/672001/410248), [Stack Overflow](https://stackoverflow.com/a/53754681/2552873)
{:.fs-2}