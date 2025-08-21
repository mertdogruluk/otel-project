import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mesaj gönderme işlemi burada yapılacak
      console.log('Mesaj gönderildi:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 border-t border-border">
      <div className="flex gap-3">
        <Input 
          placeholder="Mesajınızı yazın..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 h-12 text-base"
        />
        <Button
          size="icon"
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="h-12 w-12"
        >
          <Send className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
