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
      { text: ' current process (not just the exec line; the whole process) with the contents of the file \'filename\'. For this example, let\'s say that prog.exe just contains: ' },
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
          [{ text: 'Personal:', bold: true }, { text: ' Windows, MacOS, Linux, ChromeOS' }],
          [{ text: 'Mobile:', bold: true }, { text: ' Android, iOS' }],
          [{ text: 'Server:', bold: true }, { text: ' Windows Server, FreeBSD, Solaris, Linux' }],
          [{ text: 'Embedded:', bold: true }, { text: ' VxWorks, FreeRTOS, minimal Linux' }],
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
          [{ text: 'Personal Computer:', bold: true }, { text: ' General purpose computing, supports multiple users and multitasking, requires significant hardware resources. OS prioritizes user experience.' }],
          [{ text: 'Mobile:', bold: true }, { text: ' OS supports touch screen. OS prioritizes user experience but with more constraints than PC (CPU, RAM, battery). Closed ecosystems, so less user modification.' }],
          [{ text: 'Server:', bold: true }, { text: ' Used to provide services to other computers. Designed for high-performance and network management. OS prioritizes stability and efficiency.' }],
        ],
        e: ['Make sure you know the different priorities OS have for different computer types!'],
      },
      {
        q: 'What is the operating system kernel (central part of OS)?',
        a: [
          'The operating system kernel is the central component of an OS that performs the most important OS tasks.',
          'The specific tasks depend on the OS design. It runs in kernel mode and issues privileged instructions.',
        ],
        e: ['Know the difference between user/kernel mode, user/kernel level, and user/kernel space (see the Operating System concept page; the spaces are regions of RAM).'],
      },
      {
        q: 'List of operating system functions. For each item on this list, be ready to give a short description.',
        a: [
          [{ text: 'Note:', bold: true }, { text: ' more details are available for each of these in the other questions, as well as in the terms and concepts pages.' }],
          [{ text: 'Executing programs:', bold: true }, { text: ' OS is responsible for loading programs into RAM, scheduling them (processes) for execution, and keeping track of all relevant information required for execution (everything in the PCB).' }],
          [{ text: 'CPU management:', bold: true }, { text: ' OS is responsible for deciding which process gets the CPU next and when (scheduling). It also handles multitasking, a technique used to SIMULATE simultaneous execution of multiple processes by switching between them very quickly.' }],
          [{ text: 'RAM management:', bold: true }, { text: ' OS is responsible for keeping track of memory usage, allocating and deallocating memory to processes, and preventing conflicts (out of bounds access). OS can use virtual memory to extend RAM by temporarily storing unused processes on disk, but they MUST be loaded back into RAM before executing again.' }],
          [{ text: 'I/O management:', bold: true }, { text: ' OS is responsible for handling all exchanges between programs and I/O devices to ensure smooth, conflict-free usage and data transfer. It uses interrupts and interrupt handlers to allow programs to deal with input at unexpected or unpredictable times. To ensure device compatibility, the OS defines a standard that device manufacturers follow when writing drivers.' }],
          [{ text: 'Storage management:', bold: true }, { text: ' OS is responsible for managing storage devices and all data stored in them. Programs and even the devices themselves are unaware of the file structure. OS uses filesystems to keep files and all relevant data organized and accessible.' }],
          [{ text: 'Networking management:', bold: true }, { text: ' OS is responsible for handling communications between different computers. When a process wants to send data, it gives it to the OS. The OS prepares it and passes it to the networking adapter. When a networking adapter receives data, it goes to the OS first, not directly to the process.' }],
          [{ text: 'Inter-process Communication (IPC):', bold: true }, { text: ' Processes cannot directly communicate with each other. The OS provides mechanisms to do so safely. With message passing, the message goes through the OS. With shared memory, processes can directly access a shared region of RAM, but only after the OS allocates it upon request.' }],
          [{ text: 'Security:', bold: true }, { text: ' OS is responsible for preventing and dealing with both security attacks AND user/program mistakes. This means it must manage access rights for each user and each program.' }],
          [{ text: 'User Interface:', bold: true }, { text: ' Users do not directly interact with the computer hardware. Instead, the OS provides tools (graphical user interfaces or command line tools) to enable the user to safely and properly interact with the computer.' }],
        ],
        e: ['See concept and term pages (and further questions below) for more details.'],
      },
      {
        q: 'What is multitasking? How is it arranged?',
        a: [
          'Multitasking is a technique used to FAKE simultaneous execution of multiple processes on a single CPU core by switching between them very fast. The goal is to make it appear simultaneous to the human eye.',
          'It is arranged by the CPU scheduler in the OS.',
        ],
        e: [],
      },
      {
        q: 'What are user and kernel modes? What are user and kernel level programs/processes?',
        a: [
          'User and kernel modes are two states of execution the CPU can run in. In user mode, the CPU refuses to execute high-privilege instructions and immediately switches to the OS on such an attempt. In kernel mode, the CPU executes all instructions. The current mode is stored in a specific bit in a specific CPU register.',
          'User-level programs/processes are programs/processes that have restrictions on the kinds of instructions they are allowed to run.',
          'Kernel-level programs/processes are programs/processes that are allowed to run any instruction.',
        ],
        e: ['Know the difference between user/kernel mode, user/kernel level, and user/kernel space (see the Operating System concept card; they are regions of RAM).'],
      },
      {
        q: 'What is virtual memory?',
        a: [
          'Virtual memory is a technique used to FAKE an extension of RAM by moving unused/underused processes to the hard disk.',
          'These processes MUST be moved back to RAM before continuing their execution. They cannot execute directly from disk.',
        ],
        e: [],
      },
      {
        q: 'What are interrupts? What are interrupt handlers? What issues interrupts? What is the sequence of things that happen when the interrupt arrives?',
        a: [
          'An interrupt is an electrical signal about an important event that requires immediate CPU attention.',
          'An interrupt handler (or Interrupt Service Routine, ISR) is the code the CPU runs in response to a specific interrupt type.',
          'Interrupts are issued by hardware devices. One common example is your keyboard.',
          [{ text: 'Steps:', bold: true }],
          [{ text: '1)', bold: true }, { text: ' Interrupt is generated by some device.' }],
          [{ text: '2)', bold: true }, { text: ' Interrupt travels to and reaches the CPU.' }],
          [{ text: '3)', bold: true }, { text: ' CPU pauses all current activity and finds the proper handler/ISR.' }],
          [{ text: '4)', bold: true }, { text: ' CPU runs the ISR.' }],
          [{ text: '5)', bold: true }, { text: ' CPU resumes execution of the process it was on before the interrupt.' }],
        ],
        e: [[{ text: 'Concept page:', bold: true }, { text: ' I/O, Interrupts & Drivers' }]],
      },
      {
        q: 'What are drivers?',
        a: [
          'A device driver is a small program that handles communication between the OS and a specific device. It is written by the device manufacturer.',
          'The OS defines a standard that device manufacturers must follow, so the OS does not need to know about every device, just the interface.',
        ],
        e: [],
      },
      {
        q: 'What is a file? What is a file system? What is a logical disk?',
        a: [
          'A file is a named collection of related data. It is an OS-level abstraction: the disk has no concept of files, just 0s, 1s, and coordinates.',
          'A file system is a data structure maintained by the OS describing all files on a disk, including physical coordinates, names, and other attributes. It stores descriptions of files, not file contents.',
          'A logical disk (also called a partition) is a portion of a physical disk described by its own separate file system. For example, C: and D: on Windows are logical disks.',
        ],
        e: [],
      },
      {
        q: 'What are networking protocols?',
        a: ['A networking protocol is a set of rules describing how to send, receive, and understand data.'],
        e: [],
      },
      {
        q: 'What is the operating system API?',
        a: [
          "An operating system's API is a set of tools (functions, classes) the OS provides to programmers for building applications.",
          'These tools use system calls under the hood, making them easier to utilize and work with.',
        ],
        e: [],
      },
      {
        q: 'What is a context switch?',
        a: [
          'A context switch is a sequence of steps to move the CPU from running one process to running another.',
          [{ text: 'Steps:', bold: true }, { text: ' pause P1 -> save registers/PC to PCB -> load P2\'s PCB -> resume P2' }],
        ],
        e: [
          'Not free! Reading/writing RAM takes time, so context switching has a small but real performance overhead.',
          'Every system call requires two context switches (P -> OS -> P), which is why system calls are more expensive than equivalent user-level operations.',
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
        a: [
          'A process is a program in execution. It is one running instance of a program, and one program can have multiple processes.',
          'The OS manages processes entirely: it creates a PCB for each one, allocates memory, and tracks all state.',
        ],
        e: ['A process is dynamic: it requests resources, makes system calls, and changes state over time. A program is just static code in an executable file.'],
      },
      {
        q: 'What is the difference between a process and a program?',
        a: [
          'A program is a static list of CPU instructions stored in an executable file. It does not change.',
          'A process is a program in execution: it is dynamic, has its own memory and state, makes requests to the OS, and is managed by the OS. One program can have multiple processes running at the same time.',
        ],
        e: [],
      },
      {
        q: 'List five process states (use the naming from our textbook and class).',
        a: [
          [{ text: '1) New:', bold: true }, { text: ' the PCB is being created and the process is being prepared. Not yet competing for the CPU.' }],
          [{ text: '2) Ready:', bold: true }, { text: ' fully prepared and waiting in the ready queue for CPU time.' }],
          [{ text: '3) Running:', bold: true }, { text: ' actively using the CPU. Only one process per core at a time.' }],
          [{ text: '4) Waiting:', bold: true }, { text: ' blocked on an event (like I/O) and not competing for the CPU.' }],
          [{ text: '5) Terminated:', bold: true }, { text: ' has finished and will never need anything again. Resources released immediately, PCB kept until parent calls wait().' }],
        ],
        e: [],
      },
      {
        q: 'What is the ready queue? How many ready queues do you expect in the system?',
        a: [
          'The ready queue is the collection of processes (references to their PCBs) that are ready and willing to use the CPU.',
          'It does not have to be an actual queue: the OS uses its scheduling algorithm to choose the next process.',
          'There is typically one ready queue per CPU core in the system.',
        ],
        e: ['Processes in the ready queue are in the Ready state. There is no physical movement of processes in memory, just state updates in the PCB.'],
      },
      {
        q: 'What is the I/O queue? How many I/O queues do you expect in the system?',
        a: [
          'An I/O queue is a collection of processes (references to their PCBs) waiting to use a specific I/O device.',
          'There is one I/O queue per I/O device in the system.',
        ],
        e: ['Processes in an I/O queue are in the Waiting state.'],
      },
      {
        q: 'What happens to a process when it requests an I/O operation (like file reading) in the classic "blocking" scenario?',
        a: [
          'The process immediately yields the CPU and moves to the Waiting state.',
          'It enters the I/O queue for the device it needs and stays there until the operation completes.',
          'The CPU is then free to run other processes in the meantime.',
        ],
        e: [],
      },
      {
        q: 'Where does the process go once the I/O request is complete?',
        a: ['The process moves from the Waiting state back to the Ready queue, where it waits to be scheduled again.'],
        e: ['It goes to Ready, not directly to Running. It still has to wait for the scheduler to pick it.'],
      },
      {
        q: 'Understand what happens to processes in reality when process states change (don\'t be fooled by process "movements" in typical visualizations).',
        a: [
          'When a process changes state, the OS updates the state field in its PCB. The process stays in the same location in RAM throughout.',
          'Visualizations that show processes physically moving between boxes are simplifications for clarity. No actual movement happens.',
        ],
        e: [],
      },
      {
        q: 'Process Control Block (PCB). What typical components can you see there?',
        a: [
          'A Process Control Block is a record maintained by the OS for each process containing all information needed to manage it.',
          [{ text: 'PID:', bold: true }, { text: ' process identification number, a unique numeric name for each process.' }],
          [{ text: 'Parent PID:', bold: true }, { text: ' to know who the parent of this process is.' }],
          [{ text: 'PC (program counter):', bold: true }, { text: ' stores where in the program code the process stopped.' }],
          [{ text: 'Register file:', bold: true }, { text: ' copies of all general purpose CPU register values.' }],
          [{ text: 'CPU scheduling info:', bold: true }, { text: " tracks how much CPU time the process has used recently, maybe also the process' priority level." }],
          [{ text: 'RAM management info:', bold: true }, { text: ' size of the process, stack pointer, memory location.' }],
          [{ text: 'List of opened files:', bold: true }, { text: ' whatever the process has open. The content is NOT stored here, only the list.' }],
          [{ text: 'List of requested I/O devices.', bold: false }],
        ],
        e: [],
      },
      {
        q: 'Context switch. Why does context switching have a small performance overhead? How does that overhead affect system calls?',
        a: [
          'Context switching requires saving and loading CPU registers and the program counter to/from RAM, and reading/writing RAM takes time.',
          'No matter how well supported by hardware, context switching is not free.',
          'Every system call requires two context switches: CPU switches from process to OS, then back from OS to process. This is why system calls have a performance overhead.',
        ],
        e: [],
      },
      {
        q: 'What is POSIX?',
        a: [
          'POSIX (Portable Operating System Interface) is a set of standards that define how Unix-like operating systems should behave to maintain compatibility across systems.',
          'POSIX API functions like fork(), exec(), and wait() allow programs written for one POSIX-compliant OS to be compiled and run on another.',
        ],
        e: [],
      },
      {
        q: 'fork()',
        a: [
          'fork() is a POSIX instruction that creates an almost-exact copy (new PID) of the calling process, and returns the child\'s PID (a positive integer) to the parent and 0 to the child.',
          [{ text: '1)', bold: true }, { text: ' Creates a copy of the calling process with a new PID.' }],
          [{ text: '2)', bold: true }, { text: ' The parent continues execution after the fork().' }],
          [{ text: '3)', bold: true }, { text: ' The child starts executing at the instruction after the fork() that created it, not from the top.' }],
          [{ text: '4)', bold: true }, { text: ' fork() returns the child\'s PID to the parent and 0 to the child. Negative value on failure.' }],
        ],
        e: ['Roughly doubles memory usage. Forking is not memory efficient.'],
      },
      {
        q: 'exec()',
        a: [
          'exec() is a POSIX instruction that entirely replaces the current process\'s content with a new program from a given executable file.',
          'The PID stays the same but the program is completely different. exec() never returns on success, only on failure.',
        ],
        e: ['The OS can skip copying memory on fork() if it detects exec() will be called immediately after (copy-on-write optimization).'],
      },
      {
        q: 'exit()',
        a: [
          'exit() is a POSIX instruction that stops the process and releases its resources.',
          'The parameter is the exit status: 0 means success, non-zero is an error code.',
          'The PCB is kept until the parent calls wait(). Until then, the process is a zombie.',
        ],
        e: [],
      },
      {
        q: 'wait()',
        a: [
          'wait() is a POSIX instruction called by a parent process to pause execution until one of its children terminates.',
          'It collects the child\'s exit status and fully cleans up the child\'s PCB, eliminating the zombie.',
          'Calling wait() with no children returns an error.',
        ],
        e: [],
      },
      {
        q: 'Layout of a process in memory: text section, data section, heap, and stack.',
        a: [
          [{ text: 'Stack:', bold: true }, { text: ' stores local variables, saved registers, return addresses, and function parameters. Grows downward. Contiguous. Has a size limit.' }],
          [{ text: 'Heap:', bold: true }, { text: ' where dynamic memory allocation happens (malloc, new). Grows upward. Fragmented.' }],
          [{ text: 'Data section:', bold: true }, { text: ' stores global and static variables.' }],
          [{ text: 'Text section:', bold: true }, { text: ' stores the program code (CPU instructions).' }],
        ],
        e: [],
      },
      {
        q: 'What are the properties of heap (it is fragmented, full of holes)? How does it affect the typical dynamic memory allocation like using the operator new?',
        a: [
          'The heap is fragmented and full of holes from prior allocations and deallocations.',
          'This means operator new must search for a free chunk of the right size in fragmented space, making heap allocation slower than stack allocation.',
        ],
        e: ['The stack is contiguous, so allocation is just shifting the stack pointer. Very fast.'],
      },
      {
        q: 'What are the properties of stack?',
        a: [
          'The stack is contiguous with no holes, making allocation fast. It is just shifting the stack pointer.',
          'It stores local variables, function parameters, return addresses, and saved registers.',
          'It has a size limit set by the OS. Exceeding it causes a stack overflow, which crashes the program.',
        ],
        e: [],
      },
      {
        q: 'Orphan processes. Why are they bad?',
        a: [
          'An orphan process is a process whose parent has exited without calling wait().',
          'The child has no parent to collect its exit status, so when it eventually terminates it becomes an uncollectable zombie.',
          'Orphan accumulation causes PCBs to pile up in the system, wasting RAM.',
        ],
        e: ['The OS resolves orphans via cascading termination (killing all descendants) or by having a designated reaper process adopt and wait for them.'],
      },
      {
        q: 'Zombie process. For how long does it exist?',
        a: [
          'A zombie process is a process that has called exit() but whose parent has not yet called wait().',
          'It holds no resources, but its PCB remains in memory.',
          'It exists until the parent calls wait(). Brief zombies are normal and expected. The problem arises only if they accumulate.',
        ],
        e: [],
      },
    ],
  },
  {
    id: 'ipc',
    title: 'IPC',
    questions: [
      {
        q: 'What is IPC?',
        a: ['IPC (Inter-Process Communication) is a set of mechanisms that allow different processes to communicate with each other.'],
        e: ['Since processes have separate memory spaces, they need special OS-provided mechanisms to share data.'],
      },
      {
        q: 'What are the two general classes of IPC (shared memory and message passing)?',
        a: [
          [{ text: '1. Shared memory:', bold: true }, { text: ' the OS creates a region of RAM accessible to multiple processes (ONLY upon request by the process).' }],
          [{ text: '2. Message passing:', bold: true }, { text: ' all data exchanges go through the OS.' }],
        ],
        e: [],
      },
      {
        q: 'What is the idea of shared memory? What are the advantages and disadvantages of shared memory?',
        a: [
          'Shared memory is an IPC technique where the OS allocates a RAM region accessible to multiple processes. The process must request the OS to create this region.',
          [{ text: 'Advantage:', bold: true }, { text: ' faster. Only needs OS help once to create the region. After that, no per-access overhead.' }],
          [{ text: 'Disadvantage:', bold: true }, { text: ' error-prone. Requires careful synchronization and is harder to program correctly. Can only be used by processes on the same machine.' }],
        ],
        e: [
          [
            { text: "Shared memory is " },
            { text: "NOT", bold: true },
            { text: " available to processes by default. Processes " },
            { text: "MUST", bold: true },
            { text: " request the OS to allocate this region first, should they want it."},
          ]
        ],
      },
      {
        q: 'What is the idea of message passing? What are the advantages and disadvantages of message passing?',
        a: [
          'Message passing is an IPC technique where every data exchange goes through the OS. Process A passes data to the OS, which delivers it to process B.',
          [{ text: 'Advantage:', bold: true }, { text: ' easier to program correctly, less to think about. Works across different machines on a network.' }],
          [{ text: 'Disadvantage:', bold: true }, { text: ' slower. Every exchange requires a system call and two context switches.' }],
        ],
        e: [],
      },
      {
        q: 'Can shared memory IPC be used for two processes running on two different computers? Why do you think so?',
        a: [
          'No. Shared memory requires both processes to have access to the same physical RAM.',
          'Processes on different computers are on separate machines and cannot share physical memory directly.',
        ],
        e: [],
      },
      {
        q: 'What is a network (a bunch of computers connected together to exchange data)?',
        a: ['A network is a group of two or more connected devices that communicate to share resources, data, and services.'],
        e: [],
      },
      {
        q: 'What is an IP address? How does a classic IP address (IPv4) look?',
        a: [
          'An IP address is a unique numeric identifier for a device on a network.',
          [{ text: 'IPv4 format:', bold: true }, { text: ' four unsigned bytes separated by dots, each between 0 and 255. Example: 56.32.123.99' }],
        ],
        e: ['The IP address identifies the machine, not the specific process on the machine.'],
      },
      {
        q: 'Why is an IP address alone not enough for networking communications?',
        a: [
          'An IP address identifies the machine, but not which process on that machine the message is meant for.',
          'Multiple programs can run on one device, so a port number is also needed to specify which process should receive the data.',
        ],
        e: [],
      },
      {
        q: 'What is a networking port?',
        a: [
          'A networking port is a unique numeric identifier assigned to every process that wants to use the network.',
          'Think of the IP address as the house address and the port as the name of a specific person at that address.',
          'Ports range from 0 to 65535.',
        ],
        e: [],
      },
      {
        q: 'What are well-known ports? (the answer "first 1024 ports" is worth 0 points)',
        a: [
          'Well-known ports are ports with predefined purposes, in the range 0 to 1023.',
          'Example: port 80 is reserved for HTTP web servers.',
          'Nobody should use these ports for arbitrary purposes.',
        ],
        e: ['Just saying "0 to 1023" on the exam is worth 0 points. You must say they have predefined purposes.'],
      },
      {
        q: 'What is a (networking) socket?',
        a: [
          'A networking socket is the combination of an IP address and a networking port (e.g., 55.220.0.51:81).',
          'It uniquely identifies a specific process on a specific machine and serves as the endpoint for network communication.',
        ],
        e: [],
      },
      {
        q: 'What is a server (like in "web server" or "email server")?',
        a: [
          'A server is a computer on the network that receives requests and provides services to other computers.',
          'It runs server software that listens on a well-known port and is designed for stability, high performance, and continuous availability.',
        ],
        e: [],
      },
      {
        q: 'What is a client?',
        a: [
          'A client is a computer that requests and obtains services or information from a server.',
          'It initiates the connection and includes its own IP and port so the server knows where to reply.',
        ],
        e: [],
      },
      {
        q: 'What is a communication protocol?',
        a: [
          'A communication protocol is a set of rules describing how to send, receive, and understand data.',
          'Every layer of a network transmission has its own protocol.',
        ],
        e: [],
      },
      {
        q: 'What is a URL?',
        a: [
          'A URL (Uniform Resource Locator) is a human-readable address used to access a resource on the internet.',
          'Browsers cannot use a URL directly: it must first be translated to an IP address via a DNS server.',
        ],
        e: [],
      },
      {
        q: 'What is DNS?',
        a: [
          'A DNS (Domain Name System) server is a separate computer that translates URLs into IP addresses.',
          'Your computer gets the DNS server address from network settings, often assigned automatically when you connect to a network.',
        ],
        e: [],
      },
    ],
  },
  {
    id: 'threads',
    title: 'Threads',
    questions: [
      {
        q: 'What is a thread of execution (a.k.a. just thread)?',
        a: [
          'A thread of execution is an independent unit of execution within a process with its own program counter, register values, and stack.',
          'A process can (and often will) have multiple threads, all sharing the same code, data section, and heap.',
        ],
        e: ['Changes to global variables or dynamically allocated memory in one thread are immediately visible to all other threads of the same process.'],
      },
      {
        q: 'Why might we want to create new threads of execution instead of new processes?',
        a: [
          [{ text: 'Memory efficient:', bold: true }, { text: ' threads share the same memory space. No memory duplication unlike forking.' }],
          [{ text: 'Faster to create and delete:', bold: true }, { text: ' no need to allocate new memory or set up a full new process.' }],
          [{ text: 'Faster context switching:', bold: true }, { text: ' switching between threads of the same process is cheaper than switching between processes.' }],
          [{ text: 'Better CPU utilization:', bold: true }, { text: ' threads can run on multiple CPU cores simultaneously.' }],
          [{ text: 'Shared memory by default:', bold: true }, { text: ' threads share the data section and heap without any OS setup.' }],
        ],
        e: ['Threads are sometimes called lightweight processes because of these advantages.'],
      },
      {
        q: 'Why might we want to create new processes instead of new threads?',
        a: [
          [{ text: 'exec() compatibility:', bold: true }, { text: ' if a thread calls exec(), it replaces the entire process including all other threads. A separate process avoids this.' }],
          [{ text: 'Fault independence:', bold: true }, { text: ' if one thread crashes, it brings down the whole process. Separate processes are isolated: a crash in one does not affect others.' }],
        ],
        e: ['This is why browsers use separate processes for each tab: if one tab crashes, it does not bring down the others.'],
      },
      {
        q: 'What do threads belonging to the same process share? What do they not share?',
        a: [
          [{ text: 'Threads share:', bold: true }],
          [{ text: 'Text section:', bold: true }, { text: ' program code.' }],
          [{ text: 'Data section:', bold: true }, { text: ' global and static variables. Changes are visible to all threads.' }],
          [{ text: 'Heap:', bold: true }, { text: ' dynamically allocated memory.' }],
          [{ text: 'Threads do NOT share:', bold: true }],
          [{ text: 'Stack:', bold: true }, { text: ' each thread has its own stack with its own local variables and function call state.' }],
        ],
        e: ['Each thread also has its own register values and program counter.'],
      },
      {
        q: 'What is TLS (thread local storage)?',
        a: [
          'Thread Local Storage is a tool that allows threads to have their own private copies of variables that appear global.',
          'Each thread has its own independent copy. Changes made in one thread are not visible to others.',
        ],
        e: ['Useful when you want global-looking state that is still thread-safe without synchronization.'],
      },
      {
        q: 'What is thread pool?',
        a: [
          'A thread pool is a fixed set of threads created when a process starts running that are kept sleeping and reused for incoming tasks.',
          'The maximum number of threads is created upfront at process start. When a task arrives, an idle thread is woken up. When done, the thread is frozen and returned to the pool.',
          'This eliminates the overhead of creating and deleting a thread for every task, and caps the total thread count.',
        ],
        e: [],
      },
      {
        q: 'How to create a thread with std::thread?',
        a: [
          [{ text: 'Include:', bold: true }, { text: ' #include <thread>' }],
          [{ text: 'Syntax:', bold: true }, { text: ' std::thread t1{FunctionName, arg1, arg2, ...};' }],
          'The thread starts executing immediately upon construction. The function runs concurrently with the calling thread.',
        ],
        e: [],
      },
      {
        q: 'What does std::thread::join() do? Why do we need it?',
        a: [
          'join() blocks the calling thread until the thread it is called on finishes execution.',
          'We need it to ensure the thread has completed its work before we try to use its results or before the program exits.',
          'If the main thread exits before a child thread finishes, the behavior is undefined and the program may crash.',
        ],
        e: [],
      },
    ],
  },
]