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
        body: []
    },

    {
        title: "CPU Management",
        sub: "Multitasking & Scheduling",
        body: []
    },

    {
        title: "Memory Management",
        sub: "Virtual Memory",
        body: []
    },

    {
        title: "Contiguous Allocation & Fragmentation",
        sub: "Memory allocation strategies",
        body: []
    },

    {
        title: "I/O, Interrupts & Drivers",
        sub: "Device Interaction + Event Handling",
        body: []
    },

    {
        title: "Storage & File System",
        sub: "Abstraction of raw bytes",
        body: []
    },

    {
        title: "Networking & IPC",
        sub: "Communication within and across machines",
        body: []
    },

    {
        title: "PCB, States & Context Switch",
        sub: "Process Lifecycle Management",
        body: []
    },

    {
        title: "Fork, Exec, Exit, Wait",
        sub: "POSIX Process Operations",
        body: []
    },

    {
        title: "Threads",
        sub: "Lightweight Concurrency",
        body: []
    },

]

export default deepDiveData