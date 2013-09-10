
 






function FlashGet()
	
	  set JetCarCatch=CreateObject("JetCar.Netscape")
	  
	  if err<>0 then
	   alert "FlashGet not properly installed!"+ vbCrLf+"Please Install FlashGet again"
                     exit function
	  else

	    dim counts
	    counts=document.all.aaa.length
		j=0
		
		
		for i = 0 to counts-1
		   if document.all.chk(i).checked then j=j+1
		next 
		   
		
		dim params()
		redim params(j*2)
		if j<=0 then 
		  alert "No select any Flash!"
		  exit function
		 end if 
         params(0)=document.all.aaa(0).href
	     je=0
	    for i = 0 to counts-1
		   if document.all.chk(i).checked then
		      
			  
	          params(je*2+1)=document.all.aaa(i).href
	          params(je*2+2)=document.all.aaa(i).href
			   je=je+1
			   if je=j then exit for
		   end if
		   	
	     next 
	     call JetCarCatch.AddUrlList(params)
		 
       end if
	 end function	 


  function reviewFlash(m,w,h)
    document.all.Swfplay.style.visibility="visible"
    document.all.Swfplay.innerHTML="<object classid=""clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"" codebase=""http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"" width=" & w & " height=" & h & "> <param name=movie value=""" & m & """><param name=quality value=high><EMBED src=""" & m & """ quality=high pluginspage=""http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"" type=""application/x-shockwave-flash"" width=" & w & " height=" & h & "></embed></object>"
  end function	  
 