import { forkExamples } from './forkExamples'

export const forkTricks = {
  title: 'Forking Tricks + Walkthrough',
  habits: [
    {
      title: 'First',
      body: [
        'Drill it into your brain that fork() does TWO things:',
        { list: [
          [
            { text: 'Creates a ' },
            { text: 'COPY', bold: true },
            { text: ' (we will call it child) of the current process (we will call it parent) IF it is not the child created by that fork from the parent process.' },
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
          [
            { text: 'Label', bold: true },
            { text: ' each fork FIRST, start your tree with P, and only then should you start processing the code.' },
          ],
        ]},
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
      { text: ' current process — not just the exec line; the whole process — with the contents of the file \'filename\'. For this example, let\'s say that prog.exe just contains: ' },
      { text: 'std::cout << "6" << std::endl;', bold: true },
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
        a: 'An operating system is system software that manages computer hardware and software resources, and provides common services for computer programs. It acts as an intermediary between users and the hardware.',
        e: '',
      },
      { q: 'Examples of different operating systems.', a: '', e: '' },
      { q: 'What different types of computers exist (personal, mobile devices, servers, embedded)? How different are operating systems for different computer types?', a: '', e: '' },
      { q: 'What is the operating system kernel (central part of OS)?', a: '', e: '' },
      { q: 'List of operating system functions. For each item on this list, be ready to give a short description.', a: '', e: '' },
      { q: 'What is multitasking? How is it arranged?', a: '', e: '' },
      { q: 'What are user and kernel modes? What are user and kernel level programs/processes?', a: '', e: '' },
      { q: 'What is virtual memory?', a: '', e: '' },
      { q: 'What are interrupts? What are interrupt handlers? What issues interrupts? What is the sequence of things that happen when the interrupt arrives?', a: '', e: '' },
      { q: 'What are drivers?', a: '', e: '' },
      { q: 'What is a file? What is a file system? What is a logical disk?', a: '', e: '' },
      { q: 'What are networking protocols?', a: '', e: '' },
      { q: 'What is the operating system API?', a: '', e: '' },
      { q: 'What is a context switch?', a: '', e: '' },
    ],
  },
  {
    id: 'processes',
    title: 'Processes',
    questions: [
      {
        q: 'What is a process?',
        a: 'A process is a program in execution. It includes the program code (text section), current activity (program counter, registers), stack, data section, and heap.',
        e: '',
      },
      { q: 'What is the difference between a process and a program?', a: '', e: '' },
      { q: 'List five process states (use the naming from our textbook and class).', a: '', e: '' },
      { q: 'What is the ready queue? How many ready queues do you expect in the system?', a: '', e: '' },
      { q: 'What is the I/O queue? How many I/O queues do you expect in the system?', a: '', e: '' },
      { q: 'What happens to a process when it requests an I/O operation (like file reading) in the classic "blocking" scenario?', a: '', e: '' },
      { q: 'Where does the process go once the I/O request is complete?', a: '', e: '' },
      { q: 'Understand what happens to processes in reality when process states change (don\'t be fooled by process "movements" in typical visualizations).', a: '', e: '' },
      { q: 'Process Control Block (PCB). What typical components can you see there?', a: '', e: '' },
      { q: 'Context switch. Why does context switching have a small performance overhead? How does that overhead affect system calls?', a: '', e: '' },
      { q: 'What is POSIX?', a: '', e: '' },
      { q: 'fork()', a: '', e: '' },
      { q: 'exec()', a: '', e: '' },
      { q: 'exit()', a: '', e: '' },
      { q: 'wait()', a: '', e: '' },
      { q: 'Layout of a process in memory: text section, data section, heap, and stack.', a: '', e: '' },
      { q: 'What are the properties of heap (it is fragmented, full of holes)? How does it affect the typical dynamic memory allocation like using the operator new?', a: '', e: '' },
      { q: 'What are the properties of stack?', a: '', e: '' },
      { q: 'Orphan processes. Why are they bad?', a: '', e: '' },
      { q: 'Zombie process. For how long does it exist?', a: '', e: '' },
    ],
  },
  {
    id: 'ipc',
    title: 'IPC',
    questions: [
      {
        q: 'What is IPC?',
        a: 'IPC (Inter-Process Communication) refers to the mechanisms that allow processes to communicate and synchronize with each other. Since processes have separate memory spaces, they need special mechanisms to share data.',
        e: '',
      },
      { q: 'What are the two general classes of IPC (shared memory and message passing)?', a: '', e: '' },
      { q: 'What is the idea of shared memory? What are the advantages and disadvantages of shared memory?', a: '', e: '' },
      { q: 'What is the idea of message passing? What are the advantages and disadvantages of message passing?', a: '', e: '' },
      { q: 'Can shared memory IPC be used for two processes running on two different computers? Why do you think so?', a: '', e: '' },
      { q: 'What is a network (a bunch of computers connected together to exchange data)?', a: '', e: '' },
      { q: 'What is an IP address? How does a classic IP address (IPv4) look?', a: '', e: '' },
      { q: 'Why is an IP address alone not enough for networking communications?', a: '', e: '' },
      { q: 'What is a networking port?', a: '', e: '' },
      { q: 'What are well-known ports? (the answer "first 1024 ports" is worth 0 points)', a: '', e: '' },
      { q: 'What is a (networking) socket?', a: '', e: '' },
      { q: 'What is a server (like in "web server" or "email server")?', a: '', e: '' },
      { q: 'What is a client?', a: '', e: '' },
      { q: 'What is a communication protocol?', a: '', e: '' },
      { q: 'What is a URL?', a: '', e: '' },
      { q: 'What is DNS?', a: '', e: '' },
    ],
  },
  {
    id: 'threads',
    title: 'Threads',
    questions: [
      {
        q: 'What is a thread of execution (a.k.a. just thread)?',
        a: 'A thread is the smallest unit of execution within a process. A process can have multiple threads, all sharing the same memory space but each with its own program counter, registers, and stack.',
        e: '',
      },
      { q: 'Why might we want to create new threads of execution instead of new processes?', a: '', e: '' },
      { q: 'Why might we want to create new processes instead of new threads?', a: '', e: '' },
      { q: 'What do threads belonging to the same process share? What do they not share?', a: '', e: '' },
    ],
  },
]