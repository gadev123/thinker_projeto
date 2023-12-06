"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {ArrowRight, MessageSquare,Music, ImageIcon, VideoIcon, Code} from "lucide-react"
import { useRouter } from "next/navigation";


const tools = [
  {
    label: "Conversar",
    icon: MessageSquare,
    color:"text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversar"
  },
  {
    label: "Gerar Música",
    icon: Music,
    color:"text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/musica"
  },
  {
    label: "Gerar Imagem",
    icon: ImageIcon,
    color:"text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/imagem"
  },
  {
    label: "Gerar Vídeo",
    icon: VideoIcon,
    color:"text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video"
  },
  {
    label: "Gerar Código",
    icon: Code,
    color:"text-green-700",
    bgColor: "bg-green-700/10",
    href: "/codigo"
  }
]

const DashboardPage = () => {
  const router = useRouter();
    return (
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Explore o poder da Inteligência Artificial
          </h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Converse com as inteligências artificiais mais avançadas e explore todo o potencial que você tem em suas mãos.
          </p>
        </div>  
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href) }
             key={tool.href}
             className="p-4 border-black/5 flex items-center
             justify-between hover:shadow-md transition
              cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded",tool.
                bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color
                  )} />
                </div>
                <div className="font-semibold">
                    {tool.label}
                </div>
              </div>
              <ArrowRight className="w-5 h-5"/>
            </Card>
          ))}
        </div>     
      </div>
      
    )
  }
  
  export default DashboardPage;

  