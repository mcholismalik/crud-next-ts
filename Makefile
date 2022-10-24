all: clean-deps install-release-deps build

install-release-deps:
	npm ci --only=production

build:
	npm run build

clean-deps:
	rm -rf ./node_modules