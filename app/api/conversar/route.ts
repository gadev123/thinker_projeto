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
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Não Autorizado", { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse("Chave api OpenIA não configurada", { status: 500});
        }

        if (!messages) {
            return new NextResponse("Mensagens são obrigatórias", { status: 400});
        }

        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Seu teste gratuito expirou, faça upgrade", { status: 403 });
          }

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });

        await incrementApiLimit();

        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {
        console.log("[CONVERSAR.ERROR]", error);
        return new  NextResponse("Erro Interno", {status: 500});
    }  
}