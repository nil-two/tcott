.PHONY: all build

all:

build:
	rm -f build/tcott.zip build/tcott-firefox.zip
	sed -i 's/"scripts": \["background.js"\]/"service_worker": "background.js"/; /browser_specific_settings/d' manifest.json
	zip -r build/tcott-chrome.zip * -x README.md -x LICENSE -x CHANGES.md -x Makefile -x 'build/*'
	sed -i 's/"service_worker": "background.js"/"scripts": ["background.js"]/; 3a\  "browser_specific_settings": {"gecko": {"id": "{591d13a3-9a42-41cb-887b-55173cbe1177}"}},' manifest.json
	zip -r build/tcott-firefox.zip * -x README.md -x LICENSE -x CHANGES.md -x Makefile -x 'build/*'
	sed -i 's/"scripts": \["background.js"\]/"service_worker": "background.js"/; /browser_specific_settings/d' manifest.json
