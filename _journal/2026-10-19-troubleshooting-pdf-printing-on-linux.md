---
title: "Troubleshooting a PDF Printing Problem on Linux"
date: "October 19, 2026"
category:
  - Linux
  - Troubleshooting
  - CUPS
  - Ghostscript
  - Automation
summary: "A vendor invoice would report a completed print job on Linux while silently dropping the last page. This is how I narrowed the problem down, proved the printer was working and built a simple script to work around the issue."
---

# Troubleshooting a PDF Printing Problem on Linux

I recently ran into an odd printing problem at work that turned into a useful troubleshooting exercise.

One company sends me invoices as PDF files. Most of the time they print normally, but one particular invoice refused to print its last page.

The strange part was that nothing appeared to be failing.

CUPS accepted the job.

The job showed as completed.

The printer did not report an error.

The page simply never came out.

---

## Isolating the Problem

My first step was to make sure I was not dealing with a basic printer problem.

I tried printing only the missing page:

```bash
lp -o page-ranges=2 "Billing Document - 90829026.pdf"
```

CUPS accepted the job and reported it as completed, but the printer still produced nothing.

That told me the issue was not simply the application I had originally used to print the file.

While inspecting the PDF, one of the tools also returned:

```text
Syntax Error: Can't get Fields array
```

That suggested there was something unusual in the PDF structure.

At first, that looked like a promising explanation, but another invoice from the same company produced the same warning and printed all of its pages correctly.

So the warning alone was not the root cause.

---

## Repairing the PDF Did Not Fix It

I used Ghostscript to rewrite the PDF into a new file:

```bash
gs -o repaired.pdf -sDEVICE=pdfwrite "Billing Document - 90829026.pdf"
```

Ghostscript processed both pages successfully.

I then tried printing the second page from the repaired file:

```bash
lp -o page-ranges=2 repaired.pdf
```

The result was the same.

The print job completed, but nothing came out.

At that point, the problem appeared to be tied to the way that particular page was being handled somewhere in the PDF-to-print path rather than a general problem with the printer.

---

## Rasterizing the Page

The next step was to remove the PDF structure from the equation entirely.

I used Ghostscript to render page 2 as a PNG image:

```bash
gs -dBATCH -dNOPAUSE \
   -sDEVICE=png16m \
   -r300 \
   -dFirstPage=2 \
   -dLastPage=2 \
   -sOutputFile=page2.png \
   repaired.pdf
```

Then I printed the image:

```bash
lp page2.png
```

It printed immediately.

That was the useful breakthrough.

The printer could print the contents of the page. The problem was not the printer hardware and it was not the visual content itself.

Something about the way that particular PDF page was formatted or processed was not playing nicely with the Linux printing path.

---

## Comparing It With Another Invoice

I had another invoice from the same company that contained three pages.

I printed all three through the same Linux system, CUPS setup and HP printer.

All three pages printed normally.

That made me less interested in changing HPLIP or the printer configuration. The problem was specific enough that changing a working print setup did not seem like the right answer.

I could have continued digging into the PDF internals, but there was also a practical consideration.

I will probably only need to print these invoices for another couple of months.

Spending hours trying to completely solve one strange PDF formatting issue did not make much sense if I already had a reliable workaround.

---

## Automating the Workaround

I did not want to manually convert pages every time this happened, so I wrote a small Bash script.

The script takes a PDF, rasterizes every page to a PNG file with Ghostscript and then sends each page to CUPS in order.

```bash
#!/usr/bin/env bash
set -euo pipefail

pdf="$1"
resolution=300

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

gs \
    -q \
    -dBATCH \
    -dNOPAUSE \
    -dSAFER \
    -sDEVICE=png16m \
    -r"$resolution" \
    -sOutputFile="$tmpdir/page-%04d.png" \
    "$pdf"

shopt -s nullglob
pages=("$tmpdir"/page-*.png)

for page in "${pages[@]}"; do
    lp "$page"
done
```

Now instead of fighting with the PDF each time, I can run:

```bash
./print-rasterized-pdf.sh "Billing Document - 90829026.pdf"
```

The script handles the conversion and sends the pages to the printer.

---

## What I Took Away From It

The most useful part of this problem was not the final script.

It was the troubleshooting process.

I was able to narrow things down by testing one layer at a time:

1. Could the printer print other documents?
2. Could CUPS accept the job?
3. Would the problem page print by itself?
4. Would rewriting the PDF change anything?
5. Would the same page print after being rasterized?
6. Did another invoice from the same company behave the same way?

Each test removed another possibility.

The final answer was not a perfect fix for whatever was happening inside that PDF.

It was a reliable workaround that solved the actual business problem without spending more time than the problem justified.

That is something I am learning to appreciate more as I work through real troubleshooting situations.

Sometimes the best solution is not fixing every part of the original process.

Sometimes it is understanding the problem well enough to build a dependable way around it and move on.
