'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function EmbeddedRoadmap() {
  const { user } = useUser()
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set())

  const embeddedSkills = [
    {
      name: "C Programming",
      icon: "🔧",
      color: "from-blue-500 to-cyan-500",
      problems: 150,
      description: "Master C programming fundamentals for embedded systems",
      topics: ["Pointers", "Memory Management", "Bit Manipulation", "Data Structures", "Embedded C"],
      problemList: [
        { id: 1, title: 'Pointer Basics', difficulty: 'Easy', platform: 'Practice', link: '#', tags: ['Pointers'], category: 'Fundamentals' },
        { id: 2, title: 'Memory Allocation', difficulty: 'Medium', platform: 'Practice', link: '#', tags: ['Memory'], category: 'Memory Management' },
        { id: 3, title: 'Bit Manipulation Operations', difficulty: 'Medium', platform: 'Practice', link: '#', tags: ['Bits'], category: 'Bit Operations' },
        { id: 4, title: 'Linked List Implementation', difficulty: 'Medium', platform: 'Practice', link: '#', tags: ['Data Structures'], category: 'Data Structures' },
        { id: 5, title: 'Function Pointers', difficulty: 'Hard', platform: 'Practice', link: '#', tags: ['Pointers'], category: 'Advanced' }
      ]
    },
    {
      name: "Microcontrollers",
      icon: "🔌",
      color: "from-green-500 to-teal-500",
      problems: 120,
      description: "Learn microcontroller programming and interfacing",
      topics: ["GPIO", "Timers", "Interrupts", "ADC/DAC", "Communication Protocols"],
      problemList: [
        { id: 1, title: 'LED Blinking', difficulty: 'Easy', platform: 'Arduino', link: '#', tags: ['GPIO'], category: 'Basic I/O' },
        { id: 2, title: 'Button Interrupt', difficulty: 'Medium', platform: 'Arduino', link: '#', tags: ['Interrupts'], category: 'Interrupts' },
        { id: 3, title: 'PWM Control', difficulty: 'Medium', platform: 'Arduino', link: '#', tags: ['Timers'], category: 'PWM' },
        { id: 4, title: 'ADC Reading', difficulty: 'Medium', platform: 'Arduino', link: '#', tags: ['ADC'], category: 'Analog' },
        { id: 5, title: 'UART Communication', difficulty: 'Hard', platform: 'Arduino', link: '#', tags: ['UART'], category: 'Communication' }
      ]
    },
    {
      name: "RTOS",
      icon: "⚙️",
      color: "from-purple-500 to-pink-500",
      problems: 100,
      description: "Real-Time Operating Systems concepts and implementation",
      topics: ["Task Management", "Scheduling", "Synchronization", "Memory Management", "Inter-task Communication"],
      problemList: [
        { id: 1, title: 'Task Creation', difficulty: 'Easy', platform: 'FreeRTOS', link: '#', tags: ['Tasks'], category: 'Task Management' },
        { id: 2, title: 'Semaphore Usage', difficulty: 'Medium', platform: 'FreeRTOS', link: '#', tags: ['Synchronization'], category: 'Synchronization' },
        { id: 3, title: 'Queue Communication', difficulty: 'Medium', platform: 'FreeRTOS', link: '#', tags: ['Queues'], category: 'IPC' },
        { id: 4, title: 'Priority Scheduling', difficulty: 'Hard', platform: 'FreeRTOS', link: '#', tags: ['Scheduling'], category: 'Scheduling' },
        { id: 5, title: 'Memory Pools', difficulty: 'Hard', platform: 'FreeRTOS', link: '#', tags: ['Memory'], category: 'Memory Management' }
      ]
    },
    {
      name: "Hardware Interfacing",
      icon: "🔗",
      color: "from-orange-500 to-red-500",
      problems: 80,
      description: "Interface with sensors, actuators, and external devices",
      topics: ["I2C", "SPI", "UART", "CAN", "Sensor Integration"],
      problemList: [
        { id: 1, title: 'I2C Temperature Sensor', difficulty: 'Medium', platform: 'Practice', link: '#', tags: ['I2C'], category: 'Sensors' },
        { id: 2, title: 'SPI Display Interface', difficulty: 'Medium', platform: 'Practice', link: '#', tags: ['SPI'], category: 'Display' },
        { id: 3, title: 'UART GPS Module', difficulty: 'Hard', platform: 'Practice', link: '#', tags: ['UART'], category: 'GPS' },
        { id: 4, title: 'CAN Bus Communication', difficulty: 'Hard', platform: 'Practice', link: '#', tags: ['CAN'], category: 'Automotive' },
        { id: 5, title: 'Multi-sensor Integration', difficulty: 'Hard', platform: 'Practice', link: '#', tags: ['Integration'], category: 'Complex Systems' }
      ]
    },
    {
      name: "Embedded Linux",
      icon: "🐧",
      color: "from-indigo-500 to-purple-500",
      problems: 90,
      description: "Linux for embedded systems and device drivers",
      topics: ["Kernel Modules", "Device Drivers", "Device Tree", "Cross Compilation", "Yocto"],
      problemList: [
        { id: 1, title: 'Hello World Module', difficulty: 'Easy', platform: 'Linux', link: '#', tags: ['Kernel'], category: 'Kernel Modules' },
        { id: 2, title: 'Character Device Driver', difficulty: 'Medium', platform: 'Linux', link: '#', tags: ['Drivers'], category: 'Device Drivers' },
        { id: 3, title: 'Device Tree Configuration', difficulty: 'Medium', platform: 'Linux', link: '#', tags: ['Device Tree'], category: 'Hardware Description' },
        { id: 4, title: 'Cross Compilation Setup', difficulty: 'Hard', platform: 'Linux', link: '#', tags: ['Cross Compile'], category: 'Build Systems' },
        { id: 5, title: 'Yocto Recipe Creation', difficulty: 'Hard', platform: 'Linux', link: '#', tags: ['Yocto'], category: 'Build Systems' }
      ]
    },
    {
      name: "PCB Design",
      icon: "🔲",
      color: "from-teal-500 to-green-500",
      problems: 60,
      description: "PCB design and hardware development",
      topics: ["Schematic Design", "PCB Layout", "Component Selection", "Signal Integrity", "EMC/EMI"],
      problemList: [
        { id: 1, title: 'Basic LED Circuit', difficulty: 'Easy', platform: 'KiCad', link: '#', tags: ['Schematic'], category: 'Basic Circuits' },
        { id: 2, title: 'Microcontroller PCB', difficulty: 'Medium', platform: 'KiCad', link: '#', tags: ['PCB Layout'], category: 'MCU Boards' },
        { id: 3, title: 'Power Supply Design', difficulty: 'Hard', platform: 'KiCad', link: '#', tags: ['Power'], category: 'Power Electronics' },
        { id: 4, title: 'High-Speed Design', difficulty: 'Hard', platform: 'KiCad', link: '#', tags: ['Signal Integrity'], category: 'High-Speed Design' },
        { id: 5, title: 'EMC Compliance', difficulty: 'Hard', platform: 'KiCad', link: '#', tags: ['EMC'], category: 'Compliance' }
      ]
    }
  ]

  const selectedSkillData = embeddedSkills.find(skill => skill.name === selectedSkill)

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to Embedded Roadmap
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
                          <span key={tagIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Embedded Systems Roadmap
            </h1>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Master Embedded Systems 🔧
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete roadmap to become an embedded systems engineer. From C programming to hardware interfacing and RTOS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {embeddedSkills.map((skill, index) => (
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
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
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
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Embedded Systems Journey</h3>
            <p className="text-gray-600">Master hardware and software integration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">600+ Problems</h4>
              <p className="text-sm text-gray-600">Hands-on practice</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔌</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Hardware Focus</h4>
              <p className="text-sm text-gray-600">Real hardware projects</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚙️</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">RTOS Mastery</h4>
              <p className="text-sm text-gray-600">Real-time systems</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🐧</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Linux Integration</h4>
              <p className="text-sm text-gray-600">Embedded Linux</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}