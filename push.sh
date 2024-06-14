#!/bin/sh
docker save sbdgsite:latest | bzip2 | pv | ssh admin@dfmweb.toffe.site sudo podman load
