# TODO: deploy

BIN = node_modules/.bin

.PHONY: start test lint build server clean

bootstrap:
	yarn install

start: clean build
	NODE_ENV=production node server

dev:
	NODE_ENV=development node server

build:
	NODE_ENV=production $(BIN)/webpack -p --progress

test: lint
	#$(BIN)/karma start --single-run

lint:
	$(BIN)/standard

clean:
	rm -rf ./public/dist
