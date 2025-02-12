This is a multi-threaded multi-pool GPU, FPGA and ASIC miner with ATI GPU
monitoring, (over)clocking and fanspeed support for bitcoin and derivative
coins. Do not use on multiple block chains at the same time!

This code is provided entirely free of charge by the programmer in his spare
time so donations would be greatly appreciated. Please consider donating to the
address below.

Con Kolivas <kernel@kolivas.org>
15qSxP1SQcUX3o4nhkfdbgyoWEFMomJ4rZ

DOWNLOADS:

http://ck.kolivas.org/apps/cgminer

GIT TREE:

https://github.com/ckolivas/cgminer

Support thread:

http://bitcointalk.org/index.php?topic=28402.0

IRC Channel:

irc://irc.freenode.net/cgminer

License: GPLv3.  See COPYING for details.

---

EXECUTIVE SUMMARY ON USAGE:

After saving configuration from the menu, you do not need to give cgminer any
arguments and it will load your configuration.

Any configuration file may also contain a single
	"include" : "filename"
to recursively include another configuration file.
Writing the configuration will save all settings from all files in the output.


Single pool, regular desktop:

cgminer -o http://pool:port -u username -p password

Single pool, dedicated miner:

cgminer -o http://pool:port -u username -p password -I 9

Single pool, first card regular desktop, 3 other dedicated cards:

cgminer -o http://pool:port -u username -p password -I d,9,9,9

Multiple pool, dedicated miner:

cgminer -o http://pool1:port -u pool1username -p pool1password -o http://pool2:port -u pool2usernmae -p pool2password -I 9

Add overclocking settings, GPU and fan control for all cards:

cgminer -o http://pool:port -u username -p password -I 9 --auto-fan --auto-gpu --gpu-engine 750-950 --gpu-memclock 300

Add overclocking settings, GPU and fan control with different engine settings for 4 cards:

cgminer -o http://pool:port -u username -p password -I 9 --auto-fan --auto-gpu --gpu-engine 750-950,945,700-930,960 --gpu-memclock 300

Single pool with a standard http proxy, regular desktop:

cgminer -o "http:proxy:port|http://pool:port" -u username -p password

Single pool with a socks5 proxy, regular desktop:

cgminer -o "socks5:proxy:port|http://pool:port" -u username -p password

Single pool with stratum protocol support:

cgminer -o stratum+tcp://pool:port -u username -p password

The list of proxy types are:
 http:    standard http 1.1 proxy
 http0:   http 1.0 proxy
 socks4:  socks4 proxy
 socks5:  socks5 proxy
 socks4a: socks4a proxy
 socks5h: socks5 proxy using a hostname

If you compile cgminer with a version of CURL before 7.19.4 then some of the above will
not be available. All are available since CURL version 7.19.4

If you specify the --socks-proxy option to cgminer, it will only be applied to all pools
that don't specify their own proxy setting like above

READ WARNINGS AND DOCUMENTATION BELOW ABOUT OVERCLOCKING

To configure multiple displays on linux you need to configure your Xorg cleanly
to use them all:

sudo aticonfig --adapter=all -f --initial

On Linux you virtually always need to export your display settings before
starting to get all the cards recognised and/or temperature+clocking working:

export DISPLAY=:0

---
BUILDING CGMINER

Dependencies:
	curl dev library 	http://curl.haxx.se/libcurl/
	(libcurl4-openssl-dev)

	curses dev library
	(libncurses5-dev or libpdcurses on WIN32)

	pkg-config		http://www.freedesktop.org/wiki/Software/pkg-config
	libtool			http://www.gnu.org/software/libtool/

	jansson			http://www.digip.org/jansson/
	(jansson is included in-tree and not necessary)

	AMD APP SDK		http://developer.amd.com/sdks/AMDAPPSDK
	(This sdk is mandatory for GPU mining)

	AMD ADL SDK		http://developer.amd.com/sdks/ADLSDK
	(This sdk is mandatory for ATI GPU monitoring & clocking)

	libudev headers
	(This is only required for FPGA auto-detection and is linux only)

	libusb headers
	(This is only required for ZTEX and ModMiner support)


CGMiner specific configuration options:
	--disable-opencl        Override detection and disable building with opencl
	--disable-adl           Override detection and disable building with adl
	--enable-bitforce       Compile support for BitForce FPGAs(default disabled)
	--enable-icarus         Compile support for Icarus Board(default disabled)
	--enable-modminer       Compile support for ModMiner FPGAs(default disabled)
	--enable-ztex           Compile support for Ztex Board(default disabled)
	--enable-scrypt         Compile support for scrypt litecoin mining (default disabled)
	--without-curses        Compile support for curses TUI (default enabled)
	--without-libudev       Autodetect FPGAs using libudev (default enabled)

Basic *nix build instructions:
	To build with GPU mining support:
	Install AMD APP sdk, ideal version (see FAQ!) - no official place to
	install it so just keep track of where it is if you're not installing
	the include files and library files into the system directory.
	(Do NOT install the ati amd sdk if you are on nvidia.)
	To build with GPU monitoring & clocking support:
	Extract the AMD ADL SDK, latest version - there is also no official
	place for these files. Copy all the *.h files in the "include"
	directory into cgminer's ADL_SDK directory.

The easiest way to install the ATI AMD SPP sdk on linux is to actually put it
into a system location. Then building will be simpler. Download the correct
version for either 32 bit or 64 bit from here:
	http://developer.amd.com/tools/heterogeneous-computing/amd-accelerated-parallel-processing-app-sdk/downloads/

The best version for Radeon 5xxx and 6xxx is v2.5, while 7xxx cards need
v2.6 or later, 2.7 seems the best.

For versions 2.4 or earlier you will need to manually install them:
This will give you a file with a name like:
 AMD-APP-SDK-v2.4-lnx64.tgz (64-bit)
or
 AMD-APP-SDK-v2.4-lnx32.tgz (32-bit)

Then:

sudo su
cd /opt
tar xf /path/to/AMD-APP-SDK-v2.4-lnx##.tgz
cd /
tar xf /opt/AMD-APP-SDK-v2.4-lnx##/icd-registration.tgz
ln -s /opt/AMD-APP-SDK-v2.4-lnx##/include/CL /usr/include
ln -s /opt/AMD-APP-SDK-v2.4-lnx##/lib/x86_64/* /usr/lib/
ldconfig

Where ## is 32 or 64, depending on the bitness of the SDK you downloaded.
If you are on 32 bit, x86_64 in the 2nd last line should be x86

	To actually build:

	./autogen.sh	# only needed if building from git repo
	CFLAGS="-O2 -Wall -march=native" ./configure
	or if you haven't installed the ati files in system locations:
	CFLAGS="-O2 -Wall -march=native -I<path to AMD APP include>" LDFLAGS="-L<path to AMD APP lib/x86_64> ./configure
	make
	
	If it finds the opencl files it will inform you with
	"OpenCL: FOUND. GPU mining support enabled."

Native WIN32 build instructions: see windows-build.txt

---

Usage instructions:  Run "cgminer --help" to see options:

Usage: . [-atDdGCgIKklmpPQqrRsTouvwOchnV] 
Options for both config file and command line:
--api-allow         Allow API access (if enabled) only to the given list of [W:]IP[/Prefix] address[/subnets]
                    This overrides --api-network and you must specify 127.0.0.1 if it is required
                    W: in front of the IP address gives that address privileged access to all api commands
--api-description   Description placed in the API status header (default: cgminer version)
--api-groups        API one letter groups G:cmd:cmd[,P:cmd:*...]
                    See API-README for usage
--api-listen        Listen for API requests (default: disabled)
                    By default any command that does not just display data returns access denied
                    See --api-allow to overcome this
--api-network       Allow API (if enabled) to listen on/for any address (default: only 127.0.0.1)
--api-port          Port number of miner API (default: 4028)
--auto-fan          Automatically adjust all GPU fan speeds to maintain a target temperature
--auto-gpu          Automatically adjust all GPU engine clock speeds to maintain a target temperature
--balance           Change multipool strategy from failover to even share balance
--benchmark         Run cgminer in benchmark mode - produces no shares
--compact           Use compact display without per device statistics
--debug|-D          Enable debug output
--disable-rejecting Automatically disable pools that continually reject shares
--expiry|-E <arg>   Upper bound on how many seconds after getting work we consider a share from it stale (default: 120)
--failover-only     Don't leak work to backup pools when primary pool is lagging
--fix-protocol      Do not redirect to a different getwork protocol (eg. stratum)
--hotplug <arg>     Set hotplug check time to <arg> seconds (0=never default: 5) - only with libusb
--kernel-path|-K <arg> Specify a path to where bitstream and kernel files are (default: "/usr/local/bin")
--load-balance      Change multipool strategy from failover to efficiency based balance
--log|-l <arg>      Interval in seconds between log output (default: 5)
--monitor|-m <arg>  Use custom pipe cmd for output messages
--net-delay         Impose small delays in networking to not overload slow routers
--no-submit-stale   Don't submit shares if they are detected as stale
--pass|-p <arg>     Password for bitcoin JSON-RPC server
--per-device-stats  Force verbose mode and output per-device statistics
--protocol-dump|-P  Verbose dump of protocol-level activities
--queue|-Q <arg>    Minimum number of work items to have queued (0 - 10) (default: 1)
--quiet|-q          Disable logging output, display status and errors
--real-quiet        Disable all output
--remove-disabled   Remove disabled devices entirely, as if they didn't exist
--rotate <arg>      Change multipool strategy from failover to regularly rotate at N minutes (default: 0)
--round-robin       Change multipool strategy from failover to round robin on failure
--scan-time|-s <arg> Upper bound on time spent scanning current work, in seconds (default: 60)
--sched-start <arg> Set a time of day in HH:MM to start mining (a once off without a stop time)
--sched-stop <arg>  Set a time of day in HH:MM to stop mining (will quit without a start time)
--scrypt            Use the scrypt algorithm for mining (litecoin only)
--sharelog <arg>    Append share log to file
--shares <arg>      Quit after mining N shares (default: unlimited)
--socks-proxy <arg> Set socks4 proxy (host:port) for all pools without a proxy specified
--syslog            Use system log for output messages (default: standard error)
--temp-cutoff <arg> Temperature where a device will be automatically disabled, one value or comma separated list (default: 95)
--text-only|-T      Disable ncurses formatted screen output
--url|-o <arg>      URL for bitcoin JSON-RPC server
--user|-u <arg>     Username for bitcoin JSON-RPC server
--verbose           Log verbose output to stderr as well as status output
--userpass|-O <arg> Username:Password pair for bitcoin JSON-RPC server
Options for command line only:
--config|-c <arg>   Load a JSON-format configuration file
See example.conf for an example configuration.
--help|-h           Print this message
--version|-V        Display version and exit


GPU only options:

--auto-fan          Automatically adjust all GPU fan speeds to maintain a target temperature
--auto-gpu          Automatically adjust all GPU engine clock speeds to maintain a target temperature
--device|-d <arg>   Select device to use, (Use repeat -d for multiple devices, default: all)
--disable-gpu|-G    Disable GPU mining even if suitable devices exist
--gpu-threads|-g <arg> Number of threads per GPU (1 - 10) (default: 2)
--gpu-dyninterval <arg> Set the refresh interval in ms for GPUs using dynamic intensity (default: 7)
--gpu-engine <arg>  GPU engine (over)clock range in Mhz - one value, range and/or comma separated list (e.g. 850-900,900,750-850)
--gpu-fan <arg>     GPU fan percentage range - one value, range and/or comma separated list (e.g. 25-85,85,65)
--gpu-map <arg>     Map OpenCL to ADL device order manually, paired CSV (e.g. 1:0,2:1 maps OpenCL 1 to ADL 0, 2 to 1)
--gpu-memclock <arg> Set the GPU memory (over)clock in Mhz - one value for all or separate by commas for per card.
--gpu-memdiff <arg> Set a fixed difference in clock speed between the GPU and memory in auto-gpu mode
--gpu-powertune <arg> Set the GPU powertune percentage - one value for all or separate by commas for per card.
--gpu-reorder       Attempt to reorder GPU devices according to PCI Bus ID
--gpu-vddc <arg>    Set the GPU voltage in Volts - one value for all or separate by commas for per card.
--intensity|-I <arg> Intensity of GPU scanning (d or -10 -> 10, default: d to maintain desktop interactivity)
--kernel|-k <arg>   Override kernel to use (diablo, poclbm, phatk or diakgcn) - one value or comma separated
--ndevs|-n          Enumerate number of detected GPUs and exit
--no-restart        Do not attempt to restart GPUs that hang
--temp-hysteresis <arg> Set how much the temperature can fluctuate outside limits when automanaging speeds (default: 3)
--temp-overheat <arg> Overheat temperature when automatically managing fan and GPU speeds (default: 85)
--temp-target <arg> Target temperature when automatically managing fan and GPU speeds (default: 75)
--vectors|-v <arg>  Override detected optimal vector (1, 2 or 4) - one value or comma separated list
--worksize|-w <arg> Override detected optimal worksize - one value or comma separated list


SCRYPT only options:

--lookup-gap <arg>  Set GPU lookup gap for scrypt mining, comma separated
--shaders <arg>     GPU shaders per card for tuning scrypt, comma separated
--thread-concurrency <arg> Set GPU thread concurrency for scrypt mining, comma separated

See SCRYPT-README for more information regarding litecoin mining.


ASIC and FPGA mining boards (BFL ASIC, BitForce, Icarus, ModMiner, Ztex)
only options:

Cgminer will automatically find all of your BFL ASIC, BitForce FPGAs,
ModMiner FPGAs or Ztex FPGAs
The --usb option can restrict how many BFL ASIC, BitForce FPGAs or
ModMiner FPGAs it finds:

  --usb 1:2,1:3,1:4,1:*
or
  --usb BAS:1,BFL:1,MMQ:0
or
  --usb :10

You can only use one of the above 3

The first version
  --usb 1:2,1:3,1:4,1:*
allows you to select which devices to mine on with a list of USB
 bus_number:device_address
All other USB devices will be ignored
Hotplug will also only look at the devices matching the list specified and
find nothing new if they are all in use
You can specify just the USB bus_number to find all devices like 1:*
which means any devices on USB bus_number 1
This is useful if you unplug a device then plug it back in the same port,
it usually reappears with the same bus_number but a different device_address

You can see the list of all USB devices on linux with 'sudo lsusb'
Cgminer will list the recognised USB devices with the '--usb-dump 0' option
The '--usb-dump N' option with a value of N greater than 0 will dump a lot
of details about each recognised USB device
If you wish to see all USB devices, include the --usb-list-all option

The second version
  --usb BAS:1,BFL:1,MMQ:0
allows you to specify how many devices to choose based on each device
driver cgminer has - there are currently 3 USB drivers: BAS, BFL & MMQ
N.B. you can only specify which device driver to limit, not the type of
each device, e.g. with BAS:n you can limit how many BFL ASIC devices will
be checked, but you cannot limit the number of each type of BFL ASIC
Also note that the MMQ count is the number of MMQ backplanes you have
not the number of MMQ FPGAs

The third version
  --usb :10
means only use a maximum of 10 devices of any supported USB devices
Once cgminer has 10 devices it will not configure any more and hotplug will
not scan for any more
If one of the 10 devices stops working, hotplug - if enabled, as is default
- will scan normally again until it has 10 devices


--scan-serial|-S <arg> Serial port to probe for Icarus mining device

This option is only for Icarus bitstream FPGAs

By default, cgminer will scan for autodetected Icarus unless at least one
-S is specified for that driver. If you specify -S and still want cgminer
to scan, you must also use "-S auto". If you want to prevent cgminer from
scanning without specifying a device, you can use "-S noauto". Note that
presently, autodetection only works on Linux, and might only detect one
device depending on the version of udev being used.

On linux <arg> is usually of the format /dev/ttyUSBn
On windows <arg> is usually of the format \\.\COMn
(where n = the correct device number for the Icarus device)

The official supplied binaries are compiled with support for all FPGAs.
To force the code to only attempt detection with a specific driver,
prepend the argument with the driver name followed by a colon.
For example, "icarus:/dev/ttyUSB0" or using the short name: "ica:/dev/ttyUSB0"
This option not longer matters since Icarus is the only serial-USB
device that uses it

For other FPGA details see the FPGA-README


---

WHILE RUNNING:

The following options are available while running with a single keypress:

[P]ool management [G]PU management [S]ettings [D]isplay options [Q]uit

P gives you:

Current pool management strategy: Failover
[F]ailover only disabled
[A]dd pool [R]emove pool [D]isable pool [E]nable pool
[C]hange management strategy [S]witch pool [I]nformation


S gives you:

[Q]ueue: 1
[S]cantime: 60
[E]xpiry: 120
[W]rite config file
[C]gminer restart


D gives you:

[N]ormal [C]lear [S]ilent mode (disable all output)
[D]ebug:off
[P]er-device:off
[Q]uiet:off
[V]erbose:off
[R]PC debug:off
[W]orkTime details:off
co[M]pact: off
[L]og interval:5


Q quits the application.


G gives you something like:

GPU 0: [124.2 / 191.3 Mh/s] [A:77  R:33  HW:0  U:1.73/m  WU 1.73/m]
Temp: 67.0 C
Fan Speed: 35% (2500 RPM)
Engine Clock: 960 MHz
Memory Clock: 480 Mhz
Vddc: 1.200 V
Activity: 93%
Powertune: 0%
Last initialised: [2011-09-06 12:03:56]
Thread 0: 62.4 Mh/s Enabled ALIVE
Thread 1: 60.2 Mh/s Enabled ALIVE

[E]nable [D]isable [R]estart GPU [C]hange settings
Or press any other key to continue


The running log shows output like this:

 [2012-10-12 18:02:20] Accepted f0c05469 Diff 1/1 GPU 0 pool 1
 [2012-10-12 18:02:22] Accepted 218ac982 Diff 7/1 GPU 1 pool 1
 [2012-10-12 18:02:23] Accepted d8300795 Diff 1/1 GPU 3 pool 1
 [2012-10-12 18:02:24] Accepted 122c1ff1 Diff 14/1 GPU 1 pool 1

The 8 byte hex value are the 2nd 8 bytes of the share being submitted to the
pool. The 2 diff values are the actual difficulty target that share reached
followed by the difficulty target the pool is currently asking for.

---
Also many issues and FAQs are covered in the forum thread
dedicated to this program,
	http://forum.bitcoin.org/index.php?topic=28402.0

The output line shows the following:
(5s):1713.6 (avg):1707.8 Mh/s | A:729  R:8  HW:0  U:22.53/m  WU:22.53/m

Each column is as follows:
5s:  A 5 second exponentially decaying average hash rate
avg: An all time average hash rate
A:   The number of Accepted shares
R:   The number of Rejected shares
HW:  The number of HardWare errors
U:   The Utility defined as the number of shares / minute
WU:  The Work Utility defined as the number of diff1 shares work / minute
     (accepted or rejected).

 GPU 1: 73.5C 2551RPM | 427.3/443.0Mh/s | A:8 R:0 HW:0 U:4.39/m

Each column is as follows:
Temperature (if supported)
Fanspeed (if supported)
A 5 second exponentially decaying average hash rate
An all time average hash rate
The number of accepted shares
The number of rejected shares
The number of hardware erorrs
The utility defines as the number of shares / minute

The cgminer status line shows:
 ST: 1  SS: 0  NB: 1  LW: 8  GF: 1  RF: 1  WU:4.4/m

ST is STaged work items (ready to use).
SS is Stale Shares discarded (detected and not submitted so don't count as rejects)
NB is New Blocks detected on the network
LW is Locally generated Work items
GF is Getwork Fail Occasions (server slow to provide work)
RF is Remote Fail occasions (server slow to accept work)
WU is Work Utility (Rate of difficulty 1 shares solved per minute)

NOTE: Running intensities above 9 with current hardware is likely to only
diminish return performance even if the hash rate might appear better. A good
starting baseline intensity to try on dedicated miners is 9. 11 is the upper
limit for intensity while BTC mining, if the GPU_USE_SYNC_OBJECTS variable
is set (see FAQ). The upper limit for sha256 mining is 14 and 20 for scrypt.


The block display shows:
Block: 0074c5e482e34a506d2a051a...  Started: [17:17:22]  Best share: 2.71K

This shows a short stretch of the current block, when the new block started,
and the all time best difficulty share you've found since starting cgminer
this time.


---
MULTIPOOL

FAILOVER STRATEGIES WITH MULTIPOOL:
A number of different strategies for dealing with multipool setups are
available. Each has their advantages and disadvantages so multiple strategies
are available by user choice, as per the following list:

FAILOVER:
The default strategy is failover. This means that if you input a number of
pools, it will try to use them as a priority list, moving away from the 1st
to the 2nd, 2nd to 3rd and so on. If any of the earlier pools recover, it will
move back to the higher priority ones.

ROUND ROBIN:
This strategy only moves from one pool to the next when the current one falls
idle and makes no attempt to move otherwise.

ROTATE:
This strategy moves at user-defined intervals from one active pool to the next,
skipping pools that are idle.

LOAD BALANCE:
This strategy sends work to all the pools to maintain optimum load. The most
efficient pools will tend to get a lot more shares. If any pool falls idle, the
rest will tend to take up the slack keeping the miner busy.

BALANCE:
This strategy monitors the amount of difficulty 1 shares solved for each pool
and uses it to try to end up doing the same amount of work for all pools.


---
LOGGING

cgminer will log to stderr if it detects stderr is being redirected to a file.
To enable logging simply add 2>logfile.txt to your command line and logfile.txt
will contain the logged output at the log level you specify (normal, verbose,
debug etc.)

In other words if you would normally use:
./cgminer -o xxx -u yyy -p zzz
if you use
./cgminer -o xxx -u yyy -p zzz 2>logfile.txt
it will log to a file called logfile.txt and otherwise work the same.

There is also the -m option on linux which will spawn a command of your choice
and pipe the output directly to that command.

The WorkTime details 'debug' option adds details on the end of each line
displayed for Accepted or Rejected work done. An example would be:

 <-00000059.ed4834a3 M:X D:1.0 G:17:02:38:0.405 C:1.855 (2.995) W:3.440 (0.000) S:0.461 R:17:02:47

The first 2 hex codes are the previous block hash, the rest are reported in
seconds unless stated otherwise:
The previous hash is followed by the getwork mode used M:X where X is one of
P:Pool, T:Test Pool, L:LP or B:Benchmark,
then D:d.ddd is the difficulty required to get a share from the work,
then G:hh:mm:ss:n.nnn, which is when the getwork or LP was sent to the pool and
the n.nnn is how long it took to reply,
followed by 'O' on it's own if it is an original getwork, or 'C:n.nnn' if it was
a clone with n.nnn stating how long after the work was recieved that it was cloned,
(m.mmm) is how long from when the original work was received until work started,
W:n.nnn is how long the work took to process until it was ready to submit,
(m.mmm) is how long from ready to submit to actually doing the submit, this is
usually 0.000 unless there was a problem with submitting the work,
S:n.nnn is how long it took to submit the completed work and await the reply,
R:hh:mm:ss is the actual time the work submit reply was received

If you start cgminer with the --sharelog option, you can get detailed
information for each share found. The argument to the option may be "-" for
standard output (not advisable with the ncurses UI), any valid positive number
for that file descriptor, or a filename.

To log share data to a file named "share.log", you can use either:
./cgminer --sharelog 50 -o xxx -u yyy -p zzz 50>share.log
./cgminer --sharelog share.log -o xxx -u yyy -p zzz

For every share found, data will be logged in a CSV (Comma Separated Value)
format:
    timestamp,disposition,target,pool,dev,thr,sharehash,sharedata
For example (this is wrapped, but it's all on one line for real):
    1335313090,reject,
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000,
    http://localhost:8337,GPU0,0,
    6f983c918f3299b58febf95ec4d0c7094ed634bc13754553ec34fc3800000000,
    00000001a0980aff4ce4a96d53f4b89a2d5f0e765c978640fe24372a000001c5
    000000004a4366808f81d44f26df3d69d7dc4b3473385930462d9ab707b50498
    f681634a4f1f63d01a0cd43fb338000000000080000000000000000000000000
    0000000000000000000000000000000000000000000000000000000080020000

---
OVERCLOCKING WARNING AND INFORMATION

AS WITH ALL OVERCLOCKING TOOLS YOU ARE ENTIRELY RESPONSIBLE FOR ANY HARM YOU
MAY CAUSE TO YOUR HARDWARE. OVERCLOCKING CAN INVALIDATE WARRANTIES, DAMAGE
HARDWARE AND EVEN CAUSE FIRES. THE AUTHOR ASSUMES NO RESPONSIBILITY FOR ANY
DAMAGE YOU MAY CAUSE OR UNPLANNED CHILDREN THAT MAY OCCUR AS A RESULT.

The GPU monitoring, clocking and fanspeed control incorporated into cgminer
comes through use of the ATI Display Library. As such, it only supports ATI
GPUs. Even if ADL support is successfully built into cgminer, unless the card
and driver supports it, no GPU monitoring/settings will be available.

Cgminer supports initial setting of GPU engine clock speed, memory clock
speed, voltage, fanspeed, and the undocumented powertune feature of 69x0+ GPUs.
The setting passed to cgminer is used by all GPUs unless separate values are
specified. All settings can all be changed within the menu on the fly on a
per-GPU basis.

For example:
--gpu-engine 950 --gpu-memclock 825

will try to set all GPU engine clocks to 950 and all memory clocks to 825,
while:
--gpu-engine 950,945,930,960 --gpu-memclock 300

will try to set the engine clock of card 0 to 950, 1 to 945, 2 to 930, 3 to
960 and all memory clocks to 300.

AUTO MODES:
There are two "auto" modes in cgminer, --auto-fan and --auto-gpu. These can
be used independently of each other and are complementary. Both auto modes
are designed to safely change settings while trying to maintain a target
temperature. By default this is set to 75 degrees C but can be changed with:

--temp-target
e.g.
--temp-target 80
Sets all cards' target temperature to 80 degrees.

--temp-target 75,85
Sets card 0 target temperature to 75, and card 1 to 85 degrees.

AUTO FAN:
e.g.
--auto-fan (implies 85% upper limit)
--gpu-fan 25-85,65 --auto-fan

Fan control in auto fan works off the theory that the minimum possible fan
required to maintain an optimal temperature will use less power, make less
noise, and prolong the life of the fan. In auto-fan mode, the fan speed is
limited to 85% if the temperature is below "overheat" intentionally, as
higher fanspeeds on GPUs do not produce signficantly more cooling, yet
significanly shorten the lifespan of the fans. If temperature reaches the
overheat value, fanspeed will still be increased to 100%. The overheat value
is set to 85 degrees by default and can be changed with:

--temp-overheat
e.g.
--temp-overheat 75,85
Sets card 0 overheat threshold to 75 degrees and card 1 to 85.

AUTO GPU:
e.g.
--auto-gpu --gpu-engine 750-950
--auto-gpu --gpu-engine 750-950,945,700-930,960

GPU control in auto gpu tries to maintain as high a clock speed as possible
while not reaching overheat temperatures. As a lower clock speed limit,
the auto-gpu mode checks the GPU card's "normal" clock speed and will not go
below this unless you have manually set a lower speed in the range. Also,
unless a higher clock speed was specified at startup, it will not raise the
clockspeed. If the temperature climbs, fanspeed is adjusted and optimised
before GPU engine clockspeed is adjusted. If fan speed control is not available
or already optimal, then GPU clock speed is only decreased if it goes over
the target temperature by the hysteresis amount, which is set to 3 by default
and can be changed with:
--temp-hysteresis
If the temperature drops below the target temperature, and engine clock speed
is not at the highest level set at startup, cgminer will raise the clock speed.
If at any time you manually set an even higher clock speed successfully in
cgminer, it will record this value and use it as its new upper limit (and the
same for low clock speeds and lower limits). If the temperature goes over the
cutoff limit (95 degrees by default), cgminer will completely disable the GPU
from mining and it will not be re-enabled unless manually done so. The cutoff
temperature can be changed with:

--temp-cutoff
e.g.
--temp-cutoff 95,105
Sets card 0 cutoff temperature to 95 and card 1 to 105.

--gpu-memdiff -125
This setting will modify the memory speed whenever the GPU clock speed is
modified by --auto-gpu. In this example, it will set the memory speed to
be 125 Mhz lower than the GPU speed. This is useful for some cards like the
6970 which normally don't allow a bigger clock speed difference. The 6970 is
known to only allow -125, while the 7970 only allows -150.


CHANGING SETTINGS:
When setting values, it is important to realise that even though the driver
may report the value was changed successfully, and the new card power profile
information contains the values you set it to, that the card itself may
refuse to use those settings. As the performance profile changes dynamically,
querying the "current" value on the card can be wrong as well. So when changing
values in cgminer, after a pause of 1 second, it will report to you the current
values where you should check that your change has taken. An example is that
6970 reference cards will accept low memory values but refuse to actually run
those lower memory values unless they're within 125 of the engine clock speed.
In that scenario, they usually set their real speed back to their default.

Cgminer reports the so-called "safe" range of whatever it is you are modifying
when you ask to modify it on the fly. However, you can change settings to values
outside this range. Despite this, the card can easily refuse to accept your
changes, or worse, to accept your changes and then silently ignore them. So
there is absolutely to know how far to/from where/to it can set things safely or
otherwise, and there is nothing stopping you from at least trying to set them
outside this range. Being very conscious of these possible failures is why
cgminer will report back the current values for you to examine how exactly the
card has responded. Even within the reported range of accepted values by the
card, it is very easy to crash just about any card, so it cannot use those
values to determine what range to set. You have to provide something meaningful
manually for cgminer to work with through experimentation.

STARTUP / SHUTDOWN:
When cgminer starts up, it tries to read off the current profile information
for clock and fan speeds and stores these values. When quitting cgminer, it
will then try to restore the original values. Changing settings outside of
cgminer while it's running may be reset to the startup cgminer values when
cgminer shuts down because of this.

---

RPC API

For RPC API details see the API-README file

---

GPU DEVICE ISSUES and use of --gpu-map

GPUs mine with OpenCL software via the GPU device driver. This means you need
to have both an OpenCL SDK installed, and the GPU device driver RUNNING (i.e.
Xorg up and running configured for all devices that will mine on linux etc.)
Meanwhile, the hardware monitoring that cgminer offers for AMD devices relies
on the ATI Display Library (ADL) software to work. OpenCL DOES NOT TALK TO THE
ADL. There is no 100% reliable way to know that OpenCL devices are identical
to the ADL devices, as neither give off the same information. cgminer does its
best to correlate these devices based on the order that OpenCL and ADL numbers
them. It is possible that this will fail for the following reasons:

1. The device order is listed differently by OpenCL and ADL (rare), even if the
number of devices is the same.
2. There are more OpenCL devices than ADL. OpenCL stupidly sees one GPU as two
devices if you have two monitors connected to the one GPU.
3. There are more ADL devices than OpenCL. ADL devices include any ATI GPUs,
including ones that can't mine, like some older R4xxx cards.

To cope with this, the ADVANCED option for --gpu-map is provided with cgminer.
DO NOT USE THIS UNLESS YOU KNOW WHAT YOU ARE DOING. The default will work the
vast majority of the time unless you know you have a problem already.

To get useful information, start cgminer with just the -n option. You will get
output that looks like this:

[2012-04-25 13:17:34] CL Platform 0 vendor: Advanced Micro Devices, Inc.
[2012-04-25 13:17:34] CL Platform 0 name: AMD Accelerated Parallel Processing
[2012-04-25 13:17:34] CL Platform 0 version: OpenCL 1.1 AMD-APP (844.4)
[2012-04-25 13:17:34] Platform 0 devices: 3
[2012-04-25 13:17:34]   0       Tahiti
[2012-04-25 13:17:34]   1       Tahiti
[2012-04-25 13:17:34]   2       Cayman
[2012-04-25 13:17:34] GPU 0 AMD Radeon HD 7900 Series  hardware monitoring enabled
[2012-04-25 13:17:34] GPU 1 AMD Radeon HD 7900 Series  hardware monitoring enabled
[2012-04-25 13:17:34] GPU 2 AMD Radeon HD 6900 Series hardware monitoring enabled
[2012-04-25 13:17:34] 3 GPU devices max detected

Note the number of devices here match, and the order is the same. If devices 1
and 2 were different between Tahiti and Cayman, you could run cgminer with:
--gpu-map 2:1,1:2
And it would swap the monitoring it received from ADL device 1 and put it to
opencl device 2 and vice versa.

If you have 2 monitors connected to the first device it would look like this:

[2012-04-25 13:17:34] Platform 0 devices: 4
[2012-04-25 13:17:34]   0       Tahiti
[2012-04-25 13:17:34]   1       Tahiti
[2012-04-25 13:17:34]   2       Tahiti
[2012-04-25 13:17:34]   3       Cayman
[2012-04-25 13:17:34] GPU 0 AMD Radeon HD 7900 Series  hardware monitoring enabled
[2012-04-25 13:17:34] GPU 1 AMD Radeon HD 7900 Series  hardware monitoring enabled
[2012-04-25 13:17:34] GPU 2 AMD Radeon HD 6900 Series hardware monitoring enabled

To work around this, you would use:
-d 0 -d 2 -d 3 --gpu-map 2:1,3:2

If you have an older card as well as the rest it would look like this:

[2012-04-25 13:17:34] Platform 0 devices: 3
[2012-04-25 13:17:34]   0       Tahiti
[2012-04-25 13:17:34]   1       Tahiti
[2012-04-25 13:17:34]   2       Cayman
[2012-04-25 13:17:34] GPU 0 AMD Radeon HD 4500 Series  hardware monitoring enabled
[2012-04-25 13:17:34] GPU 1 AMD Radeon HD 7900 Series  hardware monitoring enabled
[2012-04-25 13:17:34] GPU 2 AMD Radeon HD 7900 Series  hardware monitoring enabled
[2012-04-25 13:17:34] GPU 3 AMD Radeon HD 6900 Series hardware monitoring enabled

To work around this you would use:
--gpu-map 0:1,1:2,2:3


---

FAQ

Q: cgminer segfaults when I change my shell window size.
A: Older versions of libncurses have a bug to do with refreshing a window
after a size change. Upgrading to a new version of curses will fix it.

Q: Can I mine on servers from different networks (eg smartcoin and bitcoin) at
the same time?
A: No, cgminer keeps a database of the block it's working on to ensure it does
not work on stale blocks, and having different blocks from two networks would
make it invalidate the work from each other.

Q: Can I change the intensity settings individually for each GPU?
A: Yes, pass a list separated by commas such as -I d,4,9,9

Q: Can I put multiple pools in the config file?
A: Yes, check the example.conf file. Alternatively, set up everything either on
the command line or via the menu after startup and choose settings->write
config file and the file will be loaded one each startup.

Q: The build fails with gcc is unable to build a binary.
A: Remove the "-march=native" component of your CFLAGS as your version of gcc
does not support it.

Q: The CPU usage is high.
A: The ATI drivers after 11.6 have a bug that makes them consume 100% of one
CPU core unnecessarily so downgrade to 11.6. Binding cgminer to one CPU core on
windows can minimise it to 100% (instead of more than one core). Driver version
11.11 on linux and 11.12 on windows appear to have fixed this issue. Note that
later drivers may have an apparent return of high CPU usage. Try
'export GPU_USE_SYNC_OBJECTS=1' on Linux before starting cgminer. You can also
set this variable in windows via a batch file or on the command line before
starting cgminer with 'setx GPU_USE_SYNC_OBJECTS 1'

Q: Can you implement feature X?
A: I can, but time is limited, and people who donate are more likely to get
their feature requests implemented.

Q: My GPU hangs and I have to reboot it to get it going again?
A: The more aggressively the mining software uses your GPU, the less overclock
you will be able to run. You are more likely to hit your limits with cgminer
and you will find you may need to overclock your GPU less aggressively. The
software cannot be responsible and make your GPU hang directly. If you simply
cannot get it to ever stop hanging, try decreasing the intensity, and if even
that fails, try changing to the poclbm kernel with -k poclbm, though you will
sacrifice performance. cgminer is designed to try and safely restart GPUs as
much as possible, but NOT if that restart might actually crash the rest of the
GPUs mining, or even the machine. It tries to restart them with a separate
thread and if that separate thread dies, it gives up trying to restart any more
GPUs.

Q: Work keeps going to my backup pool even though my primary pool hasn't
failed?
A: Cgminer checks for conditions where the primary pool is lagging and will
pass some work to the backup servers under those conditions. The reason for
doing this is to try its absolute best to keep the GPUs working on something
useful and not risk idle periods. You can disable this behaviour with the
option --failover-only.

Q: Is this a virus?
A: Cgminer is being packaged with other trojan scripts and some antivirus
software is falsely accusing cgminer.exe as being the actual virus, rather
than whatever it is being packaged with. If you installed cgminer yourself,
then you do not have a virus on your computer. Complain to your antivirus
software company. They seem to be flagging even source code now from cgminer
as viruses, even though text source files can't do anything by themself.

Q: Can you modify the display to include more of one thing in the output and
less of another, or can you change the quiet mode or can you add yet another
output mode?
A: Everyone will always have their own view of what's important to monitor.
The defaults are very sane and I have very little interest in changing this
any further.

Q: Can you change the autofan/autogpu to change speeds in a different manner?
A: The defaults are sane and safe. I'm not interested in changing them
further. The starting fan speed is set to 50% in auto-fan mode as a safety
precaution.

Q: What are the best parameters to pass for X pool/hardware/device.
A: Virtually always, the DEFAULT parameters give the best results. Most user
defined settings lead to worse performance. The ONLY thing most users should
need to set is the Intensity.

Q: What happened to CPU mining?
A: Being increasingly irrelevant for most users, and a maintenance issue, it is
no longer under active development and will not be supported. No binary builds
supporting CPU mining will be released. Virtually all remaining users of CPU
mining are as back ends for illegal botnets.

Q: I upgraded cgminer version and my hashrate suddenly dropped!
A: No, you upgraded your SDK version unwittingly between upgrades of cgminer
and that caused  your hashrate to drop. See the next question.

Q: I upgraded my ATI driver/SDK/cgminer and my hashrate suddenly dropped!
A: The hashrate performance in cgminer is tied to the version of the ATI SDK
that is installed only for the very first time cgminer is run. This generates
binaries that are used by the GPU every time after that. Any upgrades to the
SDK after that time will have no effect on the binaries. However, if you
install a fresh version of cgminer, and have since upgraded your SDK, new
binaries will be built. It is known that the 2.6 ATI SDK has a huge hashrate
penalty on generating new binaries. It is recommended to not use this SDK at
this time unless you are using an ATI 7xxx card that needs it.

Q: Which AMD SDK is the best for cgminer?
A: At the moment, versions 2.4 and 2.5 work the best for R5xxx and R6xxx GPUS.
SDK 2.6 or 2.7 works best for R7xxx. SDK 2.8 is known to have many problems.
If you are need to use the 2.6+ SDK or R7xxx or later, the phatk kernel will
perform poorly, while the diablo or my custom modified poclbm kernel are
optimised for it.

Q: Which AMD driver is the best?
A: Unfortunately AMD has a history of having quite a few releases with issues
when it comes to mining, either in terms of breaking mining, increasing CPU
usage or very low hashrates. Only experimentation can tell you for sure, but
some good releases were 11.6, 11.12, 12.4 and 12.8. Note that older cards may
not work with the newer drivers.

Q: I have multiple SDKs installed, can I choose which one it uses?
A: Run cgminer with the -n option and it will list all the platforms currently
installed. Then you can tell cgminer which platform to use with --gpu-platform.

Q: GUI version?
A: No. The RPC interface makes it possible for someone else to write one
though.

Q: I'm having an issue. What debugging information should I provide?
A: Start cgminer with your regular commands and add -D -T --verbose and provide
the full startup output and a summary of your hardware, operating system, ATI
driver version and ATI stream version.

Q: cgminer reports no devices or only one device on startup on Linux although
I have multiple devices and drivers+SDK installed properly?
A: Try "export DISPLAY=:0" before running cgminer.

Q: cgminer crashes immediately on startup.
A: One of the common reasons for this is that you have mixed files on your
machine for the driver or SDK. Windows has a nasty history of not cleanly
uninstalling files so you may have to use third party tools like driversweeper
to remove old versions. The other common reason for this is windows
antivirus software is disabling one of the DLLs from working. If cgminer
starts with the -T option but never starts without it, this is a sure fire
sign you have this problem and will have to disable your antivirus or make
exceptions.

Q: Why don't you provide win64 builds?
A: Win32 builds work everywhere and there is precisely zero advantage to a
64 bit build on windows.

Q: Is it faster to mine on windows or linux?
A: It makes no difference. It comes down to choice of operating system for
their various features. Linux offers much better long term stability and
remote monitoring and security, while windows offers you overclocking tools
that can achieve much more than cgminer can do on linux.

Q: Can I mine with cgminer on a MAC?
A: cgminer will compile on OSX, but the performance of GPU mining is
compromised due to the opencl implementation on OSX, there is no temperature
or fanspeed monitoring, and the cooling design of most MACs, despite having
powerful GPUs, will usually not cope with constant usage leading to a high
risk of thermal damage. It is highly recommended not to mine on a MAC unless
it is to a USB device.

Q: Cgminer cannot see any of my GPUs even though I have configured them all
to be enabled and installed OpenCL (+/- Xorg is running and the DISPLAY
variable is exported on linux)?
A: Check the output of 'cgminer -n', it will list what OpenCL devices your
installed SDK recognises. If it lists none, you have a problem with your
version or installation of the SDK.

Q: Cgminer is mining on the wrong GPU, I want it on the AMD but it's mining
on my on board GPU?
A: Make sure the AMD OpenCL SDK is installed, check the output of 'cgminer -n'
and use the appropriate parameter with --gpu-platform.

Q: I'm getting much lower hashrates than I should be for my GPU?
A: Look at your driver/SDK combination and disable power saving options for
your GPU. Specifically look to disable ULPS. Make sure not to set intensity
above 11 for BTC mining.

Q: Can I mine with AMD while running Nvidia or Intel GPUs at the same time?
A: If you can install both drivers successfully (easier on windows) then
yes, using the --gpu-platform option.

Q: Can I mine with Nvidia or Intel GPUs?
A: Yes but their hashrate is very poor and likely you'll be using much more
energy than you'll be earning in coins.

Q: Can I mine on both Nvidia and AMD GPUs at the same time?
A: No, you must run one instance of cgminer with the --gpu-platform option for
each.

Q: Can I mine on Linux without running Xorg?
A: With Nvidia you can, but with AMD you cannot.

Q: I'm trying to mine litecoin but cgminer shows MH values instead of kH and
submits no shares?
A: Add the --scrypt parameter.

Q: I can't get anywhere near enough hashrate for scrypt compared to other
people?
A: You may not have enough system RAM as this is also required.

Q: My scrypt hashrate is high but the pool reports only a tiny proportion of
my hashrate?
A: You are generating garbage hashes due to your choice of settings. Your
Work Utility (WU) value will confirm you are not generating garbage. You
should be getting about .9WU per kHash. If not, then try decreasing your
intensity, do not increase the number of gpu-threads, and consider adding
system RAM to match your GPU ram. You may also be using a bad combination
of driver and/or SDK.

Q: Scrypt fails to initialise the kernel every time?
A: Your parameters are too high. Don't add GPU threads, don't set intensity
too high, decrease thread concurrency. See the SCRYPT-README for a lot more
help.

Q: Cgminer stops mining (or my GPUs go DEAD) and I can't close it?
A: Once the driver has crashed, there is no way for cgminer to close cleanly.
You will have to kill it, and depending on how corrupted your driver state
has gotten, you may even need to reboot. Windows is known to reset drivers
when they fail and cgminer will be stuck trying to use the old driver instance.

Q: I can't get any monitoring of temperatures or fanspeed with cgminer when
I start it remotely?
A: With linux, make sure to export the DISPLAY variable. On windows, you
cannot access these monitoring values via RDP. This should work with tightVNC
or teamviewer though.

Q: I change my GPU engine/memory/voltage and cgminer reports back no change?
A: Cgminer asks the GPU using the ATI Display Library to change settings, but
the driver and hardware are free to do what it wants with that query, including
ignoring it. Some GPUs are locked with one or more of those properties as well.

Q: I have multiple GPUs and although many devices show up, it appears to be
working only on one GPU splitting it up.
A: Your driver setup is failing to properly use the accessory GPUs. Your
driver may be configured wrong or you have a driver version that needs a dummy
plug on all the GPUs that aren't connected to a monitor.

Q: Should I use crossfire/SLI?
A: It does not benefit mining at all and depending on the GPU may actually
worsen performance.

Q: I have some random GPU performance related problem not addressed above.
A: Seriously, it's the driver and/or SDK. Uninstall them and start again,
noting there is no clean way to uninstall them so you have to use extra tools
or do it manually.

Q: Do I need to recompile after updating my driver/SDK?
A: No. The software is unchanged regardless of which driver/SDK/ADL_SDK version
you are running. However if you change SDKs you should delete any generated
.bin files for them to be recreated with the new SDK.

Q: I switch users on windows and my mining stops working?
A: That's correct, it does. It's a permissions issue that there is no known
fix for due to monitoring of GPU fanspeeds and temperatures. If you disable
the monitoring with --no-adl it should switch okay.

Q: My network gets slower and slower and then dies for a minute?
A; Try the --net-delay option.

Q: How do I tune for p2pool?
A: p2pool has very rapid expiration of work and new blocks, it is suggested you
decrease intensity by 1 from your optimal value, and decrease GPU threads to 1
with -g 1. It is also recommended to use --failover-only since the work is
effectively like a different block chain. If mining with a minirig, it is worth
adding the --bfl-range option.

Q: Are OpenCL kernels from other mining software useable in cgminer?
A: No, the APIs are slightly different between the different software and they
will not work.

Q: I run PHP on windows to access the API with the example miner.php. Why does
it fail when php is installed properly but I only get errors about Sockets not
working in the logs?
A: http://us.php.net/manual/en/sockets.installation.php

Q: What is a PGA?
A: At the moment, cgminer supports 4 FPGAs: BitForce, Icarus, ModMiner, and Ztex.
They are Field-Programmable Gate Arrays that have been programmed to do Bitcoin
mining. Since the acronym needs to be only 3 characters, the "Field-" part has
been skipped.

Q: How do I get my BFL/Icarus/Lancelot/Cairnsmore device to auto-recognise?
A: On linux, if the /dev/ttyUSB* devices don't automatically appear, the only
thing that needs to be done is to load the driver for them:
BFL: sudo modprobe ftdi_sio vendor=0x0403 product=0x6014
Icarus: sudo modprobe pl2303 vendor=0x067b product=0x230
Lancelot: sudo modprobe ftdi_sio vendor=0x0403 product=0x6001
Cairnsmore: sudo modprobe ftdi_sio product=0x8350 vendor=0x0403
On windows you must install the pl2303 or ftdi driver required for the device
pl2303: http://prolificusa.com/pl-2303hx-drivers/
ftdi: http://www.ftdichip.com/Drivers/VCP.htm

Q: On linux I can see the /dev/ttyUSB* devices for my Icarus FPGAs, but
cgminer can't mine on them
A: Make sure you have the required priviledges to access the /dev/ttyUSB* devices:
 sudo ls -las /dev/ttyUSB*
will give output like:
 0 crw-rw---- 1 root dialout 188, 0 2012-09-11 13:49 /dev/ttyUSB0
This means your account must have the group 'dialout' or root priviledges
To permanently give your account the 'dialout' group:
 sudo usermod -G dialout -a `whoami`
Then logout and back in again

Q: Can I mine scrypt with FPGAs or ASICs?
A: No.

Q: What is stratum and how do I use it?
A: Stratum is a protocol designed for pooled mining in such a way as to
minimise the amount of network communications, yet scale to hardware of any
speed. With versions of cgminer 2.8.0+, if a pool has stratum support, cgminer
will automatically detect it and switch to the support as advertised if it can.
Stratum uses direct TCP connections to the pool and thus it will NOT currently
work through a http proxy but will work via a socks proxy if you need to use
one. If you input the stratum port directly into your configuration, or use the
special prefix "stratum+tcp://" instead of "http://", cgminer will ONLY try to
use stratum protocol mining. The advantages of stratum to the miner are no
delays in getting more work for the miner, less rejects across block changes,
and far less network communications for the same amount of mining hashrate. If
you do NOT wish cgminer to automatically switch to stratum protocol even if it
is detected, add the --fix-protocol option.

Q: Why don't the statistics add up: Accepted, Rejected, Stale, Hardware Errors,
Diff1 Work, etc. when mining greater than 1 difficulty shares?
A: As an example, if you look at 'Difficulty Accepted' in the RPC API, the number
of difficulty shares accepted does not usually exactly equal the amount of work
done to find them. If you are mining at 8 difficulty, then you would expect on
average to find one 8 difficulty share, per 8 single difficulty shares found.
However, the number is actually random and converges over time, it is an average,
not an exact value, thus you may find more or less than the expected average.

Q: Why do the scrypt diffs not match with the current difficulty target?
A: The current scrypt block difficulty is expressed in terms of how many
multiples of the BTC difficulty it currently is (eg 28) whereas the shares of
"difficulty 1" are actually 65536 times smaller than the BTC ones. The diff
expressed by cgminer is as multiples of difficulty 1 shares.

---

This code is provided entirely free of charge by the programmer in his spare
time so donations would be greatly appreciated. Please consider donating to the
address below.

Con Kolivas <kernel@kolivas.org>
15qSxP1SQcUX3o4nhkfdbgyoWEFMomJ4rZ
