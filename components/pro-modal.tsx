"use client";

import {MessageSquare,Music, ImageIcon, VideoIcon, Code, Check, Zap} from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter  } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const tools = [
    {
      label: "Conversar",
      icon: MessageSquare,
      color:"text-violet-500",
      bgColor: "bg-violet-500/10",

    },
    {
      label: "Gerar Música",
      icon: Music,
      color:"text-emerald-500",
      bgColor: "bg-emerald-500/10",
      
    },
    {
      label: "Gerar Imagem",
      icon: ImageIcon,
      color:"text-pink-700",
      bgColor: "bg-pink-700/10",
      
    },
    {
      label: "Gerar Vídeo",
      icon: VideoIcon,
      color:"text-orange-700",
      bgColor: "bg-orange-700/10",
      
    },
    {
      label: "Gerar Código",
      icon: Code,
      color:"text-green-700",
      bgColor: "bg-green-700/10",
      
    }
  ]

export const ProModal = () => {
    const proModal = useProModal();

    return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade para o Thinker
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {tool.label}
                  </div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button  size="lg" variant="premium" className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};