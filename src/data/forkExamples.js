export const forkExamples = [
    {
        id: 'example1',
        title: 'Example 1',
        steps: [
            {
            process: null,
            action: 'First things first: label those forks and start the tree with P.',
            code: [
                { line: 'fork(); // A', muted: false, current: false },
                { line: 'std::cout << "1";', muted: false, current: false },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [{ id: 'P', label: 'P', outputs: [] }],
                edges: [],
            },
            },
            {
            process: 'P',
            action: "Line 1 has a fork. Let's draw a new process A branching out from P. Now: think about the return value. Let's see: this fork() didn't create the current process, so it returns a positive value. Okay. Let's mentally replace that fork() with a positive value.",
            code: [
                { line: 'fork(); // A', muted: false, current: true },
                { line: 'std::cout << "1";', muted: false, current: false },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: [] },
                { id: 'A', label: 'A', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }],
            },
            },
            {
            process: 'P',
            action: " In this case, we're not doing anything with the fork result, but it's a good habit to think about the return behavior. Now, P just prints out 1.",
            code: [
                { line: 'fork(); // A', muted: false, current: false },
                { line: 'std::cout << "1";', muted: false, current: true },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1'] },
                { id: 'A', label: 'A', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }],
            },
            },
            {
            process: 'P',
            action: "Now we have another fork(). Of course, none of these forks are going to return 0, as we are currently in process P. If you ever get confused with which process to branch from, think back to which process you're currently on. It's not A, so we'll make B branch off from P.",
            code: [
                { line: 'fork(); // A', muted: false, current: false },
                { line: 'std::cout << "1";', muted: false, current: false },
                { line: 'fork(); // B', muted: false, current: true },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1'] },
                { id: 'A', label: 'A', outputs: [] },
                { id: 'B1', label: 'B', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }],
            },
            },
            {
            process: 'P',
            action: "Now, P prints out 2, and we've reached the end of P! To make things simple, when deciding the next process to analyze, we'll just go top to bottom, left to right. There's nothing else left at the current level of the tree, so we'll go down to the next level. The first process is A.",
            code: [
                { line: 'fork(); // A', muted: false, current: false },
                { line: 'std::cout << "1";', muted: false, current: false },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: true },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1', '2'] },
                { id: 'A', label: 'A', outputs: [] },
                { id: 'B1', label: 'B', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }],
            },
            },
            {
            process: 'A',
            action: "FIND THE FORK!!! Process A was made by the fork at line 1. That fork returns 0. We do nothing with it.",
            code: [
                { line: 'fork(); // A', muted: false, current: true },
                { line: 'std::cout << "1";', muted: false, current: false },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1', '2'] },
                { id: 'A', label: 'A', outputs: [] },
                { id: 'B1', label: 'B', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }],
            },
            },
            {
            process: 'A',
            action: 'At line 2, A prints 1.',
            code: [
                { line: 'fork(); // A', muted: false, current: false },
                { line: 'std::cout << "1";', muted: false, current: true },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1', '2'] },
                { id: 'A', label: 'A', outputs: ['1'] },
                { id: 'B1', label: 'B', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }],
            },
            },
            {
            process: 'A',
            action: 'At line 3, we fork again, but this time, we are forking from A, so we draw B branching from A.',
            code: [
                { line: 'fork(); // A', muted: false, current: false },
                { line: 'std::cout << "1";', muted: false, current: false },
                { line: 'fork(); // B', muted: false, current: true },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1', '2'] },
                { id: 'A', label: 'A', outputs: ['1'] },
                { id: 'B1', label: 'B', outputs: [] },
                { id: 'B2', label: 'B', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }, { from: 'A', to: 'B2' }],
            },
            },
            {
            process: 'A',
            action: "At line 4, A just prints 2 and we've reached the end again. Now, all we have left is 2 Bs. Because these processes were created by the same fork and start executing at the same instruction, they'll have the same behavior.",
            code: [
                { line: 'fork(); // A', muted: false, current: false },
                { line: 'std::cout << "1";', muted: false, current: false },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: true },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1', '2'] },
                { id: 'A', label: 'A', outputs: ['1', '2'] },
                { id: 'B1', label: 'B', outputs: [] },
                { id: 'B2', label: 'B', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }, { from: 'A', to: 'B2' }],
            },
            },
            {
            process: 'B',
            action: "FIND THE FORK!!! The fork at line 3 returns 0. We do nothing with it. Great.",
            code: [
                { line: 'fork(); // A', muted: true, current: false },
                { line: 'std::cout << "1";', muted: true, current: false },
                { line: 'fork(); // B', muted: false, current: true },
                { line: 'std::cout << "2";', muted: false, current: false },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1', '2'] },
                { id: 'A', label: 'A', outputs: ['1', '2'] },
                { id: 'B1', label: 'B', outputs: [] },
                { id: 'B2', label: 'B', outputs: [] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }, { from: 'A', to: 'B2' }],
            },
            },
            {
            process: 'B',
            action: "Both B processes print out 2. Now, we just need to write out the final output. We'll go through the tree in the same order: P and A both print out 1 and 2, and both Bs print out 2, so our final output is: 1 2   1 2   2   2",
            code: [
                { line: 'fork(); // A', muted: true, current: false },
                { line: 'std::cout << "1";', muted: true, current: false },
                { line: 'fork(); // B', muted: false, current: false },
                { line: 'std::cout << "2";', muted: false, current: true },
            ],
            tree: {
                nodes: [
                { id: 'P', label: 'P', outputs: ['1', '2'] },
                { id: 'A', label: 'A', outputs: ['1', '2'] },
                { id: 'B1', label: 'B', outputs: ['2'] },
                { id: 'B2', label: 'B', outputs: ['2'] },
                ],
                edges: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B1' }, { from: 'A', to: 'B2' }],
            },
            finalOutput: '1 2\u00a0\u00a01 2\u00a0\u00a02\u00a0\u00a02',
            },
        ],
    },
]
