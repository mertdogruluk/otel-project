import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <Button
      variant="default"
      size="lg"
      className="rounded-full p-6 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
      onClick={onClick}
    >
      <MessageCircle className="w-10 h-10" />
    </Button>
  );
}
