import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { MessageCircle, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <div className="flex items-center gap-3">
        <MessageCircle className="w-8 h-8 text-blue-600" />
        <span className="font-medium text-lg">Canlı Destek</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-10 w-10 text-muted-foreground hover:text-foreground"
      >
        <X className="w-6 h-6" />
      </Button>
    </CardHeader>
  );
}
