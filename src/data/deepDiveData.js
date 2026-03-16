const deepDiveData = [
    
    {
        title: "What is an Operating System?",
        sub: "Introduction",
        body: [
            "An operating system is the most privileged software on your computer. It runs in kernel mode — a special CPU state that grants direct access to hardware, memory, and all connected devices.",
            [
                { text: "User programs run in " },
                { text: "user mode", bold: true },
                { text: " — restricted access, can't touch hardware directly. The OS runs in " },
                { text: "kernel mode", bold: true },
                { text: " — unrestricted. This separation is what stops a buggy program from crashing the whole system." },
            ],
            "The OS provides three core abstractions: processes (for CPU), virtual memory (for RAM), and files (for storage). Every high-level operation your app does eventually boils down to one of these.",
        ],
        terms: [
            { t: "Kernel Mode", d: "CPU execution state with full hardware access. Only the OS kernel runs here." },
            { t: "User Mode", d: "CPU execution state with restricted hardware access. All user programs run here." },
            { t: "Privileged Instruction", d: "A CPU instruction that can only execute in kernel mode. Attempting it in user mode causes a trap." },
        ],
        exam: [
            "The OS is software, not hardware.",
            "Kernel mode ≠ kernel. The kernel is a program; kernel mode is a CPU state.",
            "The OS is the only software that interacts directly with hardware.",
        ]
    },
    
    {
        title: "Why OS?",
        sub: "Introduction",
        body: []
    },

    {
        title: "Types of Operating Systems",
        sub: "Introduction",
        body: []
    },

    {
        title: "What is the Kernel?",
        sub: "Introduction",
        body: []
    },

    {
        title: "1: Running Programs",
        sub: "OS Functions",
        body: []
    },

    {
        title: "1a: Dual Mode",
        sub: "OS Functions",
        body: []
    },

    {
        title: "2: CPU Management",
        sub: "OS Functions",
        body: []
    },

    {
        title: "2a: Multitasking",
        sub: "OS Functions",
        body: []
    },

    {
        title: "3: Memory Management",
        sub: "OS Functions",
        body: []
    },

    {
        title: "3a: Virtual Memory",
        sub: "OS Functions",
        body: []
    }
]

export default deepDiveData