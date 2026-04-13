```javascript
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AbdulazizNexus Notes</h1>

      <div className="mb-4">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Yangi yozuv..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={addNote}
        >
          Qo'shish
        </button>
      </div>

      <div>
        {notes.map((note) => (
          <div key={note.id} className="border rounded p-3 mb-2">
            {editingNoteId === note.id ? (
              <div>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={editedNoteText}
                  onChange={(e) => setEditedNoteText(e.target.value)}
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                  onClick={() => updateNote(note.id, editedNoteText)}
                >
                  Saqlash
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => setEditingNoteId(null)}
                >
                  Bekor qilish
                </button>
              </div>
            ) : (
              <>
                <p>{note.content}</p>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                  onClick={() => startEditing(note)}
                >
                  Tahrirlash
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => deleteNote(note.id)}
                >
                  O'chirish
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```