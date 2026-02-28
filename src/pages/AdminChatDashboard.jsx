import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { 
  MessageCircle, User, Clock, CheckCircle, XCircle,
  Search, Filter, RefreshCw, Send, ArrowLeft
} from 'lucide-react';

export default function AdminChatDashboard() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00"
  };

  useEffect(() => {
    checkAdmin();
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
      subscribeToMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const checkAdmin = async () => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user?.id)
      .single();

    if (profile?.role !== 'admin') {
      window.location.href = '/dashboard';
    }
  };

  const loadConversations = async () => {
    try {
      let query = supabase
        .from('chat_conversations')
        .select('*')
        .order('last_message_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      if (searchTerm) {
        query = query.or(`user_email.ilike.%${searchTerm}%,user_name.ilike.%${searchTerm}%`);
      }

      const { data } = await query;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    setMessages(data || []);

    // Mark messages as read
    await supabase
      .from('chat_messages')
      .update({ read: true })
      .eq('conversation_id', conversationId)
      .eq('read', false);
  };

  const subscribeToMessages = (conversationId) => {
    const subscription = supabase
      .channel(`admin_chat_${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert([{
        user_id: user.id,
        user_email: user.email,
        user_name: 'Support Agent',
        message: newMessage.trim(),
        sender: 'agent',
        conversation_id: selectedConversation.id,
        read: false
      }]);

    if (!error) {
      setNewMessage('');
      
      // Update conversation last message
      await supabase
        .from('chat_conversations')
        .update({
          last_message: newMessage.trim(),
          last_message_at: new Date().toISOString()
        })
        .eq('id', selectedConversation.id);
    }
  };

  const updateConversationStatus = async (conversationId, status) => {
    await supabase
      .from('chat_conversations')
      .update({ status })
      .eq('id', conversationId);

    loadConversations();
  };

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'all') return true;
    return conv.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1A3D7C] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Chat Support Dashboard</h1>
          <p className="text-white/80">Manage all customer conversations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    loadConversations();
                  }}
                />
                <button
                  onClick={loadConversations}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('active')}
                  className={`flex-1 py-2 text-sm rounded-lg ${
                    filter === 'active' ? 'bg-[#1A3D7C] text-white' : 'bg-gray-100'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('resolved')}
                  className={`flex-1 py-2 text-sm rounded-lg ${
                    filter === 'resolved' ? 'bg-[#1A3D7C] text-white' : 'bg-gray-100'
                  }`}
                >
                  Resolved
                </button>
                <button
                  onClick={() => setFilter('all')}
                  className={`flex-1 py-2 text-sm rounded-lg ${
                    filter === 'all' ? 'bg-[#1A3D7C] text-white' : 'bg-gray-100'
                  }`}
                >
                  All
                </button>
              </div>
            </div>

            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1A3D7C] to-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold">
                      {conv.user_name?.charAt(0) || 'G'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{conv.user_name || 'Guest'}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(conv.last_message_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.last_message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{conv.user_email || 'No email'}</span>
                        {conv.status === 'active' && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-2 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[700px]">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1A3D7C] to-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold">
                      {selectedConversation.user_name?.charAt(0) || 'G'}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.user_name || 'Guest'}</h3>
                      <p className="text-sm text-gray-500">{selectedConversation.user_email || 'No email'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateConversationStatus(selectedConversation.id, 'resolved')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      title="Mark as resolved"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => updateConversationStatus(selectedConversation.id, 'archived')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Archive"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl text-sm ${
                          msg.sender === 'agent'
                            ? 'text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                        style={msg.sender === 'agent' ? { background: colors.primary } : {}}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {msg.sender === 'agent' ? 'You' : msg.user_name} • {new Date(msg.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your reply..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A3D7C] focus:border-transparent"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-[#FF7A00] text-white rounded-lg disabled:opacity-50"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">Select a conversation</h3>
                  <p className="text-sm text-gray-500">Choose a chat from the left to start responding</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}