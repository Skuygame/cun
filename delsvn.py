#!/usr/bin/python
#-*- coding: utf-8 -*-

import os,re

for root,dirs,files in os.walk(os.getcwd()):
	if re.match(re.compile(r"(.)*\.svn$"),root):
		print "delete %s" % root
		#os.popen('rm -rf %s' % root)
		os.popen('rmdir /q /s %s' % root)
 
