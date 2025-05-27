'use client';

import React, { useState } from 'react';
import { MessageCircle, Loader, Search, FileText, Send, Globe } from 'lucide-react';
import { Opportunity } from '@/types/opportunity';

interface AIAssistantProps {
    opportunity: Opportunity;
}

interface ChatMessage {
    type: 'user' | 'ai';
    message: string;
    action?: {
        type: 'search' | 'generate' | 'apply';
        data?: any;
    };
}

const AIAssistant: React.FC<AIAssistantProps> = ({ opportunity }) => {
    const [chatQuery, setChatQuery] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const searchCompany = async (company: string) => {
        setIsSearching(true);
        try {
            // TODO: Implement actual API call to search company info
            const response = await fetch(`/api/search-company?company=${encodeURIComponent(company)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching company:', error);
            return null;
        } finally {
            setIsSearching(false);
        }
    };

    const generateDocument = async (type: 'cover-letter' | 'letter-of-intent', opportunity: Opportunity) => {
        setIsGenerating(true);
        try {
            // TODO: Implement actual API call to generate document
            const response = await fetch('/api/generate-document', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, opportunity })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error generating document:', error);
            return null;
        } finally {
            setIsGenerating(false);
        }
    };

    const autoApply = async (opportunity: Opportunity) => {
        try {
            // TODO: Implement actual API call to auto-apply
            const response = await fetch('/api/auto-apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ opportunity })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error auto-applying:', error);
            return null;
        }
    };

    const getAIResponse = async (query: string, opportunity: Opportunity): Promise<ChatMessage> => {
        const lowerQuery = query.toLowerCase();

        // Handle document generation requests
        if (lowerQuery.includes('cover letter') || lowerQuery.includes('write a cover letter')) {
            const doc = await generateDocument('cover-letter', opportunity);
            return {
                type: 'ai',
                message: 'I\'ve generated a cover letter for you. Would you like me to:\n1. Show you the draft\n2. Make any adjustments\n3. Save it as a PDF',
                action: { type: 'generate', data: doc }
            };
        }

        if (lowerQuery.includes('letter of intent') || lowerQuery.includes('write a letter of intent')) {
            const doc = await generateDocument('letter-of-intent', opportunity);
            return {
                type: 'ai',
                message: 'I\'ve generated a letter of intent for you. Would you like me to:\n1. Show you the draft\n2. Make any adjustments\n3. Save it as a PDF',
                action: { type: 'generate', data: doc }
            };
        }

        // Handle company research requests
        if (lowerQuery.includes('research') || lowerQuery.includes('find out about') || lowerQuery.includes('search for')) {
            const companyInfo = await searchCompany(opportunity.company);
            return {
                type: 'ai',
                message: `Here's what I found about ${opportunity.company}:\n\n${companyInfo?.summary || 'No information found'}`,
                action: { type: 'search', data: companyInfo }
            };
        }

        // Handle auto-apply requests
        if (lowerQuery.includes('apply for me') || lowerQuery.includes('auto apply')) {
            const result = await autoApply(opportunity);
            return {
                type: 'ai',
                message: result?.success
                    ? 'I\'ve submitted your application! Would you like me to send you a confirmation email?'
                    : 'I couldn\'t complete the application automatically. Would you like me to guide you through the process?',
                action: { type: 'apply', data: result }
            };
        }

        // Default responses for other queries
        const responses = {
            application: `I can help you with the application process for ${opportunity.company}. Would you like me to:

1. Generate a cover letter
2. Write a letter of intent
3. Research the company
4. Help you apply automatically
5. Check the deliverables

Just let me know what you'd like to do!`,

            company: `I can search the internet for detailed information about ${opportunity.company}. Would you like me to:

1. Research their recent projects
2. Find company culture information
3. Look up employee reviews
4. Check their social media presence

What specific information would you like to know?`,

            deliverables: `I can help you check the deliverables for this position. Would you like me to:

1. Review the job requirements
2. Compare them with your experience
3. Suggest how to highlight your relevant skills
4. Create a checklist of deliverables

What would be most helpful?`,

            default: `I'm your AI assistant for this opportunity at ${opportunity.company}. I can:

1. Research the company online
2. Generate application documents
3. Help you apply automatically
4. Check deliverables
5. Provide application tips

What would you like me to help you with?`
        };

        if (lowerQuery.includes('application') || lowerQuery.includes('apply') || lowerQuery.includes('process')) {
            return { type: 'ai', message: responses.application };
        } else if (lowerQuery.includes('company') || lowerQuery.includes('about') || lowerQuery.includes('culture')) {
            return { type: 'ai', message: responses.company };
        } else if (lowerQuery.includes('deliverable') || lowerQuery.includes('requirement') || lowerQuery.includes('check')) {
            return { type: 'ai', message: responses.deliverables };
        } else {
            return { type: 'ai', message: responses.default };
        }
    };

    const handleAIQuery = async () => {
        if (!chatQuery.trim()) return;

        setIsLoading(true);
        const userMessage = chatQuery.trim();
        setChatQuery('');

        // Add user message to chat
        setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);

        // Get AI response
        const aiResponse = await getAIResponse(userMessage, opportunity);
        setChatHistory(prev => [...prev, aiResponse]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAIQuery();
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-black">AI Assistant</h3>
            </div>

            <p className="text-gray-600 mb-4">
                I can help you research, apply, and prepare for this opportunity. What would you like me to do?
            </p>

            {/* Chat History */}
            {chatHistory.length > 0 && (
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${chat.type === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-900 border'
                                }`}>
                                <div className="whitespace-pre-wrap text-sm">{chat.message}</div>
                                {chat.action && (
                                    <div className="mt-2 flex gap-2">
                                        {chat.action.type === 'search' && (
                                            <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                                                <Globe className="w-3 h-3 inline mr-1" />
                                                View Details
                                            </button>
                                        )}
                                        {chat.action.type === 'generate' && (
                                            <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                                                <FileText className="w-3 h-3 inline mr-1" />
                                                View Document
                                            </button>
                                        )}
                                        {chat.action.type === 'apply' && (
                                            <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                                                <Send className="w-3 h-3 inline mr-1" />
                                                Track Application
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border rounded-lg p-4">
                                <Loader className="w-4 h-4 animate-spin text-blue-600" />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Suggested Actions */}
            
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">I can help you with:</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Research the company",
                            "Generate a cover letter",
                            "Write a letter of intent",
                            "Check deliverables",
                            "Help me apply"
                        ].map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => setChatQuery(suggestion)}
                                className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            

            {/* Chat Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Ask me to research, generate documents, or help you apply..."
                    className="flex-1 px-4 py-2 border text-gray-700 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading || isSearching || isGenerating}
                />
                <button
                    onClick={handleAIQuery}
                    disabled={isLoading || isSearching || isGenerating || !chatQuery.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading || isSearching || isGenerating ? (
                        <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                        'Ask AI'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AIAssistant;