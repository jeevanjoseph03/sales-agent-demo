"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  BrainCircuit, 
  CheckCircle2, 
  FileText, 
  Mail, 
  Send, 
  Loader2, 
  Cloud,
  ShieldCheck,
  FileBarChart,
  History
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- Types for our Simulation ---
type Message = {
  id: string;
  role: "agent" | "user" | "system";
  content: string;
  type: "text" | "reasoning" | "action";
  metadata?: any;
};

type AppState = "idle" | "analyzing" | "drafting" | "review" | "complete";

export default function SalesAgentDemo() {
  const [activeTab, setActiveTab] = useState("outlook");
  const [appState, setAppState] = useState<AppState>("idle");
  const [proposalDetails, setProposalDetails] = useState({
    discount: 15,
    price: 30,
    total: 12750
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      content: "I am monitoring your inbox for high-value opportunities. I will alert you if I detect actionable requests.",
      type: "text",
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // --- The Core "Agent" Logic Simulation ---
  const startSimulation = async () => {
    setAppState("analyzing");
    
    // 1. User triggers the flow
    addMessage("user", "Analyze this email and help me respond.");

    // 2. Agent Reasoning (The "Transparency" Layer)
    await delay(1000);
    addMessage("agent", "Analyzing intent and gathering context...", "reasoning", {
      steps: [
        "Intent: Rate Request (RFP) detected",
        "Entity: Northstar Enterprises",
        "Product: AI Analytics Suite (500 Seats)"
      ]
    });

    // 3. Agent Tool Usage (The "Extensibility" Layer)
    await delay(2500);
    addMessage("agent", "Querying internal systems for account data...", "reasoning", {
      steps: [
        "Salesforce: Found Account 'Northstar Ent' (Tier 1)",
        "SharePoint: Retrieved 'Q1_Pricing_Policy.pdf'",
        "Graph API: Checked calendar availability"
      ]
    });

    // 4. Proposed Action
    await delay(2000);
    addMessage("agent", "I have prepared a draft based on the 'Enterprise_SaaS_Template_v4'.", "action", {
      title: "Proposal Ready for Review",
      description: "Includes 15% discount and standard SLA terms.",
      actionLabel: "Open Draft in Word"
    });
  };

  const openDraft = async () => {
    setAppState("drafting");
    
    addMessage("user", "Open the draft.");
    
    await delay(800);
    addMessage("agent", "Opening Microsoft Word...", "text");
    
    await delay(1000);
    setActiveTab("word");
    setAppState("review");
    
    await delay(1500);
    addMessage("agent", "I've flagged one section regarding Data Sovereignty. Also, note that the 15% discount requires VP approval.", "text");
  };

  const requestRevision = async () => {
    addMessage("user", "The 15% discount is too aggressive for Q1. Let's drop it to 10% to avoid approval delays.");
    
    await delay(800);
    setAppState("analyzing");
    addMessage("agent", "Updating proposal terms...", "reasoning", {
      steps: [
        "Policy Check: 10% discount is within Account Executive limits.",
        "Action: update_table_row(id='discount', value='10%')",
        "Recalculating Totals..."
      ]
    });

    await delay(2000);
    
    // Update State (User sees this reflect in the table instantly)
    setProposalDetails({
      discount: 10,
      price: 30,
      total: 13500 
    });
    
    setAppState("review");
    addMessage("agent", "I've updated the discount to 10% and recalculated the total. No VP approval is required for this tier.", "text");
  };

  // Helper to add messages
  const addMessage = (role: "agent" | "user" | "system", content: string, type: "text" | "reasoning" | "action" = "text", metadata?: any) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role, content, type, metadata }]);
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const getStepIcon = (text: string) => {
    if (text.includes("Salesforce") || text.includes("Account ID")) return <Cloud size={12} className="text-blue-500" />;
    if (text.includes("Policy") || text.includes("Constraint")) return <ShieldCheck size={12} className="text-green-500" />;
    if (text.includes("SharePoint") || text.includes("PDF")) return <FileBarChart size={12} className="text-orange-500" />;
    if (text.includes("Intent") || text.includes("Entity")) return <BrainCircuit size={12} className="text-purple-500" />;
    return <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />;
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* --- LEFT SIDE: The Application (Outlook/Word) --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mock Header (Simulating M365 Nav) */}
        <header className="h-14 bg-[#2563EB] text-white flex items-center px-4 justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-3 gap-0.5">
               {[...Array(9)].map((_,i) => <div key={i} className="w-1 h-1 bg-white/80 rounded-full"></div>)}
            </div>
            <span className="font-semibold tracking-wide">Microsoft 365</span>
            <div className="h-4 w-[1px] bg-white/30 mx-2"></div>
            <span className="text-sm opacity-90">{activeTab === "outlook" ? "Outlook" : "Word"}</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-xs bg-white/20 px-2 py-1 rounded">Northstar Enterprises</div>
             <Avatar className="h-8 w-8 border-2 border-white/50">
                <AvatarFallback>JG</AvatarFallback>
             </Avatar>
          </div>
        </header>

        {/* App Content */}
        <main className="flex-1 bg-slate-100 p-6 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="w-[200px] mb-4 bg-white border">
              <TabsTrigger value="outlook" className="gap-2"><Mail size={16}/> Outlook</TabsTrigger>
              <TabsTrigger value="word" className="gap-2"><FileText size={16}/> Word</TabsTrigger>
            </TabsList>

            {/* --- OUTLOOK VIEW --- */}
            <TabsContent value="outlook" className="flex-1 h-full mt-0">
              <Card className="h-full border-slate-200 shadow-sm flex flex-col">
                <div className="border-b p-4 flex justify-between items-start bg-white rounded-t-lg">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-purple-100 text-purple-700">SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">RFP: AI Analytics Suite Implementation</h2>
                      <div className="text-sm text-slate-500 flex gap-2 items-center">
                        <span className="font-medium text-slate-700">Sarah Chen (Northstar)</span>
                        <span>&lt;sarah.chen@northstar-ent.com&gt;</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">To: Jeevan George (Contoso) • Today, 9:42 AM</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="outline" size="sm">Reply</Button>
                     {appState === "idle" && (
                        <Button 
                          onClick={startSimulation} 
                          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
                        >
                          <BrainCircuit size={16} /> Copilot Action
                        </Button>
                     )}
                  </div>
                </div>
                <ScrollArea className="flex-1 p-8 bg-white">
                  <div className="max-w-3xl space-y-4 text-slate-700 leading-relaxed">
                    <p>Hi Jeevan,</p>
                    <p>It was great connecting with you and the Contoso team yesterday.</p>
                    <p>We’ve reviewed the internal requirements, and leadership is ready to move forward with the <strong>500-seat deployment</strong> of the AI Analytics Suite. However, we need to get the contract signed before the end of Q1 to align with our budget cycle.</p>
                    <p>Could you please send over a formal proposal? Please ensure it includes:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>The Enterprise tier features we discussed.</li>
                        <li>Any volume discounts available for the 500 seats.</li>
                        <li>Standard SLA terms regarding uptime.</li>
                    </ul>
                    <p>Looking forward to reviewing this.</p>
                    <p>Best,<br/>Sarah</p>
                  </div>
                </ScrollArea>
              </Card>
            </TabsContent>

            {/* --- WORD VIEW --- */}
            <TabsContent value="word" className="flex-1 h-full mt-0">
              <Card className="h-full border-slate-200 shadow-sm flex flex-col bg-white">
                <div className="border-b p-2 bg-slate-50 flex items-center gap-4 px-4">
                   <FileText className="text-blue-600" />
                   <span className="font-semibold text-sm">Proposal_Northstar_v1.docx</span>
                   <Badge variant="secondary" className="ml-auto text-xs">Auto-Saved</Badge>
                </div>
                <ScrollArea className="flex-1 p-12 bg-[#f9f9f9]">
                   <div className="max-w-[800px] mx-auto bg-white min-h-[1000px] shadow-lg border p-12 text-slate-800">
                      {/* Document Content */}
                      <div className="flex justify-between items-end border-b-4 border-slate-900 pb-4 mb-8">
                         <div>
                            <h1 className="text-4xl font-bold text-slate-900">PROPOSAL</h1>
                            <p className="text-slate-500 mt-2">Prepared for Northstar Enterprises</p>
                         </div>
                         <div className="text-right">
                            <div className="font-bold text-xl text-blue-600">CONTOSO</div>
                            <div className="text-sm text-slate-400">January 15, 2026</div>
                         </div>
                      </div>

                      <div className="space-y-6">
                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-2">Executive Summary</h3>
                            <p className="text-sm leading-6">
                                We are pleased to submit this proposal to Northstar Enterprises for the deployment of our AI Analytics Suite. 
                                Based on our recent discussions, this solution acts as a key enabler for your Q1 data transformation goals.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-2">Commercial Terms</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 font-bold">
                                        <tr>
                                            <th className="p-3">Item</th>
                                            <th className="p-3">Qty</th>
                                            <th className="p-3">Rate</th>
                                            <th className="p-3">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="p-3">AI Analytics Suite (Enterprise)</td>
                                            <td className="p-3">500</td>
                                            <td className="p-3">${proposalDetails.price.toFixed(2)}</td>
                                            <td className="p-3">$15,000</td>
                                        </tr>
                                        <tr className="bg-green-50 text-green-700 font-medium h-14 transition-all duration-500">
                                            <td className="p-3 flex items-center gap-2">
                                                <CheckCircle2 size={14}/> Volume Discount ({proposalDetails.discount}%)
                                            </td>
                                            <td className="p-3"></td>
                                            <td className="p-3">-${(15000 * (proposalDetails.discount/100)).toFixed(2)}</td>
                                            <td className="p-3">-${(15000 * (proposalDetails.discount/100)).toLocaleString()}</td>
                                        </tr>
                                        <tr className="font-bold bg-slate-50">
                                            <td className="p-3 text-right" colSpan={3}>Monthly Total</td>
                                            <td className="p-3 text-lg">${proposalDetails.total.toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="relative group p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                            <div className="absolute -left-3 top-3 bg-yellow-400 text-white p-1 rounded-full shadow-sm">
                                <ShieldCheck size={16} />
                            </div>
                            <h3 className="text-sm font-bold text-yellow-800 mb-1">Compliance Note (Data Sovereignty)</h3>
                            <p className="text-xs text-yellow-700">
                                All data for this deployment will be hosted in the US-East-1 region to comply with Northstar's standard vendor policy.
                            </p>
                        </section>
                      </div>
                   </div>
                </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* --- RIGHT SIDE: The Copilot Agent --- */}
      <div className="w-[400px] h-full border-l border-slate-200 bg-white flex flex-col shadow-xl z-20">
        <div className="h-14 border-b flex items-center px-4 bg-gradient-to-r from-purple-50 to-white justify-between flex-shrink-0">
           <div className="flex items-center gap-2">
             <BrainCircuit className="w-5 h-5 text-purple-600" />
             <span className="font-bold text-slate-800">Sales Agent</span>
           </div>
           <Badge variant="outline" className="text-[10px] border-purple-200 text-purple-700">Beta</Badge>
        </div>

        {/* NATIVE SCROLL CONTAINER to avoid "Not Scrolling" issues */}
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
           <div className="space-y-6">
              {messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    
                    {/* User Message */}
                    {m.role === 'user' && (
                        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[90%] shadow-sm leading-relaxed">
                            {m.content}
                        </div>
                    )}

                    {/* Agent Message (Standard) */}
                    {m.role === 'agent' && m.type === 'text' && (
                        <div className="flex gap-3 max-w-[95%]">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-purple-200 mt-1">
                                <BrainCircuit size={16}/>
                            </div>
                            <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm border border-slate-100 leading-relaxed">
                                {m.content}
                            </div>
                        </div>
                    )}

                    {/* Agent Reasoning Trace (The "Brain") */}
                    {m.role === 'agent' && m.type === 'reasoning' && (
                        <div className="flex gap-3 max-w-[95%] w-full">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                                <BrainCircuit size={16}/>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                                    <History size={10} /> Refining Context
                                </div>
                                <Card className="border-purple-100 bg-gradient-to-b from-purple-50/50 to-white shadow-sm">
                                    <CardContent className="p-3 space-y-3">
                                        <div className="flex items-center gap-2 text-purple-900 font-semibold text-xs">
                                            {appState === 'analyzing' ? <Loader2 className="animate-spin w-3 h-3 text-purple-600"/> : <CheckCircle2 className="w-3 h-3 text-green-600"/>}
                                            {m.content}
                                        </div>
                                        {m.metadata?.steps && (
                                            <div className="space-y-2 mt-2 pl-2 border-l-2 border-purple-200 ml-1.5 py-1">
                                                {m.metadata?.steps.map((step: string, i: number) => (
                                                    <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                                                        {getStepIcon(step)}
                                                        <span>{step}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                     {/* Agent Action Card */}
                     {m.role === 'agent' && m.type === 'action' && (
                        <div className="flex gap-3 max-w-[95%] w-full">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                                <BrainCircuit size={16}/>
                            </div>
                            <div className="flex-1">
                                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-slate-50 border-b p-3">
                                        <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                            <FileText size={14} className="text-blue-500"/>
                                            {m.metadata?.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1 ml-6">{m.metadata?.description}</p>
                                    </div>
                                    <div className="p-3">
                                        <Button 
                                            size="sm" 
                                            className="w-full bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-purple-700"
                                            onClick={openDraft}
                                            disabled={appState !== 'analyzing'}
                                        >
                                            {m.metadata?.actionLabel}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
              ))}
              <div ref={scrollRef} className="h-4" />
           </div>
        </div>

        {/* NEW: Suggested Actions Area (Human-in-the-loop Refinement) */}
        {appState === "review" && proposalDetails.discount === 15 && (
           <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex gap-2 overflow-x-auto scrolbar-hide flex-shrink-0 animate-in slide-in-from-bottom-2">
              <button 
                onClick={requestRevision}
                className="whitespace-nowrap flex items-center gap-2 text-xs bg-purple-100 text-purple-700 px-3 py-2 rounded-full hover:bg-purple-200 transition-colors border border-purple-200 font-medium"
              >
                 <ShieldCheck size={12} />
                 Reduce discount to 10% (Auto-Approve)
              </button>
              <button className="whitespace-nowrap text-xs bg-white text-slate-600 px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50 font-medium transition-colors">
                 Request VP Approval
              </button>
           </div>
        )}

        {/* Chat Input */}
        <div className="p-4 border-t bg-white flex-shrink-0">
           <div className="relative">
              <input 
                disabled 
                className="w-full bg-slate-100 border-0 rounded-full pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none text-slate-600"
                placeholder={appState === "idle" ? "Select an email to start..." : "Agent is active..."}
              />
              <div className="absolute right-2 top-2 p-1 bg-purple-600 rounded-full text-white opacity-50">
                <Send size={14} />
              </div>
           </div>
           <div className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck size={10} /> Microsoft 365 Copilot
           </div>
        </div>
      </div>
    </div>
  );
}