import { forkExamples } from './forkExamples'

export const forkTricks = {
  title: 'How to fork',
  habits: [
    {
      title: 'First',
      body: [
        'Drill it into your brain that fork() does TWO things:',
        { list: [
          [
            { text: 'Creates a ' },
            { text: 'COPY', bold: true },
            { text: ' (we will call it the child process) of the current process (we will call it the parent process), unless that current process is the child made by the current fork.' },
          ],
          [
            { text: 'Returns the child\'s PID (which is a positive integer) to the ' },
            { text: 'parent', bold: true },
            { text: ' and ' },
            { text: '0', bold: true },
            { text: ' to the child.' },
          ],
        ]},
        [
          { text: 'If you forget which receives which, think: ' },
          { text: 'PARENT receives POSITIVE.', bold: true },
          { text: ' Write it down at the beginning of the exam. Child receives 0.' },
        ],
        [
          { text: 'Also, remember: ' },
          { text: 'forks', bold: true },
          { text: ' and ' },
          { text: 'processes', bold: true },
          { text: ' are ' },
          { text: 'NOT', bold: true },
          { text: ' the same thing! Forks ' },
          { text: 'create', bold: true },
          { text: " processes; processes are created by forks. It's the " },
          { text: 'fork', bold: true },
          { text: ' that returns values, ' },
          { text: 'NOT', bold: true },
          { text: ' the process.' },
        ],
      ],
    },
    {
      title: 'Second',
      body: [
        [
          { text: 'In C++, when you convert integer values to boolean, positive (and negative) integers are treated as ' },
          { text: 'true', bold: true },
          { text: '. 0 is the ' },
          { text: 'ONLY', bold: true },
          { text: ' integer that is treated as ' },
          { text: 'false', bold: true },
          { text: '.' },
        ],
        { list: [
          'Conditional expressions are always evaluated as boolean values.',
          'If-statements and for-loops contain conditional expressions.',
        ]},
      ],
    },
    {
      title: 'Wait i forgot one thing:',
      body: [
        [
          { text: 'Label', bold: true },
          { text: ' each fork FIRST, start your tree with P, and only then should you start processing the code.' },
        ]
      ],
    },
    {
      title: 'Third: Find the Fork',
      body: [
        [
          { text: 'The very first thing you want to do when you start analyzing a new process is ' },
          { text: 'FIND', bold: true },
          { text: ' the ' },
          { text: 'FORK', bold: true },
          { text: ' (that created it).' },
        ],
        'Remember how fork returns 0 to the child and positive to the parent? Boom, replace that fork with 0 in your head. Everything else, replace it with a positive value.',
        'Why?',
        { list: [
          [
            { text: 'Start with analyzing the parent process. Let\'s call it the ' },
            { text: 'root', bold: true },
            { text: ' process for now to avoid confusion. ' },
            { text: 'None', bold: true },
            { text: ' of the forks in the code created the root process. This means they all return a positive value. It\'s best to run through the entire process before moving on. We write down all the outputs and new processes ' },
            { text: 'before', bold: true },
            { text: ' continuing with one of those processes.' },
          ],
          'Imagine we have some print statements and then there\'s suddenly a fork. The root runs it and receives a positive value. When the root\'s child runs it, it should receive 0, right? Well, now imagine we continue through the code, run all remaining forks, and move onto the (first) child. It starts at that first fork. It runs it and receives 0.',
          [
            { text: 'Once we have done that step, we know that none of the ' },
            { text: 'remaining forks', bold: true },
            { text: ' created this process. For all of those forks, the current process is the parent ' },
            { text: 'of the new', bold: true },
            { text: ' (child) process created by the fork, so it receives a positive value.' },
          ],
          'It\'s just like root, except root has no parent, so there is no fork that created it. For all processes other than root, once you handle that fork that created it, the rest of the code runs just like root (apart from things affected by the return value of that fork).',
        ]},
      ],
    },
  ],
  interludes: [
    'The following example doesn\'t have any conditionals, but we can still practice. These habits will make the 2nd example go by way faster.',
    'Let\'s try some conditionals now.',
    [
      { text: 'Finally, let\'s try exec(). Remember: ' },
      { text: 'exec("filename")', bold: true },
      { text: ' will replace the ' },
      { text: 'entire', bold: true },
      { text: ' current process—not just the exec line; the whole process—with the contents of the file \'filename\'. For this example, let\'s say that prog.exe just contains: ' },
      { text: 'std::cout << "6";', bold: true },
    ],
  ],
  examples: forkExamples,
}

export const qaSections = [
  {
    id: 'os-functions',
    title: 'OS Functions',
    questions: [
      {
        q: 'What is an operating system?',
        a: ['An operating system is a program that manages hardware and provides other programs with an environment to run in.'],
        e: [],
      },
      {
        q: 'Examples of different operating systems.',
        a: [
          'Personal: Windows, MacOS, Linux, ChromeOS',
          'Mobile: Android, iOS',
          'Server: Windows Server, FreeBSD, Solaris, Linux',
          'Embedded: VxWorks, FreeRTOS, minimal Linux',
        ],
        e: [
          'Don\'t list multiple versions or distributions of Linux.',
          'Don\'t list both Windows and Windows Server.',
          '6 easiest to memorize: Android, iOS, Windows, MacOS, Linux, ChromeOS',
        ],
      },
      {
        q: 'What different types of computers exist (personal, mobile devices, servers, embedded)? How different are operating systems for different computer types?',
        a: [
          'Personal Computer: General purpose computing, supports multiple users and multitasking, requires significant hardware resources. OS prioritizes user experience.',
          'Mobile: OS supports touch screen, OS prioritizes user experience but with more constraints than PC such as with CPU, RAM, and battery. Closed ecosystems, so less user modification.',
          'Server: Used to provide services to other computers. Designed for high-performance and network management. OS prioritizes stability and efficiency.',
        ],
        e: ['Make sure you know the different priorities OS have for different computer types!'],
      },
      {
        q: 'What is the operating system kernel (central part of OS)?',
        a: [
          'The operating system kernel is the central component of an OS that performs the most important OS tasks.',
          'The specifics tasks depend on OS.',
          'It runs in kernel mode and issues privileged instructions.',
        ],
        e: ['Know the difference between user/kernel mode, user/kernel level, and user/kernel space (see \'Operating System\' concept page for this; the spaces are regions of RAM).'],
      },
      {
        q: 'List of operating system functions. For each item on this list, be ready to give a short description.',
        a: [
          'Note: more details are available for each of these in the other questions, as well as in the terms and concepts pages.',
          'Executing programs: OS is responsible for loading programs into RAM, scheduling them (processes) for execution, and keeping track of all relevant information required for execution (everything in the PCB).',
          'CPU management: OS is responsible for deciding which process gets the CPU next and when (scheduling). It also handles multitasking, which is a technique used to SIMULATE simultaneous execution of multiple processes by switching between them very quickly (not truly happening at the same time, just close enough for the human eye; that is, if there\'s no lag).',
          'RAM management: OS is responsible for keeping track of memory usage, allocating and deallocating memory to processes and preventing conflicts (out of bounds access). OS can use the virtualization technique to "extend" RAM by temporarily storing unused processes in hard disk, but it MUST load them back into RAM before executing them again.',
          'I/O management: OS is responsible for handling all exchanges between programs and I/O devices to ensure smooth, conflict-free usage and data transfer. It uses interrupts and interrupt handlers to allow programs to deal with input at unexpected or unpredictable times. To ensure device compatibility, the OS has a standard for device manufacturers to follow when writing drivers, which are small programs that allow the OS to interact with their devices.',
          'Storage management: OS is responsible for managing storage devices and all data stored in them. Programs and even the devices themselves are unaware of the contents. OS uses filesystems to keep files and all relevant data organized and accessible for itself when programs request data.',
          'Networking management: OS is responsible for handling communications between different computers. Processes do not handle this directly themselves. When a process wants to send information to another computer, it must give it to the OS. OS will prepare it and give it to the networking adapter, which will send it out to the other computer. When a networking adapter receives information, it sends it to the OS, NOT to the process that it is intended for. Adapter is unaware of the process. OS handles delivering message to the intended process.',
          'Inter-process Communication (IPC): Processes cannot just directly communicate with each other. The OS is responsible for providing processes with a means to do so safely. With the message passing technique, the message must first go to the OS before going to the receiving process. With shared memory, processes can directly modify resources in a shared region of memory, BUT they can ONLY do so AFTER the OS has allocated this region, which must be requested by the process.',
          'Security: OS is responsible for preventing and dealing with both security attacks AND user/program mistakes. This means it must manage access rights for each user and each program.',
          'User Interface: Users do not directly interact with the computer (hardware, software). Instead, the OS provides tools, such as graphical user interfaces or command line tools, to enable the user to safely and properly interact with the computer.',
        ],
        e: ['See concept and term pages (and further questions below) for more details.'],
      },
      {
        q: 'What is multitasking? How is it arranged?',
        a: ['Multitasking is a technique used to FAKE simultaneous execution of multiple processes on a single CPU core by switching between executing different processes very fast. The goal is to make it appear simultaneous to the human eye. It is arranged by the CPU scheduler in the OS.'],
        e: [],
      },
      {
        q: 'What are user and kernel modes? What are user and kernel level programs/processes?',
        a: [
          'User and kernel modes are two states of execution that the CPU can run in. In user mode, the CPU will refuse to execute high-privilege level instructions (what those are is determined by the OS) and will immediately switch to the OS on such attempt. In kernel mode, the CPU will execute all instructions. The current mode is stored in at a specific bit in a specific CPU register.',
          'User-level programs/processes are programs/processes that have restrictions/limitations for the kinds of instructions they are allowed to run.',
          'Kernel level programs/processes are programs/processes that are allowed to run any instruction.',
        ],
        e: ['Know the difference between user/kernel mode, user/kernel level, and user/kernel space (see \'Operating System\' concept card for this; they\'re regions of RAM).'],
      },
      {
        q: 'What is virtual memory?',
        a: ['Virtual memory is a technique used to FAKE an extension of RAM by moving unused/underused processes to the hard disk. These processes MUST be moved back to RAM before continuing their execution.'],
        e: [],
      },
      {
        q: 'What are interrupts? What are interrupt handlers? What issues interrupts? What is the sequence of things that happen when the interrupt arrives?',
        a: [
          'Interrupts are an electrical signal about an important event that requires immediate attention.',
          'An interrupt handler (or Interrupt Service Routine (ISR)) is the code the CPU runs in response to a specific interrupt type.',
          'Interrupts are issued by hardware devices. One common example is your keyboard.',
          'Steps:',
          'Interrupt is generated by some device.',
          'Interrupt travels to and reaches the CPU',
          'CPU pauses all current activity and finds the proper handler/ISR',
          'CPU runs the ISR',
          'CPU resumes execution of process it was on before interrupt.',
        ],
        e: ['Concept page: I/O, Interrupts & Drivers'],
      },
      {
        q: 'What are drivers?',
        a: ['Drivers are small programs provided by device manufacturers that enable the OS to communicate with and utilize the device. The OS has a standard that device manufacturers must follow to ensure compatibility with the OS.'],
        e: [],
      },
      {
        q: 'What is a file? What is a file system? What is a logical disk?',
        a: [
          'A file is a named collection of related data.',
          'A file system is a data structure maintained by the OS describing all files in a logical disk (partition), including physical coordinates, names, and other attributes.',
          'A logical disk is a portion of a physical disk described by its own separate file system. Also called a partition. For example, C: and D: are logical disks.',
        ],
        e: ['These are OS-level abstractions/concepts, meaning the disk has no concept of them. Disk just sees coordinates and a huge array of 0s and 1s.'],
      },
      {
        q: 'What are networking protocols?',
        a: ['A networking protocol is a set of rules describing how to send, receive, and understand data.'],
        e: [],
      },
      {
        q: 'What is the operating system API?',
        a: ["An operating system's API is a set of tools (functions, classes) the OS provides to programmers for building applications."],
        e: ['Uses system calls under the hood, making them easier to utilize and work with.'],
      },
      {
        q: 'What is a context switch?',
        a: ['A context switch is a sequence of steps to move the CPU from running one process to running another.'],
        e: [
          "Steps: pause P1 → save registers/PC to PCB → load P2's PCB → resume P2",
          'Not free! Reading/writing RAM takes time!',
          'Every system call requires two context switches (P -> OS -> P)',
        ],
      },
    ],
  },
  {
    id: 'processes',
    title: 'Processes',
    questions: [
      {
        q: 'What is a process?',
        a: ['A process is a program in execution.'],
        e: ['It includes the program code (text section), stack, data section, and heap.'],
      },
      { q: 'What is the difference between a process and a program?', a: [], e: [] },
      { q: 'List five process states (use the naming from our textbook and class).', a: [], e: [] },
      { q: 'What is the ready queue? How many ready queues do you expect in the system?', a: [], e: [] },
      { q: 'What is the I/O queue? How many I/O queues do you expect in the system?', a: [], e: [] },
      { q: 'What happens to a process when it requests an I/O operation (like file reading) in the classic "blocking" scenario?', a: [], e: [] },
      { q: 'Where does the process go once the I/O request is complete?', a: [], e: [] },
      { q: 'Understand what happens to processes in reality when process states change (don\'t be fooled by process "movements" in typical visualizations).', a: [], e: [] },
      { q: 'Process Control Block (PCB). What typical components can you see there?', a: [], e: [] },
      { q: 'Context switch. Why does context switching have a small performance overhead? How does that overhead affect system calls?', a: [], e: [] },
      { q: 'What is POSIX?', a: [], e: [] },
      { q: 'fork()', a: [], e: [] },
      { q: 'exec()', a: [], e: [] },
      { q: 'exit()', a: [], e: [] },
      { q: 'wait()', a: [], e: [] },
      { q: 'Layout of a process in memory: text section, data section, heap, and stack.', a: [], e: [] },
      { q: 'What are the properties of heap (it is fragmented, full of holes)? How does it affect the typical dynamic memory allocation like using the operator new?', a: [], e: [] },
      { q: 'What are the properties of stack?', a: [], e: [] },
      { q: 'Orphan processes. Why are they bad?', a: [], e: [] },
      { q: 'Zombie process. For how long does it exist?', a: [], e: [] },
    ],
  },
  {
    id: 'ipc',
    title: 'IPC',
    questions: [
      {
        q: 'What is IPC?',
        a: ['IPC (Inter-Process Communication) is a set of mechanisms that allow different processes to communicate with each other.'],
        e: ['Since processes have separate memory spaces, they need special mechanisms to share data.'],
      },
      { q: 'What are the two general classes of IPC (shared memory and message passing)?', a: [], e: [] },
      { q: 'What is the idea of shared memory? What are the advantages and disadvantages of shared memory?', a: [], e: [] },
      { q: 'What is the idea of message passing? What are the advantages and disadvantages of message passing?', a: [], e: [] },
      { q: 'Can shared memory IPC be used for two processes running on two different computers? Why do you think so?', a: [], e: [] },
      { q: 'What is a network (a bunch of computers connected together to exchange data)?', a: [], e: [] },
      { q: 'What is an IP address? How does a classic IP address (IPv4) look?', a: [], e: [] },
      { q: 'Why is an IP address alone not enough for networking communications?', a: [], e: [] },
      { q: 'What is a networking port?', a: [], e: [] },
      { q: 'What are well-known ports? (the answer "first 1024 ports" is worth 0 points)', a: [], e: [] },
      { q: 'What is a (networking) socket?', a: [], e: [] },
      { q: 'What is a server (like in "web server" or "email server")?', a: [], e: [] },
      { q: 'What is a client?', a: [], e: [] },
      { q: 'What is a communication protocol?', a: [], e: [] },
      { q: 'What is a URL?', a: [], e: [] },
      { q: 'What is DNS?', a: [], e: [] },
    ],
  },
  {
    id: 'threads',
    title: 'Threads',
    questions: [
      {
        q: 'What is a thread of execution (a.k.a. just thread)?',
        a: ['A thread of execution is an independent unit of execution within a process with its own program counter, registers (the values) and stack.'],
        e: ['A process can (and often will) have multiple threads, all sharing the same memory space'],
      },
      { q: 'Why might we want to create new threads of execution instead of new processes?', a: [], e: [] },
      { q: 'Why might we want to create new processes instead of new threads?', a: [], e: [] },
      { q: 'What do threads belonging to the same process share? What do they not share?', a: [], e: [] },
    ],
  },
]