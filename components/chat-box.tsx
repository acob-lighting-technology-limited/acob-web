"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import type { Message } from "ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Send, MessageSquare, X, StopCircle, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ACOB_SYSTEM_PROMPT } from "@/lib/data/acobot_system_prompt"; 
const suggestedMessages = [
  //   "What services do you offer?",
  //   "How can I contact ACOB?",
  //   "Can you respond in Yoruba?",
  // //   "Tell me about your mini-grid solutions.",
    "What are your office hours?",
];

// Custom hook to format text with basic markdown-like formatting
const formatMessage = (content: string) => {
  if (!content) return content;
  // Convert **bold** to <strong>
  let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Convert *italic* to <em>
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Convert line breaks to <br>
  formatted = formatted.replace(/\n/g, "<br />");
  // Convert phone numbers to clickable links
  formatted = formatted.replace(
    /(\d{4}\s?\d{3}\s?\d{4})/g,
    '<a href="tel:$1" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  );
  // Convert email addresses to clickable links
  formatted = formatted.replace(
    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    '<a href="mailto:$1" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  );
  // Convert URLs to clickable links
  formatted = formatted.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  );
  return formatted;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    error,
    stop,
  } = useChat({
    api: "/api/chat",
    initialMessages: [ACOB_SYSTEM_PROMPT],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = (message: string) => {
    setInput(message);
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 0);
  };

  const displayMessages = messages.filter((m) => m.role !== "system");

  const isChatting = isLoading;

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-2xl hover:shadow-primary/25 hover:scale-110 transition-all duration-300 border-0"
              aria-label="Open chat"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <MessageSquare className="h-7 w-7" />
                )}
              </motion.div>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:w-[380px] h-[calc(100vh-4rem)] mt-16 sm:h-[80vh] fixed bottom-4 right-4 rounded-lg overflow-hidden shadow-2xl  bg-white flex flex-col"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <SheetHeader className="bg-primary text-primary-foreground px-5 py-2 rounded-t-lg shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 5,
                    }}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Bot className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <SheetTitle className="text-xl font-bold text-white">
                      ACOBot
                    </SheetTitle>
                    <p className="text-primary-foreground/80 text-sm">
                      Your Energy Assistant
                    </p>
                  </div>
                </div>
              </SheetHeader>
            </motion.div>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
              <AnimatePresence initial={false}>
                {displayMessages.map((m: Message, index: number) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className={`flex items-start gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "assistant" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      >
                        <Bot className="h-4 w-4 text-white" />
                      </motion.div>
                    )}
                    <Card
                      className={`max-w-[85%] shadow- border-0 !py-0 ${
                        m.role === "user"
                          ? "bg-primary text-white rounded-t-xl rounded-bl-xl rounded-br-md"
                          : "bg-gray-200 text-gray-800 rounded-t-xl rounded-br-xl rounded-bl-md border border-gray-100"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div
                          className="text-sm leading-relaxed"
                          style={{
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(m.content),
                          }}
                        />
                      </CardContent>
                    </Card>
                    {m.role === "user" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      >
                        <User className="h-4 w-4 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* Typing Indicator */}
              {isLoading &&
                displayMessages[displayMessages.length - 1]?.role ===
                  "user" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <Card className="bg-white border border-gray-100 rounded-t-xl rounded-br-xl rounded-bl-md shadow-lg !py-0">
                      <CardContent className="p-4 flex items-center gap-2">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.8,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 0,
                            }}
                            className="w-2 h-2 bg-primary rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.8,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 0.2,
                            }}
                            className="w-2 h-2 bg-primary rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.8,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 0.4,
                            }}
                            className="w-2 h-2 bg-primary rounded-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <Card className="bg-red-50 border border-red-200 rounded-2xl shadow-lg">
                    <CardContent className="p-4 text-center">
                      <p className="text-red-800 text-sm">
                        <strong>Oops!</strong>{" "}
                        {error.message ||
                          "Something went wrong. Please try again."}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Input Area */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-4 bg-white border-t border-gray-100"
            >
              {/* Quick Reply Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(msg)}
                      className="rounded-full text-xs px-4 py-2 h-auto border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-50"
                      disabled={isChatting}
                    >
                      {msg}
                    </Button>
                  </motion.div>
                ))}
              </div>
              {/* Input Form */}
              <form
                id="chat-form"
                onSubmit={handleSubmit}
                className="flex items-end gap-3"
              >
                <div className="flex-1 relative">
                  <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="min-h-[48px] max-h-[120px] resize-none rounded-xl border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 pr-4 pl-4 py-3"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                    disabled={isChatting}
                  />
                </div>
                {isChatting ? (
                  <Button
                    type="button"
                    size="icon"
                    onClick={stop}
                    className="h-12 w-12 rounded-full bg-destructive hover:bg-destructive/90 text-white transition-all duration-200 flex-shrink-0"
                    disabled={!isChatting}
                  >
                    <StopCircle className="h-5 w-5" />
                    <span className="sr-only">Stop generation</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim()}
                    className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-white transition-all duration-200 flex-shrink-0 disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                )}
              </form>
            </motion.div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
}
