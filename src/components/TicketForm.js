import React, { useState, useEffect } from "react";

const TicketForm = ({ dispatch, editingTicket }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // avoid page reloading

    const ticketData = {
      id: editingTicket ? editingTicket.id : new Date().toISOString(),
      title,
      description,
      priority,
    };
    //console.log(ticketData);
    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });

    if (editingTicket) {
      dispatch({ type: "CLEAR_EDITING_TICKET" });
    }

    clearForm();
  };
  const handleCancel = () => {
    dispatch({ type: "CLEAR_EDITING_TICKET" });
    clearForm();
  };
  return (
    <div>
      <h1>This is Ticket Form</h1>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            className="form-input"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            className="form-input"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <fieldset className="priority-fieldset">
          <legend>Priority</legend>
          {Object.entries(priorityLabels).map(([value, label]) => (
            <label key={value} className="priority-label">
              {label}
              <input
                type="radio"
                value={value}
                checked={priority === value}
                className="priority-input"
                onChange={(e) => setPriority(e.target.value)}
              ></input>
            </label>
          ))}
        </fieldset>

        <button type="submit" className="button">
          Sumbit
        </button>
        {editingTicket && (
          <button className="button" onClick={handleCancel}>
            CancelEdit
          </button>
        )}
      </form>
    </div>
  );
};

export default TicketForm;
