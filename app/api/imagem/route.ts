import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new  OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Não Autorizado", { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse("Chave api OpenIA não configurada", { status: 500});
        }

        if (!prompt) {
            return new NextResponse("Comandos são obrigatórios", { status: 400});
        }

        if (!amount) {
            return new NextResponse("Quantidades são obrigatórias", { status: 400});
        }

        if (!resolution) {
            return new NextResponse("Resolução é obrigatória", { status: 400});
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
          }

        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        await incrementApiLimit();
        return NextResponse.json(response.data.data);

    } catch (error) {
        console.log("[IMAGEM.ERROR]", error);
        return new  NextResponse("Erro Interno", {status: 500});
    }  
}