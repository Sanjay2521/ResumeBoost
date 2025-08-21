'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function Roadmap() {
  const { user } = useUser()
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set())
  const [difficulty, setDifficulty] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const skills = [
    {
      name: "Data Structures",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
      problems: 520,
      description: "Master arrays, linked lists, trees, heaps, and more",
      topics: ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Heaps", "Hash Tables"],
      problemList: [
        // Arrays - Basic (1-30)
        { id: 1, title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/', tags: ['Array', 'Hash Table'], category: 'Arrays' },
        { id: 2, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', tags: ['Array'], category: 'Arrays' },
        { id: 3, title: 'Contains Duplicate', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/contains-duplicate/', tags: ['Array', 'Hash Table'], category: 'Arrays' },
        { id: 4, title: 'Maximum Subarray', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-subarray/', tags: ['Array'], category: 'Arrays' },
        { id: 5, title: 'Plus One', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/plus-one/', tags: ['Array'], category: 'Arrays' },
        { id: 6, title: 'Move Zeroes', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/move-zeroes/', tags: ['Array', 'Two Pointers'], category: 'Arrays' },
        { id: 7, title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', tags: ['Array'], category: 'Arrays' },
        { id: 8, title: 'Merge Sorted Array', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-sorted-array/', tags: ['Array'], category: 'Arrays' },
        { id: 9, title: 'Pascal Triangle', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/pascals-triangle/', tags: ['Array'], category: 'Arrays' },
        { id: 10, title: 'Single Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/single-number/', tags: ['Array', 'Bit Manipulation'], category: 'Arrays' },
        { id: 11, title: 'Array Sum', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/FLOW001', tags: ['Array', 'Basic'], category: 'Arrays' },
        { id: 12, title: 'Find Maximum Element', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/FLOW013', tags: ['Array'], category: 'Arrays' },
        { id: 13, title: 'Array Rotation', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/array-rotation/', tags: ['Array'], category: 'Arrays' },
        { id: 14, title: 'Missing Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/missing-number/', tags: ['Array'], category: 'Arrays' },
        { id: 15, title: 'Find Pivot Index', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-pivot-index/', tags: ['Array'], category: 'Arrays' },
        { id: 16, title: 'Majority Element', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/majority-element/', tags: ['Array'], category: 'Arrays' },
        { id: 17, title: 'Intersection of Two Arrays', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-arrays/', tags: ['Array'], category: 'Arrays' },
        { id: 18, title: 'Third Maximum Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/third-maximum-number/', tags: ['Array'], category: 'Arrays' },
        { id: 19, title: 'Find All Numbers Disappeared', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/', tags: ['Array'], category: 'Arrays' },
        { id: 20, title: 'Max Consecutive Ones', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/max-consecutive-ones/', tags: ['Array'], category: 'Arrays' },
        { id: 21, title: 'Array Manipulation', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/crush/problem', tags: ['Array'], category: 'Arrays' },
        { id: 22, title: 'Sparse Arrays', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/sparse-arrays/problem', tags: ['Array'], category: 'Arrays' },
        { id: 23, title: 'Dynamic Array', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/dynamic-array/problem', tags: ['Array'], category: 'Arrays' },
        { id: 24, title: 'Left Rotation', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/array-left-rotation/problem', tags: ['Array'], category: 'Arrays' },
        { id: 25, title: 'Reverse Array', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/arrays-ds/problem', tags: ['Array'], category: 'Arrays' },
        { id: 26, title: 'Chef and Notebooks', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/CNOTE', tags: ['Array'], category: 'Arrays' },
        { id: 27, title: 'Little Elephant and Candies', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/LECANDY', tags: ['Array'], category: 'Arrays' },
        { id: 28, title: 'Turbo Sort', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/TSORT', tags: ['Array', 'Sorting'], category: 'Arrays' },
        { id: 29, title: 'Small Factorials', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/FCTRL2', tags: ['Array', 'Math'], category: 'Arrays' },
        { id: 30, title: 'Reverse The Number', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/FLOW007', tags: ['Array'], category: 'Arrays' },
        
        // Arrays - Intermediate (31-60)
        { id: 31, title: 'Product of Array Except Self', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/product-of-array-except-self/', tags: ['Array'], category: 'Arrays' },
        { id: 32, title: 'Container With Most Water', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/container-with-most-water/', tags: ['Array', 'Two Pointers'], category: 'Arrays' },
        { id: 33, title: '3Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/3sum/', tags: ['Array', 'Two Pointers'], category: 'Arrays' },
        { id: 34, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', tags: ['Array', 'Binary Search'], category: 'Arrays' },
        { id: 35, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', tags: ['Array'], category: 'Arrays' },
        { id: 36, title: 'Maximum Product Subarray', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-product-subarray/', tags: ['Array'], category: 'Arrays' },
        { id: 37, title: 'Rotate Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/rotate-array/', tags: ['Array'], category: 'Arrays' },
        { id: 38, title: 'Jump Game', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/jump-game/', tags: ['Array', 'Greedy'], category: 'Arrays' },
        { id: 39, title: 'Merge Intervals', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-intervals/', tags: ['Array'], category: 'Arrays' },
        { id: 40, title: 'Insert Interval', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insert-interval/', tags: ['Array'], category: 'Arrays' },
        { id: 41, title: 'Subarray Sum Equals K', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', tags: ['Array', 'Hash Table'], category: 'Arrays' },
        { id: 42, title: 'Spiral Matrix', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/spiral-matrix/', tags: ['Array'], category: 'Arrays' },
        { id: 43, title: 'Set Matrix Zeroes', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/set-matrix-zeroes/', tags: ['Array'], category: 'Arrays' },
        { id: 44, title: 'Game of Life', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/game-of-life/', tags: ['Array'], category: 'Arrays' },
        { id: 45, title: 'Increasing Triplet Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/increasing-triplet-subsequence/', tags: ['Array'], category: 'Arrays' },
        { id: 46, title: 'Kth Largest Element in Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', tags: ['Array'], category: 'Arrays' },
        { id: 47, title: 'Top K Frequent Elements', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/top-k-frequent-elements/', tags: ['Array'], category: 'Arrays' },
        { id: 48, title: 'Sort Colors', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sort-colors/', tags: ['Array'], category: 'Arrays' },
        { id: 49, title: 'Find Peak Element', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-peak-element/', tags: ['Array'], category: 'Arrays' },
        { id: 50, title: 'Search a 2D Matrix', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-a-2d-matrix/', tags: ['Array'], category: 'Arrays' },
        { id: 51, title: 'Minimum Size Subarray Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-size-subarray-sum/', tags: ['Array'], category: 'Arrays' },
        { id: 52, title: 'Maximum Gap', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-gap/', tags: ['Array'], category: 'Arrays' },
        { id: 53, title: 'First Missing Positive', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/first-missing-positive/', tags: ['Array'], category: 'Arrays' },
        { id: 54, title: 'Trapping Rain Water', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/trapping-rain-water/', tags: ['Array'], category: 'Arrays' },
        { id: 55, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', tags: ['Array'], category: 'Arrays' },
        { id: 56, title: 'Sliding Window Maximum', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/sliding-window-maximum/', tags: ['Array'], category: 'Arrays' },
        { id: 57, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', tags: ['Array'], category: 'Arrays' },
        { id: 58, title: 'Maximal Rectangle', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximal-rectangle/', tags: ['Array'], category: 'Arrays' },
        { id: 59, title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', tags: ['Array'], category: 'Arrays' },
        { id: 60, title: 'Reverse Pairs', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-pairs/', tags: ['Array'], category: 'Arrays' },
        
        // Linked Lists (61-90)
        { id: 61, title: 'Reverse Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-linked-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 62, title: 'Linked List Cycle', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/linked-list-cycle/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 63, title: 'Merge Two Sorted Lists', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 64, title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 65, title: 'Palindrome Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-linked-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 66, title: 'Intersection of Two Linked Lists', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 67, title: 'Delete Node in Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 68, title: 'Middle of Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 69, title: 'Convert Binary Number in Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 70, title: 'Remove Nth Node From End', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 71, title: 'Add Two Numbers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/add-two-numbers/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 72, title: 'Swap Nodes in Pairs', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/swap-nodes-in-pairs/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 73, title: 'Rotate List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/rotate-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 74, title: 'Partition List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/partition-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 75, title: 'Reverse Linked List II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 76, title: 'Reorder List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reorder-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 77, title: 'Linked List Cycle II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 78, title: 'Copy List with Random Pointer', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 79, title: 'Sort List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sort-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 80, title: 'Insertion Sort List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insertion-sort-list/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 81, title: 'Merge k Sorted Lists', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 82, title: 'Reverse Nodes in k-Group', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 83, title: 'Print Linked List', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/print-the-elements-of-a-linked-list/problem', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 84, title: 'Insert Node at Tail', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/insert-a-node-at-the-tail-of-a-linked-list/problem', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 85, title: 'Insert Node at Head', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/insert-a-node-at-the-head-of-a-linked-list/problem', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 86, title: 'Insert Node at Position', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/insert-a-node-at-a-specific-position-in-a-linked-list/problem', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 87, title: 'Delete Node', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/delete-a-node-from-a-linked-list/problem', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 88, title: 'Compare Two Linked Lists', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/compare-two-linked-lists/problem', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 89, title: 'Get Node Value', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/get-the-value-of-the-node-at-a-specific-position-from-the-tail/problem', tags: ['Linked List'], category: 'Linked Lists' },
        { id: 90, title: 'Reverse Print', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/print-the-elements-of-a-linked-list-in-reverse/problem', tags: ['Linked List'], category: 'Linked Lists' },
        
        // Stacks & Queues (91-120)
        { id: 91, title: 'Valid Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 92, title: 'Min Stack', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-stack/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 93, title: 'Implement Queue using Stacks', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', tags: ['Stack', 'Queue'], category: 'Stacks & Queues' },
        { id: 94, title: 'Implement Stack using Queues', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-stack-using-queues/', tags: ['Stack', 'Queue'], category: 'Stacks & Queues' },
        { id: 95, title: 'Baseball Game', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/baseball-game/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 96, title: 'Next Greater Element I', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/next-greater-element-i/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 97, title: 'Backspace String Compare', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/backspace-string-compare/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 98, title: 'Remove All Adjacent Duplicates', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 99, title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 100, title: 'Generate Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/generate-parentheses/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 101, title: 'Daily Temperatures', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/daily-temperatures/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 102, title: 'Next Greater Element II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/next-greater-element-ii/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 103, title: 'Decode String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/decode-string/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 104, title: 'Remove K Digits', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-k-digits/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 105, title: 'Asteroid Collision', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/asteroid-collision/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 106, title: 'Validate Stack Sequences', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/validate-stack-sequences/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 107, title: 'Score of Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/score-of-parentheses/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 108, title: 'Online Stock Span', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/online-stock-span/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 109, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 110, title: 'Maximal Rectangle', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximal-rectangle/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 111, title: 'Trapping Rain Water', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/trapping-rain-water/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 112, title: 'Basic Calculator', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/basic-calculator/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 113, title: 'Basic Calculator II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/basic-calculator-ii/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 114, title: 'Maximum Frequency Stack', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-frequency-stack/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 115, title: 'Stack using Array', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/stack-data-structure-introduction-program/', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 116, title: 'Queue using Array', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/', tags: ['Queue'], category: 'Stacks & Queues' },
        { id: 117, title: 'Balanced Parentheses', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/balanced-brackets/problem', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 118, title: 'Simple Text Editor', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/simple-text-editor/problem', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 119, title: 'Maximum Element', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/maximum-element/problem', tags: ['Stack'], category: 'Stacks & Queues' },
        { id: 120, title: 'Equal Stacks', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/equal-stacks/problem', tags: ['Stack'], category: 'Stacks & Queues' },
        
        // Trees (121-150)
        { id: 121, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 122, title: 'Same Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/same-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 123, title: 'Invert Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/invert-binary-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 124, title: 'Symmetric Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/symmetric-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 125, title: 'Path Sum', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/path-sum/', tags: ['Tree'], category: 'Trees' },
        { id: 126, title: 'Minimum Depth of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 127, title: 'Balanced Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/balanced-binary-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 128, title: 'Binary Tree Paths', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-paths/', tags: ['Tree'], category: 'Trees' },
        { id: 129, title: 'Sum of Left Leaves', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-of-left-leaves/', tags: ['Tree'], category: 'Trees' },
        { id: 130, title: 'Find Mode in BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-mode-in-binary-search-tree/', tags: ['Tree', 'BST'], category: 'Trees' },
        { id: 131, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', tags: ['Tree'], category: 'Trees' },
        { id: 132, title: 'Binary Tree Zigzag Level Order', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', tags: ['Tree'], category: 'Trees' },
        { id: 133, title: 'Validate Binary Search Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/validate-binary-search-tree/', tags: ['Tree', 'BST'], category: 'Trees' },
        { id: 134, title: 'Recover Binary Search Tree', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/recover-binary-search-tree/', tags: ['Tree', 'BST'], category: 'Trees' },
        { id: 135, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', tags: ['Tree'], category: 'Trees' },
        { id: 136, title: 'Construct Binary Tree from Preorder', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', tags: ['Tree'], category: 'Trees' },
        { id: 137, title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', tags: ['Tree'], category: 'Trees' },
        { id: 138, title: 'Populating Next Right Pointers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', tags: ['Tree'], category: 'Trees' },
        { id: 139, title: 'Binary Tree Right Side View', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', tags: ['Tree'], category: 'Trees' },
        { id: 140, title: 'Count Complete Tree Nodes', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-complete-tree-nodes/', tags: ['Tree'], category: 'Trees' },
        { id: 141, title: 'Lowest Common Ancestor of BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', tags: ['Tree', 'BST'], category: 'Trees' },
        { id: 142, title: 'Lowest Common Ancestor of Binary Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 143, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', tags: ['Tree'], category: 'Trees' },
        { id: 144, title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', tags: ['Tree'], category: 'Trees' },
        { id: 145, title: 'Binary Tree Preorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', tags: ['Tree'], category: 'Trees' },
        { id: 146, title: 'Binary Tree Postorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', tags: ['Tree'], category: 'Trees' },
        { id: 147, title: 'Tree Height', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/tree-height-of-a-binary-tree/problem', tags: ['Tree'], category: 'Trees' },
        { id: 148, title: 'Tree Level Order Traversal', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/tree-level-order-traversal/problem', tags: ['Tree'], category: 'Trees' },
        { id: 149, title: 'Binary Search Tree Insertion', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/binary-search-tree-insertion/problem', tags: ['Tree', 'BST'], category: 'Trees' },
        { id: 150, title: 'Tree Top View', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/tree-top-view/problem', tags: ['Tree'], category: 'Trees' }
      ]
    },
    {
      name: "Algorithms",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      problems: 480,
      description: "Sorting, searching, and optimization algorithms",
      topics: ["Sorting", "Searching", "Greedy", "Divide & Conquer", "Backtracking"],
      problemList: [
        // Sorting Algorithms (1-40)
        { id: 1, title: 'Bubble Sort', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/bubble-sort/', tags: ['Sorting'], category: 'Sorting' },
        { id: 2, title: 'Selection Sort', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/selection-sort/', tags: ['Sorting'], category: 'Sorting' },
        { id: 3, title: 'Insertion Sort', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/insertion-sort/', tags: ['Sorting'], category: 'Sorting' },
        { id: 4, title: 'Merge Sort', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/merge-sort/', tags: ['Sorting', 'Divide and Conquer'], category: 'Sorting' },
        { id: 5, title: 'Quick Sort', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/quick-sort/', tags: ['Sorting', 'Divide and Conquer'], category: 'Sorting' },
        { id: 6, title: 'Heap Sort', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/heap-sort/', tags: ['Sorting', 'Heap'], category: 'Sorting' },
        { id: 7, title: 'Counting Sort', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/counting-sort/', tags: ['Sorting'], category: 'Sorting' },
        { id: 8, title: 'Radix Sort', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/radix-sort/', tags: ['Sorting'], category: 'Sorting' },
        { id: 9, title: 'Bucket Sort', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/bucket-sort-2/', tags: ['Sorting'], category: 'Sorting' },
        { id: 10, title: 'Sort Colors', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sort-colors/', tags: ['Sorting'], category: 'Sorting' },
        { id: 11, title: 'Merge Intervals', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-intervals/', tags: ['Sorting'], category: 'Sorting' },
        { id: 12, title: 'Insert Interval', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insert-interval/', tags: ['Sorting'], category: 'Sorting' },
        { id: 13, title: 'Largest Number', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-number/', tags: ['Sorting'], category: 'Sorting' },
        { id: 14, title: 'Meeting Rooms', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/meeting-rooms/', tags: ['Sorting'], category: 'Sorting' },
        { id: 15, title: 'Meeting Rooms II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/meeting-rooms-ii/', tags: ['Sorting'], category: 'Sorting' },
        { id: 16, title: 'Kth Largest Element', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', tags: ['Sorting'], category: 'Sorting' },
        { id: 17, title: 'Top K Frequent Elements', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/top-k-frequent-elements/', tags: ['Sorting'], category: 'Sorting' },
        { id: 18, title: 'Sort List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sort-list/', tags: ['Sorting', 'Linked List'], category: 'Sorting' },
        { id: 19, title: 'Insertion Sort List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insertion-sort-list/', tags: ['Sorting', 'Linked List'], category: 'Sorting' },
        { id: 20, title: 'Sort Array By Parity', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/sort-array-by-parity/', tags: ['Sorting'], category: 'Sorting' },
        { id: 21, title: 'Pancake Sorting', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/pancake-sorting/', tags: ['Sorting'], category: 'Sorting' },
        { id: 22, title: 'Wiggle Sort', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/wiggle-sort/', tags: ['Sorting'], category: 'Sorting' },
        { id: 23, title: 'Wiggle Sort II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/wiggle-sort-ii/', tags: ['Sorting'], category: 'Sorting' },
        { id: 24, title: 'H-Index', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/h-index/', tags: ['Sorting'], category: 'Sorting' },
        { id: 25, title: 'H-Index II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/h-index-ii/', tags: ['Sorting', 'Binary Search'], category: 'Sorting' },
        { id: 26, title: 'Russian Doll Envelopes', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/russian-doll-envelopes/', tags: ['Sorting'], category: 'Sorting' },
        { id: 27, title: 'Maximum Gap', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-gap/', tags: ['Sorting'], category: 'Sorting' },
        { id: 28, title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', tags: ['Sorting'], category: 'Sorting' },
        { id: 29, title: 'Reverse Pairs', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-pairs/', tags: ['Sorting'], category: 'Sorting' },
        { id: 30, title: 'Turbo Sort', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/TSORT', tags: ['Sorting'], category: 'Sorting' },
        { id: 31, title: 'Merge Sort Implementation', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/mergesort/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 32, title: 'Quick Sort Implementation', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/quicksort1/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 33, title: 'Insertion Sort Advanced', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/insertionsort1/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 34, title: 'Counting Sort 1', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/countingsort1/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 35, title: 'Find the Median', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/find-the-median/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 36, title: 'Closest Numbers', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/closest-numbers/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 37, title: 'Fraudulent Activity Notifications', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 38, title: 'Lily Homework', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/lilys-homework/problem', tags: ['Sorting'], category: 'Sorting' },
        { id: 39, title: 'Chef and Linear Chess', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/LINCHESS', tags: ['Sorting'], category: 'Sorting' },
        { id: 40, title: 'Enormous Input Test', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/INTEST', tags: ['Sorting'], category: 'Sorting' },
        
        // Binary Search (41-80)
        { id: 41, title: 'Binary Search', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-search/', tags: ['Binary Search'], category: 'Searching' },
        { id: 42, title: 'Search Insert Position', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-insert-position/', tags: ['Binary Search'], category: 'Searching' },
        { id: 43, title: 'First Bad Version', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/first-bad-version/', tags: ['Binary Search'], category: 'Searching' },
        { id: 44, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', tags: ['Binary Search'], category: 'Searching' },
        { id: 45, title: 'Search in Rotated Sorted Array II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/', tags: ['Binary Search'], category: 'Searching' },
        { id: 46, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', tags: ['Binary Search'], category: 'Searching' },
        { id: 47, title: 'Find Peak Element', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-peak-element/', tags: ['Binary Search'], category: 'Searching' },
        { id: 48, title: 'Search a 2D Matrix', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-a-2d-matrix/', tags: ['Binary Search'], category: 'Searching' },
        { id: 49, title: 'Search a 2D Matrix II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-a-2d-matrix-ii/', tags: ['Binary Search'], category: 'Searching' },
        { id: 50, title: 'Find First and Last Position', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', tags: ['Binary Search'], category: 'Searching' },
        { id: 51, title: 'Sqrt(x)', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/sqrtx/', tags: ['Binary Search'], category: 'Searching' },
        { id: 52, title: 'Valid Perfect Square', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-perfect-square/', tags: ['Binary Search'], category: 'Searching' },
        { id: 53, title: 'Guess Number Higher or Lower', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/guess-number-higher-or-lower/', tags: ['Binary Search'], category: 'Searching' },
        { id: 54, title: 'Find K Closest Elements', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-k-closest-elements/', tags: ['Binary Search'], category: 'Searching' },
        { id: 55, title: 'Pow(x, n)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/powx-n/', tags: ['Binary Search'], category: 'Searching' },
        { id: 56, title: 'Divide Two Integers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/divide-two-integers/', tags: ['Binary Search'], category: 'Searching' },
        { id: 57, title: 'Capacity To Ship Packages', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', tags: ['Binary Search'], category: 'Searching' },
        { id: 58, title: 'Koko Eating Bananas', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/koko-eating-bananas/', tags: ['Binary Search'], category: 'Searching' },
        { id: 59, title: 'Minimum Number of Days to Make Bouquets', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', tags: ['Binary Search'], category: 'Searching' },
        { id: 60, title: 'Find Right Interval', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-right-interval/', tags: ['Binary Search'], category: 'Searching' },
        { id: 61, title: 'Random Pick with Weight', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/random-pick-with-weight/', tags: ['Binary Search'], category: 'Searching' },
        { id: 62, title: 'Time Based Key-Value Store', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/time-based-key-value-store/', tags: ['Binary Search'], category: 'Searching' },
        { id: 63, title: 'Online Election', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/online-election/', tags: ['Binary Search'], category: 'Searching' },
        { id: 64, title: 'Snapshot Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/snapshot-array/', tags: ['Binary Search'], category: 'Searching' },
        { id: 65, title: 'Find the Duplicate Number', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-the-duplicate-number/', tags: ['Binary Search'], category: 'Searching' },
        { id: 66, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', tags: ['Binary Search'], category: 'Searching' },
        { id: 67, title: 'Find Median from Data Stream', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-median-from-data-stream/', tags: ['Binary Search'], category: 'Searching' },
        { id: 68, title: 'Aggressive Cows', difficulty: 'Medium', platform: 'CodeChef', link: 'https://www.codechef.com/problems/AGGRCOW', tags: ['Binary Search'], category: 'Searching' },
        { id: 69, title: 'Roti Prata', difficulty: 'Medium', platform: 'CodeChef', link: 'https://www.codechef.com/problems/PRATA', tags: ['Binary Search'], category: 'Searching' },
        { id: 70, title: 'Hackerland Radio Transmitters', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/hackerland-radio-transmitters/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 71, title: 'Ice Cream Parlor', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/icecream-parlor/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 72, title: 'Missing Numbers', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/missing-numbers/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 73, title: 'Pairs', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/pairs/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 74, title: 'Triple Sum', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/triple-sum/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 75, title: 'Minimum Time Required', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/minimum-time-required/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 76, title: 'Maximum Subarray Sum', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/maximum-subarray-sum/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 77, title: 'Making Candies', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/making-candies/problem', tags: ['Binary Search'], category: 'Searching' },
        { id: 78, title: 'Gcd and Lcm', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/FLOW016', tags: ['Binary Search'], category: 'Searching' },
        { id: 79, title: 'Binary Search Implementation', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/binary-search/', tags: ['Binary Search'], category: 'Searching' },
        { id: 80, title: 'Ternary Search', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/ternary-search/', tags: ['Binary Search'], category: 'Searching' },
        
        // Greedy Algorithms (81-120)
        { id: 81, title: 'Activity Selection Problem', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/', tags: ['Greedy'], category: 'Greedy' },
        { id: 82, title: 'Fractional Knapsack', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/fractional-knapsack-problem/', tags: ['Greedy'], category: 'Greedy' },
        { id: 83, title: 'Job Sequencing Problem', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/job-sequencing-problem/', tags: ['Greedy'], category: 'Greedy' },
        { id: 84, title: 'Huffman Coding', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/', tags: ['Greedy'], category: 'Greedy' },
        { id: 85, title: 'Minimum Spanning Tree', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/', tags: ['Greedy'], category: 'Greedy' },
        { id: 86, title: 'Dijkstra Algorithm', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/', tags: ['Greedy'], category: 'Greedy' },
        { id: 87, title: 'Jump Game', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/jump-game/', tags: ['Greedy'], category: 'Greedy' },
        { id: 88, title: 'Jump Game II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/jump-game-ii/', tags: ['Greedy'], category: 'Greedy' },
        { id: 89, title: 'Gas Station', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/gas-station/', tags: ['Greedy'], category: 'Greedy' },
        { id: 90, title: 'Candy', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/candy/', tags: ['Greedy'], category: 'Greedy' },
        { id: 91, title: 'Best Time to Buy and Sell Stock II', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', tags: ['Greedy'], category: 'Greedy' },
        { id: 92, title: 'Assign Cookies', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/assign-cookies/', tags: ['Greedy'], category: 'Greedy' },
        { id: 93, title: 'Lemonade Change', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/lemonade-change/', tags: ['Greedy'], category: 'Greedy' },
        { id: 94, title: 'Queue Reconstruction by Height', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/queue-reconstruction-by-height/', tags: ['Greedy'], category: 'Greedy' },
        { id: 95, title: 'Minimum Number of Arrows', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', tags: ['Greedy'], category: 'Greedy' },
        { id: 96, title: 'Non-overlapping Intervals', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/non-overlapping-intervals/', tags: ['Greedy'], category: 'Greedy' },
        { id: 97, title: 'Partition Labels', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/partition-labels/', tags: ['Greedy'], category: 'Greedy' },
        { id: 98, title: 'Task Scheduler', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/task-scheduler/', tags: ['Greedy'], category: 'Greedy' },
        { id: 99, title: 'Reorganize String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reorganize-string/', tags: ['Greedy'], category: 'Greedy' },
        { id: 100, title: 'Advantage Shuffle', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/advantage-shuffle/', tags: ['Greedy'], category: 'Greedy' },
        { id: 101, title: 'Boats to Save People', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/boats-to-save-people/', tags: ['Greedy'], category: 'Greedy' },
        { id: 102, title: 'Minimum Domino Rotations', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/', tags: ['Greedy'], category: 'Greedy' },
        { id: 103, title: 'Bag of Tokens', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/bag-of-tokens/', tags: ['Greedy'], category: 'Greedy' },
        { id: 104, title: 'Minimum Cost to Move Chips', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/', tags: ['Greedy'], category: 'Greedy' },
        { id: 105, title: 'Two City Scheduling', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-city-scheduling/', tags: ['Greedy'], category: 'Greedy' },
        { id: 106, title: 'Maximum Units on Truck', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-units-on-a-truck/', tags: ['Greedy'], category: 'Greedy' },
        { id: 107, title: 'Reduce Array Size to Half', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reduce-array-size-to-the-half/', tags: ['Greedy'], category: 'Greedy' },
        { id: 108, title: 'Minimum Deletions to Make Array Beautiful', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-deletions-to-make-array-beautiful/', tags: ['Greedy'], category: 'Greedy' },
        { id: 109, title: 'Chef and Notebooks', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/CNOTE', tags: ['Greedy'], category: 'Greedy' },
        { id: 110, title: 'Greedy Florist', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/greedy-florist/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 111, title: 'Minimum Absolute Difference', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/minimum-absolute-difference-in-an-array/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 112, title: 'Luck Balance', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/luck-balance/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 113, title: 'Maximum Perimeter Triangle', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/maximum-perimeter-triangle/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 114, title: 'Beautiful Pairs', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/beautiful-pairs/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 115, title: 'Sherlock and MiniMax', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/sherlock-and-minimax/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 116, title: 'Priyanka and Toys', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/priyanka-and-toys/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 117, title: 'Mark and Toys', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/mark-and-toys/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 118, title: 'Grid Challenge', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/grid-challenge/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 119, title: 'Largest Permutation', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/largest-permutation/problem', tags: ['Greedy'], category: 'Greedy' },
        { id: 120, title: 'Jim and the Orders', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/jim-and-the-orders/problem', tags: ['Greedy'], category: 'Greedy' }
      ]
    },
    {
      name: "String Manipulation",
      icon: "🔤",
      color: "from-green-500 to-teal-500",
      problems: 350,
      description: "Pattern matching, parsing, and string algorithms",
      topics: ["Pattern Matching", "Parsing", "Regular Expressions", "String Processing"],
      problemList: [
        { id: 1, title: 'Valid Anagram', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-anagram/', tags: ['String', 'Hash Table'], category: 'Basic' },
        { id: 2, title: 'First Unique Character', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/first-unique-character-in-a-string/', tags: ['String'], category: 'Basic' },
        { id: 3, title: 'Valid Palindrome', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-palindrome/', tags: ['String'], category: 'Basic' },
        { id: 4, title: 'Reverse String', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-string/', tags: ['String'], category: 'Basic' },
        { id: 5, title: 'Implement strStr()', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-strstr/', tags: ['String'], category: 'Basic' },
        { id: 6, title: 'Longest Common Prefix', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-common-prefix/', tags: ['String'], category: 'Basic' },
        { id: 7, title: 'String to Integer (atoi)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/string-to-integer-atoi/', tags: ['String'], category: 'Medium' },
        { id: 8, title: 'Zigzag Conversion', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/zigzag-conversion/', tags: ['String'], category: 'Medium' },
        { id: 9, title: 'Longest Substring Without Repeating', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', tags: ['String'], category: 'Medium' },
        { id: 10, title: 'Longest Palindromic Substring', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-palindromic-substring/', tags: ['String'], category: 'Medium' },
        { id: 11, title: 'Group Anagrams', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/group-anagrams/', tags: ['String'], category: 'Medium' },
        { id: 12, title: 'Minimum Window Substring', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-window-substring/', tags: ['String'], category: 'Hard' },
        { id: 13, title: 'Edit Distance', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/edit-distance/', tags: ['String', 'DP'], category: 'Hard' },
        { id: 14, title: 'Regular Expression Matching', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/regular-expression-matching/', tags: ['String'], category: 'Hard' },
        { id: 15, title: 'Wildcard Matching', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/wildcard-matching/', tags: ['String'], category: 'Hard' },
        { id: 16, title: 'Palindrome Partitioning', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-partitioning/', tags: ['String'], category: 'Medium' },
        { id: 17, title: 'Word Break', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-break/', tags: ['String'], category: 'Medium' },
        { id: 18, title: 'Word Ladder', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-ladder/', tags: ['String'], category: 'Hard' },
        { id: 19, title: 'Substring with Concatenation', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', tags: ['String'], category: 'Hard' },
        { id: 20, title: 'KMP Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/', tags: ['String'], category: 'Hard' },
        { id: 21, title: 'Rabin Karp Algorithm', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/', tags: ['String'], category: 'Medium' },
        { id: 22, title: 'Z Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/', tags: ['String'], category: 'Hard' },
        { id: 23, title: 'Manacher Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/manachers-algorithm-linear-time-longest-palindromic-substring-part-1/', tags: ['String'], category: 'Hard' },
        { id: 24, title: 'Suffix Array', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/suffix-array-set-1-introduction/', tags: ['String'], category: 'Hard' },
        { id: 25, title: 'Trie Implementation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/', tags: ['String', 'Trie'], category: 'Medium' },
        { id: 26, title: 'Word Search II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-search-ii/', tags: ['String', 'Trie'], category: 'Hard' },
        { id: 27, title: 'Palindromic Substrings', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindromic-substrings/', tags: ['String'], category: 'Medium' },
        { id: 28, title: 'Decode Ways', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/decode-ways/', tags: ['String'], category: 'Medium' },
        { id: 29, title: 'Distinct Subsequences', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/distinct-subsequences/', tags: ['String'], category: 'Hard' },
        { id: 30, title: 'Interleaving String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/interleaving-string/', tags: ['String'], category: 'Medium' },
        { id: 31, title: 'Scramble String', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/scramble-string/', tags: ['String'], category: 'Hard' },
        { id: 32, title: 'Text Justification', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/text-justification/', tags: ['String'], category: 'Hard' },
        { id: 33, title: 'Reverse Words in String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-words-in-a-string/', tags: ['String'], category: 'Medium' },
        { id: 34, title: 'Compare Version Numbers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/compare-version-numbers/', tags: ['String'], category: 'Medium' },
        { id: 35, title: 'Restore IP Addresses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/restore-ip-addresses/', tags: ['String'], category: 'Medium' },
        { id: 36, title: 'Valid Number', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-number/', tags: ['String'], category: 'Hard' },
        { id: 37, title: 'Integer to Roman', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/integer-to-roman/', tags: ['String'], category: 'Medium' },
        { id: 38, title: 'Roman to Integer', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/roman-to-integer/', tags: ['String'], category: 'Easy' },
        { id: 39, title: 'Count and Say', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-and-say/', tags: ['String'], category: 'Medium' },
        { id: 40, title: 'Length of Last Word', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/length-of-last-word/', tags: ['String'], category: 'Easy' },
        { id: 41, title: 'Add Binary', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/add-binary/', tags: ['String'], category: 'Easy' },
        { id: 42, title: 'Multiply Strings', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/multiply-strings/', tags: ['String'], category: 'Medium' },
        { id: 43, title: 'Simplify Path', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/simplify-path/', tags: ['String'], category: 'Medium' },
        { id: 44, title: 'One Edit Distance', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/one-edit-distance/', tags: ['String'], category: 'Medium' },
        { id: 45, title: 'Read N Characters Given Read4', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/read-n-characters-given-read4/', tags: ['String'], category: 'Easy' },
        { id: 46, title: 'Shortest Palindrome', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-palindrome/', tags: ['String'], category: 'Hard' },
        { id: 47, title: 'Isomorphic Strings', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/isomorphic-strings/', tags: ['String'], category: 'Easy' },
        { id: 48, title: 'Word Pattern', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-pattern/', tags: ['String'], category: 'Easy' },
        { id: 49, title: 'Find All Anagrams', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', tags: ['String'], category: 'Medium' },
        { id: 50, title: 'Repeated Substring Pattern', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/repeated-substring-pattern/', tags: ['String'], category: 'Easy' },
        { id: 51, title: 'License Key Formatting', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/license-key-formatting/', tags: ['String'], category: 'Easy' },
        { id: 52, title: 'Number of Segments', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-segments-in-a-string/', tags: ['String'], category: 'Easy' },
        { id: 53, title: 'Detect Capital', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/detect-capital/', tags: ['String'], category: 'Easy' },
        { id: 54, title: 'Longest Uncommon Subsequence', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-uncommon-subsequence-i/', tags: ['String'], category: 'Easy' },
        { id: 55, title: 'Reverse String II', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-string-ii/', tags: ['String'], category: 'Easy' },
        { id: 56, title: 'Student Attendance Record', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/student-attendance-record-i/', tags: ['String'], category: 'Easy' },
        { id: 57, title: 'Reverse Words III', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-words-in-a-string-iii/', tags: ['String'], category: 'Easy' },
        { id: 58, title: 'Rotated Digits', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/rotated-digits/', tags: ['String'], category: 'Easy' },
        { id: 59, title: 'Most Common Word', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/most-common-word/', tags: ['String'], category: 'Easy' },
        { id: 60, title: 'Goat Latin', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/goat-latin/', tags: ['String'], category: 'Easy' },
        { id: 61, title: 'Buddy Strings', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/buddy-strings/', tags: ['String'], category: 'Easy' },
        { id: 62, title: 'Lemon Water Change', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/lemonade-change/', tags: ['String'], category: 'Easy' },
        { id: 63, title: 'Unique Email Addresses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/unique-email-addresses/', tags: ['String'], category: 'Easy' },
        { id: 64, title: 'Long Pressed Name', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/long-pressed-name/', tags: ['String'], category: 'Easy' },
        { id: 65, title: 'Groups of Special-Equivalent', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/groups-of-special-equivalent-strings/', tags: ['String'], category: 'Easy' },
        { id: 66, title: 'Reorder Data in Log Files', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reorder-data-in-log-files/', tags: ['String'], category: 'Easy' },
        { id: 67, title: 'Valid Palindrome II', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-palindrome-ii/', tags: ['String'], category: 'Easy' },
        { id: 68, title: 'Longest Word in Dictionary', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-word-in-dictionary/', tags: ['String'], category: 'Easy' },
        { id: 69, title: 'To Lower Case', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/to-lower-case/', tags: ['String'], category: 'Easy' },
        { id: 70, title: 'Jewels and Stones', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/jewels-and-stones/', tags: ['String'], category: 'Easy' },
        { id: 71, title: 'Split a String in Balanced', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/split-a-string-in-balanced-strings/', tags: ['String'], category: 'Easy' },
        { id: 72, title: 'Remove Outermost Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-outermost-parentheses/', tags: ['String'], category: 'Easy' },
        { id: 73, title: 'Defanging an IP Address', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/defanging-an-ip-address/', tags: ['String'], category: 'Easy' },
        { id: 74, title: 'Generate Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/generate-parentheses/', tags: ['String'], category: 'Medium' },
        { id: 75, title: 'Letter Combinations Phone', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', tags: ['String'], category: 'Medium' },
        { id: 76, title: 'Remove Invalid Parentheses', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-invalid-parentheses/', tags: ['String'], category: 'Hard' },
        { id: 77, title: 'Different Ways to Add Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/different-ways-to-add-parentheses/', tags: ['String'], category: 'Medium' },
        { id: 78, title: 'Basic Calculator', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/basic-calculator/', tags: ['String'], category: 'Hard' },
        { id: 79, title: 'Basic Calculator II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/basic-calculator-ii/', tags: ['String'], category: 'Medium' },
        { id: 80, title: 'Expression Add Operators', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/expression-add-operators/', tags: ['String'], category: 'Hard' },
        { id: 81, title: 'Find Duplicate File', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-duplicate-file-in-system/', tags: ['String'], category: 'Medium' },
        { id: 82, title: 'Repeated DNA Sequences', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/repeated-dna-sequences/', tags: ['String'], category: 'Medium' },
        { id: 83, title: 'Word Abbreviation', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-abbreviation/', tags: ['String'], category: 'Hard' },
        { id: 84, title: 'Minimum Unique Word Abbreviation', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-unique-word-abbreviation/', tags: ['String'], category: 'Hard' },
        { id: 85, title: 'Valid Word Abbreviation', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-word-abbreviation/', tags: ['String'], category: 'Easy' },
        { id: 86, title: 'Generalized Abbreviation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/generalized-abbreviation/', tags: ['String'], category: 'Medium' },
        { id: 87, title: 'Encode and Decode Strings', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/encode-and-decode-strings/', tags: ['String'], category: 'Medium' },
        { id: 88, title: 'Design Compressed String Iterator', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-compressed-string-iterator/', tags: ['String'], category: 'Easy' },
        { id: 89, title: 'String Compression', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/string-compression/', tags: ['String'], category: 'Medium' },
        { id: 90, title: 'Count Binary Substrings', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-binary-substrings/', tags: ['String'], category: 'Easy' },
        { id: 91, title: 'Palindrome Pairs', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-pairs/', tags: ['String'], category: 'Hard' },
        { id: 92, title: 'Shortest Way to Form String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-way-to-form-string/', tags: ['String'], category: 'Medium' },
        { id: 93, title: 'Expressive Words', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/expressive-words/', tags: ['String'], category: 'Medium' },
        { id: 94, title: 'Flip String to Monotone', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/flip-string-to-monotone-increasing/', tags: ['String'], category: 'Medium' },
        { id: 95, title: 'Minimum ASCII Delete Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/', tags: ['String'], category: 'Medium' },
        { id: 96, title: 'Longest Repeating Character', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', tags: ['String'], category: 'Medium' },
        { id: 97, title: 'Permutation in String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/permutation-in-string/', tags: ['String'], category: 'Medium' },
        { id: 98, title: 'Find All Duplicates', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/', tags: ['String'], category: 'Medium' },
        { id: 99, title: 'Camelcase Matching', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/camelcase-matching/', tags: ['String'], category: 'Medium' },
        { id: 100, title: 'String Transforms Into Another', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/string-transforms-into-another-string/', tags: ['String'], category: 'Hard' }
      ]
    },
    {
      name: "Graph Algorithms",
      icon: "🕸️",
      color: "from-orange-500 to-red-500",
      problems: 420,
      description: "Traversal, shortest paths, and network algorithms",
      topics: ["BFS/DFS", "Shortest Path", "MST", "Topological Sort", "Network Flow"],
      problemList: [
        { id: 1, title: 'Number of Islands', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-islands/', tags: ['Graph', 'DFS'], category: 'Graph Traversal' },
        { id: 2, title: 'Clone Graph', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/clone-graph/', tags: ['Graph', 'DFS'], category: 'Graph Traversal' },
        { id: 3, title: 'Course Schedule', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/course-schedule/', tags: ['Graph', 'Topological Sort'], category: 'Topological Sort' },
        { id: 4, title: 'Course Schedule II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/course-schedule-ii/', tags: ['Graph', 'Topological Sort'], category: 'Topological Sort' },
        { id: 5, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', tags: ['Graph', 'DFS'], category: 'Graph Traversal' },
        { id: 6, title: 'Graph Valid Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/graph-valid-tree/', tags: ['Graph', 'Union Find'], category: 'Graph Validation' },
        { id: 7, title: 'Number of Connected Components', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', tags: ['Graph', 'Union Find'], category: 'Connected Components' },
        { id: 8, title: 'Word Ladder', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-ladder/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 9, title: 'Word Ladder II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-ladder-ii/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 10, title: 'Surrounded Regions', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/surrounded-regions/', tags: ['Graph', 'DFS'], category: 'Graph Traversal' },
        { id: 11, title: 'Minimum Height Trees', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-height-trees/', tags: ['Graph', 'Topological Sort'], category: 'Tree' },
        { id: 12, title: 'Network Delay Time', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/network-delay-time/', tags: ['Graph', 'Dijkstra'], category: 'Shortest Path' },
        { id: 13, title: 'Cheapest Flights Within K Stops', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', tags: ['Graph', 'Dijkstra'], category: 'Shortest Path' },
        { id: 14, title: 'Find the City', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/', tags: ['Graph', 'Floyd Warshall'], category: 'Shortest Path' },
        { id: 15, title: 'Critical Connections', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/critical-connections-in-a-network/', tags: ['Graph', 'Tarjan'], category: 'Bridges' },
        { id: 16, title: 'Redundant Connection', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/redundant-connection/', tags: ['Graph', 'Union Find'], category: 'Cycle Detection' },
        { id: 17, title: 'Redundant Connection II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/redundant-connection-ii/', tags: ['Graph', 'Union Find'], category: 'Cycle Detection' },
        { id: 18, title: 'Accounts Merge', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/accounts-merge/', tags: ['Graph', 'Union Find'], category: 'Union Find' },
        { id: 19, title: 'Most Stones Removed', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/', tags: ['Graph', 'Union Find'], category: 'Union Find' },
        { id: 20, title: 'Satisfiability of Equality Equations', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/satisfiability-of-equality-equations/', tags: ['Graph', 'Union Find'], category: 'Union Find' },
        { id: 21, title: 'Is Graph Bipartite', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/is-graph-bipartite/', tags: ['Graph', 'BFS'], category: 'Bipartite' },
        { id: 22, title: 'Possible Bipartition', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/possible-bipartition/', tags: ['Graph', 'BFS'], category: 'Bipartite' },
        { id: 23, title: 'Shortest Path in Binary Matrix', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 24, title: 'As Far from Land as Possible', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/as-far-from-land-as-possible/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 25, title: 'Rotting Oranges', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/rotting-oranges/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 26, title: 'Shortest Bridge', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-bridge/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 27, title: 'Keys and Rooms', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/keys-and-rooms/', tags: ['Graph', 'DFS'], category: 'Graph Traversal' },
        { id: 28, title: 'Evaluate Division', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/evaluate-division/', tags: ['Graph', 'DFS'], category: 'Weighted Graph' },
        { id: 29, title: 'Reconstruct Itinerary', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reconstruct-itinerary/', tags: ['Graph', 'Eulerian Path'], category: 'Eulerian Path' },
        { id: 30, title: 'Find Eventual Safe States', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-eventual-safe-states/', tags: ['Graph', 'Topological Sort'], category: 'Cycle Detection' },
        { id: 31, title: 'Loud and Rich', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/loud-and-rich/', tags: ['Graph', 'DFS'], category: 'Graph Traversal' },
        { id: 32, title: 'Flower Planting With No Adjacent', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/flower-planting-with-no-adjacent/', tags: ['Graph', 'Greedy'], category: 'Graph Coloring' },
        { id: 33, title: 'Campus Bikes', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/campus-bikes/', tags: ['Graph', 'Greedy'], category: 'Assignment' },
        { id: 34, title: 'Campus Bikes II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/campus-bikes-ii/', tags: ['Graph', 'Backtracking'], category: 'Assignment' },
        { id: 35, title: 'Minimum Cost to Connect Sticks', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-cost-to-connect-sticks/', tags: ['Graph', 'MST'], category: 'MST' },
        { id: 36, title: 'Connecting Cities With Minimum Cost', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/connecting-cities-with-minimum-cost/', tags: ['Graph', 'MST'], category: 'MST' },
        { id: 37, title: 'Optimize Water Distribution', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/optimize-water-distribution-in-a-village/', tags: ['Graph', 'MST'], category: 'MST' },
        { id: 38, title: 'Min Cost to Connect All Points', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', tags: ['Graph', 'MST'], category: 'MST' },
        { id: 39, title: 'Path With Maximum Probability', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/path-with-maximum-probability/', tags: ['Graph', 'Dijkstra'], category: 'Shortest Path' },
        { id: 40, title: 'Path With Minimum Effort', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/path-with-minimum-effort/', tags: ['Graph', 'Dijkstra'], category: 'Shortest Path' },
        { id: 41, title: 'Swim in Rising Water', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/swim-in-rising-water/', tags: ['Graph', 'Binary Search'], category: 'Binary Search on Answer' },
        { id: 42, title: 'Escape a Large Maze', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/escape-a-large-maze/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 43, title: 'Shortest Path Visiting All Nodes', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/', tags: ['Graph', 'BFS'], category: 'TSP' },
        { id: 44, title: 'Bus Routes', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/bus-routes/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 45, title: 'Open the Lock', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/open-the-lock/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 46, title: 'Sliding Puzzle', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/sliding-puzzle/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 47, title: 'Minimum Genetic Mutation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-genetic-mutation/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 48, title: 'Snakes and Ladders', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/snakes-and-ladders/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 49, title: 'Minimum Knight Moves', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-knight-moves/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 50, title: 'Cut Off Trees for Golf Event', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/cut-off-trees-for-golf-event/', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 51, title: 'Alien Dictionary', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/alien-dictionary/', tags: ['Graph', 'Topological Sort'], category: 'Topological Sort' },
        { id: 52, title: 'Sequence Reconstruction', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sequence-reconstruction/', tags: ['Graph', 'Topological Sort'], category: 'Topological Sort' },
        { id: 53, title: 'Parallel Courses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/parallel-courses/', tags: ['Graph', 'Topological Sort'], category: 'Topological Sort' },
        { id: 54, title: 'Parallel Courses II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/parallel-courses-ii/', tags: ['Graph', 'Bitmask DP'], category: 'Advanced' },
        { id: 55, title: 'Sort Items by Groups', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/', tags: ['Graph', 'Topological Sort'], category: 'Topological Sort' },
        { id: 56, title: 'Maximum Flow', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/ford-fulkerson-algorithm-for-maximum-flow-problem/', tags: ['Graph', 'Max Flow'], category: 'Network Flow' },
        { id: 57, title: 'Minimum Cut', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/minimum-cut-in-a-directed-graph/', tags: ['Graph', 'Min Cut'], category: 'Network Flow' },
        { id: 58, title: 'Bipartite Matching', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/maximum-bipartite-matching/', tags: ['Graph', 'Matching'], category: 'Matching' },
        { id: 59, title: 'Hungarian Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/hungarian-algorithm-assignment-problem-set-1-introduction/', tags: ['Graph', 'Assignment'], category: 'Assignment' },
        { id: 60, title: 'Articulation Points', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/', tags: ['Graph', 'Tarjan'], category: 'Articulation Points' },
        { id: 61, title: 'Strongly Connected Components', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/strongly-connected-components/', tags: ['Graph', 'Tarjan'], category: 'SCC' },
        { id: 62, title: 'Kosaraju Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/strongly-connected-components/', tags: ['Graph', 'Kosaraju'], category: 'SCC' },
        { id: 63, title: 'Eulerian Path and Circuit', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/eulerian-path-and-circuit/', tags: ['Graph', 'Eulerian'], category: 'Eulerian Path' },
        { id: 64, title: 'Hamiltonian Path', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/hamiltonian-cycle-backtracking-6/', tags: ['Graph', 'Hamiltonian'], category: 'Hamiltonian Path' },
        { id: 65, title: 'Traveling Salesman Problem', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/travelling-salesman-problem-set-1/', tags: ['Graph', 'TSP'], category: 'TSP' },
        { id: 66, title: 'Graph Coloring', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/graph-coloring-applications/', tags: ['Graph', 'Coloring'], category: 'Graph Coloring' },
        { id: 67, title: 'Vertex Cover', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/vertex-cover-problem-set-1-introduction-approximate-algorithm-2/', tags: ['Graph', 'Vertex Cover'], category: 'Vertex Cover' },
        { id: 68, title: 'Independent Set', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/largest-independent-set-problem-dp-26/', tags: ['Graph', 'Independent Set'], category: 'Independent Set' },
        { id: 69, title: 'Clique Problem', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/clique-problem-np-complete/', tags: ['Graph', 'Clique'], category: 'Clique' },
        { id: 70, title: 'Dominating Set', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/dominating-set-problem-set-1-greedy-approximate-algorithm/', tags: ['Graph', 'Dominating Set'], category: 'Dominating Set' },
        { id: 71, title: 'Shortest Path Faster Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/shortest-path-faster-algorithm/', tags: ['Graph', 'SPFA'], category: 'Shortest Path' },
        { id: 72, title: 'Johnson Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/johnsons-algorithm/', tags: ['Graph', 'Johnson'], category: 'All Pairs Shortest Path' },
        { id: 73, title: 'A* Search Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/a-search-algorithm/', tags: ['Graph', 'A*'], category: 'Heuristic Search' },
        { id: 74, title: 'Bidirectional Search', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/bidirectional-search/', tags: ['Graph', 'Bidirectional'], category: 'Search' },
        { id: 75, title: 'Jump Point Search', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/jump-point-search/', tags: ['Graph', 'JPS'], category: 'Pathfinding' },
        { id: 76, title: 'Hierholzer Algorithm', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/hierholzers-algorithm-directed-graph/', tags: ['Graph', 'Hierholzer'], category: 'Eulerian Path' },
        { id: 77, title: 'Chinese Postman Problem', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/chinese-postman-or-route-inspection-set-1-introduction/', tags: ['Graph', 'Chinese Postman'], category: 'Postman Problem' },
        { id: 78, title: 'Minimum Spanning Tree Variants', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/applications-of-minimum-spanning-tree/', tags: ['Graph', 'MST'], category: 'MST Variants' },
        { id: 79, title: 'Steiner Tree Problem', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/steiner-tree-problem/', tags: ['Graph', 'Steiner Tree'], category: 'Steiner Tree' },
        { id: 80, title: 'Minimum Bottleneck Spanning Tree', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/minimum-bottleneck-spanning-tree-mbst/', tags: ['Graph', 'MBST'], category: 'MBST' },
        { id: 81, title: 'DFS Tree', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/torque-and-development/problem', tags: ['Graph', 'DFS'], category: 'Graph Traversal' },
        { id: 82, title: 'BFS Shortest Reach', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/bfsshortreach/problem', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 83, title: 'Dijkstra Shortest Reach', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/dijkstrashortreach/problem', tags: ['Graph', 'Dijkstra'], category: 'Shortest Path' },
        { id: 84, title: 'Prim MST Special Subtree', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/primsmstsub/problem', tags: ['Graph', 'MST'], category: 'MST' },
        { id: 85, title: 'Kruskal MST Really Special Subtree', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/kruskalmstrsub/problem', tags: ['Graph', 'MST'], category: 'MST' },
        { id: 86, title: 'Floyd City of Blinding Lights', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/floyd-city-of-blinding-lights/problem', tags: ['Graph', 'Floyd Warshall'], category: 'All Pairs Shortest Path' },
        { id: 87, title: 'Roads and Libraries', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/torque-and-development/problem', tags: ['Graph', 'MST'], category: 'MST' },
        { id: 88, title: 'Journey to the Moon', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/journey-to-the-moon/problem', tags: ['Graph', 'DFS'], category: 'Connected Components' },
        { id: 89, title: 'Synchronous Shopping', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/synchronous-shopping/problem', tags: ['Graph', 'Dijkstra'], category: 'Advanced Shortest Path' },
        { id: 90, title: 'Subset Component', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/subset-component/problem', tags: ['Graph', 'Bitmask'], category: 'Advanced' },
        { id: 91, title: 'Matrix', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/matrix/problem', tags: ['Graph', 'MST'], category: 'Advanced MST' },
        { id: 92, title: 'Really Special Subtree', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/really-special-subtree/problem', tags: ['Graph', 'MST'], category: 'Advanced MST' },
        { id: 93, title: 'Crab Graphs', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/crab-graphs/problem', tags: ['Graph', 'Matching'], category: 'Graph Matching' },
        { id: 94, title: 'Kingdom Connectivity', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/kingdom-connectivity/problem', tags: ['Graph', 'Topological Sort'], category: 'Advanced Graph' },
        { id: 95, title: 'Even Tree', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/even-tree/problem', tags: ['Graph', 'Tree'], category: 'Tree' },
        { id: 96, title: 'Snakes and Ladders', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/the-quickest-way-up/problem', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 97, title: 'Jack goes to Rapture', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/jack-goes-to-rapture/problem', tags: ['Graph', 'Dijkstra'], category: 'Modified Dijkstra' },
        { id: 98, title: 'Breadth First Search Shortest Reach', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/ctci-bfs-shortest-reach/problem', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 99, title: 'Find the nearest clone', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/find-the-nearest-clone/problem', tags: ['Graph', 'BFS'], category: 'BFS' },
        { id: 100, title: 'Roads in HackerLand', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/johnland/problem', tags: ['Graph', 'MST'], category: 'Advanced MST' }
      ]
    },
    {
      name: "Recursion",
      icon: "🔄",
      color: "from-indigo-500 to-purple-500",
      problems: 380,
      description: "Recursive thinking and divide-and-conquer strategies",
      topics: ["Basic Recursion", "Tree Recursion", "Memoization", "Tail Recursion"],
      problemList: [
        { id: 1, title: 'Factorial', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/program-for-factorial-of-a-number/', tags: ['Recursion'], category: 'Basic' },
        { id: 2, title: 'Fibonacci Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/fibonacci-number/', tags: ['Recursion'], category: 'Basic' },
        { id: 3, title: 'Power of Two', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/power-of-two/', tags: ['Recursion'], category: 'Basic' },
        { id: 4, title: 'Power of Three', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/power-of-three/', tags: ['Recursion'], category: 'Basic' },
        { id: 5, title: 'Power of Four', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/power-of-four/', tags: ['Recursion'], category: 'Basic' },
        { id: 6, title: 'Pow(x, n)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/powx-n/', tags: ['Recursion'], category: 'Medium' },
        { id: 7, title: 'Reverse String', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-string/', tags: ['Recursion'], category: 'Basic' },
        { id: 8, title: 'Palindrome Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-linked-list/', tags: ['Recursion'], category: 'Medium' },
        { id: 9, title: 'Swap Nodes in Pairs', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/swap-nodes-in-pairs/', tags: ['Recursion'], category: 'Medium' },
        { id: 10, title: 'Reverse Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-linked-list/', tags: ['Recursion'], category: 'Medium' },
        { id: 11, title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 12, title: 'Binary Tree Preorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 13, title: 'Binary Tree Postorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 14, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 15, title: 'Same Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/same-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 16, title: 'Symmetric Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/symmetric-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 17, title: 'Path Sum', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/path-sum/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 18, title: 'Sum of Left Leaves', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-of-left-leaves/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 19, title: 'Binary Tree Paths', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-paths/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 20, title: 'Invert Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/invert-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 21, title: 'Merge Two Binary Trees', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-two-binary-trees/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 22, title: 'Diameter of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 23, title: 'Binary Tree Tilt', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-tilt/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 24, title: 'Subtree of Another Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/subtree-of-another-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 25, title: 'Lowest Common Ancestor of BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 26, title: 'Generate Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/generate-parentheses/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 27, title: 'Letter Combinations of Phone Number', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 28, title: 'Combination Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/combination-sum/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 29, title: 'Combination Sum II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/combination-sum-ii/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 30, title: 'Permutations', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/permutations/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 31, title: 'Permutations II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/permutations-ii/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 32, title: 'Subsets', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subsets/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 33, title: 'Subsets II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subsets-ii/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 34, title: 'Word Search', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-search/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 35, title: 'Palindrome Partitioning', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-partitioning/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 36, title: 'N-Queens', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/n-queens/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 37, title: 'N-Queens II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/n-queens-ii/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 38, title: 'Sudoku Solver', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/sudoku-solver/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 39, title: 'Restore IP Addresses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/restore-ip-addresses/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 40, title: 'Word Break II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-break-ii/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 41, title: 'Beautiful Arrangement', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/beautiful-arrangement/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 42, title: 'Partition to K Equal Sum Subsets', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 43, title: 'Letter Case Permutation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/letter-case-permutation/', tags: ['Recursion', 'Backtracking'], category: 'Backtracking' },
        { id: 44, title: 'All Paths From Source to Target', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/all-paths-from-source-to-target/', tags: ['Recursion', 'Graph'], category: 'Graph' },
        { id: 45, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 46, title: 'House Robber III', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/house-robber-iii/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 47, title: 'Path Sum II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/path-sum-ii/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 48, title: 'Path Sum III', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/path-sum-iii/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 49, title: 'Sum Root to Leaf Numbers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 50, title: 'Binary Tree Right Side View', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 51, title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 52, title: 'Populating Next Right Pointers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 53, title: 'Construct Binary Tree from Preorder', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 54, title: 'Construct Binary Tree from Postorder', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 55, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 56, title: 'Validate Binary Search Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/validate-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 57, title: 'Recover Binary Search Tree', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/recover-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 58, title: 'Convert Sorted Array to BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 59, title: 'Convert Sorted List to BST', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 60, title: 'Unique Binary Search Trees II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/unique-binary-search-trees-ii/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 61, title: 'Kth Smallest Element in BST', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 62, title: 'Lowest Common Ancestor of Binary Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 63, title: 'Delete Node in BST', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-node-in-a-bst/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 64, title: 'Insert into BST', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 65, title: 'Search in BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-a-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 66, title: 'Range Sum of BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/range-sum-of-bst/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 67, title: 'Trim BST', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/trim-a-binary-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 68, title: 'Two Sum IV - Input is BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 69, title: 'Minimum Distance Between BST Nodes', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-distance-between-bst-nodes/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 70, title: 'Increasing Order Search Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/increasing-order-search-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 71, title: 'All Possible Full Binary Trees', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/all-possible-full-binary-trees/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 72, title: 'Univalued Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/univalued-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 73, title: 'Cousins in Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/cousins-in-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 74, title: 'Distribute Coins in Binary Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/distribute-coins-in-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 75, title: 'Sum of Distances in Tree', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-of-distances-in-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 76, title: 'Binary Tree Cameras', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-cameras/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 77, title: 'Flip Equivalent Binary Trees', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/flip-equivalent-binary-trees/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 78, title: 'Complete Binary Tree Inserter', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/complete-binary-tree-inserter/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 79, title: 'Maximum Binary Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 80, title: 'Maximum Binary Tree II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-binary-tree-ii/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 81, title: 'Find Duplicate Subtrees', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-duplicate-subtrees/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 82, title: 'Longest Univalue Path', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-univalue-path/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 83, title: 'Most Frequent Subtree Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/most-frequent-subtree-sum/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 84, title: 'Find Bottom Left Tree Value', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-bottom-left-tree-value/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 85, title: 'Find Largest Value in Each Row', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-largest-value-in-each-tree-row/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 86, title: 'Add One Row to Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/add-one-row-to-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 87, title: 'Print Binary Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/print-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 88, title: 'Second Minimum Node', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 89, title: 'Longest Zigzag Path', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 90, title: 'Delete Leaves With Given Value', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-leaves-with-a-given-value/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 91, title: 'Deepest Leaves Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/deepest-leaves-sum/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 92, title: 'Sum of Nodes with Even-Valued Grandparent', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 93, title: 'Number of Good Leaf Nodes Pairs', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-good-leaf-nodes-pairs/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 94, title: 'Pseudo-Palindromic Paths', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 95, title: 'Even Odd Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/even-odd-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 96, title: 'Find a Corresponding Node', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 97, title: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 98, title: 'Maximum Product of Splitted Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 99, title: 'Linked List in Binary Tree', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/linked-list-in-binary-tree/', tags: ['Recursion', 'Tree'], category: 'Tree' },
        { id: 100, title: 'Insufficient Nodes in Root to Leaf Paths', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths/', tags: ['Recursion', 'Tree'], category: 'Tree' }
      ]
    },
    {
      name: "Dynamic Programming",
      icon: "💎",
      color: "from-pink-500 to-rose-500",
      problems: 450,
      description: "Optimization problems and memoization techniques",
      topics: ["1D DP", "2D DP", "Knapsack", "LCS/LIS", "State Machines"],
      problemList: [
        { id: 1, title: 'Climbing Stairs', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/climbing-stairs/', tags: ['DP'], category: '1D DP' },
        { id: 2, title: 'House Robber', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/house-robber/', tags: ['DP'], category: '1D DP' },
        { id: 3, title: 'House Robber II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/house-robber-ii/', tags: ['DP'], category: '1D DP' },
        { id: 4, title: 'Min Cost Climbing Stairs', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/', tags: ['DP'], category: '1D DP' },
        { id: 5, title: 'Maximum Subarray', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-subarray/', tags: ['DP'], category: '1D DP' },
        { id: 6, title: 'Maximum Product Subarray', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-product-subarray/', tags: ['DP'], category: '1D DP' },
        { id: 7, title: 'Coin Change', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/coin-change/', tags: ['DP'], category: 'Coin Change' },
        { id: 8, title: 'Coin Change 2', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/coin-change-2/', tags: ['DP'], category: 'Coin Change' },
        { id: 9, title: 'Longest Increasing Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', tags: ['DP'], category: 'LIS' },
        { id: 10, title: 'Longest Common Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-common-subsequence/', tags: ['DP'], category: 'LCS' },
        { id: 11, title: 'Edit Distance', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/edit-distance/', tags: ['DP'], category: '2D DP' },
        { id: 12, title: 'Unique Paths', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/unique-paths/', tags: ['DP'], category: '2D DP' },
        { id: 13, title: 'Unique Paths II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/unique-paths-ii/', tags: ['DP'], category: '2D DP' },
        { id: 14, title: 'Minimum Path Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-path-sum/', tags: ['DP'], category: '2D DP' },
        { id: 15, title: 'Triangle', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/triangle/', tags: ['DP'], category: '2D DP' },
        { id: 16, title: 'Minimum Falling Path Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-falling-path-sum/', tags: ['DP'], category: '2D DP' },
        { id: 17, title: 'Maximal Square', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximal-square/', tags: ['DP'], category: '2D DP' },
        { id: 18, title: 'Perfect Squares', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/perfect-squares/', tags: ['DP'], category: 'Unbounded Knapsack' },
        { id: 19, title: 'Word Break', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-break/', tags: ['DP'], category: '1D DP' },
        { id: 20, title: 'Word Break II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-break-ii/', tags: ['DP'], category: 'Backtracking + DP' },
        { id: 21, title: 'Decode Ways', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/decode-ways/', tags: ['DP'], category: '1D DP' },
        { id: 22, title: 'Decode Ways II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/decode-ways-ii/', tags: ['DP'], category: '1D DP' },
        { id: 23, title: 'Jump Game', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/jump-game/', tags: ['DP'], category: '1D DP' },
        { id: 24, title: 'Jump Game II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/jump-game-ii/', tags: ['DP'], category: '1D DP' },
        { id: 25, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', tags: ['DP'], category: 'Stock' },
        { id: 26, title: 'Best Time to Buy and Sell Stock II', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', tags: ['DP'], category: 'Stock' },
        { id: 27, title: 'Best Time to Buy and Sell Stock III', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', tags: ['DP'], category: 'Stock' },
        { id: 28, title: 'Best Time to Buy and Sell Stock IV', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/', tags: ['DP'], category: 'Stock' },
        { id: 29, title: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', tags: ['DP'], category: 'Stock' },
        { id: 30, title: 'Best Time to Buy and Sell Stock with Transaction Fee', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/', tags: ['DP'], category: 'Stock' },
        { id: 31, title: 'Palindromic Substrings', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindromic-substrings/', tags: ['DP'], category: 'Palindrome' },
        { id: 32, title: 'Longest Palindromic Substring', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-palindromic-substring/', tags: ['DP'], category: 'Palindrome' },
        { id: 33, title: 'Longest Palindromic Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-palindromic-subsequence/', tags: ['DP'], category: 'Palindrome' },
        { id: 34, title: 'Palindrome Partitioning II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-partitioning-ii/', tags: ['DP'], category: 'Palindrome' },
        { id: 35, title: 'Shortest Palindrome', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-palindrome/', tags: ['DP'], category: 'Palindrome' },
        { id: 36, title: 'Regular Expression Matching', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/regular-expression-matching/', tags: ['DP'], category: '2D DP' },
        { id: 37, title: 'Wildcard Matching', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/wildcard-matching/', tags: ['DP'], category: '2D DP' },
        { id: 38, title: 'Interleaving String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/interleaving-string/', tags: ['DP'], category: '2D DP' },
        { id: 39, title: 'Distinct Subsequences', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/distinct-subsequences/', tags: ['DP'], category: '2D DP' },
        { id: 40, title: 'Scramble String', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/scramble-string/', tags: ['DP'], category: '3D DP' },
        { id: 41, title: 'Partition Equal Subset Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 42, title: 'Target Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/target-sum/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 43, title: 'Ones and Zeroes', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/ones-and-zeroes/', tags: ['DP'], category: '2D Knapsack' },
        { id: 44, title: 'Last Stone Weight II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/last-stone-weight-ii/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 45, title: 'Combination Sum IV', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/combination-sum-iv/', tags: ['DP'], category: 'Unbounded Knapsack' },
        { id: 46, title: 'Integer Break', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/integer-break/', tags: ['DP'], category: '1D DP' },
        { id: 47, title: 'Unique Binary Search Trees', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/unique-binary-search-trees/', tags: ['DP'], category: 'Catalan Numbers' },
        { id: 48, title: 'Different Ways to Add Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/different-ways-to-add-parentheses/', tags: ['DP'], category: 'Interval DP' },
        { id: 49, title: 'Burst Balloons', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/burst-balloons/', tags: ['DP'], category: 'Interval DP' },
        { id: 50, title: 'Remove Boxes', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-boxes/', tags: ['DP'], category: '3D DP' },
        { id: 51, title: 'Strange Printer', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/strange-printer/', tags: ['DP'], category: 'Interval DP' },
        { id: 52, title: 'Predict the Winner', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/predict-the-winner/', tags: ['DP'], category: 'Game Theory' },
        { id: 53, title: 'Stone Game', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/stone-game/', tags: ['DP'], category: 'Game Theory' },
        { id: 54, title: 'Stone Game II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/stone-game-ii/', tags: ['DP'], category: 'Game Theory' },
        { id: 55, title: 'Stone Game III', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/stone-game-iii/', tags: ['DP'], category: 'Game Theory' },
        { id: 56, title: 'Minimum Cost Tree From Leaf Values', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/', tags: ['DP'], category: 'Interval DP' },
        { id: 57, title: 'Matrix Chain Multiplication', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/', tags: ['DP'], category: 'Interval DP' },
        { id: 58, title: 'Optimal Binary Search Tree', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/', tags: ['DP'], category: 'Interval DP' },
        { id: 59, title: 'Egg Dropping Problem', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/egg-dropping-puzzle-dp-11/', tags: ['DP'], category: '2D DP' },
        { id: 60, title: 'Cutting Rod Problem', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/cutting-a-rod-dp-13/', tags: ['DP'], category: 'Unbounded Knapsack' },
        { id: 61, title: '0-1 Knapsack Problem', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 62, title: 'Unbounded Knapsack', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/', tags: ['DP'], category: 'Unbounded Knapsack' },
        { id: 63, title: 'Subset Sum Problem', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/subset-sum-problem-dp-25/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 64, title: 'Partition Problem', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/partition-problem-dp-18/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 65, title: 'Minimum Sum Partition', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/minimum-sum-partition-problem/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 66, title: 'Count of Subset Sum', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/count-of-subsets-with-sum-equal-to-x/', tags: ['DP'], category: '0/1 Knapsack' },
        { id: 67, title: 'Minimum Insertions to Form Palindrome', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/minimum-insertions-to-form-a-palindrome-dp-28/', tags: ['DP'], category: 'LCS Variant' },
        { id: 68, title: 'Minimum Deletions to Make Palindrome', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/minimum-number-deletions-make-string-palindrome/', tags: ['DP'], category: 'LCS Variant' },
        { id: 69, title: 'Shortest Common Supersequence', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/shortest-common-supersequence/', tags: ['DP'], category: 'LCS Variant' },
        { id: 70, title: 'Longest Repeating Subsequence', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/longest-repeating-subsequence/', tags: ['DP'], category: 'LCS Variant' },
        { id: 71, title: 'Sequence Pattern Matching', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/find-if-string-is-k-palindrome-or-not/', tags: ['DP'], category: 'LCS Variant' },
        { id: 72, title: 'Minimum ASCII Delete Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/', tags: ['DP'], category: 'LCS Variant' },
        { id: 73, title: 'Delete Operation for Two Strings', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-operation-for-two-strings/', tags: ['DP'], category: 'LCS Variant' },
        { id: 74, title: 'Shortest Common Supersequence', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-common-supersequence/', tags: ['DP'], category: 'LCS Variant' },
        { id: 75, title: 'Longest Arithmetic Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-arithmetic-subsequence/', tags: ['DP'], category: 'LIS Variant' },
        { id: 76, title: 'Longest Arithmetic Subsequence of Given Difference', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/', tags: ['DP'], category: 'LIS Variant' },
        { id: 77, title: 'Number of Longest Increasing Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/', tags: ['DP'], category: 'LIS Variant' },
        { id: 78, title: 'Russian Doll Envelopes', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/russian-doll-envelopes/', tags: ['DP'], category: 'LIS Variant' },
        { id: 79, title: 'Maximum Length of Pair Chain', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-length-of-pair-chain/', tags: ['DP'], category: 'LIS Variant' },
        { id: 80, title: 'Wiggle Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/wiggle-subsequence/', tags: ['DP'], category: 'LIS Variant' },
        { id: 81, title: 'Increasing Triplet Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/increasing-triplet-subsequence/', tags: ['DP'], category: 'LIS Variant' },
        { id: 82, title: 'Largest Divisible Subset', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-divisible-subset/', tags: ['DP'], category: 'LIS Variant' },
        { id: 83, title: 'Is Subsequence', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/is-subsequence/', tags: ['DP'], category: 'LCS Variant' },
        { id: 84, title: 'Number of Matching Subsequences', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-matching-subsequences/', tags: ['DP'], category: 'LCS Variant' },
        { id: 85, title: 'Arithmetic Slices', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/arithmetic-slices/', tags: ['DP'], category: '1D DP' },
        { id: 86, title: 'Arithmetic Slices II - Subsequence', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/arithmetic-slices-ii-subsequence/', tags: ['DP'], category: '2D DP' },
        { id: 87, title: 'Maximum Sum of 3 Non-Overlapping Subarrays', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/', tags: ['DP'], category: '1D DP' },
        { id: 88, title: 'Paint House', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/paint-house/', tags: ['DP'], category: '1D DP' },
        { id: 89, title: 'Paint House II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/paint-house-ii/', tags: ['DP'], category: '1D DP' },
        { id: 90, title: 'Paint Fence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/paint-fence/', tags: ['DP'], category: '1D DP' },
        { id: 91, title: 'House Robber III', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/house-robber-iii/', tags: ['DP', 'Tree'], category: 'Tree DP' },
        { id: 92, title: 'Delete and Earn', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-and-earn/', tags: ['DP'], category: '1D DP' },
        { id: 93, title: 'Maximum Vacation Days', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-vacation-days/', tags: ['DP'], category: '2D DP' },
        { id: 94, title: 'Knight Probability in Chessboard', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/knight-probability-in-chessboard/', tags: ['DP'], category: '3D DP' },
        { id: 95, title: 'New 21 Game', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/new-21-game/', tags: ['DP'], category: '1D DP' },
        { id: 96, title: 'Soup Servings', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/soup-servings/', tags: ['DP'], category: '2D DP' },
        { id: 97, title: 'Profitable Schemes', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/profitable-schemes/', tags: ['DP'], category: '3D DP' },
        { id: 98, title: 'Tallest Billboard', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/tallest-billboard/', tags: ['DP'], category: 'Advanced DP' },
        { id: 99, title: 'Number of Music Playlists', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-music-playlists/', tags: ['DP'], category: '2D DP' },
        { id: 100, title: 'Minimum Swaps To Make Sequences Increasing', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/', tags: ['DP'], category: 'State Machine DP' }
      ]
    },
    {
      name: "Stack",
      icon: "📚",
      color: "from-yellow-500 to-orange-500",
      problems: 280,
      description: "LIFO operations and stack-based algorithms",
      topics: ["Basic Stack", "Monotonic Stack", "Expression Evaluation", "Parentheses"],
      problemList: [
        { id: 1, title: 'Valid Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 2, title: 'Min Stack', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-stack/', tags: ['Stack'], category: 'Design' },
        { id: 3, title: 'Implement Queue using Stacks', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', tags: ['Stack'], category: 'Design' },
        { id: 4, title: 'Implement Stack using Queues', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-stack-using-queues/', tags: ['Stack'], category: 'Design' },
        { id: 5, title: 'Baseball Game', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/baseball-game/', tags: ['Stack'], category: 'Simulation' },
        { id: 6, title: 'Next Greater Element I', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/next-greater-element-i/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 7, title: 'Next Greater Element II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/next-greater-element-ii/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 8, title: 'Daily Temperatures', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/daily-temperatures/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 9, title: 'Remove All Adjacent Duplicates', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/', tags: ['Stack'], category: 'String Processing' },
        { id: 10, title: 'Remove All Adjacent Duplicates II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/', tags: ['Stack'], category: 'String Processing' },
        { id: 11, title: 'Backspace String Compare', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/backspace-string-compare/', tags: ['Stack'], category: 'String Processing' },
        { id: 12, title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', tags: ['Stack'], category: 'Expression Evaluation' },
        { id: 13, title: 'Basic Calculator', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/basic-calculator/', tags: ['Stack'], category: 'Expression Evaluation' },
        { id: 14, title: 'Basic Calculator II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/basic-calculator-ii/', tags: ['Stack'], category: 'Expression Evaluation' },
        { id: 15, title: 'Basic Calculator III', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/basic-calculator-iii/', tags: ['Stack'], category: 'Expression Evaluation' },
        { id: 16, title: 'Generate Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/generate-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 17, title: 'Remove Invalid Parentheses', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-invalid-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 18, title: 'Longest Valid Parentheses', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-valid-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 19, title: 'Score of Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/score-of-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 20, title: 'Minimum Add to Make Parentheses Valid', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/', tags: ['Stack'], category: 'Parentheses' },
        { id: 21, title: 'Minimum Remove to Make Valid Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 22, title: 'Check If Word Is Valid After Substitutions', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/check-if-word-is-valid-after-substitutions/', tags: ['Stack'], category: 'String Processing' },
        { id: 23, title: 'Decode String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/decode-string/', tags: ['Stack'], category: 'String Processing' },
        { id: 24, title: 'Number of Atoms', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-atoms/', tags: ['Stack'], category: 'String Processing' },
        { id: 25, title: 'Asteroid Collision', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/asteroid-collision/', tags: ['Stack'], category: 'Simulation' },
        { id: 26, title: 'Remove K Digits', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-k-digits/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 27, title: 'Create Maximum Number', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/create-maximum-number/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 28, title: 'Monotonic Array', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/monotonic-array/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 29, title: 'Online Stock Span', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/online-stock-span/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 30, title: 'Sum of Subarray Minimums', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-of-subarray-minimums/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 31, title: 'Sum of Subarray Ranges', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sum-of-subarray-ranges/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 32, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 33, title: 'Maximal Rectangle', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximal-rectangle/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 34, title: 'Trapping Rain Water', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/trapping-rain-water/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 35, title: 'Car Fleet', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/car-fleet/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 36, title: 'Car Fleet II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/car-fleet-ii/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 37, title: 'Validate Stack Sequences', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/validate-stack-sequences/', tags: ['Stack'], category: 'Simulation' },
        { id: 38, title: 'Maximum Frequency Stack', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-frequency-stack/', tags: ['Stack'], category: 'Design' },
        { id: 39, title: 'Design a Stack With Increment Operation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-a-stack-with-increment-operation/', tags: ['Stack'], category: 'Design' },
        { id: 40, title: 'Minimum Cost Tree From Leaf Values', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 41, title: 'Find the Most Competitive Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-the-most-competitive-subsequence/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 42, title: 'Final Prices With Special Discount', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 43, title: 'Crawler Log Folder', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/crawler-log-folder/', tags: ['Stack'], category: 'Simulation' },
        { id: 44, title: 'Make The String Great', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/make-the-string-great/', tags: ['Stack'], category: 'String Processing' },
        { id: 45, title: 'Minimum Number of Swaps', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-number-of-swaps-to-make-the-string-balanced/', tags: ['Stack'], category: 'Parentheses' },
        { id: 46, title: 'Reverse Substrings Between Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/', tags: ['Stack'], category: 'String Processing' },
        { id: 47, title: 'Build Array With Stack Operations', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/build-an-array-with-stack-operations/', tags: ['Stack'], category: 'Simulation' },
        { id: 48, title: 'Minimum Insertions to Balance Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string/', tags: ['Stack'], category: 'Parentheses' },
        { id: 49, title: 'Maximum Nesting Depth of Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 50, title: 'Maximum Nesting Depth of Two Valid Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/', tags: ['Stack'], category: 'Parentheses' },
        { id: 51, title: 'Simplify Path', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/simplify-path/', tags: ['Stack'], category: 'String Processing' },
        { id: 52, title: 'Flatten Nested List Iterator', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/flatten-nested-list-iterator/', tags: ['Stack'], category: 'Design' },
        { id: 53, title: 'Mini Parser', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/mini-parser/', tags: ['Stack'], category: 'String Processing' },
        { id: 54, title: 'Ternary Expression Parser', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/ternary-expression-parser/', tags: ['Stack'], category: 'Expression Evaluation' },
        { id: 55, title: 'Tag Validator', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/tag-validator/', tags: ['Stack'], category: 'String Processing' },
        { id: 56, title: 'Exclusive Time of Functions', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/exclusive-time-of-functions/', tags: ['Stack'], category: 'Simulation' },
        { id: 57, title: '132 Pattern', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/132-pattern/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 58, title: 'Next Greater Node In Linked List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/next-greater-node-in-linked-list/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 59, title: 'Previous Smaller Element', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/find-the-nearest-smaller-numbers-on-left-side-in-an-array/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 60, title: 'Next Smaller Element', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/next-smaller-element/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 61, title: 'Stock Span Problem', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/the-stock-span-problem/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 62, title: 'Maximum Area Rectangle in Binary Matrix', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/maximum-rectangle-binary-matrix-dp-27/', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 63, title: 'Length of Longest Valid Parentheses', difficulty: 'Hard', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/length-of-the-longest-valid-parentheses/', tags: ['Stack'], category: 'Parentheses' },
        { id: 64, title: 'Expression contains redundant bracket', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/expression-contains-redundant-bracket-not/', tags: ['Stack'], category: 'Parentheses' },
        { id: 65, title: 'Infix to Postfix', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/', tags: ['Stack'], category: 'Expression Conversion' },
        { id: 66, title: 'Infix to Prefix', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/convert-infix-prefix-notation/', tags: ['Stack'], category: 'Expression Conversion' },
        { id: 67, title: 'Postfix to Infix', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/postfix-to-infix/', tags: ['Stack'], category: 'Expression Conversion' },
        { id: 68, title: 'Postfix to Prefix', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/postfix-prefix-conversion/', tags: ['Stack'], category: 'Expression Conversion' },
        { id: 69, title: 'Prefix to Infix', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/prefix-infix-conversion/', tags: ['Stack'], category: 'Expression Conversion' },
        { id: 70, title: 'Prefix to Postfix', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/prefix-postfix-conversion/', tags: ['Stack'], category: 'Expression Conversion' },
        { id: 71, title: 'Balanced Brackets', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/balanced-brackets/problem', tags: ['Stack'], category: 'Parentheses' },
        { id: 72, title: 'Equal Stacks', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/equal-stacks/problem', tags: ['Stack'], category: 'Basic Operations' },
        { id: 73, title: 'Maximum Element', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/maximum-element/problem', tags: ['Stack'], category: 'Design' },
        { id: 74, title: 'Simple Text Editor', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/simple-text-editor/problem', tags: ['Stack'], category: 'Design' },
        { id: 75, title: 'Largest Rectangle', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/largest-rectangle/problem', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 76, title: 'Poisonous Plants', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/poisonous-plants/problem', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 77, title: 'AND xor OR', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/and-xor-or/problem', tags: ['Stack'], category: 'Monotonic Stack' },
        { id: 78, title: 'Waiter', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/waiter/problem', tags: ['Stack'], category: 'Simulation' },
        { id: 79, title: 'Game of Two Stacks', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/game-of-two-stacks/problem', tags: ['Stack'], category: 'Two Pointers' },
        { id: 80, title: 'Truck Tour', difficulty: 'Hard', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/truck-tour/problem', tags: ['Stack'], category: 'Circular Array' }
      ]
    },
    {
      name: "Hash Table",
      icon: "🗂️",
      color: "from-teal-500 to-green-500",
      problems: 320,
      description: "Hashing, collision resolution, and hash-based algorithms",
      topics: ["Hash Maps", "Hash Sets", "Collision Handling", "Hash Functions"],
      problemList: [
        // Basic Hash Operations
        { id: 1, title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/', tags: ['Hash Table'], category: 'Basic' },
        { id: 2, title: 'Contains Duplicate', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/contains-duplicate/', tags: ['Hash Table'], category: 'Basic' },
        { id: 3, title: 'Valid Anagram', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-anagram/', tags: ['Hash Table'], category: 'Basic' },
        { id: 4, title: 'Group Anagrams', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/group-anagrams/', tags: ['Hash Table'], category: 'Medium' },
        { id: 5, title: 'Top K Frequent Elements', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/top-k-frequent-elements/', tags: ['Hash Table'], category: 'Medium' },
        { id: 6, title: 'Product of Array Except Self', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/product-of-array-except-self/', tags: ['Hash Table'], category: 'Medium' },
        { id: 7, title: 'Valid Sudoku', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-sudoku/', tags: ['Hash Table'], category: 'Medium' },
        { id: 8, title: 'Encode and Decode Strings', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/encode-and-decode-strings/', tags: ['Hash Table'], category: 'Medium' },
        { id: 9, title: 'Longest Consecutive Sequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', tags: ['Hash Table'], category: 'Medium' },
        { id: 10, title: 'First Missing Positive', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/first-missing-positive/', tags: ['Hash Table'], category: 'Hard' },
        
        // Frequency Counting
        { id: 11, title: 'Majority Element', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/majority-element/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 12, title: 'Single Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/single-number/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 13, title: 'Find All Numbers Disappeared', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 14, title: 'Intersection of Two Arrays', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-arrays/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 15, title: 'Intersection of Two Arrays II', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 16, title: 'Happy Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/happy-number/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 17, title: 'Isomorphic Strings', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/isomorphic-strings/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 18, title: 'Word Pattern', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-pattern/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 19, title: 'Find the Difference', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-the-difference/', tags: ['Hash Table'], category: 'Frequency' },
        { id: 20, title: 'Ransom Note', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/ransom-note/', tags: ['Hash Table'], category: 'Frequency' },
        
        // Sliding Window with Hash
        { id: 21, title: 'Longest Substring Without Repeating', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 22, title: 'Minimum Window Substring', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-window-substring/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 23, title: 'Substring with Concatenation', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 24, title: 'Find All Anagrams in String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 25, title: 'Permutation in String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/permutation-in-string/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 26, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 27, title: 'Fruit Into Baskets', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/fruit-into-baskets/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 28, title: 'Subarrays with K Different Integers', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 29, title: 'Sliding Window Maximum', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/sliding-window-maximum/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        { id: 30, title: 'Max Consecutive Ones III', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/max-consecutive-ones-iii/', tags: ['Hash Table', 'Sliding Window'], category: 'Sliding Window' },
        
        // Two Pointer with Hashing
        { id: 31, title: 'Two Sum II - Input array is sorted', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', tags: ['Hash Table', 'Two Pointers'], category: 'Two Pointers' },
        { id: 32, title: '3Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/3sum/', tags: ['Hash Table', 'Two Pointers'], category: 'Two Pointers' },
        { id: 33, title: '4Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/4sum/', tags: ['Hash Table', 'Two Pointers'], category: 'Two Pointers' },
        { id: 34, title: '3Sum Closest', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/3sum-closest/', tags: ['Hash Table', 'Two Pointers'], category: 'Two Pointers' },
        { id: 35, title: 'Subarray Sum Equals K', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', tags: ['Hash Table', 'Prefix Sum'], category: 'Prefix Sum' },
        { id: 36, title: 'Continuous Subarray Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/continuous-subarray-sum/', tags: ['Hash Table', 'Prefix Sum'], category: 'Prefix Sum' },
        { id: 37, title: 'Subarray Sums Divisible by K', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/', tags: ['Hash Table', 'Prefix Sum'], category: 'Prefix Sum' },
        { id: 38, title: 'Maximum Size Subarray Sum Equals k', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/', tags: ['Hash Table', 'Prefix Sum'], category: 'Prefix Sum' },
        { id: 39, title: 'Binary Subarrays With Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-subarrays-with-sum/', tags: ['Hash Table', 'Prefix Sum'], category: 'Prefix Sum' },
        { id: 40, title: 'Count Number of Nice Subarrays', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/count-number-of-nice-subarrays/', tags: ['Hash Table', 'Prefix Sum'], category: 'Prefix Sum' },
        
        // Advanced Hash Patterns
        { id: 41, title: 'LRU Cache', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/lru-cache/', tags: ['Hash Table', 'Design'], category: 'Cache Design' },
        { id: 42, title: 'LFU Cache', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/lfu-cache/', tags: ['Hash Table', 'Design'], category: 'Cache Design' },
        { id: 43, title: 'Insert Delete GetRandom O(1)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insert-delete-getrandom-o1/', tags: ['Hash Table', 'Design'], category: 'Data Structure Design' },
        { id: 44, title: 'Insert Delete GetRandom O(1) - Duplicates', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/', tags: ['Hash Table', 'Design'], category: 'Data Structure Design' },
        { id: 45, title: 'All O`one Data Structure', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/all-oone-data-structure/', tags: ['Hash Table', 'Design'], category: 'Data Structure Design' },
        { id: 46, title: 'Design Twitter', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-twitter/', tags: ['Hash Table', 'Design'], category: 'System Design' },
        { id: 47, title: 'Time Based Key-Value Store', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/time-based-key-value-store/', tags: ['Hash Table', 'Design'], category: 'System Design' },
        { id: 48, title: 'Design HashMap', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-hashmap/', tags: ['Hash Table', 'Design'], category: 'Basic Design' },
        { id: 49, title: 'Design HashSet', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-hashset/', tags: ['Hash Table', 'Design'], category: 'Basic Design' },
        { id: 50, title: 'Snapshot Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/snapshot-array/', tags: ['Hash Table', 'Design'], category: 'Advanced Design' },
        
        // String Hashing
        { id: 51, title: 'Repeated DNA Sequences', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/repeated-dna-sequences/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 52, title: 'Find Duplicate File in System', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-duplicate-file-in-system/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 53, title: 'Longest Duplicate Substring', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-duplicate-substring/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 54, title: 'Shortest Palindrome', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/shortest-palindrome/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 55, title: 'Palindrome Pairs', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-pairs/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 56, title: 'Distinct Subsequences II', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/distinct-subsequences-ii/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 57, title: 'Number of Matching Subsequences', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-matching-subsequences/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 58, title: 'Longest Word in Dictionary through Deleting', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 59, title: 'Minimum ASCII Delete Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        { id: 60, title: 'Custom Sort String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/custom-sort-string/', tags: ['Hash Table', 'String'], category: 'String Hashing' },
        
        // Hash with Trees/Graphs
        { id: 61, title: 'Clone Graph', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/clone-graph/', tags: ['Hash Table', 'Graph'], category: 'Graph' },
        { id: 62, title: 'Copy List with Random Pointer', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', tags: ['Hash Table', 'Linked List'], category: 'Linked List' },
        { id: 63, title: 'Evaluate Division', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/evaluate-division/', tags: ['Hash Table', 'Graph'], category: 'Graph' },
        { id: 64, title: 'Accounts Merge', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/accounts-merge/', tags: ['Hash Table', 'Union Find'], category: 'Union Find' },
        { id: 65, title: 'Most Stones Removed', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/', tags: ['Hash Table', 'Union Find'], category: 'Union Find' },
        { id: 66, title: 'Redundant Connection', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/redundant-connection/', tags: ['Hash Table', 'Union Find'], category: 'Union Find' },
        { id: 67, title: 'Find Eventual Safe States', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-eventual-safe-states/', tags: ['Hash Table', 'Graph'], category: 'Graph' },
        { id: 68, title: 'Keys and Rooms', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/keys-and-rooms/', tags: ['Hash Table', 'Graph'], category: 'Graph' },
        { id: 69, title: 'Employee Importance', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/employee-importance/', tags: ['Hash Table', 'DFS'], category: 'Tree/Graph' },
        { id: 70, title: 'Network Delay Time', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/network-delay-time/', tags: ['Hash Table', 'Graph'], category: 'Graph' },
        
        // Advanced Problems
        { id: 71, title: 'Random Pick with Weight', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/random-pick-with-weight/', tags: ['Hash Table', 'Random'], category: 'Random' },
        { id: 72, title: 'Random Pick Index', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/random-pick-index/', tags: ['Hash Table', 'Random'], category: 'Random' },
        { id: 73, title: 'Linked List Random Node', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/linked-list-random-node/', tags: ['Hash Table', 'Random'], category: 'Random' },
        { id: 74, title: 'Shuffle an Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/shuffle-an-array/', tags: ['Hash Table', 'Random'], category: 'Random' },
        { id: 75, title: 'Design Underground System', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-underground-system/', tags: ['Hash Table', 'Design'], category: 'System Design' },
        { id: 76, title: 'Logger Rate Limiter', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/logger-rate-limiter/', tags: ['Hash Table', 'Design'], category: 'System Design' },
        { id: 77, title: 'Design Hit Counter', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-hit-counter/', tags: ['Hash Table', 'Design'], category: 'System Design' },
        { id: 78, title: 'Design Phone Directory', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-phone-directory/', tags: ['Hash Table', 'Design'], category: 'System Design' },
        { id: 79, title: 'Design Tic-Tac-Toe', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-tic-tac-toe/', tags: ['Hash Table', 'Design'], category: 'Game Design' },
        { id: 80, title: 'Design Search Autocomplete System', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/design-search-autocomplete-system/', tags: ['Hash Table', 'Trie'], category: 'Advanced Design' },
        
        // Contest Problems
        { id: 81, title: 'Maximum Frequency Stack', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-frequency-stack/', tags: ['Hash Table', 'Stack'], category: 'Advanced' },
        { id: 82, title: 'Hand of Straights', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/hand-of-straights/', tags: ['Hash Table', 'Greedy'], category: 'Greedy' },
        { id: 83, title: 'Task Scheduler', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/task-scheduler/', tags: ['Hash Table', 'Greedy'], category: 'Greedy' },
        { id: 84, title: 'Reorganize String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/reorganize-string/', tags: ['Hash Table', 'Greedy'], category: 'Greedy' },
        { id: 85, title: 'Rearrange String k Distance Apart', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/rearrange-string-k-distance-apart/', tags: ['Hash Table', 'Greedy'], category: 'Greedy' },
        { id: 86, title: 'Valid Parenthesis String', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parenthesis-string/', tags: ['Hash Table', 'Stack'], category: 'Stack' },
        { id: 87, title: 'Remove Invalid Parentheses', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-invalid-parentheses/', tags: ['Hash Table', 'BFS'], category: 'BFS' },
        { id: 88, title: 'Different Ways to Add Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/different-ways-to-add-parentheses/', tags: ['Hash Table', 'Divide and Conquer'], category: 'Divide and Conquer' },
        { id: 89, title: 'Generate Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/generate-parentheses/', tags: ['Hash Table', 'Backtracking'], category: 'Backtracking' },
        { id: 90, title: 'Valid Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/', tags: ['Hash Table', 'Stack'], category: 'Stack' },
        
        // HackerRank Problems
        { id: 91, title: 'Hash Tables: Ransom Note', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/ctci-ransom-note/problem', tags: ['Hash Table'], category: 'Basic' },
        { id: 92, title: 'Two Strings', difficulty: 'Easy', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/two-strings/problem', tags: ['Hash Table'], category: 'Basic' },
        { id: 93, title: 'Sherlock and Anagrams', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem', tags: ['Hash Table'], category: 'Medium' },
        { id: 94, title: 'Count Triplets', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/count-triplets-1/problem', tags: ['Hash Table'], category: 'Medium' },
        { id: 95, title: 'Frequency Queries', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/frequency-queries/problem', tags: ['Hash Table'], category: 'Medium' },
        { id: 96, title: 'Hash Tables: Ice Cream Parlor', difficulty: 'Medium', platform: 'HackerRank', link: 'https://www.hackerrank.com/challenges/ctci-ice-cream-parlor/problem', tags: ['Hash Table'], category: 'Medium' },
        { id: 97, title: 'Colorful Number', difficulty: 'Medium', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/colorful-numbers/', tags: ['Hash Table'], category: 'Medium' },
        { id: 98, title: 'Largest subarray with 0 sum', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/find-the-largest-subarray-with-0-sum/', tags: ['Hash Table'], category: 'Prefix Sum' },
        { id: 99, title: 'Count distinct elements in every window', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/', tags: ['Hash Table'], category: 'Sliding Window' },
        { id: 100, title: 'Array Pair Sum Divisibility Problem', difficulty: 'Easy', platform: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org/check-if-arr-can-be-divided-into-pairs-such-that-sum-of-every-pair-is-divisible-by-k/', tags: ['Hash Table'], category: 'Math' }
      ]
    },
    {
      name: "System Design",
      icon: "🏗️",
      color: "from-gray-500 to-slate-500",
      problems: 200,
      description: "Scalable system architecture and design patterns",
      topics: ["Load Balancing", "Caching", "Database Design", "Microservices", "APIs"],
      problemList: [
        // Fundamentals
        { id: 1, title: 'Design a URL Shortener (TinyURL)', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'URL Services' },
        { id: 2, title: 'Design a Chat System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Communication' },
        { id: 3, title: 'Design a News Feed System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Social Media' },
        { id: 4, title: 'Design a Web Crawler', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Web Services' },
        { id: 5, title: 'Design a Notification System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Notification' },
        
        // Social Media Systems
        { id: 6, title: 'Design Twitter', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Social Media' },
        { id: 7, title: 'Design Facebook', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Social Media' },
        { id: 8, title: 'Design Instagram', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Social Media' },
        { id: 9, title: 'Design LinkedIn', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Social Media' },
        { id: 10, title: 'Design WhatsApp', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Communication' },
        
        // E-commerce & Marketplace
        { id: 11, title: 'Design Amazon', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'E-commerce' },
        { id: 12, title: 'Design Uber', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Ride Sharing' },
        { id: 13, title: 'Design Airbnb', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Marketplace' },
        { id: 14, title: 'Design Food Delivery System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Delivery' },
        { id: 15, title: 'Design Payment System', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Financial' },
        
        // Media & Content
        { id: 16, title: 'Design YouTube', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Video Streaming' },
        { id: 17, title: 'Design Netflix', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Video Streaming' },
        { id: 18, title: 'Design Spotify', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Music Streaming' },
        { id: 19, title: 'Design TikTok', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Video Streaming' },
        { id: 20, title: 'Design Live Streaming Platform', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Live Streaming' },
        
        // Infrastructure & Tools
        { id: 21, title: 'Design a Load Balancer', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Infrastructure' },
        { id: 22, title: 'Design a Cache System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Caching' },
        { id: 23, title: 'Design a Rate Limiter', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Rate Limiting' },
        { id: 24, title: 'Design a CDN', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Content Delivery' },
        { id: 25, title: 'Design a Message Queue', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Message Queue' },
        
        // Database Systems
        { id: 26, title: 'Design a Key-Value Store', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Database' },
        { id: 27, title: 'Design a Distributed Database', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Database' },
        { id: 28, title: 'Design a Search Engine', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Search' },
        { id: 29, title: 'Design Google Drive', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'File Storage' },
        { id: 30, title: 'Design Dropbox', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'File Storage' },
        
        // Gaming & Real-time
        { id: 31, title: 'Design a Multiplayer Game', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Gaming' },
        { id: 32, title: 'Design a Leaderboard System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Gaming' },
        { id: 33, title: 'Design a Real-time Analytics System', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Analytics' },
        { id: 34, title: 'Design a Monitoring System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Monitoring' },
        { id: 35, title: 'Design a Logging System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Logging' },
        
        // Financial Systems
        { id: 36, title: 'Design a Stock Trading System', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Financial' },
        { id: 37, title: 'Design a Banking System', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Financial' },
        { id: 38, title: 'Design a Cryptocurrency Exchange', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Financial' },
        { id: 39, title: 'Design a Wallet System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Financial' },
        { id: 40, title: 'Design a Fraud Detection System', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Security' },
        
        // Communication Systems
        { id: 41, title: 'Design Slack', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Communication' },
        { id: 42, title: 'Design Discord', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Communication' },
        { id: 43, title: 'Design Zoom', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Video Conferencing' },
        { id: 44, title: 'Design Email System', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Communication' },
        { id: 45, title: 'Design SMS Service', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Communication' },
        
        // Advanced Topics
        { id: 46, title: 'Design a Distributed Lock', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Distributed Systems' },
        { id: 47, title: 'Design a Consensus Algorithm', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Distributed Systems' },
        { id: 48, title: 'Design a Blockchain System', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Blockchain' },
        { id: 49, title: 'Design a Microservices Architecture', difficulty: 'Hard', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'Microservices' },
        { id: 50, title: 'Design an API Gateway', difficulty: 'Medium', platform: 'System Design', link: 'https://leetcode.com/discuss/interview-question/system-design/', tags: ['System Design'], category: 'API Management' }
      ]
    }
  ]

  const selectedSkillData = skills.find(skill => skill.name === selectedSkill)
  
  const toggleSolved = (problemId: number) => {
    const newSolved = new Set(solvedProblems)
    if (newSolved.has(problemId)) {
      newSolved.delete(problemId)
    } else {
      newSolved.add(problemId)
    }
    setSolvedProblems(newSolved)
  }

  if (selectedSkill && selectedSkillData) {
    const filteredProblems = selectedSkillData.problemList?.filter(problem => {
      const matchesDifficulty = difficulty === 'All' || problem.difficulty === difficulty
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesDifficulty && matchesSearch
    }) || []

    const progressPercentage = selectedSkillData.problemList ? (solvedProblems.size / selectedSkillData.problemList.length) * 100 : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to Roadmap
                </button>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${selectedSkillData.color} rounded-xl flex items-center justify-center text-xl`}>
                    {selectedSkillData.icon}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">{selectedSkill} Roadmap</h1>
                </div>
              </div>
              <UserButton />
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {solvedProblems.size}/{selectedSkillData.problemList?.length || 0} problems solved
                </span>
                <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r ${selectedSkillData.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Difficulty:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Search:</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search problems..."
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Problem List */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {selectedSkill} Problems ({filteredProblems.length})
            </h2>
            
            <div className="grid gap-4">
              {filteredProblems.map((problem, index) => (
                <div key={problem.id} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-lg font-semibold text-gray-800">
                          {index + 1}. {problem.title}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{problem.platform}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {problem.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Solve on {problem.platform} →
                        </a>
                        <button
                          onClick={() => window.location.href = '/code-editor'}
                          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                        >
                          💻 Code Here
                        </button>
                        <button
                          onClick={() => toggleSolved(problem.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                            solvedProblems.has(problem.id)
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {solvedProblems.has(problem.id) ? '✓ Solved' : 'Mark as Solved'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProblems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No problems found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Learning Roadmap
          </h1>
          <UserButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Master Programming Skills 🚀
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your learning path and practice 500+ problems from easy to ultra-difficult. 
            Each roadmap is designed to take you from beginner to expert level.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
              onClick={() => setSelectedSkill(skill.name)}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl`}>
                {skill.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                {skill.name}
              </h3>
              
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {skill.description}
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Problems Available</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    {skill.problems}+
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.topics.slice(0, 3).map((topic, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                        {topic}
                      </span>
                    ))}
                    {skill.topics.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                        +{skill.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <div className={`w-full bg-gradient-to-r ${skill.color} text-white py-3 px-4 rounded-2xl font-semibold text-center hover:opacity-90 transition-opacity`}>
                    Start Learning →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Learning Experience</h3>
            <p className="text-gray-600">Everything you need to master programming interviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">3000+ Problems</h4>
              <p className="text-sm text-gray-600">Curated from top platforms</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Difficulty Levels</h4>
              <p className="text-sm text-gray-600">Easy to Ultra-Difficult</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Practice Links</h4>
              <p className="text-sm text-gray-600">Direct links to platforms</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Progress Tracking</h4>
              <p className="text-sm text-gray-600">Monitor your improvement</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey? 🌟</h3>
            <p className="text-lg mb-6 opacity-90">
              Choose any skill above and begin practicing with hundreds of carefully selected problems
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="bg-white text-blue-600 py-3 px-8 rounded-2xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}