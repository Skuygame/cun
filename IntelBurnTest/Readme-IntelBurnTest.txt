IntelBurnTest v2.54
by AgentGOD
----------------------------
The original. All others are copycats.

Home Page: http://www.xgamingstudio.com
Donation : http://tinyurl.com/3jebpqr

Description:
	A program that simplifies the usage of Intel(R) Linpack. Linpack by
Intel(R) is an extremely stressful program that will put even the most pow-
-erful X86/X64 CPU in the world at its knees. Load temp under Linpack will
be up to 22*C higher than the competing software Prime95. This program will
make usage of Linpack easier and more practical.

Keep in mind, use this program at your own risk. By using this program, you
agree that neither I nor Intel shall be responsible for including, but not
limited to: burned up CPU, fried motherboard, spontaneous room temperature
increase, hair loss, or mental stress.

Xtreme Stress Mode (Right-click the "Start" button) allows unprecedented
improvement of testing accuracy.
	Note: Xtreme Stress Mode may cause the CPU to heat up more than it
		already does. During testing, Windows may not be usable.


Compatibility:
	Works with Intel(R) and AMD CPUs. Tested Intel(R) Core 2(tm) Quad
	Q6600, Intel(R) Pentium(tm) III 550 MHz, AMD Athlon 64(tm) X2 4200+,
	and AMD Opteron 165 (Working with AMD processors since v1.7). Also
	tested on AMD Phenom II X4 940 Black Edition.

	Tested on AMD Turion X2 Ultra ZM-82, Intel(R) Core(tm) i5 470-UM, 
	Intel(R) Core(tm) i7-2600K, Intel(R) Core(tm) i7-3610QM

	Tested on Microsoft(R) Windows XP Professional SP2/SP3, XP Professional
	X64 Edition SP2. Tested on Microsoft(R) Windows Vista(tm)/7 X86/X64 SP1
	by many awesome users like yourself ;)

	Tested by many users on Core i7 9xx, 8xx, i5 7xx, i7 2xxx, AMD 10xxt

Benefits of using Linpack:
1. More accurate than Prime95 Small FFTs/Blend (under x64 OS).
2. Takes less time to tell if your CPU/RAM is unstable than Prime95 (usually
   something like 8 minutes Linpack vs 40 hours under Prime95).
3. Use the same stress-testing engine that Intel uses to test their products
   before they are packed and put on shelves for sale.

Benefits of using IntelBurnTest:
1. Simplifies usage of Linpack.
2. Real-time output of results to the screen.
3. Simplifies the process of selecting a test size to use.
4. Better appearance.
5. Intuitive interface.
6. Real-time error checking.
7. System status acknowledgement.

Requirements:
 - An x86/x64 CPU
 - At least 512 MB of system memory. Recommended minimum is 1 GB.
 - A modern Windows-NT based operating system (XP and above). Both x86 and x64 are supported.
 - Microsoft(R) Visual C++ 2008 Runtime (x86), can be found here:
   http://www.microsoft.com/downloads/details.aspx?FamilyID=9b2da534-3e03-4391-8a4d-074b9f2bc1bf
 - Microsoft(R) .NET Framework v2.0 (minimum), can be found here:
   http://www.microsoft.com/downloads/details.aspx?FamilyID=0856EACB-4362-4B0D-8EDD-AAB15C5E04F5


How to test CPU and RAM stability (summarized):
Pre. You need to extract everything from the archive to a single folder, while
	maintaining the original directory structure.
1. It is best to use a 64-bit OS with the 64-bit mode for the most accurate
   test result.
2. Use the most available RAM possible (IntelBurnTest can now do this on
   its own automatically). The more memory it uses, the more accurate.
   However, most people can use "Standard" mode as it should be sufficient.
3. Select the run # (should use at least 5 at minimum, no more than 20).
4. Start running. Output should look something like this:
	Time (s)	Speed (GFlops)		Result
	0.269		31.7314			3.684559e-002
	0.260		32.7829			3.684559e-002
	0.257		33.1546			3.684559e-002
	0.264		32.2425			3.684559e-002
	0.266		32.0700			3.684559e-002
   NOTE: The time it takes to run each iteration may vary from test size, and
         so will the speed and the result. But if the results do not stay
 	 consistent, your system is unstable (specifically CPU).
5. Above indicates that the test ran fine so far without instability, but
   below indicates instability (the Residual(norm) values aren't the same
   throughout running the test):
	Time (s)	Speed (GFlops)		Result
	15.245     	43.7434			5.380399e+003
	15.250     	43.7303			8.675501e-002
	15.162     	43.9816			3.570760e-002
   NOTE: Instability doesn't necessarily have to happen at the beginning, it
	 can happen in the middle, or at the end. It could be just ONE of
	 them that is inconsistent, but that DOES indicate instability.
	 BSOD or freezing are signs of instability as well.
 *As of v2.0, the program will now have real-time result output, as well as
  real-time result checking for system stability based on the consistency
  of the outputted results. The testing will automatically stop if the pro-
  -gram detects such inconsistency. During testing, you should see an ani-
  -mated flame under "Freeze Test". If at any time during the testing you
  see it stop moving, it is most likely that your PC is frozen.

 *As of v2.1, Core i7 users that wish to test with HyperThreading enabled
  can now override the number of threads for Linpack to execute

 *As of v2.2, if you are having any issues with IntelBurnTest, please en-
  able debug logging by right-clicking the "logging" checkbox to do so, and
  then send me the debug log file. It would also be helpful if you also send
  a screenshot of the issue and steps to reproduce the issue.


Credits:
--------
AgentGOD - Coding this program, duh :)
Cronos (from XS) - for the original the memory size equation
mikeyakame (from XS) - for notifying me of newer binaries
WoZZeR999 (from XS) - memory size suggestion
krille (from XS) - for the constructive criticisms
Rob Williams (from Techgage) - for testing on a Core i7 platform
justin.kerr (from XS) - for testing on a Core i7 platform
Intel - for Linpack binaries

IntelBurnTest, Copyright © 2011-2012 Xtreme Gaming Studio. Linpack, Copyright © Intel(R) Corporation.