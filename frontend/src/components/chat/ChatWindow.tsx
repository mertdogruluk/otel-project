import { Card } from "@/components/ui/card";
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  return (
    <Card className="w-96 h-[500px] flex flex-col shadow-lg rounded-xl border bg-card text-card-foreground mb-4">
      <ChatHeader onClose={onClose} />
      <ChatMessages />
      <ChatInput />
    </Card>
  );
}
