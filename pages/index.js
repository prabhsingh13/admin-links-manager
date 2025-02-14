import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AdminPanel() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ name: '', url: '', note: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetch('/api/links')
      .then((res) => res.json())
      .then((data) => setLinks(data || []))
      .catch((err) => console.error('Error fetching links:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    if (!newLink.url) return alert('Please fill in all required fields.');
    let updatedLinks;
    const updatedLink = { ...newLink, name: newLink.name.trim() || 'Admin' };
    if (editingIndex !== null) {
      updatedLinks = links.map((link, index) => (index === editingIndex ? updatedLink : link));
      setEditingIndex(null);
    } else {
      updatedLinks = [...links, updatedLink];
    }
    try {
      await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLinks),
      });
      setLinks(updatedLinks);
      setNewLink({ name: '', url: '', note: '' });
    } catch (error) {
      console.error('Error updating links:', error);
    }
  };

  const handleEdit = (index) => {
    setNewLink(links[index]);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    try {
      await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLinks),
      });
      setLinks(updatedLinks);
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Admin Links Manager</h1>
      <div className='row g-2 my-4'>
        <div className='col-sm-4'><input type='text' name='name' value={newLink.name} onChange={handleChange} placeholder='Admin Name (default: Admin)' className='form-control' /></div>
        <div className='col-sm-4'><input type='url' name='url' value={newLink.url} onChange={handleChange} placeholder='Admin URL' className='form-control' required /></div>
        <div className='col-sm-4'><input type='text' name='note' value={newLink.note} onChange={handleChange} placeholder='Note (optional)' className='form-control' /></div>
        <div className='col-12 mt-2'><button onClick={handleAddOrUpdate} className='btn btn-primary w-100'>{editingIndex !== null ? 'Update' : 'Add'}</button></div>
      </div>
      <table className='table table-striped table-bordered text-center'>
        <thead className='table-dark'><tr><th>#</th><th>Admin Name</th><th>Link</th><th>Note</th><th>Actions</th></tr></thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={index}><td>{index + 1}</td><td>{link.name || 'Admin'}</td><td><a href={link.url} target='_blank' rel='noopener noreferrer'>Click Here</a></td><td>{link.note}</td><td>
              <button onClick={() => handleEdit(index)} className='btn btn-warning btn-sm me-md-2'><FontAwesomeIcon icon={faPencil} /></button>
              <button onClick={() => handleDelete(index)} className='btn btn-danger btn-sm'><FontAwesomeIcon icon={faTrash} /></button>
            </td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}