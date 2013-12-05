#!/bin/sh
current=${pwd}

if test "$1" != ""; then
    wget http://closure-compiler.googlecode.com/files/compiler-latest.zip
    unzip -q compiler-latest.zip -d compiler
    rm compiler-latest.zip
fi

cd ../src/common/js
ant | grep ERROR

cd $current

cd ../src/contents/js
ant | grep ERROR

cd $current
