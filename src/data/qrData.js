const qrData = [

  // 1: Operating System
  {
    tag: "Operating System",
    term: "Operating System",
    def: "An operating system is a program that manages hardware and provides other programs with an environment to run in.",
    points: [
      "It's a PROGRAM. NOT HARDWARE!",
    ],
  },
  {
    tag: "Operating System",
    term: "Process",
    def: "A process is a program in execution. One running instance.",
    points: [
      "One program can have multiple processes",
      "Has its own PCB and memory",
      "Managed entirely by OS",
    ],
  },
  {
    tag: "Operating System",
    term: "OS Kernel",
    def: "The operating system kernel is the central component of an OS that performs the most important OS tasks.",
    points: [
      "Runs in kernel mode",
      "Issues privileged instructions",
      "Specific tasks depend on OS",
    ],
  },
  {
    tag: "Operating System",
    term: "OS API",
    def: "An operating system's API is a set of tools (functions, classes) the OS provides to programmers for building applications.",
    points: [
      "Uses system calls under the hood, making them easier to utilize and work with.",
    ],
  },

  // 2: Types of OS
  {
    tag: "Types of OS",
    term: "Personal OS",
    def: "OS for personal machines. Prioritizes user experience.",
    points: [
      "Windows, Linux, macOS, ChromeOS",
      "Don't list different Linux distros on exam!",
    ],
  },
  {
    tag: "Types of OS",
    term: "Mobile OS",
    def: "Os for mobile devices. Prioritizes user experience + limited resource management.",
    points: [
      "Android, iOS",
      "Battery, RAM, CPU constraints",
      "Typically needs support for touch/sensor hardware",
    ],
  },
  {
    tag: "Types of OS",
    term: "Server OS",
    def: "OS for servers. Prioritizes stability and efficiency.",
    points: [
      "Windows Server, FreeBSD, Solaris, Linux (DONT'T list this if you already have PC Linux)",
      "No expectation of convenient UI",
      "Long uptime is critical",
    ],
  },
  {
    tag: "Types of OS",
    term: "Embedded OS",
    def: "OS for embedded devices. MOST WIDESPREAD. For resource-constrained (and typically small) devices.",
    points: [
      "VxWorks, FreeRTOS, minimal Linux (again, don't write if you already have Linux OR Linux server)",
      "The computers within cars, appliances, medical devices, etc.",
      "Tiny footprint, often no screen",
    ],
  },

  // 3: Dual Mode & System Calls
  {
    tag: "Dual Mode & System Calls",
    term: "System Call",
    def: "A system call is a request for a service from an application to the OS.",
    points: [
      "Not a request for permission. It's just like, 'OS do it for me'",
      "Causes two context switches (overhead)",
      "Process → OS → Process",
    ],
  },
  {
    tag: "Dual Mode & System Calls",
    term: "Dual Mode",
    def: "Dual mode is a mechanism that allows the CPU to run in two different modes: user (restricted permissions) and kernel (privileged; unrestricted).",
    points: [
      "Mode bit register tracks current mode",
      "CPU auto-switches to kernel on syscall",
      "Kernel instruction in user mode → CPU refuses, immediately switches to OS (hardware behavior)",
      "Kernel-mode instructions run in kernel-space, user-mode in user-space",
      "-MODE and -SPACE are NOT the same thing!",
    ],
  },

  // 4: CPU Management
  {
    tag: "CPU Management",
    term: "Multitasking",
    def: "Multitasking is a technique used to FAKE simultaneous execution of multiple processes on a single CPU core.",
    points: [
      "NOT ACTUALLY simultaneous",
      "Switches: Process → OS → Process → OS",
      "APPEARS to be simultaneous to human eye (well, without lag)",
    ],
  },

  // 5: Memory Management
  {
    tag: "Memory Management",
    term: "Virtual Memory",
    def: "Virtual memory is a technique used to fake larger RAM using hard disk space.",
    points: [
      "Pages swapped out to disk when not needed, fetched back when needed",
      "Cannot execute from disk! MUST be fully in RAM first!",
      "Expensive when relied on heavily. Get more RAM😂😅",
    ],
  },
  {
    tag: "Memory Management",
    term: "Logical Address",
    def: "A logical address is the memory address a process uses. It is private to that specific process and starts at 0.",
    points: [
      "Process has no knowledge of where it actually sits in physical RAM",
      "CPU gets logical addresses when fetching instructions",
      "Each process has its own logical address space. Isolation by design",
    ],
  },
  {
    tag: "Memory Management",
    term: "Physical Address",
    def: "A physical address is the actual address of a byte in RAM hardware.",
    points: [
      "Determined at runtime by the OS and MMU",
      "Programs never see or use physical addresses directly",
      "Only one physical address space exists in the system even if you have multiple sticks of RAM (wow look at mr. moneybags here)",
    ],
  },
  {
    tag: "Memory Management",
    term: "Logical Address Space",
    def: "A logical address space is a collection of all logical addresses available to a single process.",
    points: [
      "Each process has its own. Completely independent from others",
      "All start at 0, giving every process the illusion it is alone in memory",
      "There are as many logical address spaces as there are processes",
    ],
  },
  {
    tag: "Memory Management",
    term: "Physical Address Space",
    def: "The physical address space is the collection of all physical addresses available in the entire system.",
    points: [
      "There is only ONE physical address space in the system",
      "Shared by all processes, but they never see it directly",
      "MMU maps each process's logical space into a region of the physical space",
    ],
  },
  {
    tag: "Memory Management",
    term: "MMU",
    def: "The Memory Management Unit is a hardware device that converts logical addresses to physical addresses on every memory access.",
    points: [
      "Sits between the CPU and RAM on the address bus",
      "OS instructs MMU how to convert, program is completely unaware",
      "Also enforces memory boundaries (blocks out-of-range accesses)",
    ],
  },
  {
    tag: "Memory Management",
    term: "Page Fault",
    def: "A page fault is an event that occurs when a process accesses a page that is not currently in RAM.",
    points: [
      "Normal OS event, NOT a crash",
      "OS copies the page back from disk before resuming execution",
      "Expensive: disk is slow. Too many = major slowdown (thrashing)",
    ],
  },

  // 6: Contiguous Allocation & Fragmentation
  {
    tag: "Contiguous Allocation & Fragmentation",
    term: "Contiguous Memory Allocation",
    def: "Contiguous memory allocation is a strategy where each process receives all of its memory in one unbroken chunk.",
    points: [
      "MMU uses base value (start) + limit value (size) to enforce boundaries",
      "Simple to implement, but creates holes over time",
      "Produces EXTERNAL, not internal fragmentation, because it gives exactly what is requested, no extra",
    ],
  },
  {
    tag: "Contiguous Allocation & Fragmentation",
    term: "Fragmentation",
    def: "Fragmentation is a situation where RAM is wasted due to inefficient memory usage.",
    points: [
      "Two types: external (holes between processes) and internal (waste within a process; OS allocated more than needed)",
      "Worsens over time as processes are created and destroyed",
      "Paging eliminates external fragmentation but introduces internal",
    ],
  },
  {
    tag: "Contiguous Allocation & Fragmentation",
    term: "External Fragmentation",
    def: "External fragmentation is wasted memory that belongs to no process. Holes that are too small or scattered to be useful.",
    points: [
      "Caused by processes of different sizes being loaded and unloaded",
      "Defragmentation can fix it but is very expensive",
      "Best fit (use smallest possible hole) maximizes this; worst fit (use largest hole) minimizes it",
    ],
  },
  {
    tag: "Contiguous Allocation & Fragmentation",
    term: "Internal Fragmentation",
    def: "Internal fragmentation is wasted memory allocated to a process but not actually used by it.",
    points: [
      "Happens when OS gives more than was requested",
      "Does NOT occur in contiguous allocation",
      "DOES occur in paging (last frame may not be fully used)",
    ],
  },
  {
    tag: "Contiguous Allocation & Fragmentation",
    term: "Best Fit",
    def: "Best fit is an allocation strategy that places a process in the smallest hole that is large enough.",
    points: [
      "Preserves large holes for future large processes",
      "Leaves behind many tiny, unusable leftover holes (maximizes external fragmentation)",
    ],
  },
  {
    tag: "Contiguous Allocation & Fragmentation",
    term: "Worst Fit",
    def: "Worst fit is an allocation strategy that places a process in the largest available hole.",
    points: [
      "Leaves behind larger remainders, more likely to be usable",
      "But it sacrifices the largest holes, which may be needed for larger processes later",
      "Minimizes external fragmentation",
    ],
  },

  // 7: Paging
  {
    tag: "Paging",
    term: "Page",
    def: "A page is a fixed-size chunk of a process's logical address space.",
    points: [
      "Theyre logical, not physical. Exists in the process's view of memory",
      "MUST be the SAME size as a FRAME",
      "Pages can be scattered across any available frames in physical RAM",
    ],
  },
  {
    tag: "Paging",
    term: "Frame",
    def: "A frame is a fixed-size chunk of physical RAM.",
    points: [
      "Physical, not logical. Exists in real RAM hardware",
      "MUST be the SAME size as a PAGE",
      "Any page can be mapped to any frame. Contiguity is not necessarily required",
    ],
  },
  {
    tag: "Paging",
    term: "Page Table",
    def: "A page table is a data structure stored in RAM by the OS that maps page numbers to frame numbers.",
    points: [
      "One page table per process",
      "MMU uses it to translate logical → physical addresses at runtime",
      "PCB stores a pointer to where that process' page table lives in RAM",
    ],
  },
  {
    tag: "Paging",
    term: "Page Offset",
    def: "The page offset is the distance from the start of a page to a specific address within it.",
    points: [
      "Calculated as: logical address % page size",
      "Preserved exactly in the physical address. Only the page number changes in the conversion.",
      "The reason page size must be a power of 2: offset bits and page number bits split cleanly in binary",
    ],
  },
  {
    tag: "Paging",
    term: "Page Size: Power of 2",
    def: "Page size must always be a power of 2 (e.g., 4kB). This is a hardware requirement.",
    points: [
      "Allows CPU to split a logical address into page# and offset using bit operations instead of division",
      "Offset = rightmost log2(page_size) bits; page# = remaining bits",
      "A non-power-of-2 page size (e.g., 7kB) would never be used",
    ],
  },
  {
    tag: "Paging",
    term: "Address Translation",
    def: "Address translation is the process of converting a logical address to a physical address using the page table.",
    points: [
      "Page# = logical ÷ page_size (integer division)",
      "Offset = logical % page_size",
      "Physical = (frame# × page_size) + offset",
    ],
  },
  {
    tag: "Paging",
    term: "Internal Fragmentation (Paging)",
    def: "In paging, internal fragmentation comes from the wasted space at the end of the last frame allocated to a process.",
    points: [
      "OS MUST give whole frames. Cannot give half a frame!",
      "Tradeoff for eliminating external fragmentation",
    ],
  },

  // 8: I/O, Interrupts & Drivers
  {
    tag: "I/O, Interrupts & Drivers",
    term: "Interrupt",
    def: "An interrupt is an electrical signal about an important event requiring immediate CPU attention.",
    points: [
      "Steps: generated → reaches CPU → CPU pauses → identifies type → runs ISR → resumes",
      "System calls are treated as interrupts",
      "Almost any hardware can generate one: disk, keyboard, timer, etc.",
    ],
  },
  {
    tag: "I/O, Interrupts & Drivers",
    term: "ISR / Interrupt Handler",
    def: "An Interrupt Service Routine (ISR) is the code the CPU runs in response to a specific interrupt type.",
    points: [
      "Every interrupt type has its own handler",
      "OS provides defaults; manufacturers can provide their own via drivers",
      "ISRs are fetched using the interrupt vector",
    ],
  },
  {
    tag: "I/O, Interrupts & Drivers",
    term: "Interrupt Vector",
    def: "The interrupt vector is a region of RAM storing references to interrupt handlers, indexed by interrupt number.",
    points: [
      "CPU looks up the correct ISR here when an interrupt fires",
      "Populated by the OS at startup with default handlers",
      "Drivers can register their own handlers",
    ],
  },
  {
    tag: "I/O, Interrupts & Drivers",
    term: "Maskable vs Unmaskable",
    def: "Maskable interrupts can be temporarily delayed or ignored by the CPU. Unmaskable interrupts cannot be ignored under any circumstances.",
    points: [
      "Maskable: CPU can wait to handle (e.g., during critical operations)",
      "Example of unmaskable interrupt might be power failure signals",
    ],
  },
  {
    tag: "I/O, Interrupts & Drivers",
    term: "Device Driver",
    def: "A device driver is a small program that handles communication between the OS and a specific device.",
    points: [
      "Written by device manufacturer to follow OS-defined standard",
      "OS doesn't need to know every device, just the interface",
      "Runs at or near kernel level, as it needs privileged instructions",
    ],
  },

  // 9: Storage & File Systems
  {
    tag: "Storage & File Systems",
    term: "File",
    def: "A file is a named collection of related data. An OS-level abstraction. The disk has no concept of files, just 0s, 1s, and coordinates.",
    points: [
      "OS gets a file's disk coordinates with the file system (kinda like PCB table but for files)",
      "All file operations go through the OS",
    ],
  },
  {
    tag: "Storage & File Systems",
    term: "File System",
    def: "A file system is a data structure maintained by the OS describing all files on a disk, including physical coordinates, names, and other attributes.",
    points: [
      "Stores descriptions of files, NOT the file contents",
      "Stored at a known/predefined location on disk",
    ],
  },
  {
    tag: "Storage & File Systems",
    term: "Logical Disk (or Partition)",
    def: "A logical disk is a portion of a physical disk described by its own separate file system. Also called a partition.",
    points: [
      "One physical disk can have multiple logical disks",
      "C: and D: on Windows are logical, not physical",
      "Each partition has its own file system. Completely separate",
    ],
  },

  // 10: Networking
  {
    tag: "Networking",
    term: "Network",
    def: "A network is a group of two or more connected devices, such as computers, servers, phones, etc. that communicate to share resources, data, and services.",
    points: [
      'While the internet is technically a network, it is really more so a network of networks (it literally is a contraction of "interconnected networks"). It uses physical infrastructure, like fiber-optic cables, satelites, and wireless towers.',
      'While the internet is the physical and logical infrastructure (cables, routers, etc. but also protocols), the world wide web (WWW) is a service built on top of the internet. It is the collection of websites and HTML documents you access using a web browser.'
    ]
  },
  {
    tag: "Networking",
    term: "Networking Protocol",
    def: "A networking protocol is a set of rules describing how to send, receive, and understand data.",
    points: [
      "Every layer of a network transmission has its own protocol",
      "Networking adapter, OS, and application each use their own",
      "For example, TCP/IP is a family of protocols, not a single one",
    ],
  },
  {
    tag: "Networking",
    term: "IP Address",
    def: "An IP address is a unique numeric identifier for a device on a network.",
    points: [
      "IPv4 format: four unsigned bytes separated by dots (e.g., 56.32.123.99)",
      "Each number is 0–255",
      "Identifies the machine, NOT the process on the machine",
    ],
  },
  {
    tag: "Networking",
    term: "Networking Port",
    def: "A networking port is a unique numeric identifier assigned to every process that wants to use the network.",
    points: [
      "IP address is like house address; port would be like the name of a person at that address",
      "Tells OS which PROCESS on the machine a message is meant for",
      "Ranges from 0 to 65535"
    ],
  },
  {
    tag: "Networking",
    term: "DNS Server",
    def: "A DNS (Domain Name System) server translates URLs into IP addresses.",
    points: [
      "Your computer gets the DNS server address from network settings (often assigned automatically when you connect)",
      "Without DNS, you'd need to memorize IP addresses for every site",
    ],
  },
  {
    tag: "Networking",
    term: "URL",
    def: "A URL (Uniform Resource Locator) is a human-readable address used to access a resource on the internet.",
    points: [
      "Browser cannot use a URL directly. Must be translated to an IP via DNS first",
      "More convenient than memorizing IP addresses",
      "Examples: csbob.dev, google.com, github.com",
    ],
  },
  {
    tag: "Networking",
    term: "Server",
    def: "A server is a computer on the network that receives requests and provides services to other computers.",
    points: [
      "Runs server software that listens on a well-known port",
      "Examples: web server, email server, DNS server",
      "Designed for stability and continuous availability",
    ],
  },
  {
    tag: "Networking",
    term: "Client",
    def: "A client is a computer that requests and obtains services or information from a server.",
    points: [
      "Initiates the connection to the server",
      "Your browser is a client when loading a web page",
      "Client includes its own IP + port so the server knows where to reply",
    ],
  },
  {
    tag: "Networking",
    term: "Networking Socket",
    def: "A networking socket is the combination of an IP address and a networking port (e.g., 55.220.0.51:81).",
    points: [
      "Uniquely identifies a specific process on a specific machine",
      "Serves as the endpoint for communication",
      "You need BOTH! IP alone isn't enough",
    ],
  },
  {
    tag: "Networking",
    term: "Well-Known Ports",
    def: "Well-known ports are ports with predefined purposes, occupying the range 0–1023.",
    points: [
      "Don't just say '0–1023' on exam! Explain that they have predefined purposes",
      "Port 80 = HTTP (web servers)",
      "Nobody should use these for random purposes",
    ],
  },

  // 11: Inter-Process Communication (IPC)
  {
    tag: "Inter-Process Communication (IPC)",
    term: "Message Passing",
    def: "Message passing is an IPC technique where every data exchange goes through the OS.",
    points: [
      "OS moderates every single exchange, which adds system call overhead",
      "Easier to program correctly, less to think about",
      "Works across different machines on a network",
    ],
  },
  {
    tag: "Inter-Process Communication (IPC)",
    term: "Shared Memory",
    def: "Shared memory is an IPC technique where the OS allocates a RAM region accessible to multiple processes.",
    points: [
      "OS sets it up once. No per-access overhead after that",
      "Same machine only. Processes need access to the same physical RAM",
      "Race conditions are entirely the programmer's responsibility",
      "The process must REQUEST the OS to create this region if it wants it"
    ],
  },

  // 12: PCB, States & Context Switch
  {
    tag: "PCB, States & Context Switch",
    term: "PCB",
    def: "A Process Control Block is a record maintained by the OS for each process containing all information needed to manage it.",
    points: [
      "PID, parent PID, CPU registers, program counter",
      "Scheduling and memory info, open file LIST (not contents), I/O device list, etc.",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "Process Table",
    def: "The process table is the collection of all PCBs in the system, stored together.",
    points: [
      "One entry (PCB) per process",
      "OS uses it to track and manage all running processes",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "Context Switch",
    def: "A context switch is a sequence of steps to move the CPU from running one process to running another.",
    points: [
      "Steps: pause P1 → save registers/PC to PCB → load P2's PCB → resume P2",
      "Not free! Reading/writing RAM takes time!",
      "Every system call requires two context switches (P -> OS -> P)",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "Ready Queue",
    def: "The ready queue is the collection of processes (pointers to their PCBs) that are ready and willing to use the CPU.",
    points: [
      "The scheduler picks from here",
      "Not necessarily a 'queue'. OS can use any scheduling algorithm",
      "Process 'enters' here from New (after setup) or Waiting (after I/O completes)",
      "There is no actual MOVEMENT of processes. Just updating their states."
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "NEW",
    def: "New is the process state in which the PCB is being created and the process is being prepared.",
    points: [
      "Code being loaded from disk into RAM",
      "Not yet competing for the CPU",
      "→ READY once preparation is complete",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "READY",
    def: "Ready is the process state in which the process is fully prepared and waiting in the ready queue for CPU time.",
    points: [
      "Has everything it needs, just waiting for a CPU",
      "→ RUNNING when the scheduler selects it",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "RUNNING",
    def: "Running is the process state in which the process is actively using the CPU.",
    points: [
      "Only ONE process per core at a time",
      "→ WAITING on any I/O request",
      "→ READY if preempted (kicked off CPU) by OS scheduler",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "WAITING",
    def: "Waiting is the process state in which the process is blocked on an event and not competing for the CPU.",
    points: [
      "Processes yield CPU immediately on any I/O request",
      "This process cannot be scheduled even if CPU is free",
      "→ READY (not RUNNING) when the event completes",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "TERMINATED",
    def: "Terminated is the process state in which the process has finished and will never need anything again.",
    points: [
      "All resources freed immediately",
      "PCB kept until parent calls wait()",
      "If parent never calls wait(), process becomes zombie",
    ],
  },
  {
    tag: "PCB, States & Context Switch",
    term: "CPU-bound vs I/O-bound",
    def: "CPU-bound processes have longer CPU bursts (periods of CPU usage). I/O-bound processes spend more time waiting for I/O.",
    points: [
      "CPU-bound: wants to stay on CPU as long as possible",
      "I/O-bound: frequently moves between RUNNING and WAITING",
      "Good schedulers balance both to keep CPU and I/O devices busy",
    ],
  },

  // 13: fork, exec, exit, wait, zombies, and orphans!
  {
    tag: "fork, exec, exit, wait, zombies, and orphans!",
    term: "fork()",
    def: "fork() is a POSIX instruction that creates an almost-exact copy (new PID) of the calling process AND returns child's PID (positive integer) to parent, 0 to child, negative on error.",
    points: [
      "Returns +PID to parent, 0 to child, negative on failure",
      "Child starts at the INSTRUCTION after the fork, not from the top, NOT NEXT LINE. INSTRUCTION!",
      "Roughly doubles memory usage. Not memory efficient",
    ],
  },
  {
    tag: "fork, exec, exit, wait, zombies, and orphans!",
    term: "exec()",
    def: "exec() is a POSIX instruction that entirely replaces the current process's content with a new program.",
    points: [
      "Same PID, completely different program",
      "Never returns on success, only on failure",
      "OS skips copying memory if it detects exec() will be called immediately after fork()",
    ],
  },
  {
    tag: "fork, exec, exit, wait, zombies, and orphans!",
    term: "exit(status)",
    def: "exit() stops the process and releases its resources. Status 0 = success; non-zero = error code.",
    points: [
      "PCB is kept until parent calls wait()",
      "Process enters TERMINATED state",
      "Become zombie if parent hasn't called wait()",
    ],
  },
  {
    tag: "fork, exec, exit, wait, zombies, and orphans!",
    term: "wait()",
    def: "wait() pauses the parent process until one of its children calls exit(), then collects the exit status and destroys the PCB.",
    points: [
      "Called by PARENT, triggered by CHILD's exit()",
      "Fully cleans up the PCB. Removes the zombie",
      "Calling wait() with no children returns an error",
    ],
  },
  {
    tag: "fork, exec, exit, wait, zombies, and orphans!",
    term: "Zombie Process",
    def: "A zombie process is a process that has called exit() but whose parent hasn't called wait() yet.",
    points: [
      "Holds no resources, just the PCB remains",
      "Normal and expected briefly",
      "Problem only if they accumulate (PCBs take up RAM)",
    ],
  },
  {
    tag: "fork, exec, exit, wait, zombies, and orphans!",
    term: "Orphan Process",
    def: "An orphan process is a process whose parent has exited without calling wait().",
    points: [
      "Will eventually become an uncollectable zombie",
      "OS resolves via cascading termination or adoption by the reaper process",
      "Unlike zombies, orphans are NOT fine. Must be handled!",
    ],
  },
  {
    tag: "fork, exec, exit, wait, zombies, and orphans!",
    term: "Cascading Termination",
    def: "Cascading termination is a mechanism where when a process exits, all of its children and descendants are also terminated.",
    points: [
      "It is one way the OS handles orphan processes",
      "Prevents uncollectable zombies from accumulating",
      "Alternative: a designated process (reaper) adopts orphans and calls wait()",
    ],
  },

  // 14: Threads
  {
    tag: "Threads",
    term: "Thread of Execution",
    def: "A thread of execution is an independent unit of execution within a process with its own program counter and stack.",
    points: [
      "Shares code, data, and heap with other threads of the same process. Has its OWN stack",
      "Changes to global variables are immediately visible to all threads",
      "If one thread calls exec(), ALL threads in the process are gone",
    ],
  },
  {
    tag: "Threads",
    term: "Kernel Thread",
    def: "A kernel thread is a thread created and managed with OS involvement.",
    points: [
      "OS is aware of these. Can be scheduled across multiple cores",
      "Requires system call to create/delete, slower to manage",
      "Blocking I/O only blocks just that thread, not others",
    ],
  },
  {
    tag: "Threads",
    term: "User Thread",
    def: "A user thread is a thread managed entirely in user space without OS involvement.",
    points: [
      "Fast to manage, no system call overhead",
      "OS sees only one thread, so it can only schedule to one core",
      "One thread blocking on I/O blocks ALL threads in the process (bc OS thinks there is only one)",
    ],
  },
  {
    tag: "Threads",
    term: "Hardware Thread",
    def: "Just know that this refers to the count you see when buying cpu, and that this is true simultaneous execution. '8 cores, 16 threads'",
    points: [
      "One core can support two via Hyper-Threading (Intel) or SMT (AMD)",
      "Keeps two sets of register state, switches instantly when one stalls",
    ],
  },
  {
    tag: "Threads",
    term: "Thread Pool",
    def: "A thread pool is a fixed set of threads created when a process starts running that are kept sleeping and reused for incoming tasks.",
    points: [
      "Created at process start, maximum number created upfront",
      "Wake idle thread on task; freeze and return when done",
      "Eliminates overhead from creation/deletion for every task; caps thread count",
    ],
  },
  {
    tag: "Threads",
    term: "TLS",
    def: "Thread Local Storage is a tool that allows threads to have their own private copies of variables that appear global.",
    points: [
      "Looks global, but each thread has its own independent copy",
      "Changes in one thread are NOT visible to others",
    ],
  },
  {
    tag: "Threads",
    term: "Threads vs Processes",
    def: "Threads are faster to create, delete, and context switch. Processes are fault-independent.",
    points: [
      "Faster does NOT mean faster to execute. CPU speed is the same!",
      "One thread crash kills the whole process; one process crash is isolated",
      "This is why browsers use separate processes for tabs",
    ],
  },
  {
    tag: "Threads",
    term: "Race Condition",
    def: "A race condition is an error that occurs when multiple threads or processes access a shared resource simultaneously and at least one of them is modifying it.",
    points: [
      "Outcome depends on the unpredictable order of execution",
      "Reading only: no race condition. At least one modifying: race condition possible",
      "Classic example: two threads both do x++. They both read the same starting value instead of waiting for first one to save its increment. One increment gets lost",
    ],
  },

];

export default qrData;