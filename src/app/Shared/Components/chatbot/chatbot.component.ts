import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ChatbotService } from '../../../Core/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  template: `
    <div class="chatbot-wrapper" [class.open]="isOpen()">
      <!-- Chat Header -->
      <div
        class="chat-header d-flex justify-content-between align-items-center px-3 py-2 text-white"
      >
        <div class="d-flex align-items-center gap-2">
          <div class="bot-avatar">
            <mat-icon>smart_toy</mat-icon>
          </div>
          <div>
            <h6 class="mb-0 fw-bold">
              {{ currentLang() === 'en' ? 'Assistant' : 'المساعد الذكي' }}
            </h6>
            <span class="small opacity-75">{{
              currentLang() === 'en' ? 'Online' : 'متصل الآن'
            }}</span>
          </div>
        </div>
        <button class="btn btn-link text-white p-0" (click)="toggleChat()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="chat-messages p-3" #scrollContainer>
        @for (msg of messages(); track msg.timestamp) {
          <div class="message-group mb-3" [class.user]="msg.sender === 'user'">
            <div
              class="message-bubble px-3 py-2 shadow-sm"
              [style.direction]="currentLang() === 'ar' ? 'rtl' : 'ltr'"
            >
              {{ msg.text }}
              <div class="message-time small mt-1 opacity-50 text-end">
                {{ msg.timestamp | date: 'shortTime' }}
              </div>
            </div>
          </div>
        }
        @if (isTyping()) {
          <div class="message-group mb-3">
            <div class="message-bubble typing px-3 py-2 shadow-sm">
              <span></span><span></span><span></span>
            </div>
          </div>
        }
      </div>

      <!-- Chat Input -->
      <div class="chat-input p-2 border-top bg-light">
        <form (ngSubmit)="send()" class="d-flex gap-2">
          <input
            type="text"
            [(ngModel)]="userInput"
            name="userInput"
            [placeholder]="currentLang() === 'en' ? 'Ask me anything...' : 'اسألني عن أي حاجة...'"
            class="form-control form-control-sm border-0 bg-transparent shadow-none"
            [style.direction]="currentLang() === 'ar' ? 'rtl' : 'ltr'"
            autocomplete="off"
          />
          <button
            type="submit"
            class="btn btn-primary btn-sm rounded-circle p-2 d-flex"
            [disabled]="!userInput.trim()"
          >
            <mat-icon>send</mat-icon>
          </button>
        </form>
      </div>
    </div>

    <!-- Floating Toggle Button -->
    <button class="chat-toggle-btn shadow-lg" [class.hidden]="isOpen()" (click)="toggleChat()">
      <mat-icon>chat</mat-icon>
      <span class="badge rounded-pill bg-danger">1</span>
    </button>
  `,
  styles: [
    `
      .chatbot-wrapper {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: #fff;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 1050;
        transform: translateY(120%);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &.open {
          transform: translateY(0);
        }

        @media (max-width: 576px) {
          width: calc(100% - 40px);
          height: 70vh;
        }
      }

      .chat-header {
        background: #6c5ce7;
        .bot-avatar {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          padding: 5px;
          mat-icon {
            font-size: 20px;
            width: 20px;
            height: 20px;
          }
        }
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        background: #f8f9fa;
        scroll-behavior: smooth;
      }

      .message-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &.user {
          align-items: flex-end;
          .message-bubble {
            background: #6c5ce7;
            color: #fff;
            border-bottom-right-radius: 2px;
          }
        }

        &:not(.user) .message-bubble {
          background: #fff;
          color: #333;
          border-bottom-left-radius: 2px;
        }
      }

      .message-bubble {
        max-width: 85%;
        border-radius: 15px;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .typing {
        display: flex;
        gap: 4px;
        span {
          width: 6px;
          height: 6px;
          background: #adb5bd;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
          &:nth-child(1) {
            animation-delay: -0.32s;
          }
          &:nth-child(2) {
            animation-delay: -0.16s;
          }
        }
      }

      @keyframes bounce {
        0%,
        80%,
        100% {
          transform: scale(0);
        }
        40% {
          transform: scale(1);
        }
      }

      .chat-input {
        input:focus {
          border: none !important;
          box-shadow: none !important;
        }
      }

      .chat-toggle-btn {
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #6c5ce7;
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1040;
        transition: all 0.3s ease;

        &:hover {
          transform: scale(1.1);
          background: #5b4bc4;
        }
        &.hidden {
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
        }

        .badge {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 0.7rem;
          padding: 4px 6px;
        }
      }
    `,
  ],
})
export class ChatbotComponent implements AfterViewChecked {
  private chatbotService = inject(ChatbotService);

  isOpen = this.chatbotService.isOpen;
  isTyping = this.chatbotService.isTyping;
  currentLang = this.chatbotService.currentLang;
  userInput = '';
  messages = this.chatbotService.messages;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.chatbotService.toggleChat();
  }

  send() {
    if (!this.userInput.trim()) return;

    const text = this.userInput;
    this.userInput = '';

    this.chatbotService.sendMessage(text);
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
