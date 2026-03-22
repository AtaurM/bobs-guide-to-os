const deepDiveData = [
    
    {
        title: "Operating System",
        sub: "The full picture",
        body: [
            [
                { text: "A machine's operating system is software (a " },
                { text: "program", bold: true },
                { text: " ) that acts as an intermediary between the machine's hardware and user applications. It sits between them in layers, with " },
                { text: "hardware", bold: true },
                { text: " at one end, then the " },
                { text: "OS kernel", bold: true },
                { text: ", then " },
                { text: "OS services", bold: true },
                { text: ", and then " },
                { text: "applications", bold: true },
                { text: ". Each layer only communicates with the ones directly adjacent to it." },
            ],
            [
                { text: "Operating systems have 3 general responsibilities:", bold: true}
            ],
            { list: [
            [
                { text: "Manage access to shared resources, ensuring there are no conflicts that would interfere with the user experience." },
            ],
            [
                { text: "Abstract", bold: true },
                { text: " hardware complexity and provide a standard interface (API) for applications to request services from the OS, making hardware simpler—or even possible—to use for developers." },
            ],
            [
                { text: "Enforce protection between processes and overall system " },
                { text: "security", bold: true },
                { text: "." },
            ],
            ]},
            [
                { text: "Kernel space and user space are " },
                { text: "regions of memory", bold: true },
                { text: " with different privilege levels. The kernel—the " },
                { text: "core", bold: true },
                { text: " of the OS—" },
                { text: "runs", bold: true },
                { text: " in kernel space with full hardware access. Some additional OS services, though still considered part of the OS, run in user space alongside regular applications but with restricted privileges." },
            ],
            [
                { text: "OS architectures differ in how much functionality lives in the kernel:", bold: true }
            ],
            { list: [
            [
                { text: "Operting systems with a " },
                { text: "monolithic kernel architecture", bold: true },
                { text: " (e.g., Linux) pack all OS functionality into the kernel. Because most components live inside the kernel, communication between them is fast. The tradeoff is stability—a bug anywhere in the kernel runs at full privilege, so it can crash the entire system." },
            ],
            [
                { text: "The " },
                { text: "microkernel architecture", bold: true },
                { text: " keeps only the most essential functions are kept in the kernel (typically IPC and basic scheduling), with everything else running in user space. These systems tend to be more fault-tolerant but also have more overhead from frequent switching between kernel and user space." },
            ],
            ]},
            [
                { text: "The OS also provides an " },
                { text: "API", bold: true },
                { text: ": a higher-level abstraction over raw system calls, making them easier to use. Examples include WinAPI for Windows and the POSIX API for Unix-like systems. POSIX is a " },
                { text: "standard", bold: true },
                { text: " ensuring API compatibility across different Unix-like systems, meaning code written for one POSIX-compliant OS will typically run on another with minimal changes." },
            ],
        ],
        terms: [
            { t: "Operating System", d: "A program that manages hardware and provides other programs with an environment to run in." },
            { t: "Process", d: "A program in execution (one running instance of a program)." },
            { t: "API", d: "A set of tools (functions, classes) the OS provides to programmers for building applications. Uses system calls under the hood, making them easier to utilize and work with." },
            { t: "POSIX", d: "A standard that operating systems can follow, ensuring a consistent API across compliant systems." },
        ],
        exam: [
            "An operating system is a PROGRAM.",
            "A process is NOT a program. It is a program IN EXECUTION.",
        ],
    },
    
    {
        title: "Types of OS",
        sub: "Hardware Restrictions + User Requirements",
        body: [
            [
                { text: "Your smartphone, laptop, PC, and Google’s servers are very different devices with " },
                { text: "different hardware", bold: true },
                { text: " and completely different needs. Different " },
                { text: "types", bold: true},
                { text: " of operating systems prioritize different things:" }
            ],
            { list: [
                [
                    { text: "OS for " },
                    { text: "personal machines", bold: true },
                    { text: " prioritize user experience. Examples include Windows, Linux, MacOS, and ChromeOS. Do not list different Linux distributions as separate OS on exams." }
                ],
                [
                    { text: "OS for " },
                    { text: "mobile devices", bold: true },
                    { text: " also prioritize user experience, but prioritize working with " },
                    { text: "limited", bold: true },
                    { text: " resources even more. Examples include Android and iOS." }
                ],
                [
                    { text: "OS for " },
                    { text: "servers", bold: true },
                    { text: " are not expected to be as convenient as PC/mobile, as they prioritize " },
                    { text: "stability", bold: true },
                    { text: " and efficiency. Examples include Linux (don’t list this with PC Linus OS on exams), Free BSD, Microsoft Windows Server, and Solaris." }
                ],
                [
                    { text: "Embedded OS", bold: true },
                    { text: " are by far the " },
                    { text: "most widespread", bold: true },
                    { text: " type of OS. They prioritize working with "},
                    { text: "extermely limited", bold: true },
                    { text: " resources and typically deal with much "},
                    { text: "simpler user interaction", bold: true },
                    { text: ". Examples include VsWorks, Linux (minimalistic versions), and FreeRTOS. Embedded OS are designed for devices such as consumer electronics (smart TVs, cameras), home appliances (washers, smart thermostats), automotive systems (anti-lock braking system), medical devices, and industrial automation."},
                ]
            ]},
        ],
        exam: [
            "Do NOT list multiple Linux distributions as individual operating system examples",
            "Top 6 EASY TO REMEMBER: Personal: Windows, MacOS, Linux, ChromeOS; Mobile: Android, iOS."
        ]
    },

    {
        title: "Dual Mode & System Calls",
        sub: "User & Kernel Mode + Context Switch",
        body: [
            [
                { text: "The CPU can execute instructions in different " },
                { text: "modes", bold: true },
                { text: ". In a " },
                { text: "dual mode", bold: true },
                { text: " architecture, the CPU can run in " },
                { text: "user mode", bold: true },
                { text: " and " },
                { text: "kernel mode", bold: true },
                { text: ". In user mode, the CPU will refuse any attempt to execute a privileged instruction and alert the OS. In kernel mode, the CPU will execute all instructions."},
            ],
            "A system call is a request for a service from the operating system. When the CPU executes a system call, it automatically (hardwired behavior) switches to kernel mode and executes the OS’ syscall handler. The application must load the system call number into a specific register before the request. The OS checks this, executes the request service if the application has permission, and then switches back.",
            [
                { text: "This switching is known as " },
                { text: "context switching", bold: true },
                { text: ". It requires updating the process' PCB (" },
                { text: "saving context", bold: true },
                { text: "), meaning the CPU has to spend more time doing this for every system call instead of executing processes. System calls require one switch to the OS and one back. Well-optimized code minimizes syscalls to reduce this overhead." }
            ],
            "In 2024, security software from Crowdstrike was granted kernel-mode execution rights by Microsoft certification. One update contained a null pointer dereference. Running in kernel mode, on 8.5 million Windows machines globally, it crashed the entire OS instead of just the application 💀💀💀",
        ],
        terms: [
            { t: "System call", d: "A request for a service from an application to the operating system." },
            { t: "Mode bit", d: "The CPU register that indicates the current execution mode (user or kernel in dual mode)." },
        ],
        exam: [
            "Syscall = ‘OS do it for me,’ NOT a request for extra privileges.",
            "Performance overhead = two mode switches (process → OS, OS → process)"
        ]
    },

    {
        title: "CPU Management",
        sub: "Multitasking & Scheduling",
        body: [
            [
                { text: "The OS is responsible for deciding which process gets to use the CPU next and has a "},
                { text: "scheduler", bold: true},
                { text: " component to make that decision. There are various scheduling algorithms that prioritize different things (fairness, average wait time, urgent work first, equal time per process, etc.). The "},
                { text: "ready queue", bold: true},
                { text: " holds all processes ready to use the CPU (not the processes themselves, of course, but references to them)."},
            ],
            [
                { text: "Multitasking is a technique used to "},
                { text: "fake", bold: true },
                { text: " simultaneous execution of processes. It’s implemented through rapid context switching (between two processes, which requires an intermediary switch to the OS). The OS uses a hardware timer that generates periodic interrupts. On each interrupt, the OS can preempt (kick off the CPU) the current process, save its state, and run another. From the user’s perspective, this "},
                { text: "appears", bold: true },
                { text: " to be simultaneous."},
            ],
            "CPU-bound processes have longer CPU-bursts (wants to spend more time on the CPU). I/O-bound describes processes that spend more time waiting for input/output. Good schedulers keep these in balance."
        ],
        exam: [
            "FAKE simultaneous. Don’t just write ‘simultaneously’ in the definition."
        ]
    },

    {
    title: "Memory Management",
    sub: "Virtual memory & the MMU",
    body: [
        "The OS is responsible for deciding how much memory each process gets and where in RAM it lives. Programs can ask for more memory, but it is ultimately the OS's decision. If a program tries to read or write outside its assigned chunk, the hardware (MMU) stops it.",
        [
        { text: "When more RAM is needed than is physically available, the OS uses " },
        { text: "virtual memory", bold: true },
        { text: ": portions of a process's memory are copied out to the hard disk when not needed, then fetched back into RAM when needed again. This is slow and expensive. If a program relies on it heavily, it is time to buy more RAM." },
        ],
        [
        { text: "One critical rule: programs " },
        { text: "cannot", bold: true },
        { text: " run directly from hard disk. Not a single instruction can be fetched from disk. If something was swapped out, it must be fully copied back into RAM before execution can resume." },
        ],
        [
        { text: "Programs do not work with physical memory addresses directly. Instead, each process works with its own " },
        { text: "logical address space", bold: true },
        { text: ": a private, process-specific view of memory that starts at 0. The " },
        { text: "MMU (Memory Management Unit)", bold: true },
        { text: " is a hardware device that sits between the CPU and RAM and converts logical addresses to physical addresses on every memory access. The OS tells the MMU how to do the conversion; the running program is completely unaware it is happening. It is practically impossible to program with physical addresses, unless you can somehow know exactly where your program will be in RAM when it is running." },
        ],
        [
        { text: "A " },
        { text: "page fault", bold: true },
        { text: " occurs when a program wants to access memory that has been swapped out to disk. The OS detects this, copies the page back into RAM, and only then resumes CPU execution. This is a normal OS event, not a crash." },
        ],
    ],
    terms: [
        { t: "Logical Address", d: "The address a process uses. Private and process-specific; starts at 0. The process has no knowledge of where it actually sits in physical RAM." },
        { t: "Physical Address", d: "The actual address in RAM hardware; determined at runtime by the OS and MMU." },
        { t: "Memory Management Unit (MMU)", d: "HARDWARE that converts logical addresses to physical addresses on every memory access." },
        { t: "Virtual Memory", d: "A TECHNIQUE to FAKE larger RAM by swapping unused memory to hard disk and fetching it back when needed." },
        { t: "Page Fault", d: "An event that occurs when a process accesses a page that is not currently in RAM (it was moved by the virtual memory technique). The OS copies it back from disk before resuming execution." },
    ],
    exam: [
        "Programs CANNOT run from DISK. They must be fully in RAM before any instruction can execute.",
        "The MMU converts addresses in HARDWARE. The program does NOT know this is happening.",
        "Virtual memory FAKES larger RAM by using hard disk. Not good to rely on it!",
        "A page fault is not a crash; it is a normal OS-handled event.",
    ],
    },

    {
    title: "I/O, Interrupts & Drivers",
    sub: "Event-driven hardware management",
    body: [
        "Programs do not interact with I/O devices directly. They ask the OS to do it. The OS collects input from hardware and passes it to applications. It receives output requests from applications and passes them to output devices. Everything flows through the OS!",
        [
        { text: "Rather than programming the OS to know about every possible I/O device, the OS defines a standard interface (different from the OS' API) and device manufacturers write " },
        { text: "drivers", bold: true },
        { text: ": small programs that implement that standard and handle communication with their specific device. This way, the OS works with any device, including ones that did not exist when the OS was written. Drivers run at or near kernel level, since they need access to kernel-level instructions to interact with hardware controllers." },
        ],
        [
        { text: "An " },
        { text: "interrupt", bold: true },
        { text: " is an electrical signal about an important event that requires immediate attention. Interrupts are how hardware communicates with the CPU asynchronously: you cannot know in advance when a key will be pressed, so you cannot just have an if-statement for it in your program code. Interrupts allow us to handle events that happen at unpredictable times." },
        ],
        "When an interrupt occurs, the following steps happen:",
        { list: [
        "The interrupt is generated. For example, a key is pressed, and the keyboard sends an electrical signal.",
        "The signal reaches the CPU. The CPU immediately pauses all current activity.",
        [
            { text: "The CPU identifies the type of interrupt (modern CPUs use an interrupt controller for this). It fetches the required interrupt handler, also called an " },
            { text: "ISR (Interrupt Service Routine)", bold: true },
            { text: " from the " },
            { text: "interrupt vector", bold: true },
            { text: ": a chunk of RAM that stores references to the ISRs." },
        ],
        "The CPU runs the interrupt handler. Every interrupt type has its own handler. The OS has some defaults, but hardware manufacturers can provide their own in their drivers.",
        "Once the interrupt is cleared, the CPU resumes its original activity.",
        ]},
        [
        { text: "Interrupts are not limited to I/O hardware. System calls are treated as interrupts; it's just that they are generated by the program itself. Almost any piece of hardware can generate one: the hard disk sends an interrupt when a file read completes, for example. There are also " },
        { text: "maskable interrupts", bold: true },
        { text: " (can be temporarily ignored) and " },
        { text: "unmaskable interrupts", bold: true },
        { text: " (cannot be ignored under any circumstances)." },
        ],
    ],
    terms: [
        { t: "Interrupt", d: "An electrical signal about an important event requiring immediate CPU attention. Causes the CPU to pause, run a handler, then resume." },
        { t: "ISR / Interrupt Handler", d: "Interrupt Service Routine. The code the CPU runs in response to a specific interrupt type." },
        { t: "Interrupt Vector", d: "A region of RAM storing the addresses of interrupt handlers, indexed by interrupt number. [I need to clarify if ISRs are stored in disk]" },
        { t: "Maskable Interrupt", d: "An interrupt that can be temporarily delayed or ignored by the CPU." },
        { t: "Unmaskable Interrupt", d: "An interrupt that the CPU cannot ignore under any circumstances." },
        { t: "Device Driver", d: "A small program that handles communication between the OS and a specific device. Written by the device manufacturer to follow the OS's defined standard." },
    ],
    exam: [
        "Know the interrupt steps in order: generated → reaches CPU → CPU pauses → identifies type → runs ISR → resumes.",
        "System calls are a type of interrupt.",
        "Drivers exist so the OS does not need to know about every device. The OS defines the standard; manufacturers implement it.",
        "Drivers run at or near kernel level.",
    ],
    },

    {
    title: "Storage & File Systems",
    sub: "Abstractions over raw bytes",
    body: [
        "All operations with storage devices go through the OS. Opening a file, appending to it, closing it. Every one of those is a request to the OS, not a direct interaction with hardware.",
        [
        { text: "Here is a fact that surprises most people: the hard disk has no concept of a file. It only knows coordinates and 0s and 1s. A " },
        { text: "file", bold: true },
        { text: " is a named collection of data that are logically connected/related. It is an abstraction that exists entirely at the OS level. When you open homework.txt, the OS looks up that file in its own internal data structure (file system), finds the corresponding disk coordinates, and tells the hardware to return the bytes at those locations. The disk complies, having no idea what a file is." },
        ],
        [
        { text: "The OS maintains a " },
        { text: "file system", bold: true },
        { text: ": a data structure stored at a known location on the disk that describes every file, including its name, disk coordinates, size, creation date, owner, permissions, and other attributes. The file system stores these descriptions, " },
        { text: "NOT", bold: true },
        { text: " the file " },
        { text: "CONTENTS", bold: true },
        { text: " themselves. Because it is stored at a predefined location, the OS always knows where to start looking for it." },
        ],
        [
        { text: "A single physical disk can be logically divided into non-overlapping areas, each with its own separate file system. These areas are called " },
        { text: "logical disks", bold: true },
        { text: " or " },
        { text: "partitions", bold: true },
        { text: ". This is what C: and D: are on Windows. One physical disk, two completely separate file systems describing two separate areas. Partitions that the OS does not want you to access directly are hidden from you. No need to memorize, but some common file system formats include NTFS (Windows), ext4 (Linux), and FAT32/FAT64 (USB drives, older systems)." },
        ],
    ],
    terms: [
        { t: "File", d: "A collection of related data stored under one name. An OS-level abstraction. The disk itself has no concept of files." },
        { t: "File System", d: "A data structure maintained by the OS that describes all files on a disk, including their physical coordinates, names, and other attributes." },
        { t: "Logical Disk (Partition)", d: "A portion of a physical disk described by its own separate file system. Multiple partitions can exist on one physical disk." },
    ],
    exam: [
        "The hard disk does NOT know what a file is. The OS does.",
        "The file system stores descriptions of files, NOT the files themselves.",
        "A logical disk (partition) is a SOFTWARE abstraction. One physical disk can have multiple logical disks.",
    ],
    },

    {
    title: "Networking",
    sub: "Communication across machines",
    body: [
        [
        { text: "Processes can't just talk with other processes or computers directly. All networking goes through the OS. The " },
        { text: "networking adapter", bold: true },
        { text: " is the hardware that physically sends and receives data on the network. It requires messages in a specific format (protocol). The OS takes application data, cuts it into pieces, wraps each piece in the appropriate protocol layers, and hands them off to the adapter." },
        ],
        [
        { text: "How two parties understand each other's data is governed by " },
        { text: "protocols", bold: true },
        { text: ". They are kind of like languages for processes: sets of rules describing how to send, receive, and interpret data. Every stage of a network transmission has its own protocol. When you hear " },
        { text: "TCP/IP", bold: true },
        { text: ", that refers to a whole family of protocols for data transmission, not a single one. You don't have to memorize specific protocols for exams, just understand that data transmission happens in layers, and each layer has its own rules." },
        ],
        [
        { text: "Each device on a network has a unique numeric identifier known as an " },
        { text: "IP address", bold: true },
        { text: ". In the classic IPv4 form, it looks like four unsigned byte values between 0 and 255 separated by dots (e.g., 56.32.123.99). When you type a URL instead of an IP address, your computer contacts a " },
        { text: "DNS server", bold: true },
        { text: " (Domain Name System) to look up the corresponding IP address. Your DNS server's own address comes from your network settings, often assigned automatically when you connect to the network." },
        ],
        [
        { text: "Knowing the destination IP is still not enough, however. Multiple processes can be running on the same machine. When a message arrives at a server, the OS needs to know which process should receive it. This is handled by " },
        { text: "networking ports", bold: true },
        { text: ": a unique numeric identifier assigned to every process in the system that wants to use the network. Think of it like the IP address being like a home address, and the port is like the name of the person at that address." },
        ],
        [
        { text: "You need both!!! A " },
        { text: "networking socket", bold: true },
        { text: " is the combination of an IP address and a port number. For example: 55.220.0.51:81. It uniquely identifies a specific process on a specific machine on the network and serves as the endpoint for communication." },
        ],
        [
        { text: "Some ports have predefined, reserved purposes. These are called " },
        { text: "well-known ports", bold: true },
        { text: " and occupy the range 0–1023. For example, web servers typically listen on port 80. Nobody should use these ports for random purposes. When a client contacts a server via a well-known port, the client also includes a return address (its own IP and port) so the server knows where to reply." },
        ],
    ],
    terms: [
        { t: "Networking Adapter", d: "A hardware device that physically sends and receives data on the network. Requires OS as a translator to use." },
        { t: "Networking Protocol", d: "A set of rules describing how to send, receive, and understand data. Each layer of a network transmission has its own protocol." },
        { t: "IP Address", d: "A unique numeric identifier for a device on a network (e.g., 56.32.123.99 in IPv4). Each number is one unsigned byte (0–255)." },
        { t: "DNS Server", d: "A server that translates URLs into IP addresses. DNS stands for \"Domain Name System.\"" },
        { t: "Networking Port", d: "A unique numeric identifier assigned to every process in the system that wants to use the network. Identifies WHICH PROCESS on a machine a message is meant for." },
        { t: "Well-Known Ports", d: "Ports with predefined purposes. Range: 0–1023." },
        { t: "Networking Socket", d: "The combination of an IP address and a networking port (e.g., 55.220.0.51:81). Uniquely identifies a communication endpoint (specific process on a specific machine in the network)." },
    ],
    exam: [
        "DNS translates URLs to IP addresses. Your computer gets the DNS server address from its network settings.",
        "IP address alone is NOT ENOUGH: you NEED a port to identify WHICH PROCESS on the machine should receive the message.",
        "Networking socket = IP address AND port number.",
        "Well-known ports = Do NOT just say \"ports 0–1023.\" You MUST explain that they have predefined purposes.",
    ],
    },

    {
    title: "Inter-Process Communication (IPC)",
    sub: "How processes share data",
    body: [
        [
        { text: "By default, processes are isolated in separate areas of RAM with no knowledge of each other. " },
        { text: "IPC (Inter-Process Communication)", bold: true },
        { text: " refers to a set of OS-provided mechanisms that allow processes to exchange data. There is no way for two processes to pass data to each other without the OS's involvement in some form." },
        ],
        "There are two general approaches:",
        { list: [
        [
            { text: "Message passing", bold: true },
            { text: " has every communication request go through the OS: Every time process A wants to send data to process B, it goes through the OS. This adds performance overhead from system calls, but it is easier to program correctly and works across different machines on a network." },
        ],
        [
            { text: "Shared memory", bold: true },
            { text: " has the OS set up a shared region of RAM once; after that, both processes access it directly using regular load/store instructions with no OS involvement per access, making it faster. However, it only works on the same machine, and race conditions become the programmer's problem. Processes MUST request the OS to create this shared region if they want it." },
        ],
        ]},
    ],
    terms: [
        { t: "IPC", d: "Inter-Process Communication. OS-provided mechanisms for processes to exchange data." },
        { t: "Message Passing", d: "IPC where the OS moderates every exchange. Slower due to system call overhead, easier to program correctly, works across different machines." },
        { t: "Shared Memory", d: "IPC where the OS creates a shared RAM region once; processes access it directly. Fast, same machine only, race conditions are the programmer's responsibility. Process must ask OS to create region if it wants it." },
    ],
    exam: [
        "Message passing: ALL messages go through the OS. Safer/easier to program, works across network.",
        "Shared memory: OS sets it up once, then hands it off to processes. Processes MUST request it first if they want it. Fast, same machine only, race conditions are your responsibility.",
        "Shared memory cannot be used between two processes on different computers.",
    ],
    },

    {
    title: "PCB, States & Context Switch",
    sub: "Process lifecycle management",
    body: [
        [
        { text: "Every process in the system is tracked by the OS using a " },
        { text: "Process Control Block (PCB)", bold: true },
        { text: ". The PCB typically contains the process's " },
        { text: "PID", bold: true },
        { text: " (unique numeric ID), the PID of its parent, CPU scheduling information, memory management info (the address of its RAM chunk), a list of open files (the list only—" },
        { text: "NOT", bold: true },
        { text: " the file contents), a list of requested I/O devices, a saved copy of the CPU register values, the program counter (so the CPU knows where execution should resume after a context switch), and more. All PCBs together form the " },
        { text: "process table", bold: true },
        { text: "." },
        ],
        [
        { text: "A " },
        { text: "context switch", bold: true },
        { text: " is the sequence of steps the OS takes to move the CPU from running one process to running another. It is necessary because both processes share the same physical CPU registers, so you cannot start running a new process without first saving the current one's state." },
        ],
        "The steps are:",
        { list: [
        "pause process P1,",
        "save all CPU registers and the PC of P1 into P1's PCB,",
        "load all CPU registers and the PC of P2 from P2's PCB, and then",
        "resume process P2.",
        ]},
        "Every process passes through a defined set of states during its lifetime.",
        { list: [
        [
            { text: "In the " },
            { text: "New", bold: true },
            { text: " state, the PCB is being created and the process is being prepared. The process is not yet competing for the CPU." },
        ],
        [
            { text: "In the " },
            { text: "Ready", bold: true },
            { text: " state, the process is fully prepared and waiting in the ready queue, competing for CPU time." },
        ],
        [
            { text: "In the " },
            { text: "Running", bold: true },
            { text: " state, the process is actively using the CPU. Only ONE process per core can be here at a time (except in the case of simultaneous multi-threading)." },
        ],
        [
            { text: "In the " },
            { text: "Waiting", bold: true },
            { text: " state, the process is blocked waiting for something (typically I/O) and gives up the CPU because it cannot do anything useful until that event completes." },
        ],
        [
            { text: "In the " },
            { text: "Terminated", bold: true },
            { text: " state, the process has finished and will never need anything again. Resources are freed, except for the process' PCB, which stays until its parent collects its exit status." },
        ],
        ]},
        [
        { text: "Processes that mostly want CPU time are called " },
        { text: "CPU-bound", bold: true },
        { text: ". Processes that mostly wait for I/O are called " },
        { text: "I/O-bound", bold: true },
        { text: "." },
        ],
    ],
    terms: [
        { t: "PCB", d: "Process Control Block. A record maintained by the OS for every process, containing its PID, state, register values, memory info, open files, and more." },
        { t: "Process Table", d: "The collection of all PCBs in the system, stored together." },
        { t: "Context Switch", d: "Save the current process's registers and PC into its PCB, then load the next process's registers and PC from its PCB." },
        { t: "Ready Queue", d: "The collection of processes that are ready and willing to use the CPU. The scheduler picks from here." },
        { t: "PC (Program Counter)", d: "In this course, PC = Program Counter. Stores the address of the next instruction to execute." },
    ],
    exam: [
        "Know the context switch steps in order: pause → save registers/PC into PCB → load next PCB → resume.",
        "Know all five states and what triggers each transition.",
        "A process in the Waiting state does not want the CPU; it is blocked on an event.",
        "Should a process terminate after completing an I/O request, it must FIRST return to the ready-queue (and ready state).",
        "The PCB stores a LIST of open files, not the file contents.",
    ],
    },

    {
    title: "fork, exec, exit, wait, zombies, and orphans",
    sub: "POSIX process operations",
    body: [
        [
        { text: "Note: SEE EXAM TIPS BELOW! Interactive forking walkthroughs & solution explanations available in study tab!", bold: true },
        ],
        [
        { text: "POSIX", bold: true },
        { text: " is a standard followed by Unix-like operating systems (notably Linux). It defines a set of operations available on compliant systems. Windows does not have these! It has its own functions with equivalent or similar functionality but different names. For example, because of how common it is to follow a fork with exec, Windows has " },
        { text: "CreateProcess", bold: true },
        { text: " to avoid unnecessary and expensive copying." },
        ],
        [
        { text: "fork()", bold: true },
        { text: " creates an almost exact copy of the calling process AND returns an integer. The original is the " },
        { text: "parent", bold: true },
        { text: "; the copy is the " },
        { text: "child", bold: true },
        { text: ". Both processes continue execution from the instruction immediately after the fork() call. The next " },
        { text: "INSTRUCTION", bold: true },
        { text: ". NOT the next LINE. The child does not start from the top of the program. fork() returns 0 to the child and a positive value (the child's PID) to the parent. A negative return value means the fork failed (e.g., not enough memory). Because the child gets its own full copy of the parent's memory, forking is not memory-efficient. It roughly doubles memory usage." },
        ],
        [
        { text: "exec(\"filename\")", bold: true },
        { text: " erases the " },
        { text: "ENTIRE", bold: true },
        { text: " content of the calling process and loads a new program from the specified executable file. The PID stays the same, but the program running is completely different. exec() does not return anything on success (only on failure). It is typically called in the child immediately after a fork(). As an optimization, the OS often delays actually copying the parent's memory until exec() is not called. If it sees you are about to replace the content anyway, it skips the copy." },
        ],
        [
        { text: "exit(status)", bold: true },
        { text: " stops the process and releases its resources. The status parameter describes success (0) or the type of error (non-zero). The PCB is kept until the parent collects the exit status by calling wait()." },
        ],
        [
        { text: "wait()", bold: true },
        { text: " causes the parent to pause until one of its children calls exit(). It collects the child's exit status and cleans up the PCB completely. Calling wait() with no children will return an error code." },
        ],
        "Two types of processes can occur if exit() and wait() are not called properly:",
        { list: [
        [
            { text: "A " },
            { text: "zombie process", bold: true },
            { text: " is a (child) process that has called exit() but whose parent has not yet called wait(). It holds no resources but still has a PCB. This is normal and expected. Zombies exist briefly while the parent processes the exit. The problem only arises if they accumulate for too long." },
        ],
        [
            { text: "An " },
            { text: "orphan process", bold: true },
            { text: " is a process whose parent has exited without calling wait(). The child will eventually exit and become a zombie with no parent to clean it up, and these can accumulate. The OS handles this either through " },
            { text: "cascading termination", bold: true },
            { text: " (killing all descendants when a process exits… 💀) or by having a designated process adopt orphans and call wait() for them. Aww. Oh wait the adopting process is called the reaper 💀💀" },
        ],
        ]},
    ],
    terms: [
        { t: "fork()", d: "Creates an almost exact copy of the calling process AND returns: 0 to child, positive PID to parent. Both continue from the instruction after the fork." },
        { t: "exec()", d: "ENTIRELY replaces the calling process's content with a new program. Same PID, completely different program. Does not return anything on success." },
        { t: "exit(status)", d: "Stops the process and releases resources. 0 = success; non-zero = error. PCB remains until parent calls wait()." },
        { t: "wait()", d: "Called by parent to pause until a child exits. Collects exit status and destroys the PCB." },
        { t: "Zombie Process", d: "Called exit() but parent hasn't called wait() yet. No resources, but PCB still exists. Fine until they accumulate in RAM." },
        { t: "Orphan Process", d: "Parent exited without calling wait(). Must be resolved by OS via cascading termination or adoption by reaper process." },
        { t: "Cascading Termination", d: "A mechanism where when a process exits, all children and descendants are also terminated." },
    ],
    exam: [
        "fork() return values: PARENT receives POSITIVE (child's PID); 0 to child; negative on failure.",
        "Both continue from the INSTRUCTION, NOT LINE—INSTRUCTION—RIGHT after the fork. Think 260. Scary I know but think of the VERY next OPERATION that occurs after the fork.",
        "exec() replaces the ENTIRE process. Same PID, completely new program.",
        "Zombie = exited but parent hasn't called wait() yet. Fine. Not a problem unless they accumulate.",
        "Orphan = parent exited without calling wait(). Not fine. Must be resolved by OS (cascading termination or adoption by reaper process).",
    ],
    },

    {
    title: "Threads",
    sub: "Lightweight independent execution unit",
    body: [
        [
        { text: "A " },
        { text: "thread of execution", bold: true },
        { text: " is an independent unit of execution within a process with its own program counter and stack. Multiple threads within the same process can run different parts of the code simultaneously (or appear to via multitasking), while sharing most of the process's memory." },
        ],
        [
        { text: "What threads " },
        { text: "share", bold: true },
        { text: " across the whole process: the text section (code), data section (global and static variables), and heap. What each thread keeps " },
        { text: "private", bold: true },
        { text: ": its own stack, program counter, and register values. Changes to global variables in one thread are immediately visible to all other threads of the same process. This is both a feature and a primary source of bugs. If one thread calls exec(), the entire process will be replaced, and all threads will be gone." },
        ],
        "Compared to processes, threads (OF THE SAME PROCESS) offer several advantages:",
        { list: [
        [
            { text: "They are " },
            { text: "memory efficient", bold: true },
            { text: ": creating a thread does not duplicate the entire memory space, and the stack starts nearly empty." },
        ],
        [
            { text: "They are " },
            { text: "fast to create and delete", bold: true },
            { text: " (because they don't copy like a process. Just allocate space for a new stack)." },
        ],
        [
            { text: "Context switching between threads of the same process is " },
            { text: "fast", bold: true },
            { text: " because they share the same memory space, so the MMU does not need to be updated." },
        ],
        [
            { text: "And they have " },
            { text: "shared memory by default", bold: true },
            { text: " because they already share the heap, text, and data sections." },
        ],
        ]},
        [
        { text: "When people say \"threads are faster than processes,\" they mean faster to " },
        { text: "create, delete, and context switch", bold: true },
        { text: ", NOT faster to execute. The CPU runs instructions at the same speed regardless." },
        ],
        [
        { text: "The key tradeoff: threads are " },
        { text: "not fault-independent", bold: true },
        { text: ". If one thread crashes (division by zero, illegal memory access, etc.), it brings down the entire process and all other threads with it. A misbehaving process only crashes itself. This is exactly why browsers use separate processes for tabs. If one tab crashes, the others keep running." },
        ],
        "There are three types of threads:",
        { list: [
        [
            { text: "Kernel threads", bold: true },
            { text: " are created and managed with OS involvement. The OS knows about them and can schedule them across multiple cores. They are slower to manage due to system call overhead." },
        ],
        [
            { text: "User threads", bold: true },
            { text: " are managed entirely in user space without OS involvement. They are fast to manage, but the OS sees only one thread, so it can only schedule the process on one core. If any user thread waits on I/O, all threads in the process have to wait with it because the OS thinks the entire process is waiting." },
        ],
        [
            { text: "Hardware threads", bold: true },
            { text: " refer to how many instruction streams a CPU can truly run simultaneously. One physical core can run two hardware threads via Hyper-Threading (Intel) or Simultaneous Multi-Threading (AMD) by keeping two sets of register state, switching between them when one stalls, and utilizing CPU components with one thread that aren't used by the other." },
        ],
        ]},
        [
        { text: "Thread Local Storage (TLS)", bold: true },
        { text: " is a tool (library) for managing variables that look global but are private to each thread." },
        ],
        [
        { text: "A " },
        { text: "thread pool", bold: true },
        { text: " is a set of threads created when the process first starts running. The process will create as many threads as possible, and then put them to sleep. Instead of creating and destroying a thread for each task, threads are woken up, given work, returned to the pool when done, and reused for incoming work. This avoids creation/deletion overhead and caps the total thread count from the start. Servers often receive many client requests per second and like to create a new thread for each. Imagine the overhead without the thread pool." },
        ],
    ],
    terms: [
        { t: "Thread of Execution", d: "An independent unit of execution within a process, with its own PC and stack, sharing code, data, and heap with other threads of the same process." },
        { t: "Kernel Thread", d: "Created and managed with OS help. Can be scheduled across multiple cores. Slower to manage." },
        { t: "User Thread", d: "Managed without OS involvement. Fast to manage but limited to one core; one thread waiting for something forces others to wait if they need it as well." },
        { t: "Hardware Thread", d: "The number of instruction streams a CPU can truly run simultaneously. One core can support two via Hyper-Threading (Intel) or Simultaneous Multi-Threading (AMD)." },
        { t: "Thread Local Storage (TLS)", d: "A tool to manage per-thread variables that appear global but are private to each thread." },
        { t: "Thread Pool", d: "A fixed set of (the maximum possible number of) threads. Created at start of process and kept sleeping and reused for tasks to avoid repeated creation and deletion overhead." },
    ],
    exam: [
        "\"Threads are faster than processes\" = faster to CREATE, DELETE, and CONTEXT SWITCH. NOT faster to execute.",
        "Threads are NOT fault-independent. One thread crashing kills the whole process.",
        "User threads cannot use multiple cores. If one waits on I/O, all have to wait.",
        "Kernel threads can use multiple cores but require system calls to manage.",
        "If one thread calls exec(), it replaces the entire process. All threads will be gone.",
    ],
    },
    
    {
    title: "Contiguous Memory Allocation & Fragmentation",
    sub: "How OS allocates memory + downsides",
    body: [
        [
        { text: "Contiguous allocation", bold: true },
        { text: " is a memory allocation technique where processes receive all of their memory in a single, unbroken chunk (we're talking about the physical address space here, btw). If a process needs 4MB, the OS finds a 4MB hole and gives it entirely to that process. The MMU tracks this using a " },
        { text: "base value", bold: true },
        { text: " (start address) and a " },
        { text: "limit value", bold: true },
        { text: " (size). Any access outside that range is blocked by hardware (MMU)." },
        ],
        [
        { text: "When a process exits, it releases its chunk, creating a " },
        { text: "memory hole", bold: true },
        { text: ". If we now allocate a slightly-smaller process in that hole, we have a tiny, realistically-unusable gap. This is known as " },
        { text: "fragmentation", bold: true },
        { text: ": a situation where RAM is wasted due to inefficient usage." },
        ],
        "There are two kinds of fragmentation:",
        { list: [
        [
            { text: "External fragmentation", bold: true },
            { text: " is wasted memory that belongs to no process. Holes exist but may be too small or scattered to be useful. Defragmentation (shifting processes to consolidate holes) is theoretically possible but extremely expensive. " },
        ],
        [
            { text: "Internal fragmentation", bold: true },
            { text: " is wasted memory that is allocated to a process but not actually used because the OS gave it more than it asked for. This does not happen in contiguous allocation (the OS gives exactly what is requested), but it does appear in other allocation schemes (like paging)." },
        ]
        ]},
        "When choosing which hole to place a process in, the OS has two main strategies:",
        { list: [
        [
            { text: "Best fit", bold: true },
            { text: " uses the smallest hole that is large enough. This preserves large holes but tends to leave behind many tiny leftover holes, maximizing external fragmentation." },
        ],
        [
            { text: "Worst fit", bold: true },
            { text: " uses the largest available hole, leaving behind a larger remainder that is more likely to be usable, minimizing external fragmentation." },
        ],
        ]},
        "In both cases, the process is placed at the leftmost position within the selected hole.",
    ],
    terms: [
        { t: "Contiguous Memory Allocation", d: "Memory allocation strategy where each process receives all of its memory in one unbroken chunk. The MMU uses a base and limit value to enforce boundaries." },
        { t: "Fragmentation", d: "A situation where RAM is wasted due to inefficient memory usage." },
        { t: "External Fragmentation", d: "Wasted memory not allocated to any process. Holes are too small or scattered to be useful." },
        { t: "Internal Fragmentation", d: "Wasted memory allocated to a process but not used because more was given than requested." },
        { t: "Defragmentation", d: "Shifting processes in memory to consolidate holes. Theoretically solves external fragmentation but is very expensive." },
    ],
    exam: [
        "External fragmentation = wasted memory belonging to NO process (OUTSIDE processes). Internal fragmentation = wasted memory belonging to a process (EXTRA memory given TO the process).",
        "Contiguous allocation does NOT produce internal fragmentation; it gives exactly what is requested.",
        "Best fit maximizes external fragmentation (tiny leftover holes). Worst fit minimizes it (larger leftovers).",
    ],
    },

    {
    title: "Paging",
    sub: "Breaking memory into equal chunks",
    body: [
        [
        { text: "Paging", bold: true },
        { text: " is a memory management technique that avoids the external fragmentation from contiguous allocation. The key idea is to split both logical and physical memory into fixed-size chunks, then map them freely." },
        ],
        [
        { text: "Pages", bold: true },
        { text: " are FIXED-SIZE chunks of a process' logical address space. " },
        { text: "Frames", bold: true },
        { text: " are fixed-size chunks of physical RAM. Pages and frames must always be the same size!" },
        ],
        "With paging, a process's data might appear perfectly contiguous in logical memory, but in physical RAM, its pages can be scattered across completely different frames. The process never sees this. It only ever works with logical addresses.",
        [
        { text: "The " },
        { text: "page table", bold: true },
        { text: " is a data structure maintained by the OS (stored in RAM) that records which physical frame each logical page maps to. The MMU uses it to convert addresses at runtime." },
        ],
        "Address translation works as follows given a logical address:",
        { list: [
        "Page number = logical address ÷ page size (integer division)",
        "Offset = logical address % page size",
        "Look up the page number in the page table to get the frame number",
        "Physical address = (frame number × page size) + offset",
        ]},
        [
        { text: "Paging introduces " },
        { text: "internal fragmentation", bold: true },
        { text: ". The OS can only allocate memory in whole-frame chunks. If a process's last page does not fill an entire frame, the remainder of that frame is wasted, as it is allocated to the process but unused. The OS cannot give half/a portion of a frame." },
        ],
    ],
    terms: [
        { t: "Page", d: "A fixed-size chunk of a process's logical address space." },
        { t: "Frame", d: "A fixed-size chunk of physical RAM. MUST be the same size as a page." },
        { t: "Page Table", d: "A data structure stored in RAM by the OS that maps page numbers to frame numbers. Used by the MMU for address translation." },
        { t: "Internal Fragmentation (in the context of Paging)", d: "The wasted space at the end of the last frame allocated to a process, because the OS must give whole frames." },
    ],
    exam: [
        "Pages are logical; frames are physical. They MUST be the SAME SIZE.",
        "Paging eliminates external fragmentation but introduces internal fragmentation.",
        "Processes are blind to physical memory. They ONLY work with LOGICAL addresses.",
        "Know how to do address translation: page# = logical ÷ page_size; offset = logical % page_size; physical = frame# × page_size + offset.",
    ],
    },

]

export default deepDiveData