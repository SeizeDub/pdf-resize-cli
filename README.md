# PDF-resize

A simple CLI tool built on top of [PDF-lib](https://www.npmjs.com/package/pdf-lib) to modify the paper size of PDF files.

## Installation

```
npm install -g pdf-resize-cli
```

## Usage

```
pdf-resize [options] [file path]

Options:
-w, --width     Desired PDF width                     [number]
-h, --height    Desired PDF height                    [number]
-u, --unit      Unit used for width and height        [string : 'cm'/'centimeter', 'in'/'inch']

Exemples:
pdf-resize -w 21 -h 29.7 -u 'cm' './my-pdf-file.pdf'
pdf-resize -w 21 ./my-pdf-file.pdf
```
You can provide **width and height, or just one of them**, the other dimension will be modified according to the same ratio.
If you don't provide a unit, centimeter will be used.

## Possible updates

- Multiple input file per command.

- Different options for resizing :
  + Resize whole document or indivudual pages to a fixed dimension (exemple : 21 x 29.7 cm / A4)
  + Resize whole document or individual pages according to a fixed ratio (exemple : x2)
  + Resize whole document or individual pages according to a ratio [given page desired dimension / given page current dimension]
  

## Disclaimer
This is my first serious public project as a developper, I still have a lot to learn. Feel free to report any error, bad practice or bad code.


