.PHONY: all build

all:

build:
	zip -FS -r tcott.zip * -x README.md -x LICENSE -x Makefile
