import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ResumeBoost
            </h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/sign-in" className="text-gray-600 hover:text-gray-800 font-medium">
              Sign In
            </Link>
            <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Transform Your Career with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              AI-Powered Preparation
            </span>
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Complete interview preparation ecosystem with AI resume analysis, personalized interviews, 
            technical assessments, and specialized learning roadmaps for software & hardware engineering.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
              🚀 Start Your Journey
            </Link>
            <Link href="#features" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-gray-400 transition-all">
              📖 Learn More
            </Link>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-16 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission 🎯</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empower job seekers to land their dream jobs through intelligent career preparation tools that bridge the gap between academic knowledge and industry requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Advanced algorithms analyze your resume and provide actionable insights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized Learning</h3>
              <p className="text-gray-600">Customized roadmaps based on your career goals and skill level</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Career Acceleration</h3>
              <p className="text-gray-600">Fast-track your preparation with industry-standard tools and practices</p>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div id="features" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Complete Career Preparation Platform 🌟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed in technical interviews and advance your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resume Analysis */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Resume Analysis</h3>
              <p className="text-gray-600 mb-6">Get instant ATS scoring (0-100) with personalized improvement recommendations and role-specific job matching.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Intelligent ATS scoring system</li>
                <li>✅ Personalized improvement suggestions</li>
                <li>✅ Industry-standard formatting analysis</li>
                <li>✅ Role-specific optimization tips</li>
              </ul>
            </div>

            {/* AI Interview */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Interview Simulator</h3>
              <p className="text-gray-600 mb-6">Practice with personalized questions generated from your resume with real-time video/audio feedback.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Personalized question generation</li>
                <li>✅ Real-time video/audio recording</li>
                <li>✅ Comprehensive performance analytics</li>
                <li>✅ Detailed improvement suggestions</li>
              </ul>
            </div>

            {/* Technical Assessment */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Technical Assessment</h3>
              <p className="text-gray-600 mb-6">Comprehensive coding assessment with 20 questions, multi-language support, and real-time execution.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ 20 comprehensive coding questions</li>
                <li>✅ Multi-language code editor</li>
                <li>✅ Real-time code execution & testing</li>
                <li>✅ Detailed performance reports</li>
              </ul>
            </div>

            {/* Learning Roadmaps */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🛣️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Learning Roadmaps</h3>
              <p className="text-gray-600 mb-6">9 specialized tracks with 3000+ curated problems from top platforms like LeetCode, HackerRank, and more.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ 9 specialized learning tracks</li>
                <li>✅ 3000+ curated practice problems</li>
                <li>✅ Progress tracking & analytics</li>
                <li>✅ Direct platform integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Specialized Tracks */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Specialized Engineering Tracks ⚡</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced preparation for hardware and embedded systems roles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Embedded Systems */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Embedded Systems</h3>
              <p className="text-gray-600 mb-6">Complete roadmap for embedded development including C/C++, microcontrollers, RTOS, and hardware interfacing.</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800">C Programming</h4>
                  <p className="text-sm text-blue-600">150+ problems</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800">Microcontrollers</h4>
                  <p className="text-sm text-green-600">120+ problems</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800">RTOS</h4>
                  <p className="text-sm text-purple-600">100+ problems</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800">Hardware Interface</h4>
                  <p className="text-sm text-orange-600">80+ problems</p>
                </div>
              </div>
            </div>

            {/* VLSI Design */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">VLSI Design</h3>
              <p className="text-gray-600 mb-6">Comprehensive VLSI roadmap covering Verilog, SystemVerilog, digital design, and verification with RTL compiler.</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Verilog HDL</h4>
                  <p className="text-sm text-purple-600">150+ problems</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Digital Logic</h4>
                  <p className="text-sm text-blue-600">120+ problems</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800">Verification</h4>
                  <p className="text-sm text-green-600">110+ problems</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-800">RTL Design</h4>
                  <p className="text-sm text-orange-600">130+ problems</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Tools */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Integrated Development Environment 🛠️</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade tools for hands-on practice and real-world development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Code Editor */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Multi-Language Code Editor</h3>
              <p className="text-gray-600 mb-6">Professional IDE with syntax highlighting, real-time compilation, and execution for 10+ programming languages.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Python, Java, C++, JavaScript, and more</li>
                <li>✅ Real-time syntax highlighting</li>
                <li>✅ Integrated compiler and execution</li>
                <li>✅ Code templates and examples</li>
              </ul>
            </div>

            {/* Verilog Compiler */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Verilog Compiler & RTL Analyzer</h3>
              <p className="text-gray-600 mb-6">Advanced Verilog development environment with RTL diagram generation and timing analysis.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ RTL schematic generation</li>
                <li>✅ Clock and timing diagrams</li>
                <li>✅ Synthesis reports (area, power, frequency)</li>
                <li>✅ Verilog templates and examples</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Platform Statistics 📊</h2>
            <p className="text-xl opacity-90">Comprehensive preparation resources at your fingertips</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3000+</div>
              <div className="text-lg opacity-90">Practice Problems</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">9</div>
              <div className="text-lg opacity-90">Learning Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-lg opacity-90">Programming Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-90">AI-Powered</div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Who Is This For? 🎯</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for ambitious professionals at every stage of their career journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Students & Graduates</h3>
              <p className="text-gray-600">Computer Science, Electrical Engineering, and related majors preparing for their first job</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Working Professionals</h3>
              <p className="text-gray-600">Software engineers, hardware engineers, and developers looking to advance their careers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Career Switchers</h3>
              <p className="text-gray-600">Professionals transitioning into tech roles from other industries</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Transform Your Career? 🚀</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers with our AI-powered preparation platform.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/sign-up" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
              🎯 Start Free Today
            </Link>
            <Link href="/sign-in" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-gray-400 transition-all">
              👋 Sign In
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free forever • Start in 30 seconds
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <h3 className="text-2xl font-bold">ResumeBoost</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Transforming careers through intelligent preparation
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 ResumeBoost. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}