import './ContactForm.css';

export default function ContactForm({
  name,
  number,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Number:</label>
        <input
          type="tel"
          name="number"
          placeholder="Enter phone number"
          value={number || ''}
          onChange={handleInputChange}
        />
      </div>
      <button className="add-btn" type="submit">
        Add Contact
      </button>
    </form>
  );
}
