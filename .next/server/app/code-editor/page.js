(()=>{var e={};e.id=810,e.ids=[810],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},78893:e=>{"use strict";e.exports=require("buffer")},84770:e=>{"use strict";e.exports=require("crypto")},35816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("worker_threads")},72254:e=>{"use strict";e.exports=require("node:buffer")},6005:e=>{"use strict";e.exports=require("node:crypto")},87561:e=>{"use strict";e.exports=require("node:fs")},88849:e=>{"use strict";e.exports=require("node:http")},22286:e=>{"use strict";e.exports=require("node:https")},87503:e=>{"use strict";e.exports=require("node:net")},49411:e=>{"use strict";e.exports=require("node:path")},97742:e=>{"use strict";e.exports=require("node:process")},84492:e=>{"use strict";e.exports=require("node:stream")},72477:e=>{"use strict";e.exports=require("node:stream/web")},41041:e=>{"use strict";e.exports=require("node:url")},47261:e=>{"use strict";e.exports=require("node:util")},65628:e=>{"use strict";e.exports=require("node:zlib")},48070:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>d,routeModule:()=>m,tree:()=>c}),s(89549),s(88242),s(35866);var r=s(23191),i=s(88716),n=s(37922),a=s.n(n),o=s(95231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let c=["",{children:["code-editor",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,89549)),"c:\\Users\\sanjay.b.m\\code_thon_2\\app\\code-editor\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,88242)),"c:\\Users\\sanjay.b.m\\code_thon_2\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,35866,23)),"next/dist/client/components/not-found-error"]}],d=["c:\\Users\\sanjay.b.m\\code_thon_2\\app\\code-editor\\page.tsx"],u="/code-editor/page",p={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/code-editor/page",pathname:"/code-editor",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},77803:(e,t,s)=>{Promise.resolve().then(s.bind(s,10500))},69577:(e,t,s)=>{Promise.resolve().then(s.bind(s,6844)),Promise.resolve().then(s.bind(s,69925)),Promise.resolve().then(s.bind(s,16566)),Promise.resolve().then(s.bind(s,70223)),Promise.resolve().then(s.bind(s,7679))},45212:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,12994,23)),Promise.resolve().then(s.t.bind(s,96114,23)),Promise.resolve().then(s.t.bind(s,9727,23)),Promise.resolve().then(s.t.bind(s,79671,23)),Promise.resolve().then(s.t.bind(s,41868,23)),Promise.resolve().then(s.t.bind(s,84759,23))},10500:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(10326),i=s(64647),n=s(17577);function a(){let{user:e}=(0,i.aF)(),[t,s]=(0,n.useState)(""),[a,o]=(0,n.useState)("javascript"),[l,c]=(0,n.useState)(""),[d,u]=(0,n.useState)(!1),[p,m]=(0,n.useState)([]),[x,h]=(0,n.useState)(0),[g,b]=(0,n.useState)(""),[f,y]=(0,n.useState)(!1),[v,j]=(0,n.useState)("problem"),[w,N]=(0,n.useState)(!1),[S,C]=(0,n.useState)(null),P=[{id:1,title:"Two Sum",difficulty:"Easy",description:`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,testCases:[{input:{nums:[2,7,11,15],target:9},expected:[0,1]},{input:{nums:[3,2,4],target:6},expected:[1,2]},{input:{nums:[3,3],target:6},expected:[0,1]}],starterCode:{javascript:`function twoSum(nums, target) {
    // Write your solution here
    
}`,python:`def two_sum(nums, target):
    # Write your solution here
    pass`,java:`public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,cpp:`#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`},solution:{javascript:`function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,python:`def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,java:`public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,cpp:`vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`}},{id:2,title:"Valid Parentheses",difficulty:"Easy",description:`Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Example:
Input: s = "()"
Output: true`,testCases:[{input:{s:"()"},expected:!0},{input:{s:"()[]{}"},expected:!0},{input:{s:"(]"},expected:!1}],starterCode:{javascript:`function isValid(s) {
    // Write your solution here
    
}`,python:`def is_valid(s):
    # Write your solution here
    pass`,java:`public class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        
    }
}`,cpp:`#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};`},solution:{javascript:`function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in map) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,python:`def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0`,java:`public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> map = new HashMap<>();
        map.put(')', '(');
        map.put('}', '{');
        map.put(']', '[');
        
        for (char c : s.toCharArray()) {
            if (map.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != map.get(c)) {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        
        return stack.isEmpty();
    }
}`,cpp:`bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};
    
    for (char c : s) {
        if (map.count(c)) {
            if (st.empty() || st.top() != map[c]) {
                return false;
            }
            st.pop();
        } else {
            st.push(c);
        }
    }
    
    return st.empty();
}`}}],k=P[x],_=async()=>{u(!0),c("");try{let e=await fetch("/api/execute-code",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,language:a,mode:v,customInput:f?g:void 0,problemId:"problem"===v?k.id:void 0,testCases:"problem"===v?k.testCases:void 0})}),s=await e.json();c(s.output),m(s.testResults||[])}catch(e){c("Error: Failed to execute code")}u(!1)},D=async()=>{if("compiler"===v){_();return}u(!0);try{let e=await fetch("/api/submit-code",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,language:a,problemId:k.id,testCases:k.testCases})}),s=await e.json();m(s.testResults||[]),C(s),s.allPassed?c("\uD83C\uDF89 All test cases passed! Solution accepted."):c(`❌ ${s.passedCount}/${s.totalCount} test cases passed.`),N(!0)}catch(e){c("Error: Failed to submit code")}u(!1)};return(0,r.jsxs)("div",{className:"min-h-screen bg-gray-900 text-white",children:[r.jsx("div",{className:"bg-gray-800 border-b border-gray-700",children:(0,r.jsxs)("div",{className:"max-w-7xl mx-auto px-6 py-4 flex justify-between items-center",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[r.jsx("button",{onClick:()=>window.location.href="/dashboard",className:"text-gray-400 hover:text-white transition-colors",children:"← Back to Dashboard"}),r.jsx("h1",{className:"text-xl font-bold text-white",children:"CodeStudio Pro"}),(0,r.jsxs)("div",{className:"flex bg-gray-700 rounded-lg p-1",children:[r.jsx("button",{onClick:()=>j("problem"),className:`px-4 py-2 rounded-md text-sm font-medium transition-colors ${"problem"===v?"bg-blue-600 text-white":"text-gray-300 hover:text-white"}`,children:"Problem Solver"}),r.jsx("button",{onClick:()=>j("compiler"),className:`px-4 py-2 rounded-md text-sm font-medium transition-colors ${"compiler"===v?"bg-blue-600 text-white":"text-gray-300 hover:text-white"}`,children:"Code Compiler"})]})]}),r.jsx(i.l8,{})]})}),(0,r.jsxs)("div",{className:"flex h-screen",children:["problem"===v&&r.jsx("div",{className:"w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto",children:(0,r.jsxs)("div",{className:"p-4",children:[r.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Problems"}),r.jsx("div",{className:"space-y-2",children:P.map((e,t)=>r.jsx("div",{onClick:()=>h(t),className:`p-3 rounded-lg cursor-pointer transition-colors ${x===t?"bg-blue-600 text-white":"bg-gray-700 hover:bg-gray-600"}`,children:(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[r.jsx("span",{className:"font-medium",children:e.title}),r.jsx("span",{className:`px-2 py-1 rounded text-xs ${"Easy"===e.difficulty?"bg-green-600":"Medium"===e.difficulty?"bg-yellow-600":"bg-red-600"}`,children:e.difficulty})]})},e.id))})]})}),(0,r.jsxs)("div",{className:"flex-1 flex flex-col",children:["problem"===v&&r.jsx("div",{className:"h-1/3 bg-gray-800 border-b border-gray-700 overflow-y-auto",children:(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[r.jsx("h2",{className:"text-2xl font-bold",children:k.title}),r.jsx("span",{className:`px-3 py-1 rounded-full text-sm ${"Easy"===k.difficulty?"bg-green-600":"Medium"===k.difficulty?"bg-yellow-600":"bg-red-600"}`,children:k.difficulty})]}),r.jsx("div",{className:"prose prose-invert max-w-none",children:r.jsx("pre",{className:"whitespace-pre-wrap text-gray-300 leading-relaxed",children:k.description})})]})}),(0,r.jsxs)("div",{className:"flex-1 flex",children:[(0,r.jsxs)("div",{className:"flex-1 flex flex-col",children:[(0,r.jsxs)("div",{className:"bg-gray-700 px-4 py-2 flex justify-between items-center",children:[(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsxs)("select",{value:a,onChange:e=>o(e.target.value),className:"bg-gray-600 text-white px-3 py-1 rounded border border-gray-500 focus:outline-none focus:border-blue-500",children:[r.jsx("option",{value:"javascript",children:"JavaScript"}),r.jsx("option",{value:"python",children:"Python"}),r.jsx("option",{value:"java",children:"Java"}),r.jsx("option",{value:"cpp",children:"C++"})]}),"compiler"===v&&r.jsx("button",{onClick:()=>y(!f),className:`px-3 py-1 rounded text-sm font-medium transition-colors ${f?"bg-blue-600 text-white":"bg-gray-600 text-gray-300 hover:text-white"}`,children:"Custom Input"})]}),(0,r.jsxs)("div",{className:"flex space-x-2",children:[r.jsx("button",{onClick:_,disabled:d,className:"bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-1 rounded text-sm font-medium transition-colors",children:d?"Running...":"▶ Run"}),"problem"===v&&(0,r.jsxs)(r.Fragment,{children:[r.jsx("button",{onClick:D,disabled:d,className:"bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-1 rounded text-sm font-medium transition-colors",children:d?"Submitting...":"✓ Submit"}),S&&(0,r.jsxs)(r.Fragment,{children:[r.jsx("button",{onClick:()=>N(!w),className:"bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded text-sm font-medium transition-colors",children:w?"\uD83D\uDE48 Hide Solution":"\uD83D\uDCA1 Show Solution"}),r.jsx("button",{onClick:()=>{C(null),N(!1),m([]),c(""),s(k.starterCode[a]||"")},className:"bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded text-sm font-medium transition-colors",children:"\uD83D\uDD04 Try Again"})]})]})]})]}),r.jsx("textarea",{value:t,onChange:e=>s(e.target.value),className:"flex-1 bg-gray-900 text-white p-4 font-mono text-sm resize-none focus:outline-none",placeholder:"Write your code here...",spellCheck:!1})]}),(0,r.jsxs)("div",{className:"w-96 bg-gray-800 border-l border-gray-700 flex flex-col",children:[(0,r.jsxs)("div",{className:"bg-gray-700 px-4 py-2 flex justify-between items-center",children:[r.jsx("h3",{className:"font-semibold",children:"Output"}),"compiler"===v&&f&&r.jsx("span",{className:"text-xs text-gray-400",children:"Custom Input Mode"})]}),"compiler"===v&&f&&(0,r.jsxs)("div",{className:"border-b border-gray-700 p-4",children:[r.jsx("h4",{className:"text-sm font-medium mb-2",children:"Input:"}),r.jsx("textarea",{value:g,onChange:e=>b(e.target.value),className:"w-full h-20 bg-gray-900 text-white p-2 text-sm rounded border border-gray-600 focus:outline-none focus:border-blue-500",placeholder:"Enter your input here..."})]}),(0,r.jsxs)("div",{className:"flex-1 p-4 overflow-y-auto",children:[l&&(0,r.jsxs)("div",{className:"mb-4",children:[r.jsx("h4",{className:"font-medium mb-2",children:"Console Output:"}),r.jsx("pre",{className:`bg-gray-900 p-3 rounded text-sm whitespace-pre-wrap ${l.includes("Error")||l.includes("❌")?"text-red-400":"text-green-400"}`,children:l})]}),"problem"===v&&p.length>0&&(0,r.jsxs)("div",{children:[r.jsx("h4",{className:"font-medium mb-2",children:"Test Results:"}),r.jsx("div",{className:"space-y-2",children:p.map((e,t)=>(0,r.jsxs)("div",{className:`p-3 rounded text-sm ${e.passed?"bg-green-900 border border-green-600":"bg-red-900 border border-red-600"}`,children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-1",children:[(0,r.jsxs)("span",{className:"font-medium",children:["Test Case ",t+1]}),r.jsx("span",{className:e.passed?"text-green-400":"text-red-400",children:e.passed?"✓ PASS":"✗ FAIL"})]}),(0,r.jsxs)("div",{className:"text-xs text-gray-400",children:[(0,r.jsxs)("div",{children:["Input: ",JSON.stringify(e.input)]}),(0,r.jsxs)("div",{children:["Expected: ",JSON.stringify(e.expected)]}),!e.passed&&(0,r.jsxs)("div",{className:"text-red-400",children:["Got: ",JSON.stringify(e.actual)]})]})]},t))})]}),"problem"===v&&S&&w&&k.solution&&(0,r.jsxs)("div",{className:"mt-4",children:[r.jsx("h4",{className:"font-medium mb-2 text-yellow-400",children:"\uD83D\uDCA1 Optimal Solution:"}),r.jsx("pre",{className:"bg-gray-900 p-3 rounded text-sm text-green-400 whitespace-pre-wrap overflow-x-auto",children:k.solution[a]||"Solution not available for this language"}),(0,r.jsxs)("div",{className:"mt-2 space-y-2",children:[(0,r.jsxs)("div",{className:"p-2 bg-blue-900 rounded text-xs text-blue-300",children:["\uD83D\uDCDD ",r.jsx("strong",{children:"Explanation:"})," This is an optimal solution with efficient time and space complexity. Study the approach and try to understand the algorithm."]}),S.allPassed?(0,r.jsxs)("div",{className:"p-2 bg-green-900 rounded text-xs text-green-300",children:["\uD83C\uDF89 ",r.jsx("strong",{children:"Great job!"})," Your solution passed all test cases. Compare it with the optimal solution to learn different approaches."]}):(0,r.jsxs)("div",{className:"p-2 bg-orange-900 rounded text-xs text-orange-300",children:["\uD83D\uDCDA ",r.jsx("strong",{children:"Keep learning!"})," Your solution passed ",S.passedCount,"/",S.totalCount," test cases. Study this optimal solution and try again."]})]})]}),!l&&0===p.length&&(0,r.jsxs)("div",{className:"text-gray-500 text-center py-8",children:[r.jsx("div",{className:"text-4xl mb-2",children:"\uD83D\uDCBB"}),r.jsx("p",{children:"problem"===v?"Run your code to see test results":"Run your code to see output"})]})]})]})]})]})]})]})}},6844:(e,t,s)=>{"use strict";s.d(t,{default:()=>a});var r=s(10326),i=s(43987);let n=new i.Zj("https://blissful-goose-715.convex.cloud");function a({children:e}){return r.jsx(i.P9,{client:n,children:e})}},89549:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(68570).createProxy)(String.raw`c:\Users\sanjay.b.m\code_thon_2\app\code-editor\page.tsx#default`)},88242:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o,metadata:()=>a});var r=s(19510),i=s(96471);let n=(0,s(68570).createProxy)(String.raw`c:\Users\sanjay.b.m\code_thon_2\components\Providers.tsx#default`);s(67272);let a={title:"Resume Boost",description:"AI-powered career acceleration platform with resume analysis, personalized interviews, technical assessments, and 3000+ coding problems across 9 specialized tracks."};function o({children:e}){return r.jsx(i.El,{children:r.jsx("html",{lang:"en",children:r.jsx("body",{children:r.jsx(n,{children:e})})})})}},67272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[380,70,386],()=>s(48070));module.exports=r})();