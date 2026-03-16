import { pipeline, env } from '@huggingface/transformers';

// Disable local models since we are running in the browser and will fetch from Hugging Face Hub
env.allowLocalModels = false;

let qaPipeline: any = null;

const CONTEXT = `
Aakanksh Singh is a Software Engineer and AI Researcher. 
He is currently pursuing an M.S. in Computer Science at Syracuse University (graduating Dec 2025) with a CGPA of 3.71. 
He previously completed his B.Tech in Electronics & Communication at SRMIST with a 9.2 CGPA.
Aakanksh is currently a Software Developer Intern at Rightworks LLC, working on Spark AI. 
Before that, he was a Software Engineering Intern at RIA Advisory and Ascendion, where he built LLM tools and RAG extractors.
He also worked as a Full-Stack Developer at InfluencivePress.
His skills include Python, TypeScript, Node.js, FastAPI, React, Next.js, Tailwind, PostgreSQL, Redis, Kafka, Docker, LangChain, LLaMA, PyTorch, TensorFlow, RAG, and NiceGUI.
His projects include StructRAG (a Code Generator & Knowledge Base), Smart Retail Analytics Dashboard, and a JSON Graph Explorer using LikeC4 DSL.
He is available for full-time roles in Backend, Full-stack, and AI engineering.
His email is aakanksh.s10@gmail.com and his GitHub is Aakanksh94310.
`;

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  const { text, type } = event.data;

  if (type === 'load') {
    try {
      // Load the question answering model (Quantized, ~65MB)
      qaPipeline = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad', {
        progress_callback: (x: any) => {
          self.postMessage({ type: 'progress', data: x });
        }
      });
      self.postMessage({ type: 'ready' });
    } catch (err: any) {
      self.postMessage({ type: 'error', error: err.message });
    }
  }

  if (type === 'ask') {
    if (!qaPipeline) {
      self.postMessage({ type: 'error', error: 'Model not loaded yet.' });
      return;
    }

    try {
      const output = await qaPipeline(text, CONTEXT);
      self.postMessage({ type: 'answer', result: output.answer, question: text });
    } catch (err: any) {
      self.postMessage({ type: 'error', error: err.message });
    }
  }
});
