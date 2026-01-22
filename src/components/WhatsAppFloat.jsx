import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/5532987037221"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative group">
        {/* Pulsing background */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        
        {/* Main button */}
        <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 transition-colors">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
      </div>
    </motion.a>
  );
}