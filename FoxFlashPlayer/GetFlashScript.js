<!--


Function parseURL(urlPath)
  Dim FontUrlPath
  If InStr(urlPath, "//") <> 0 Then
    FontUrlPath = urlPath
  Else
    Dim webpage
    
    ServerName = external.menuArguments.location.HostName
    pathname = external.menuArguments.location.pathname
    webpage = "http://" & ServerName & pathname
    i = 1
    Do While InStr(i, webpage, "/") <> 0
      i = InStr(i, webpage, "/") + 1
    Loop
    i = i - 1
    webpage2 = Left(webpage, i)
	

    If Left(urlPath, 1) <> "." And Left(urlPath, 1) <> "/" and Left(urlPath, 2)<> ".."  Then
      FontUrlPath = webpage2 
	 

    ElseIf Left(urlPath, 1) = "/" Then
      FontUrlPath = "http://" & ServerName 
    ElseIf Left(urlPath, 2) = ".." Then
      Do While Left(urlPath, 2) = ".."
        urlPath = Mid(urlPath, 4)
        b = 1
        For i = Len(webpage) - 1 To 1 Step -1
           FontUrlPath = Left(webpage, i)
           If Right(FontUrlPath, 1) = "/" Then b = b + 1
           If b = 3 Then 
             webpage = FontUrlPath & "index.html" 
             Exit For
           End If
         Next
        
      Loop

    ElseIf Left(urlPath, 1) = "." Then
      
      Do While Left(urlPath, 1) = "."
        urlPath = Mid(urlPath, 3)
        For i = Len(webpage) - 1 To 1 Step -1
           FontUrlPath = Left(webpage, i)
           If Right(FontUrlPath, 1) = "/" Then Exit For
         Next
         
      Loop
  
    End If
        
     FontUrlPath = FontUrlPath + urlPath
     
  End If
 parseURL = FontUrlPath
End Function
Function getFlash()
For i = 0 To srcDocument.applets.length - 1
  Set swf = srcDocument.applets(i)
  cb = swf.codeBase
  Lcb = LCase(cb)
  If InStr(Lcb, "macromedia.com") > 0 Then
        moviePath = swf.getAttribute("Movie")
        movieWidth = swf.Width
        movieHeight = swf.Height
        moviePath = parseURL(moviePath)
		
        if moviePath <>"" then
          ReDim Preserve swffileurl(UBound(swffileurl) + 1)
          ReDim Preserve swffilew(UBound(swffilew) + 1)
          ReDim Preserve swffileh(UBound(swffileh) + 1)
          swffileurl(UBound(swffileurl)) = moviePath
          swffilew(UBound(swffilew)) = movieWidth
          swffileh(UBound(swffileh)) = movieHeight
        end if
  End If
  
  
Next

  
End Function
  
   
   function Getfilename(fn2) 

    dim fn
       
    fn=lcase(fn2)
    i = 1
    Do While InStr(i, fn, ".swf") > 1 
      If InStr(i, fn, ".swf") < 1 Then Exit Do
      i = InStr(i, fn, ".swf") + 1
    Loop
   
	 for j=1 to len(fn)
       if mid(fn,i-j,1)="\" or mid(fn,i-j,1)="/" then exit for
	   
     next
	 i=i-j+1
	

    Getfilename = Mid(fn, i,j+2)
    if Getfilename="" then Getfilename="No Name"	
 end function


   function openWindow() 
      if UBound(swffileurl) < 2 Then
         alert "对不起,在本页找不到任何Flash文件"
	  else
	    openWindow2() 
      End If
  end function
  
  
  
  
  
  
function openWindow2() 
    set outWin=window.open("","foxGetFlash","scrollbars=yes,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes")
       set doc=outWin.document 
       call doc.open("text/html")
       call doc.write("<html><head><meta http-equiv='Content-Type' content='text/html; charset=gb2312'>")
	   
	   
	   call doc.write("<link href=""type.css"" rel=""stylesheet"" type=""text/css"">")
       call doc.write("<title>截取网页Flash(FoxGetFlash 1.0)--火狐Flash播放器(插件)</title></head>")
	   
	 
	   call doc.write("<script language=""VBScript"" src=""GetFlashScript2.js"" ></script>")

       call doc.write("<body>")
	      
	   
	   
call doc.write("<table width=100% height=395 border=5 bordercolor=#CCCC00>")
  call doc.write("<tr align=center valign=middle> ")
    call doc.write("<td height=36 colspan=2><font size=+2>截取网页Flash(FoxGetFlash 1.0)--火狐Flash播放器(插件)</font></td>")
	call doc.write("<tr align=left valign=top>") 
        call doc.write("<td align=center width=20% height=20> <input type=button name=Submit2 onClick='VBScript:call FlashGet()' value=用网际快车保存> </td>")
        call doc.write("<td  align=center valign=middle width=80% height=235 rowspan=2><div id=Swfplay></div></td>")
       call doc.write("</tr>")
  
  
  call doc.write("<tr > ")
    call doc.write("<td  align=center valign=top  height=215> ")
      call doc.write("<table   bordercolor=#CCCC00 border=2>")
	   call doc.write("<a  name=aaa href= #></a><input name=chk type=checkbox id=chk  disabled=true  value=checkbox>")

	  
   dim c 
   c=ubound(swffileurl)
   for i=2 to c
     call doc.write("<tr><td height=18 colspan=2 align=left valign=top>" & (i -1) & "、<input name=chk type=checkbox id=chk value=checkbox>")
	 call doc.write("<a  name=aaa href= " & swffileurl(i) & ">" & Getfilename(swffileurl(i)) & "</a>")
	 call doc.write("- -→<a  href='javascript:' onClick='VBScript:call reviewFlash(""" & swffileurl(i) & """," & swffilew(i) & "," & swffileh(i) & ")'>预览</a>")
	 call doc.write("</td></tr>")
	next
	
      call doc.write("</table></td>")
  call doc.write("</tr>")
  call doc.write("<tr align=left valign=top> ")
    call doc.write("<td height=65 colspan=3> <p>&nbsp;(帮助) 共有2种方法保存Flash:<br>")
        call doc.write("&nbsp;经过你浏览选择后用下列方法之一保存：<br>")
        call doc.write("&nbsp;1、如果你装了网际快车，勾选要保存的Flash直接按下“网际快车保存”按钮就可以了。<br>")
        
        call doc.write("&nbsp;2、在各Flash的链接上右键再选目标另存为...。</p></td>")
  call doc.write("</tr>")
call doc.write("</table>")






       call doc.write("</body></html>")
       call doc.close()
	 
end function



  //-->
