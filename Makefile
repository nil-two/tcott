.PHONY: all create-release

all:

create-release:
	zip -FS -r tcott.zip * -x README.md -x LICENSE -x Makefile
