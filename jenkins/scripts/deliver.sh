#!/usr/bin/env sh

set -x
npm run build
set +x

set -x
npm run dev-server
echo $! > .pidfile
set +x