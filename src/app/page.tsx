```javascript
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { LucideTrash2, LucideEdit, LucideSave, LucideX } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scxqlelthseenzerezmq.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHFsZWx0aHNlZW56ZXJlem1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzM0NjQsImV4cCI6MjA5MTA0OTQ2NH0.EPvKsxb8LoLAcUoaOppqPVnjEOv7XoYWndt7GgThcKk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    setNotes(data || []);
  }

  async function addNote() {
    if (newNote.trim() === '') return;
    await supabase.from('notes').insert({ content: newNote });
    setNewNote('');
    fetchNotes();
  }

  async function deleteNote(id) {
    await supabase.from('notes').delete().match({ id });
    fetchNotes();
  }

  function startEditing(note) {
    setEditingNoteId(note.id);
    setEditedNoteText(note.content);
  }

  async function updateNote(id, newContent) {
    await supabase.from('notes').update({ content: newContent }).match({ id });
    setEditingNoteId(null);
    fetchNotes();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-4 text-center">AbdulazizNexus Notes</h1>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
          placeholder="Yangi yozuv..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          onClick={addNote}
        >
          Qo'shish
        </motion.button>
      </div>

      <div>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="border rounded-2xl p-3 mb-2 bg-gray-950"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {editingNoteId === note.id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-white"
                  value={editedNoteText}
                  onChange={(e) => setEditedNoteText(e.target.value)}
                />
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => updateNote(note.id, editedNoteText)}
                  >
                    <LucideSave className="inline-block mr-2" size={16} />
                    Saqlash
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setEditingNoteId(null)}
                  >
                    <LucideX className="inline-block mr-2" size={16} />
                    Bekor qilish
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p>{note.content}</p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => startEditing(note)}
                  >
                    <LucideEdit className="inline-block mr-2" size={16} />
                    Tahrirlash
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteNote(note.id)}
                  >
                    <LucideTrash2 className="inline-block mr-2" size={16} />
                    O'chirish
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
```