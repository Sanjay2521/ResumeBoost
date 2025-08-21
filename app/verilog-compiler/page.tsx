'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { useState } from 'react'

export default function VerilogCompiler() {
  const { user } = useUser()
  const [code, setCode] = useState(`module counter (
    input clk,
    input reset,
    input enable,
    output reg [3:0] count
);

always @(posedge clk or posedge reset) begin
    if (reset)
        count <= 4'b0000;
    else if (enable)
        count <= count + 1;
end

endmodule`)

  const [isCompiling, setIsCompiling] = useState(false)
  const [compilationResult, setCompilationResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('rtl')

  const compileVerilog = async () => {
    setIsCompiling(true)
    
    // Simulate compilation process
    setTimeout(() => {
      const result = {
        success: true,
        rtlDiagram: generateRTLDiagram(code),
        clockDiagram: generateClockDiagram(code),
        synthesis: {
          gates: 15,
          flipFlops: 4,
          area: '0.25 mm²',
          power: '1.2 mW',
          frequency: '100 MHz'
        },
        warnings: [],
        errors: []
      }
      setCompilationResult(result)
      setIsCompiling(false)
    }, 2000)
  }

  const generateRTLDiagram = (verilogCode: string) => {
    // Simple RTL diagram generation based on code analysis
    const hasCounter = verilogCode.includes('count')
    const hasReset = verilogCode.includes('reset')
    const hasEnable = verilogCode.includes('enable')
    const hasClock = verilogCode.includes('clk')

    return {
      modules: [
        {
          name: 'counter',
          inputs: ['clk', 'reset', 'enable'],
          outputs: ['count[3:0]'],
          components: [
            { type: 'register', name: 'count_reg', width: 4 },
            { type: 'adder', name: 'increment', width: 4 },
            { type: 'mux', name: 'reset_mux', width: 4 }
          ]
        }
      ]
    }
  }

  const generateClockDiagram = (verilogCode: string) => {
    return {
      signals: [
        { name: 'clk', type: 'clock', period: 10 },
        { name: 'reset', type: 'signal', transitions: [0, 20, 100] },
        { name: 'enable', type: 'signal', transitions: [30, 80] },
        { name: 'count[3:0]', type: 'bus', values: ['0000', '0001', '0010', '0011'] }
      ],
      timeScale: 'ns'
    }
  }

  const RTLVisualization = ({ rtlData }: { rtlData: any }) => (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">RTL Schematic</h3>
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
        <svg width="600" height="400" viewBox="0 0 600 400">
          {/* Clock input */}
          <rect x="50" y="50" width="80" height="40" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" rx="5"/>
          <text x="90" y="75" textAnchor="middle" className="text-sm font-medium">CLK</text>
          
          {/* Reset input */}
          <rect x="50" y="120" width="80" height="40" fill="#fff3e0" stroke="#f57c00" strokeWidth="2" rx="5"/>
          <text x="90" y="145" textAnchor="middle" className="text-sm font-medium">RESET</text>
          
          {/* Enable input */}
          <rect x="50" y="190" width="80" height="40" fill="#e8f5e8" stroke="#388e3c" strokeWidth="2" rx="5"/>
          <text x="90" y="215" textAnchor="middle" className="text-sm font-medium">ENABLE</text>
          
          {/* Counter Register */}
          <rect x="250" y="150" width="120" height="80" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="2" rx="5"/>
          <text x="310" y="185" textAnchor="middle" className="text-sm font-medium">4-bit Counter</text>
          <text x="310" y="205" textAnchor="middle" className="text-sm font-medium">Register</text>
          
          {/* Output */}
          <rect x="450" y="170" width="100" height="40" fill="#fce4ec" stroke="#c2185b" strokeWidth="2" rx="5"/>
          <text x="500" y="195" textAnchor="middle" className="text-sm font-medium">COUNT[3:0]</text>
          
          {/* Connections */}
          <line x1="130" y1="70" x2="250" y2="170" stroke="#666" strokeWidth="2"/>
          <line x1="130" y1="140" x2="250" y2="180" stroke="#666" strokeWidth="2"/>
          <line x1="130" y1="210" x2="250" y2="200" stroke="#666" strokeWidth="2"/>
          <line x1="370" y1="190" x2="450" y2="190" stroke="#666" strokeWidth="2"/>
          
          {/* Clock symbol */}
          <path d="M 200 70 L 210 70 L 215 65 L 220 75 L 225 65 L 230 75 L 235 70 L 245 70" 
                stroke="#1976d2" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </div>
  )

  const ClockDiagram = ({ clockData }: { clockData: any }) => (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Timing Diagram</h3>
      <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
        <svg width="600" height="300" viewBox="0 0 600 300">
          {/* Time axis */}
          <line x1="50" y1="250" x2="550" y2="250" stroke="#333" strokeWidth="1"/>
          <text x="300" y="270" textAnchor="middle" className="text-xs">Time (ns)</text>
          
          {/* Clock signal */}
          <text x="20" y="50" className="text-xs font-medium">CLK</text>
          <path d="M 50 60 L 70 60 L 70 40 L 90 40 L 90 60 L 110 60 L 110 40 L 130 40 L 130 60 L 150 60 L 150 40 L 170 40 L 170 60 L 190 60 L 190 40 L 210 40 L 210 60 L 230 60 L 230 40 L 250 40 L 250 60 L 270 60 L 270 40 L 290 40 L 290 60 L 310 60 L 310 40 L 330 40 L 330 60 L 350 60 L 350 40 L 370 40 L 370 60 L 390 60 L 390 40 L 410 40 L 410 60 L 430 60 L 430 40 L 450 40 L 450 60 L 470 60 L 470 40 L 490 40 L 490 60 L 510 60 L 510 40 L 530 40 L 530 60" 
                stroke="#1976d2" strokeWidth="2" fill="none"/>
          
          {/* Reset signal */}
          <text x="20" y="90" className="text-xs font-medium">RESET</text>
          <path d="M 50 100 L 70 100 L 70 80 L 150 80 L 150 100 L 530 100" 
                stroke="#f57c00" strokeWidth="2" fill="none"/>
          
          {/* Enable signal */}
          <text x="20" y="130" className="text-xs font-medium">ENABLE</text>
          <path d="M 50 140 L 110 140 L 110 120 L 350 120 L 350 140 L 530 140" 
                stroke="#388e3c" strokeWidth="2" fill="none"/>
          
          {/* Count signal */}
          <text x="20" y="170" className="text-xs font-medium">COUNT</text>
          <path d="M 50 180 L 150 180 L 170 180 L 190 180 L 210 180 L 230 180 L 250 180 L 270 180 L 290 180 L 310 180 L 330 180 L 350 180 L 370 180 L 390 180 L 410 180 L 430 180 L 450 180 L 470 180 L 490 180 L 510 180 L 530 180" 
                stroke="#7b1fa2" strokeWidth="2" fill="none"/>
          
          {/* Count values */}
          <text x="100" y="175" className="text-xs">0</text>
          <text x="180" y="175" className="text-xs">1</text>
          <text x="220" y="175" className="text-xs">2</text>
          <text x="260" y="175" className="text-xs">3</text>
          <text x="300" y="175" className="text-xs">4</text>
          
          {/* Grid lines */}
          {[70, 110, 150, 190, 230, 270, 310, 350, 390, 430, 470, 510].map((x, i) => (
            <line key={i} x1={x} y1="30" x2={x} y2="250" stroke="#e0e0e0" strokeWidth="1" strokeDasharray="2,2"/>
          ))}
        </svg>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Verilog Compiler & RTL Analyzer
              </h1>
            </div>
          </div>
          <UserButton />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Verilog Code Editor</h2>
              <div className="flex space-x-2">
                <button
                  onClick={compileVerilog}
                  disabled={isCompiling}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 transition-all"
                >
                  {isCompiling ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Compiling...
                    </div>
                  ) : (
                    '⚡ Compile & Analyze'
                  )}
                </button>
              </div>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-xl font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Enter your Verilog code here..."
            />
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Verilog HDL</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">RTL Design</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Synthesis Ready</span>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            {!compilationResult ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Compile</h3>
                <p className="text-gray-600">Write your Verilog code and click compile to see RTL diagram and timing analysis</p>
              </div>
            ) : (
              <div>
                <div className="flex space-x-4 mb-6 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('rtl')}
                    className={`pb-2 px-1 font-medium transition-colors ${
                      activeTab === 'rtl' 
                        ? 'text-purple-600 border-b-2 border-purple-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    RTL Diagram
                  </button>
                  <button
                    onClick={() => setActiveTab('timing')}
                    className={`pb-2 px-1 font-medium transition-colors ${
                      activeTab === 'timing' 
                        ? 'text-purple-600 border-b-2 border-purple-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Timing Diagram
                  </button>
                  <button
                    onClick={() => setActiveTab('synthesis')}
                    className={`pb-2 px-1 font-medium transition-colors ${
                      activeTab === 'synthesis' 
                        ? 'text-purple-600 border-b-2 border-purple-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Synthesis Report
                  </button>
                </div>

                {activeTab === 'rtl' && <RTLVisualization rtlData={compilationResult.rtlDiagram} />}
                
                {activeTab === 'timing' && <ClockDiagram clockData={compilationResult.clockDiagram} />}
                
                {activeTab === 'synthesis' && (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4">Synthesis Report</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{compilationResult.synthesis.gates}</div>
                        <div className="text-sm text-gray-600">Logic Gates</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{compilationResult.synthesis.flipFlops}</div>
                        <div className="text-sm text-gray-600">Flip-Flops</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{compilationResult.synthesis.area}</div>
                        <div className="text-sm text-gray-600">Area</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{compilationResult.synthesis.power}</div>
                        <div className="text-sm text-gray-600">Power</div>
                      </div>
                    </div>
                    <div className="mt-4 bg-white p-4 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{compilationResult.synthesis.frequency}</div>
                      <div className="text-sm text-gray-600">Max Frequency</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Example Templates */}
        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Verilog Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => setCode(`module and_gate (
    input a,
    input b,
    output y
);

assign y = a & b;

endmodule`)}>
              <h4 className="font-semibold text-gray-800 mb-2">AND Gate</h4>
              <p className="text-sm text-gray-600">Basic combinational logic</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => setCode(`module d_flipflop (
    input clk,
    input reset,
    input d,
    output reg q
);

always @(posedge clk or posedge reset) begin
    if (reset)
        q <= 1'b0;
    else
        q <= d;
end

endmodule`)}>
              <h4 className="font-semibold text-gray-800 mb-2">D Flip-Flop</h4>
              <p className="text-sm text-gray-600">Sequential logic element</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => setCode(`module fsm_example (
    input clk,
    input reset,
    input start,
    output reg done
);

parameter IDLE = 2'b00;
parameter ACTIVE = 2'b01;
parameter FINISH = 2'b10;

reg [1:0] state, next_state;

always @(posedge clk or posedge reset) begin
    if (reset)
        state <= IDLE;
    else
        state <= next_state;
end

always @(*) begin
    case (state)
        IDLE: next_state = start ? ACTIVE : IDLE;
        ACTIVE: next_state = FINISH;
        FINISH: next_state = IDLE;
        default: next_state = IDLE;
    endcase
end

always @(*) begin
    done = (state == FINISH);
end

endmodule`)}>
              <h4 className="font-semibold text-gray-800 mb-2">FSM Example</h4>
              <p className="text-sm text-gray-600">Finite state machine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}