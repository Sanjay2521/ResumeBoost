'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function VLSIRoadmap() {
  const { user } = useUser()
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set())

  const vlsiSkills = [
    {
      name: "Digital Logic Design",
      icon: "🔢",
      color: "from-blue-500 to-cyan-500",
      problems: 120,
      description: "Fundamental digital logic concepts and combinational circuits",
      topics: ["Boolean Algebra", "Logic Gates", "Combinational Circuits", "Sequential Circuits", "State Machines"],
      problemList: [
        { id: 1, title: 'Basic Logic Gates', difficulty: 'Easy', platform: 'Verilog', link: '#', tags: ['Logic Gates'], category: 'Fundamentals' },
        { id: 2, title: 'Multiplexer Design', difficulty: 'Easy', platform: 'Verilog', link: '#', tags: ['Combinational'], category: 'Combinational Logic' },
        { id: 3, title: 'Decoder Implementation', difficulty: 'Medium', platform: 'Verilog', link: '#', tags: ['Combinational'], category: 'Combinational Logic' },
        { id: 4, title: 'Flip-Flop Design', difficulty: 'Medium', platform: 'Verilog', link: '#', tags: ['Sequential'], category: 'Sequential Logic' },
        { id: 5, title: 'Counter Design', difficulty: 'Hard', platform: 'Verilog', link: '#', tags: ['Sequential'], category: 'Sequential Logic' }
      ]
    },
    {
      name: "Verilog HDL",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      problems: 150,
      description: "Hardware Description Language for digital design",
      topics: ["Syntax", "Data Types", "Behavioral Modeling", "Structural Modeling", "Testbenches"],
      problemList: [
        { id: 1, title: 'Basic Verilog Syntax', difficulty: 'Easy', platform: 'Verilog', link: '#', tags: ['Syntax'], category: 'Basics' },
        { id: 2, title: 'Always Blocks', difficulty: 'Medium', platform: 'Verilog', link: '#', tags: ['Behavioral'], category: 'Behavioral Modeling' },
        { id: 3, title: 'Module Instantiation', difficulty: 'Medium', platform: 'Verilog', link: '#', tags: ['Structural'], category: 'Structural Modeling' },
        { id: 4, title: 'Testbench Writing', difficulty: 'Hard', platform: 'Verilog', link: '#', tags: ['Testbench'], category: 'Verification' },
        { id: 5, title: 'FSM Implementation', difficulty: 'Hard', platform: 'Verilog', link: '#', tags: ['FSM'], category: 'Advanced Design' }
      ]
    },
    {
      name: "SystemVerilog",
      icon: "🔧",
      color: "from-green-500 to-teal-500",
      problems: 100,
      description: "Advanced hardware description and verification language",
      topics: ["OOP Concepts", "Interfaces", "Classes", "Assertions", "Coverage"],
      problemList: [
        { id: 1, title: 'SystemVerilog Data Types', difficulty: 'Easy', platform: 'SystemVerilog', link: '#', tags: ['Data Types'], category: 'Basics' },
        { id: 2, title: 'Interface Design', difficulty: 'Medium', platform: 'SystemVerilog', link: '#', tags: ['Interface'], category: 'Interfaces' },
        { id: 3, title: 'Class Implementation', difficulty: 'Medium', platform: 'SystemVerilog', link: '#', tags: ['OOP'], category: 'Object-Oriented' },
        { id: 4, title: 'Assertions Writing', difficulty: 'Hard', platform: 'SystemVerilog', link: '#', tags: ['Assertions'], category: 'Verification' },
        { id: 5, title: 'Coverage Analysis', difficulty: 'Hard', platform: 'SystemVerilog', link: '#', tags: ['Coverage'], category: 'Verification' }
      ]
    },
    {
      name: "RTL Design",
      icon: "🏗️",
      color: "from-orange-500 to-red-500",
      problems: 130,
      description: "Register Transfer Level design methodology",
      topics: ["RTL Coding", "Synthesis", "Timing Analysis", "Clock Domain Crossing", "Low Power Design"],
      problemList: [
        { id: 1, title: 'Basic RTL Structure', difficulty: 'Easy', platform: 'RTL', link: '#', tags: ['RTL'], category: 'RTL Basics' },
        { id: 2, title: 'Pipeline Design', difficulty: 'Medium', platform: 'RTL', link: '#', tags: ['Pipeline'], category: 'Advanced RTL' },
        { id: 3, title: 'Clock Domain Crossing', difficulty: 'Hard', platform: 'RTL', link: '#', tags: ['CDC'], category: 'Timing' },
        { id: 4, title: 'Low Power Techniques', difficulty: 'Hard', platform: 'RTL', link: '#', tags: ['Low Power'], category: 'Power Optimization' },
        { id: 5, title: 'Synthesis Optimization', difficulty: 'Hard', platform: 'RTL', link: '#', tags: ['Synthesis'], category: 'Synthesis' }
      ]
    },
    {
      name: "Verification",
      icon: "✅",
      color: "from-indigo-500 to-purple-500",
      problems: 110,
      description: "Functional verification and testbench development",
      topics: ["UVM", "Constrained Random", "Coverage", "Assertions", "Formal Verification"],
      problemList: [
        { id: 1, title: 'Basic Testbench', difficulty: 'Easy', platform: 'UVM', link: '#', tags: ['Testbench'], category: 'Verification Basics' },
        { id: 2, title: 'UVM Environment', difficulty: 'Medium', platform: 'UVM', link: '#', tags: ['UVM'], category: 'UVM Methodology' },
        { id: 3, title: 'Constrained Random Testing', difficulty: 'Hard', platform: 'UVM', link: '#', tags: ['Random'], category: 'Advanced Verification' },
        { id: 4, title: 'Formal Verification', difficulty: 'Hard', platform: 'Formal', link: '#', tags: ['Formal'], category: 'Formal Methods' },
        { id: 5, title: 'Coverage Closure', difficulty: 'Hard', platform: 'UVM', link: '#', tags: ['Coverage'], category: 'Coverage Analysis' }
      ]
    },
    {
      name: "Physical Design",
      icon: "🔲",
      color: "from-teal-500 to-green-500",
      problems: 80,
      description: "Physical implementation and layout design",
      topics: ["Floorplanning", "Placement", "Routing", "Timing Closure", "DRC/LVS"],
      problemList: [
        { id: 1, title: 'Floorplan Creation', difficulty: 'Medium', platform: 'Physical', link: '#', tags: ['Floorplan'], category: 'Floorplanning' },
        { id: 2, title: 'Standard Cell Placement', difficulty: 'Medium', platform: 'Physical', link: '#', tags: ['Placement'], category: 'Placement' },
        { id: 3, title: 'Clock Tree Synthesis', difficulty: 'Hard', platform: 'Physical', link: '#', tags: ['CTS'], category: 'Clock Design' },
        { id: 4, title: 'Routing Optimization', difficulty: 'Hard', platform: 'Physical', link: '#', tags: ['Routing'], category: 'Routing' },
        { id: 5, title: 'Timing Closure', difficulty: 'Hard', platform: 'Physical', link: '#', tags: ['Timing'], category: 'Timing Analysis' }
      ]
    }
  ]

  const selectedSkillData = vlsiSkills.find(skill => skill.name === selectedSkill)

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
    const progressPercentage = selectedSkillData.problemList ? (solvedProblems.size / selectedSkillData.problemList.length) * 100 : 0

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to VLSI Roadmap
                </button>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${selectedSkillData.color} rounded-xl flex items-center justify-center text-xl`}>
                    {selectedSkillData.icon}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">{selectedSkill} Skills</h1>
                </div>
              </div>
              <UserButton />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress: {solvedProblems.size}/{selectedSkillData.problemList?.length || 0} completed
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
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {selectedSkill} Practice Problems
            </h2>
            
            <div className="grid gap-4">
              {selectedSkillData.problemList?.map((problem, index) => (
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
                          <span key={tagIndex} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => window.location.href = '/verilog-compiler'}
                          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                        >
                          ⚡ Verilog Compiler
                        </button>
                        <button
                          onClick={() => toggleSolved(problem.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                            solvedProblems.has(problem.id)
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {solvedProblems.has(problem.id) ? '✓ Completed' : 'Mark as Complete'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )) || []}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              VLSI Design Roadmap
            </h1>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Master VLSI Design ⚡
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete roadmap for VLSI design engineer. From digital logic to physical implementation and verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vlsiSkills.map((skill, index) => (
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
                  <span className="text-sm font-medium text-gray-700">Practice Problems</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                    {skill.problems}+
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Key Topics:</h4>
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

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete VLSI Design Journey</h3>
            <p className="text-gray-600">From RTL to Silicon</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">690+ Problems</h4>
              <p className="text-sm text-gray-600">Comprehensive practice</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Verilog Compiler</h4>
              <p className="text-sm text-gray-600">RTL design & simulation</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Verification Focus</h4>
              <p className="text-sm text-gray-600">UVM & SystemVerilog</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔲</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Physical Design</h4>
              <p className="text-sm text-gray-600">Layout & timing</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '/verilog-compiler'}
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ⚡ Try Verilog Compiler with RTL Visualization
          </button>
        </div>
      </div>
    </div>
  )
}