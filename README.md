# crPDF

![build](https://img.shields.io/circleci/project/github/JorgenEvens/crPDF.svg)
![version](https://img.shields.io/npm/v/crpdf.svg)
![dependencies](https://img.shields.io/david/JorgenEvens/crPDF.svg)
![dev dependencies](https://img.shields.io/david/dev/JorgenEvens/crPDF.svg)

Print HTML to PDF using [Puppeteer](https://github.com/GoogleChrome/puppeteer) with a [wkhtmltopdf](https://wkhtmltopdf.org/) compatible CLI.

## Motivation

While creating print versions of HTML on modern browsers is not fun, it is not an impossible feat. Getting HTML to PDF tools to render correctly on the other hand is very challenging. That is why this project leverages [Puppeteer](https://github.com/GoogleChrome/puppeteer) (Headless Chrome/Chromium) to generate PDFs from HTML. If you can get your layout to work using print preview on Chrome you will be good to go using this library.

Many of us have relied on wkhtmltopdf over the years, and it has great library support. To make transitioning as easy as possible crPDF matches the CLI options which allows you to use crPDF as a drop-in replacement.

## Installation

### Using NPM

Use NPM to install the latest version of `crPDF`, this package will install both a `crpdf` and `wkhtmltopdf` binary.

```sh
npm install -g crpdf
```

### Manual

Download a binary for your platform from the [releases page](https://github.com/JorgenEvens/crPDF/releases) and place it in your `$PATH`.

```sh
curl -L -o crpdf <release url>
chmod +x crpdf

cp crpdf /usr/local/bin/crpdf

# Optionally set up an alias for wkhtmltopdf
ln -s /usr/local/bin/crpdf /usr/local/bin/wkhtmltopdf
```

## Usage

The CLI interface is meant to be compatible with the `wkhtmltopdf` binary such that it can be used as a drop-in replacement for existing libraries using [wkhtmltopdf](https://wkhtmltopdf.org/).

Below is a list of options currently implemented by this project.

```sh
crpdf --help

  Usage: cli [options] [input] [output]


  Options:

    -V, --version                    output the version number
    -B, --margin-bottom <unitreal>   Set the page bottom margin
    -L, --margin-left <unitreal>     Set the page left margin (default 10mm)
    -R, --margin-right <unitreal>    Set the page right margin (default 10mm)
    -T, --margin-top <unitreal>      Set the page top margin
    -O, --orientation <orientation>  Set orientation to Landscape or Portrait (default Portrait)
    -s, --page-size <Size>           Set paper size to: A4, Letter, etc. (default A4)
    --page-height <unitreal>         Page height
    --page-width <unitreal>          Page width
    --background                     Do print background
    --no-background                  Do not print background
    -h, --help                       output usage information

```

## Contributing

I really appreciate any contribution you would like to make, so don't hesitate to report an issue or submit pull requests.

## About me

Hi, my name is [Jorgen Evens](https://jorgen.evens.eu). By day I built things (mainly in PHP and JavaScript) for [Ambassify](https://ambassify.com) and by night I tinker around with these kinds of projects.
