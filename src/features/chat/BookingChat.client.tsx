'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getBookingChatMessages, sendBookingChatMessage } from '@/lib/api';
import type { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

interface BookingChatProps {
  bookingId: string;
  bookingStatus: string;
  token: string;
  vendorName?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const READ_ONLY_STATUSES = ['COMPLETED', 'CANCELLED', 'EXPIRED'];

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function senderLabel(role: ChatMessage['senderRole']) {
  if (role === 'VENDOR') return 'Vendor';
  if (role === 'PLATFORM') return 'OnnRide';
  return 'You';
}

function ChatPanel({
  bookingId,
  bookingStatus,
  token,
  vendorName,
  onClose,
}: {
  bookingId: string;
  bookingStatus: string;
  token: string;
  vendorName?: string;
  onClose: () => void;
}) {
  const readOnly = READ_ONLY_STATUSES.includes(bookingStatus);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  const loadMessages = useCallback(async () => {
    try {
      const data = await getBookingChatMessages(token, bookingId);
      setMessages(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load messages');
    } finally {
      setLoading(false);
    }
  }, [token, bookingId]);

  useEffect(() => {
    void loadMessages();
    if (readOnly) return;
    const interval = window.setInterval(() => void loadMessages(), 5000);
    return () => window.clearInterval(interval);
  }, [loadMessages, readOnly]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    return () => window.clearTimeout(timer);
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending || readOnly) return;

    setSending(true);
    setError('');
    try {
      const message = await sendBookingChatMessage(token, bookingId, text);
      setMessages((prev) => [...prev, message]);
      setDraft('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-surface-100 bg-surface-950 px-4 py-3.5 text-white sm:rounded-t-2xl">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF6B35]">
            <MessageCircle className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">Chat with vendor</p>
            <p className="truncate text-xs text-slate-400">
              {vendorName ?? 'Pickup & handover support'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div ref={messagesRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
        {loading ? (
          <div className="flex h-full min-h-[12rem] items-center justify-center text-sm text-slate-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            Loading messages…
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-[12rem] flex-col items-center justify-center text-center text-sm text-slate-500">
            <MessageCircle className="mb-2 h-8 w-8 text-slate-300" aria-hidden />
            <p>No messages yet.</p>
            <p className="mt-1 text-xs">Ask about pickup time or documents.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.senderRole === 'CUSTOMER';
            const isPlatform = msg.senderRole === 'PLATFORM';

            return (
              <div key={msg.id} className={cn('flex', isMine ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm sm:max-w-[75%]',
                    isMine && 'rounded-br-md bg-[#FF6B35] text-white',
                    !isMine && !isPlatform && 'rounded-bl-md bg-slate-100 text-slate-800',
                    isPlatform && 'rounded-bl-md bg-sky-50 text-sky-900 ring-1 ring-sky-100',
                  )}
                >
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide opacity-70">
                    {senderLabel(msg.senderRole)}
                  </p>
                  <p className="whitespace-pre-wrap break-words">{msg.content ?? ''}</p>
                  <p className={cn('mt-1 text-[10px]', isMine ? 'text-white/70' : 'text-slate-400')}>
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {error ? (
        <p className="shrink-0 border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-700">{error}</p>
      ) : null}

      {!readOnly ? (
        <form
          onSubmit={handleSend}
          className="flex shrink-0 gap-2 border-t border-surface-100 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            className="input-field h-11 min-w-0 flex-1 text-base sm:text-sm"
            disabled={sending}
            enterKeyHint="send"
          />
          <Button
            type="submit"
            className="h-11 shrink-0 gap-1.5 px-3 sm:px-4"
            disabled={sending || !draft.trim()}
            aria-label="Send message"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Send className="h-4 w-4" aria-hidden />
            )}
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      ) : (
        <p className="shrink-0 border-t border-surface-100 bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">
          This chat is read-only.
        </p>
      )}
    </div>
  );
}

export function BookingChat({
  bookingId,
  bookingStatus,
  token,
  vendorName,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: BookingChatProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const readOnly = READ_ONLY_STATUSES.includes(bookingStatus);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {!open ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm sm:rounded-2xl sm:border sm:shadow-xl">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#FF6B35] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FF6B35]/30 transition active:scale-[0.98] hover:bg-[#E85A28] sm:py-3"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-5 w-5" aria-hidden />
              {!readOnly ? (
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-[#FF6B35]" />
              ) : null}
            </span>
            Chat with vendor
            {vendorName ? (
              <span className="hidden font-normal opacity-90 sm:inline">· {vendorName}</span>
            ) : null}
          </button>
        </div>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-end sm:justify-end sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-surface-950/60 backdrop-blur-[2px]"
            aria-label="Close chat overlay"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with vendor"
            className="relative flex h-[min(92dvh,640px)] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-[min(80dvh,560px)] sm:w-full sm:max-w-md sm:rounded-2xl"
          >
            <ChatPanel
              bookingId={bookingId}
              bookingStatus={bookingStatus}
              token={token}
              vendorName={vendorName}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
