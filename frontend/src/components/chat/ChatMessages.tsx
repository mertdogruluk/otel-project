import { CardContent } from "@/components/ui/card";

export default function ChatMessages() {
  return (
    <CardContent className="flex-1 p-6 overflow-y-auto text-base space-y-6">
      {/* Hoş geldin mesajı */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium">O</span>
        </div>
        <div className="bg-muted rounded-lg p-4 max-w-[75%]">
          <p className="text-base leading-relaxed">Merhaba! Size nasıl yardımcı olabilirim? Otel hakkında bilgi almak ister misiniz?</p>
        </div>
      </div>
      
      {/* Kullanıcı mesajı örneği */}
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-[75%]">
          <p className="text-base leading-relaxed">Otel hakkında bilgi almak istiyorum</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-medium">S</span>
        </div>
      </div>
    </CardContent>
  );
}
