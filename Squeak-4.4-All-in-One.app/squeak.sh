#!/bin/bash
# File:        squeak.sh (All-in-One version)
# Author:      Bert Freudenberg (edited by Paul DeBruicker)
# Description: Script to run Squeak from the all-in-one app structure
#              (based on Etoys-To-Go)

APP=`dirname "$0"`
APP=`cd "$APP";pwd`
OS=`uname -s`
CPU=`uname -m`
IMAGE="$APP/Contents/Resources/Squeak4.4-12327.image"

if [ "$CPU" = x86_64 ] ; then
        CPU=i686
        echo Running 32-bit Squeak on a 64-bit System. Hope the 32-bit runtime libraries are installed ... 
fi

VM="$APP/Contents/$OS-$CPU/bin/squeak"

showerror() {
    if [ -n "$DISPLAY" -a -x "`which kdialog 2>/dev/null`" ]; then
        kdialog --error "$1"
    elif [ -n "$DISPLAY" -a -x "`which zenity 2>/dev/null`" ]; then
        zenity --error --text "$1"
    else
        dialog --msgbox "$1" 0 0
    fi
}

if [ ! -x "$VM" ] ; then
    if [ ! -r "$VM" ] ; then
        showerror "This Squeak version does not support $OS-$CPU"
    else
        showerror "Squeak does not have permissions to execute"
    fi
fi

exec "$VM" "$IMAGE"
