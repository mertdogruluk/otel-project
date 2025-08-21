"use client";

import { useState } from 'react';
import ChatButton from '@/components/chat/ChatButton';
import ChatWindow from '@/components/chat/ChatWindow';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <ChatWindow onClose={() => setOpen(false)} />
      ) : (
        <ChatButton onClick={() => setOpen(true)} />
      )}
    </div>
  );
}
