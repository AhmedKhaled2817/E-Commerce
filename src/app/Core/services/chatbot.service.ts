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
  private learnedKeywords = signal<Record<string, string[]>>({});
  currentLang = signal<'en' | 'ar'>('en');

  messages = signal<Message[]>([]);

  isOpen = signal(false);
  isTyping = signal(false);
  private userName = signal<string | null>(null);

  constructor() {
    this.loadChatbotData();
    this.loadLearnedData();
  }

  private loadLearnedData() {
    const saved = localStorage.getItem('chatbot_learned_keywords');
    if (saved) {
      this.learnedKeywords.set(JSON.parse(saved));
    }
  }

  private saveLearnedData(keyword: string, response: string) {
    this.learnedKeywords.update((prev) => {
      const updated = { ...prev, [keyword]: [...(prev[keyword] || []), response] };
      localStorage.setItem('chatbot_learned_keywords', JSON.stringify(updated));
      return updated;
    });
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

    // 1. Check User-Learned Memory first
    for (const [key, responses] of Object.entries(this.learnedKeywords())) {
      if (rawInput.includes(key.toLowerCase())) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // 2. Handle Name Intro (if not set)
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
        if (name) {
          this.userName.set(name);
          return data.name_ack.replace('{name}', name);
        }
      }
    }

    // 3. Handle Greetings
    const greetings =
      lang === 'en'
        ? ['hi', 'hello', 'hey', 'greetings']
        : ['اهلا', 'مرحبا', 'سلام', 'ازيك', 'يا هلا'];

    if (greetings.some((g) => rawInput.includes(g))) {
      return data.greeting_reply.replace('{name}', this.userName() || '');
    }

    // 4. Knowledge Base Search with Keyword Weighting
    let bestMatch: { response: string; weight: number } | null = null;

    for (const entry of data.knowledge) {
      let matchCount = 0;
      for (const key of entry.keywords) {
        if (rawInput.includes(key.toLowerCase())) {
          matchCount++;
        }
      }

      if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.weight)) {
        const randomIndex = Math.floor(Math.random() * entry.responses.length);
        bestMatch = { response: entry.responses[randomIndex], weight: matchCount };
      }
    }

    if (bestMatch) return bestMatch.response;

    // 5. Navigation Help Logic
    const navKeywords =
      lang === 'en' ? ['where', 'how to', 'go to', 'find'] : ['فين', 'ازاى', 'اروح', 'مكان'];

    if (navKeywords.some((k) => rawInput.includes(k))) {
      return data.nav_help;
    }

    // 6. Learning Fallback: Save unknown input
    if (rawInput.length > 3) {
      // Logic: Save as a keyword for future if no answer found
      // For now, just save it so if they ask again later we can "remember"
      this.saveLearnedData(
        rawInput,
        lang === 'en'
          ? `You asked about "${rawInput}" before. I'm still analyzing it, but it seems interesting!`
          : `إنت سألتني عن "${rawInput}" قبل كدة. أنا لسه بدرسها بس شكلها حاجة مهمة!`,
      );
    }

    return data.fallback;
  }

  clearChat() {
    this.userName.set(null);
    this.initializeChat();
  }
}
