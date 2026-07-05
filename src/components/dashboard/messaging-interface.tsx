"use client";
import { useState, useRef, useEffect } from "react";
import { formatDateTime, getInitials, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Search, Phone, Video, MoreVertical, MessageSquare } from "lucide-react";
import { sendMessage } from "@/actions/messages";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date | string;
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
}

interface Props {
  currentUserId: string;
  contacts: Contact[];
  initialMessages: Message[];
  firstContactId: string | null;
  assignedCA: any | null;
}

export function MessagingInterface({
  currentUserId,
  contacts,
  initialMessages,
  firstContactId,
  assignedCA,
}: Props) {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(firstContactId);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Include assigned CA in contacts if not already there
  const allContacts = [...contacts];
  if (assignedCA && !contacts.find((c) => c.id === assignedCA.id)) {
    allContacts.unshift({ ...assignedCA, role: "CA_STAFF" });
  }

  const filteredContacts = allContacts.filter((c) =>
    search === "" || (c.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const selectedContact = allContacts.find((c) => c.id === selectedContactId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!newMessage.trim() || !selectedContactId) return;
    setSending(true);

    const optimistic: Message = {
      id: `opt-${Date.now()}`,
      senderId: currentUserId,
      receiverId: selectedContactId,
      content: newMessage,
      createdAt: new Date(),
      isRead: false,
    };

    setMessages((prev) => [...prev, optimistic]);
    setNewMessage("");

    const fd = new FormData();
    fd.append("receiverId", selectedContactId);
    fd.append("content", newMessage);
    const res = await sendMessage(fd);

    if (!res.success) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    }

    setSending(false);
  }

  return (
    <div className="flex h-[calc(100vh-160px)] bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-card">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm">
              <MessageSquare className="h-8 w-8 mb-2" />
              <p>No conversations yet</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50",
                  selectedContactId === contact.id && "bg-blue-50 border-blue-50"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {contact.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={contact.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    getInitials(contact.name ?? "U")
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{contact.name}</p>
                  <p className="text-xs text-slate-400 truncate">
                    {contact.role === "CA_STAFF" ? "Your CA" : contact.role === "SUPER_ADMIN" ? "Admin" : "Client"}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
                {getInitials(selectedContact.name ?? "U")}
              </div>
              <div>
                <p className="font-bold text-slate-900">{selectedContact.name}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-xs text-slate-500">Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <Video className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <MessageSquare className="h-12 w-12 mb-3" />
                <p className="font-medium">Start a conversation</p>
                <p className="text-sm">Send a message to {selectedContact.name}</p>
              </div>
            )}
            {messages.map((msg, i) => {
              const isMe = msg.senderId === currentUserId;
              const showTime =
                i === 0 ||
                new Date(msg.createdAt).getTime() - new Date(messages[i - 1].createdAt).getTime() > 5 * 60 * 1000;

              return (
                <div key={msg.id}>
                  {showTime && (
                    <div className="text-center text-xs text-slate-400 my-2">
                      {formatDateTime(msg.createdAt)}
                    </div>
                  )}
                  <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                    {!isMe && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 self-end">
                        {getInitials(selectedContact.name ?? "U")}
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] px-4 py-2.5 rounded-2xl text-sm",
                        isMe
                          ? "bg-[#2563EB] text-white rounded-br-sm"
                          : "bg-slate-100 text-slate-900 rounded-bl-sm"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder={`Message ${selectedContact.name}...`}
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim() || sending}
                className="p-2 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] disabled:opacity-50 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="font-medium text-lg">Select a conversation</p>
            <p className="text-sm">Choose a contact from the left to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
