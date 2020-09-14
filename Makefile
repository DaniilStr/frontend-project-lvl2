install: 
	npm install

gendiff:
	node bin/gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .
