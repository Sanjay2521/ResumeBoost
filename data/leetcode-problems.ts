export interface Problem {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  acceptance: string
  frequency: number
  tags: string[]
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  hints: string[]
  companies: string[]
  premium: boolean
}

export const leetcodeProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: "52.1%",
    frequency: 95,
    tags: ["Array", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Use a hash map to store the complement of each number."
    ],
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Facebook"],
    premium: false
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: "38.9%",
    frequency: 88,
    tags: ["Linked List", "Math", "Recursion"],
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    hints: [
      "Think about how you would add two numbers on paper.",
      "Handle the carry properly."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Adobe"],
    premium: false
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "33.8%",
    frequency: 92,
    tags: ["Hash Table", "String", "Sliding Window"],
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is \"abc\", with the length of 3."
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Use a sliding window approach.",
      "Keep track of characters using a hash set or hash map."
    ],
    companies: ["Amazon", "Microsoft", "Facebook", "Apple", "Google"],
    premium: false
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    acceptance: "36.2%",
    frequency: 78,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000"
    ],
    hints: [
      "Use binary search to partition the arrays.",
      "The overall run time complexity should be O(log (m+n))."
    ],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    premium: false
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    acceptance: "32.7%",
    frequency: 85,
    tags: ["String", "Dynamic Programming"],
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [
      {
        input: "s = \"babad\"",
        output: "\"bab\"",
        explanation: "\"aba\" is also a valid answer."
      }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    hints: [
      "How can we reuse a previously computed palindrome to compute a larger palindrome?",
      "If \"aba\" is a palindrome, is \"xabax\" a palindrome? Similarly is \"xabay\" a palindrome?"
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  },
  {
    id: 11,
    title: "Container With Most Water",
    difficulty: "Medium",
    acceptance: "54.2%",
    frequency: 89,
    tags: ["Array", "Two Pointers", "Greedy"],
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that contains the most water.",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49"
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    hints: [
      "Use two pointers technique.",
      "Move the pointer with smaller height."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  },
  {
    id: 15,
    title: "3Sum",
    difficulty: "Medium",
    acceptance: "32.4%",
    frequency: 91,
    tags: ["Array", "Two Pointers", "Sorting"],
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]"
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    hints: [
      "So, we essentially need to find three numbers x, y, and z such that they add up to the given value.",
      "If we fix one of the numbers say x, we are left with the two-sum problem at hand!"
    ],
    companies: ["Amazon", "Microsoft", "Facebook", "Apple"],
    premium: false
  },
  {
    id: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: "40.7%",
    frequency: 93,
    tags: ["String", "Stack"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    examples: [
      {
        input: "s = \"()\"",
        output: "true"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket."
    ],
    companies: ["Amazon", "Microsoft", "Google", "Apple", "Facebook"],
    premium: false
  },
  {
    id: 21,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    acceptance: "62.9%",
    frequency: 89,
    tags: ["Linked List", "Recursion"],
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a sorted list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    hints: [
      "Use a dummy head to simplify the merge process."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  },
  {
    id: 53,
    title: "Maximum Subarray",
    difficulty: "Medium",
    acceptance: "50.1%",
    frequency: 94,
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "Use Kadane's algorithm.",
      "Keep track of the maximum sum ending at each position."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Facebook"],
    premium: false
  },
  {
    id: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    acceptance: "51.5%",
    frequency: 87,
    tags: ["Math", "Dynamic Programming", "Memoization"],
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    hints: [
      "This is a Fibonacci sequence problem.",
      "Use dynamic programming to avoid redundant calculations."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  },
  {
    id: 94,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    acceptance: "74.4%",
    frequency: 82,
    tags: ["Stack", "Tree", "Depth-First Search", "Binary Tree"],
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    hints: [
      "Use recursion or iterative approach with stack."
    ],
    companies: ["Amazon", "Microsoft", "Google"],
    premium: false
  },
  {
    id: 104,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    acceptance: "73.7%",
    frequency: 91,
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    description: "Given the root of a binary tree, return its maximum depth.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    hints: [
      "Use recursion to find the maximum depth of left and right subtrees."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    acceptance: "54.2%",
    frequency: 92,
    tags: ["Array", "Dynamic Programming"],
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    hints: [
      "Keep track of the minimum price seen so far.",
      "Calculate the maximum profit at each step."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Facebook"],
    premium: false
  },
  {
    id: 136,
    title: "Single Number",
    difficulty: "Easy",
    acceptance: "70.1%",
    frequency: 83,
    tags: ["Array", "Bit Manipulation"],
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    examples: [
      {
        input: "nums = [2,2,1]",
        output: "1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once."
    ],
    hints: [
      "Use XOR operation. XOR of two same numbers is 0."
    ],
    companies: ["Amazon", "Microsoft", "Apple"],
    premium: false
  },
  {
    id: 155,
    title: "Min Stack",
    difficulty: "Medium",
    acceptance: "51.9%",
    frequency: 86,
    tags: ["Stack", "Design"],
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    examples: [
      {
        input: "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]",
        output: "[null,null,null,null,-3,null,0,-2]"
      }
    ],
    constraints: [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin operations will always be called on non-empty stacks."
    ],
    hints: [
      "Use an auxiliary stack to keep track of minimum values."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  },
  {
    id: 169,
    title: "Majority Element",
    difficulty: "Easy",
    acceptance: "63.8%",
    frequency: 79,
    tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Counting"],
    description: "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.",
    examples: [
      {
        input: "nums = [3,2,3]",
        output: "3"
      }
    ],
    constraints: [
      "n == nums.length",
      "1 <= n <= 5 * 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    hints: [
      "Use Boyer-Moore Voting Algorithm.",
      "The majority element appears more than n/2 times."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  },
  {
    id: 200,
    title: "Number of Islands",
    difficulty: "Medium",
    acceptance: "57.2%",
    frequency: 91,
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    examples: [
      {
        input: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        output: "1"
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    hints: [
      "Use DFS or BFS to explore connected components.",
      "Mark visited cells to avoid counting them multiple times."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Facebook"],
    premium: false
  },
  {
    id: 206,
    title: "Reverse Linked List",
    difficulty: "Easy",
    acceptance: "73.1%",
    frequency: 95,
    tags: ["Linked List", "Recursion"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    hints: [
      "Use iterative approach with three pointers: prev, current, and next.",
      "Or use recursion to reverse the list."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Facebook"],
    premium: false
  },
  {
    id: 226,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    acceptance: "74.8%",
    frequency: 88,
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    description: "Given the root of a binary tree, invert the tree, and return its root.",
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    hints: [
      "Swap the left and right children of each node recursively."
    ],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    premium: false
  }
]