import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotData {
  [key: string]: {
    welcome: string;
    name_ack: string;
    greeting_reply: string;
    fallback: string;
    nav_help: string;
    knowledge: {
      keywords: string[];
      responses: string[];
    }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private http = inject(HttpClient);
  private chatbotData: ChatbotData | null = null;
  currentLang = signal<'en' | 'ar'>('en');

  messages = signal<Message[]>([]);

  isOpen = signal(false);
  isTyping = signal(false);
  private userName = signal<string | null>(null);

  constructor() {
    this.loadChatbotData();
  }

  private async loadChatbotData() {
    try {
      this.chatbotData = await firstValueFrom(
        this.http.get<ChatbotData>('/assets/chatbot-data.json'),
      );
      // Initialize with welcome message in current language
      this.initializeChat();
    } catch (error) {
      console.error('Failed to load chatbot data', error);
      // Fallback if file not found
      this.chatbotData = null;
    }
  }

  private initializeChat() {
    if (!this.chatbotData) return;
    const lang = this.currentLang();
    this.messages.set([
      {
        text: this.chatbotData[lang].welcome,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }

  toggleChat() {
    this.isOpen.update((v) => !v);
  }

  openChat() {
    this.isOpen.set(true);
  }

  async sendMessage(text: string) {
    // Add user message
    this.messages.update((prev) => [...prev, { text, sender: 'user', timestamp: new Date() }]);

    // Detect language and update currentLang
    const detectedLang = this.detectLanguage(text);
    this.currentLang.set(detectedLang);

    // Show typing indicator
    this.isTyping.set(true);

    // Wait for data if still loading (max 3s)
    let retryCount = 0;
    while (!this.chatbotData && retryCount < 30) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      retryCount++;
    }

    const botReply = this.getDynamicResponse(text);

    setTimeout(() => {
      this.messages.update((prev) => [
        ...prev,
        { text: botReply, sender: 'bot', timestamp: new Date() },
      ]);
      this.isTyping.set(false);
    }, 1500);
  }

  private detectLanguage(text: string): 'en' | 'ar' {
    // Simple Arabic character detection
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? 'ar' : 'en';
  }

  private getDynamicResponse(input: string): string {
    if (!this.chatbotData) return 'Loading knowledge base...';

    const lang = this.currentLang();
    const data = this.chatbotData[lang];
    const rawInput = input.toLowerCase().trim();

    // 1. Handle Name Intro (if not set)
    if (!this.userName()) {
      // Check if user is introducing themselves
      const introKeywords =
        lang === 'en' ? ['name is', 'i am', 'call me'] : ['اسمي', 'أنا', 'قولي'];

      const isIntro =
        introKeywords.some((k) => rawInput.includes(k)) || rawInput.split(' ').length <= 2;

      if (isIntro) {
        let name = rawInput;
        introKeywords.forEach((k) => (name = name.replace(k, '')));
        name = name.trim();
        this.userName.set(name);
        return data.name_ack.replace('{name}', name);
      }
    }

    // 2. Handle Greetings
    const greetings =
      lang === 'en'
        ? ['hi', 'hello', 'hey', 'greetings']
        : ['اهلا', 'مرحبا', 'سلام', 'ازيك', 'يا هلا'];

    if (greetings.some((g) => rawInput.includes(g))) {
      return data.greeting_reply.replace('{name}', this.userName() || '');
    }

    // 3. Knowledge Base Search
    for (const entry of data.knowledge) {
      if (entry.keywords.some((key) => rawInput.includes(key.toLowerCase()))) {
        const randomIndex = Math.floor(Math.random() * entry.responses.length);
        return entry.responses[randomIndex];
      }
    }

    // 4. Navigation Help Logic
    const navKeywords =
      lang === 'en' ? ['where', 'how to', 'go to', 'find'] : ['فين', 'ازاى', 'اروح', 'مكان'];

    if (navKeywords.some((k) => rawInput.includes(k))) {
      return data.nav_help;
    }

    // 5. Fallback
    return data.fallback;
  }

  clearChat() {
    this.userName.set(null);
    this.initializeChat();
  }
}
